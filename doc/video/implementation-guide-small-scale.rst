Practical Implementation Guide — Hybrid Multi-Audio Player (200–500 Viewers)
=============================================================================

.. contents:: Table of Contents
   :depth: 3
   :local:

Overview
--------

This guide explains, in plain English first and with code second, how to
implement the hybrid YouTube multi-audio (interpretation) player for a
real-world conference with 200 to 500 simultaneous viewers.

At this scale a single mid-range server (4 vCPUs, 8 GB RAM) can handle
everything. No Kubernetes, no auto-scaling groups, no multi-region CDN is
needed. The solution is deliberately simple and pragmatic.

Before reading this document, make sure you have read:

- :doc:`streaming-fundamentals` — normal streaming pipeline, glossary of all
  technical terms.
- :doc:`hybrid-multi-audio-player` — the full design with challenges and
  lifecycle.

This guide translates that design into the minimal practical steps required for
a working system.

----

Part 1 — Plain English Explanation
------------------------------------

What We Are Building
~~~~~~~~~~~~~~~~~~~~~

Eventyay already streams a talk via YouTube. YouTube carries both video and the
speaker's original audio. That is one pipeline and it is already working.

The new thing we need is a **second audio pipeline** that carries each
interpreter's voice (e.g., a Mandarin interpreter who translates the English
speaker in real time). The viewer's browser will:

1. Keep playing the YouTube video (with its original audio muted).
2. Download and play the interpreter's audio through the browser's own audio
   engine.
3. Keep the two in sync so they do not drift apart.

Why Not Use YouTube for Interpreter Audio?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

YouTube does not support multiple audio tracks on a single live stream. You
cannot upload a second audio channel and let the viewer switch between them.
Therefore the interpreter audio must travel a completely separate path.

The Simplest Architecture That Works for 200–500 Viewers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Here is the full picture, written as a sequence of boxes and arrows:

::

    [Interpreter's browser]
          |
          | WebRTC (real-time audio)
          v
    [eventyay server — simple Node.js or Python ingest]
          |
          | pipe raw audio to FFmpeg
          v
    [FFmpeg on the same server]
          |  encodes audio → AAC-LC
          |  writes HLS segments (.ts files, 2 seconds each)
          |  writes manifest (playlist.m3u8)
          v
    [Nginx serving /hls/ directory]
          |
          | plain HTTP — no CDN needed at this scale
          v
    [Viewer's browser — hls.js]
          |  downloads playlist.m3u8 every 2 seconds
          |  downloads next .ts segment
          |  plays audio through Web Audio API
          |
          + [YouTube IFrame] — video playing (original audio muted)
          |
          | 500 ms sync loop compares audio position vs video position
          v
    [Drift correction — tiny playbackRate tweak or hard jump]

At 200–500 viewers each downloading a 2-second segment (roughly 32 KB at
128 kbps AAC) every 2 seconds, that is at most:

- 500 viewers × 32 KB / 2 s = **8 MB/s outbound** per language channel.
- Two interpreter channels = 16 MB/s, well within a 1 Gbps datacenter port.
- CPU: FFmpeg encoding one AAC-LC stream uses < 5% of a single CPU core.

A single Nginx process can handle thousands of concurrent small-file HTTP
requests. This architecture has substantial headroom.

The Five Components You Need to Build
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Component 1 — Interpreter ingest endpoint**

The interpreter opens a simple web page in their browser. The page uses the
browser's ``getUserMedia`` API to capture their microphone, then sends the
audio to the server over WebRTC. On the server, a small process receives the
WebRTC stream and pipes it to FFmpeg.

Why WebRTC? Because it works through corporate firewalls and NAT without the
interpreter needing to install anything. The interpreter just opens a URL and
clicks "Start interpreting."

**Component 2 — FFmpeg HLS segmenter**

FFmpeg receives the raw audio from the WebRTC ingest, re-encodes it as
AAC-LC at 64 kbps (speech quality, low bandwidth), and writes:

- A rolling HLS manifest (``playlist.m3u8``) that always lists the last
  10 segments.
- Individual 2-second ``.ts`` segment files in a directory served by Nginx.

FFmpeg is a single command — about 80 characters. No special configuration
is needed.

**Component 3 — Nginx HLS file server**

Nginx serves the ``/hls/`` directory as static files with the correct
``Content-Type: application/vnd.apple.mpegurl`` header for manifests and
``Content-Type: video/mp2t`` for segments. It also sets ``Cache-Control:
no-cache`` on the manifest so viewers always get fresh segment lists, and
allows short caching (2 s) on segments because they are immutable once
written.

This is a six-line Nginx ``location`` block — no special module needed.

**Component 4 — Viewer-side sync controller (JavaScript)**

This is the most complex component. It must handle four distinct situations:
normal playback, pause/resume, buffer stalls, and large drift. Each is
explained in detail below under "How Pause, Play, and Buffers Are
Synchronised." The high-level job is:

1. Create an ``hls.js`` instance pointing at the language's manifest URL.
2. Mute the YouTube IFrame player.
3. Listen for YouTube player state changes (play, pause, buffering, seeking).
4. Run a 500 ms ``setInterval`` loop that checks and corrects drift.
5. When the viewer switches language or leaves, tear down ``hls.js``,
   unmute YouTube, and clear all listeners.

**Component 5 — Organizer offset configuration**

The organizer (or a sound engineer) runs a brief sound check before the
event. They use a simple admin page (or a query-string parameter) to set the
``offset_seconds`` value for each language channel. This value is stored in
the ``StreamSchedule.config`` JSON field and served to the viewer's browser
at page load. During the live event they can update it in real time via a
WebSocket message if the pipeline latency changes.

How Pause, Play, and Buffers Are Synchronised
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This section explains, step by step, every operation the sync controller
performs. Read this carefully — it is the heart of the feature.

**What a "buffer" is**

The browser does not play audio sample by sample as it arrives over HTTP.
Instead, ``hls.js`` downloads entire 2-second segments ahead of time and
hands them to the browser's media engine. The browser keeps a small
**playback buffer** — typically 10–30 seconds of decoded audio waiting in
memory. At any moment you can inspect how much is buffered with
``audio.buffered``, which returns time ranges of already-downloaded content.

YouTube has its own internal buffer for video. You cannot inspect it
directly, but the IFrame API tells you the player state (playing, paused,
buffering) via ``onStateChange`` events, and the current position via
``getCurrentTime()``.

The challenge is that these two buffers are completely independent. When the
network hiccups, the audio buffer may stall while the video keeps playing
(or vice versa). When the viewer pauses, both buffers keep data but only
one timeline is frozen. The sync controller must detect all of these
situations and react correctly.

**Normal playback — the 500 ms sync loop**

Every 500 milliseconds the sync loop runs this logic:

::

    videoPos   = ytPlayer.getCurrentTime()          // e.g. 142.3 s
    audioPos   = audio.currentTime                  // e.g. 134.1 s
    offset     = 8.0                                // measured at sound check

    idealAudioPos = videoPos - offset               // 142.3 - 8.0 = 134.3 s
    drift         = audioPos - idealAudioPos        // 134.1 - 134.3 = -0.2 s

    if |drift| < 0.3 s  → do nothing  (within tolerance)
    if 0.3 ≤ |drift| < 2 s → nudge playbackRate to 1.02 (audio behind)
                                               or 0.98 (audio ahead)
    if |drift| ≥ 2 s   → hard jump: audio.currentTime = idealAudioPos

The ``playbackRate`` nudge is invisible to the viewer — a 2% speed
difference closes a 0.3 s gap in about 15 seconds without any audible
glitch. The hard jump is reserved for situations where something has gone
badly wrong (tab background, long buffer stall, seek) and a 15-second
convergence time is unacceptable.

**What happens when the viewer pauses YouTube**

When the viewer clicks the YouTube pause button, the IFrame API fires
``onStateChange`` with state ``YT.PlayerState.PAUSED``. The sync controller
must respond immediately:

1. **Pause the audio element.** Call ``audio.pause()``. This freezes the
   audio timeline — ``audio.currentTime`` stops advancing.
2. **Suspend the sync loop.** Set an ``isPaused`` flag so the 500 ms loop
   skips the drift calculation. (If you leave the loop running, it will
   try to keep up with a frozen ``videoPos`` and may jump the audio to an
   incorrect position when resume happens.)
3. **Record the pause timestamp.** Save ``Date.now()`` as ``pausedAt``.
   This is not strictly necessary for correctness but helps with diagnostics.

::

    ytPlayer.addEventListener('onStateChange', (event) => {
      if (event.data === YT.PlayerState.PAUSED) {
        audio.pause();
        isPaused = true;
      }
    });

**What happens when the viewer resumes (plays) after a pause**

When the viewer clicks play, the IFrame API fires ``onStateChange`` with
state ``YT.PlayerState.PLAYING``. The sync controller must:

1. **Resync before resuming.** Read the current ``videoPos``. Compute the
   ideal audio position. Set ``audio.currentTime = videoPos - offset``.
   This is necessary because the YouTube player may have been seeked (e.g.,
   the viewer skipped forward) while paused, or the HLS segment at the
   previously paused position may no longer be in the buffer if the pause
   lasted a long time (segments expire and are deleted from the server).
2. **Resume audio playback.** Call ``audio.play()``. The browser will
   attempt to start at the newly set ``currentTime``. If that position is
   already in the local buffer (the viewer paused for less than ~20 s),
   playback begins immediately. If the buffer does not cover that position,
   ``hls.js`` will fetch the necessary segment first (see "buffer stall"
   below).
3. **Clear the ``isPaused`` flag** so the sync loop resumes running.

::

    if (event.data === YT.PlayerState.PLAYING && isPaused) {
      isPaused = false;
      audio.currentTime = ytPlayer.getCurrentTime() - offset;
      audio.play();
    }

**Buffer stall — audio is buffering while video is playing**

A buffer stall happens when ``hls.js`` has not yet downloaded the segment
that corresponds to the current ``audio.currentTime``. This can happen:

- When the viewer first loads a language (no segments downloaded yet).
- After a long pause where old segments expired on the server.
- After a hard resync that jumps to a position not yet in the buffer.
- On a slow network where downloads lag behind playback.

When a buffer stall occurs, the ``<audio>`` element fires a ``waiting``
event, and ``audio.readyState`` drops below ``HAVE_FUTURE_DATA``. The video
keeps playing. The sync controller must:

1. **Detect the stall.** Listen for the ``waiting`` event on the audio
   element.
2. **Pause YouTube.** Call ``ytPlayer.pauseVideo()``. This prevents the
   video from running ahead of the audio during the stall. (Alternatively,
   you can let the video keep playing and accept that a hard resync will
   happen when audio catches up — but pausing is smoother for the viewer.)
3. **Wait for audio to recover.** Listen for the ``playing`` event on the
   audio element, which fires when buffering is complete and playback
   resumes.
4. **Resume YouTube.** Call ``ytPlayer.playVideo()``.
5. **Re-run a resync.** Immediately compute drift and correct it, because
   the stall may have lasted several seconds.

::

    audio.addEventListener('waiting', () => {
      if (!isPaused) {
        ytPlayer.pauseVideo();
        isAudioStalled = true;
      }
    });

    audio.addEventListener('playing', () => {
      if (isAudioStalled) {
        isAudioStalled = false;
        ytPlayer.playVideo();
        // Force an immediate resync rather than waiting for the next tick.
        syncTick();
      }
    });

Note: The reverse case — video buffering while audio is playing — is handled
by YouTube itself. The IFrame API fires ``YT.PlayerState.BUFFERING`` and the
video pauses internally. The audio keeps running. When the sync loop next
runs, it will detect that the video position has stalled, compute a large
drift, and do a hard resync on the audio side.

**Seeking — viewer skips forward or backward in YouTube**

Live streams are usually not seekable, so this situation is rare. If the
event is later rebroadcast as a recording, or if the organizer has enabled
DVR mode, the viewer can seek. When a seek happens:

1. YouTube fires ``YT.PlayerState.BUFFERING`` followed by
   ``YT.PlayerState.PLAYING`` (with a new position).
2. The old audio position is now wildly wrong.
3. On the next sync loop tick, drift will be very large (≥ 2 s), and the
   hard-jump logic fires automatically.

No special seek handling is needed beyond what the sync loop already does,
but if you want instant response rather than waiting up to 500 ms for the
next tick, you can listen for the ``onStateChange → PLAYING`` event after a
seek and call ``syncTick()`` immediately.

**Language switch — viewer changes interpretation channel**

When the viewer switches from, say, Mandarin to French:

1. Destroy the current ``hls.js`` instance and pause the audio element.
2. Unmute YouTube temporarily (so the viewer hears something while the new
   channel loads).
3. Create a new ``hls.js`` instance for the French manifest URL.
4. Wait for the ``canplay`` event on the new audio element.
5. Resync: ``audio.currentTime = ytPlayer.getCurrentTime() - frenchOffset``.
6. ``audio.play()``; mute YouTube again.
7. Restart the sync loop with the new channel's offset.

The whole switch typically takes 1–3 seconds on a normal connection (one
segment download). During that window, YouTube audio is audible as a
fallback — this is intentional.

**Summary: the full state machine**

::

    States: IDLE | LOADING | PLAYING | PAUSED | STALLED | SWITCHING

    IDLE → LOADING   : viewer selects a language channel
    LOADING → PLAYING: audio 'canplay' fires; audio.play() called
    PLAYING → PAUSED : YouTube PAUSED event → audio.pause()
    PAUSED → PLAYING : YouTube PLAYING event → resync + audio.play()
    PLAYING → STALLED: audio 'waiting' event → ytPlayer.pauseVideo()
    STALLED → PLAYING: audio 'playing' event → ytPlayer.playVideo() + syncTick()
    PLAYING → SWITCHING: viewer clicks different language → destroy + reload
    SWITCHING → LOADING: new hls.js created
    * → IDLE         : viewer selects "Original" or component unmounts

    Sync loop runs only in PLAYING state.
    Hard jump fires in PLAYING state when |drift| ≥ 2 s.

How the Viewer Experience Feels
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Viewer opens the event page. The YouTube video starts playing in the
   embedded IFrame (original audio on by default).
2. A language selector appears (e.g., "English (original)", "Mandarin",
   "French").
3. Viewer clicks "Mandarin." YouTube audio mutes. In 1–2 seconds the
   Mandarin interpretation audio starts. Any brief gap is covered by
   YouTube audio remaining on until the new channel is ready.
4. The viewer hears the interpreter's voice aligned with the speaker's lip
   movements. They may notice a brief adjustment in the first few seconds
   as the sync loop converges — after that it is imperceptible.
5. Viewer clicks pause on YouTube. Both YouTube and the interpreter audio
   pause together.
6. Viewer clicks play. The audio is resynced to the exact position before
   resuming, so there is no jump or gap.
7. If the viewer's network stalls, the audio stops and YouTube pauses
   automatically to wait. Both resume together when the segment arrives.
8. If the interpreter disconnects, the HLS manifest goes stale. After
   3 failed segment fetches, ``hls.js`` fires a fatal error event. The Vue
   component shows "Interpretation unavailable," re-enables YouTube audio
   automatically, and transitions to IDLE state.
9. If the viewer goes to another tab and comes back, the sync loop detects
   a large drift and does a hard resync within one 500 ms tick.

What the Organizer Needs to Do
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Before the event: start the FFmpeg HLS process for each interpreter
   channel (or use the admin UI that triggers it automatically when an
   interpreter connects).
2. During sound check (10 minutes before): use the offset calibration page
   to measure and save the pipeline latency for each language.
3. During the event: watch the interpreter status dashboard. If a channel
   goes red, investigate or call the interpreter.
4. Nothing special is needed to handle viewer scale — Nginx handles it.

Complete Control-Flow Diagram
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The diagram below shows every path through the system in one view: the
full hardware-to-viewer pipeline, both audio tracks, every viewer
interaction (pause, resume, language switch, seek), every failure mode
(buffer stall, interpreter disconnect), and the drift-correction loop.

.. code-block:: mermaid

   flowchart TD
       %% ── Infrastructure layer ────────────────────────────────────────────
       subgraph INFRA["🏗 Infrastructure (server side)"]
           direction TB
           MIC["🎙 Interpreter's browser\n(getUserMedia)"]
           WEB["WebRTC signalling\n/api/interpreter/connect"]
           INGEST["Python aiortc\ningest server"]
           FFMPEG["FFmpeg\nencodes → AAC-LC 64 kbps\nwrites 2-second .ts segments"]
           NGINX["Nginx\n/hls/{channel}/playlist.m3u8"]
           ADMIN["Django admin\noffset_seconds per channel\n(StreamSchedule.config JSONField)"]

           MIC -->|"getUserMedia + RTCPeerConnection"| WEB
           WEB -->|"WebRTC audio stream"| INGEST
           INGEST -->|"raw PCM via pipe"| FFMPEG
           FFMPEG -->|"HLS segments + manifest"| NGINX
           ADMIN -->|"offset value served\nin JSON at page load"| VIEWER
       end

       %% ── YouTube pipeline (parallel, independent) ─────────────────────
       subgraph YT["▶ YouTube pipeline (existing)"]
           direction TB
           OBS["OBS encoder\n(video + original audio)"]
           RTMP["RTMP → youtube.com"]
           YTCDN["YouTube CDN\ntranscodes → HLS/DASH"]
           IFRAME["YouTube IFrame\nin viewer's browser"]

           OBS --> RTMP --> YTCDN --> IFRAME
       end

       %% ── Viewer browser (sync controller) ────────────────────────────
       subgraph VIEWER["👤 Viewer browser (AudioSyncController)"]
           direction TB
           HLSJS["hls.js\ndownloads segments\nevery 2 s"]
           AUDIO["&lt;audio&gt; element\naudio.currentTime"]
           SYNCLOOP["⏱ 500 ms sync loop\ndrift = audio.currentTime\n      − (ytPlayer.getCurrentTime() − offset)"]
           YTAPI["YouTube IFrame API\nonStateChange events\ngetCurrentTime()"]

           HLSJS -->|"decoded PCM\nto playback buffer"| AUDIO
           AUDIO -->|"currentTime"| SYNCLOOP
           YTAPI -->|"getCurrentTime()"| SYNCLOOP
       end

       %% ── Normal playback ──────────────────────────────────────────────
       NGINX -->|"HTTP – manifest + segments"| HLSJS
       YTCDN --> IFRAME
       IFRAME -->|"IFrame API"| YTAPI

       %% ── Drift correction (inside sync loop) ─────────────────────────
       subgraph DRIFT["🔧 Drift correction (every 500 ms)"]
           direction LR
           D1{"|drift| ?"}
           D2["< 0.3 s\n→ do nothing"]
           D3["0.3 – 2 s\n→ playbackRate 0.98 / 1.02\n(invisible to viewer)"]
           D4["≥ 2 s\n→ hard jump\naudio.currentTime = videoPos − offset"]
       end

       SYNCLOOP --> D1
       D1 --> D2
       D1 --> D3
       D1 --> D4

       %% ── Pause / Resume ───────────────────────────────────────────────
       subgraph PAUSE_RESUME["⏸ Pause / Resume coupling"]
           direction TB
           YT_PAUSE["YouTube PAUSED event"]
           AP["audio.pause()\nset isPaused = true\nsuspend sync loop"]
           YT_PLAY["YouTube PLAYING event\n(after deliberate pause)"]
           RP["resync:\naudio.currentTime = videoPos − offset\naudio.play()\nclear isPaused flag"]

           YT_PAUSE --> AP
           YT_PLAY --> RP
       end

       YTAPI -->|"onStateChange PAUSED"| YT_PAUSE
       YTAPI -->|"onStateChange PLAYING\n(isPaused was true)"| YT_PLAY

       %% ── Buffer stall ─────────────────────────────────────────────────
       subgraph STALL["⏳ Buffer stall (network hiccup)"]
           direction TB
           AW["audio 'waiting' event\n(segment not yet downloaded)"]
           PV["ytPlayer.pauseVideo()\nset isAudioStalled = true"]
           AR["audio 'playing' event\n(segment arrived)"]
           RV["ytPlayer.playVideo()\nclear isAudioStalled\ncall _syncTick() immediately"]

           AW --> PV
           AR --> RV
       end

       AUDIO -->|"'waiting'"| AW
       AUDIO -->|"'playing'"| AR

       %% ── Seek ─────────────────────────────────────────────────────────
       subgraph SEEK["⏭ Seek (DVR / recording mode)"]
           direction LR
           YT_BUF["YouTube BUFFERING event\n(seek in progress)"]
           YT_PLY2["YouTube PLAYING event\n(seek complete, new position)"]
           ST["call _syncTick() immediately\ndrift ≥ 2 s → hard jump fires"]

           YT_BUF --> YT_PLY2 --> ST
       end

       YTAPI -->|"onStateChange BUFFERING"| YT_BUF
       YTAPI -->|"onStateChange PLAYING\n(isAudioStalled was false)"| YT_PLY2

       %% ── Language switch ──────────────────────────────────────────────
       subgraph LANGSWITCH["🌐 Language switch"]
           direction TB
           LS1["viewer clicks\ndifferent language"]
           LS2["destroy current hls.js\naudio.pause()\nunmute YouTube (temporary)"]
           LS3["create new hls.js\nfor new manifest URL"]
           LS4["wait for 'canplay'\nresync currentTime\naudio.play()\nmute YouTube again"]

           LS1 --> LS2 --> LS3 --> LS4
       end

       VIEWER -->|"LanguageSelector click"| LS1

       %% ── Interpreter disconnect / fallback ────────────────────────────
       subgraph FALLBACK["🔴 Interpreter disconnect / fallback"]
           direction TB
           HE["hls.js fatal error\n(3 failed segment fetches)"]
           FB["AudioSyncController.stop()\nunmute YouTube\nshow 'Interpretation unavailable'\ntransition to IDLE"]

           HE --> FB
       end

       HLSJS -->|"Hls.Events.ERROR fatal=true"| HE

       %% ── Multiple language channels (parallel instances) ──────────────
       subgraph MULTI["🗣 Multiple interpreter channels (per language)"]
           direction LR
           CH1["Channel: Mandarin\nplaylist.m3u8\noffset_seconds = 8"]
           CH2["Channel: French\nplaylist.m3u8\noffset_seconds = 9"]
           CH3["Channel: Spanish\nplaylist.m3u8\noffset_seconds = 7"]
           CTRL["AudioSyncController\n(one instance, active channel only)"]

           CH1 -->|"viewer selects Mandarin"| CTRL
           CH2 -->|"viewer selects French"| CTRL
           CH3 -->|"viewer selects Spanish"| CTRL
       end

       NGINX -->|"serves all channels"| CH1
       NGINX -->|"serves all channels"| CH2
       NGINX -->|"serves all channels"| CH3

       %% ── Latency budget annotation ────────────────────────────────────
       NOTE1["📏 Typical latency budget\nMicrophone → WebRTC → FFmpeg → HLS segment\n→ Nginx → hls.js download → playback\n≈ 5 – 12 s total\n(set as offset_seconds at sound check)"]
       INFRA -.->|"measured at sound check"| NOTE1

       %% ── State machine summary ────────────────────────────────────────
       subgraph SM["📋 Viewer-side state machine"]
           direction LR
           IDLE(("IDLE")) -->|"language selected"| LOADING(("LOADING"))
           LOADING -->|"canplay"| PLAYING(("PLAYING"))
           PLAYING -->|"YouTube PAUSED"| PAUSED(("PAUSED"))
           PAUSED -->|"YouTube PLAYING"| PLAYING
           PLAYING -->|"audio waiting"| STALLED2(("STALLED"))
           STALLED2 -->|"audio playing"| PLAYING
           PLAYING -->|"new language"| SWITCHING(("SWITCHING"))
           SWITCHING -->|"hls.js loaded"| LOADING
           PLAYING -->|"fatal error"| IDLE
           PAUSED -->|"original selected"| IDLE
       end

----

Part 2 — Code
--------------

This section shows the minimal code for each component. The snippets are
complete enough to run; they are not pseudocode.

Component 1 — Interpreter Ingest (Browser Side)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The interpreter's browser page captures their microphone and sends it to the
server via WebRTC. This uses the browser's built-in ``getUserMedia`` and
``RTCPeerConnection`` APIs — no library needed.

.. code-block:: html

   <!-- interpreter-portal.html — served from eventyay -->
   <!DOCTYPE html>
   <html lang="en">
   <head><meta charset="UTF-8"><title>Interpreter Portal</title></head>
   <body>
     <button id="start">Start Interpreting</button>
     <button id="stop" disabled>Stop</button>
     <p id="status">Not connected</p>
     <script type="module" src="/static/js/interpreter-portal.js"></script>
   </body>
   </html>

.. code-block:: javascript

   // static/js/interpreter-portal.js
   // Captures microphone audio and sends it to the server via WebRTC.
   // The server receives it and pipes it to FFmpeg for HLS segmentation.

   const startBtn = document.getElementById('start');
   const stopBtn = document.getElementById('stop');
   const status = document.getElementById('status');

   let pc = null;       // RTCPeerConnection
   let stream = null;   // MediaStream from getUserMedia

   startBtn.addEventListener('click', async () => {
     startBtn.disabled = true;
     status.textContent = 'Requesting microphone…';

     stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
     pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });

     stream.getAudioTracks().forEach(track => pc.addTrack(track, stream));

     // Send ICE candidates to the server as they are discovered.
     pc.onicecandidate = async ({ candidate }) => {
       if (candidate) {
         await fetch('/api/interpreter/ice-candidate', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ candidate }),
         });
       }
     };

     // Create the WebRTC offer and send it to the server.
     const offer = await pc.createOffer();
     await pc.setLocalDescription(offer);

     const response = await fetch('/api/interpreter/connect', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ sdp: offer.sdp }),
     });
     const { sdp: answerSdp } = await response.json();
     await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });

     status.textContent = 'Connected — interpreting live';
     stopBtn.disabled = false;
   });

   stopBtn.addEventListener('click', () => {
     pc?.close();
     stream?.getTracks().forEach(t => t.stop());
     status.textContent = 'Stopped';
     startBtn.disabled = false;
     stopBtn.disabled = true;
   });

Component 2 — Server-Side Ingest + FFmpeg HLS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A small Python script (using ``aiortc`` for WebRTC) receives the audio and
pipes it straight to FFmpeg. FFmpeg writes HLS segments to a directory
served by Nginx.

.. code-block:: python

   # app/eventyay/video/ingest.py
   # Receives interpreter audio via WebRTC and hands it to FFmpeg for HLS.
   #
   # Requirements (add to pyproject.toml extras):
   #   aiortc>=1.9
   #
   # Run: python -m eventyay.video.ingest --channel mandarin --port 8765

   import argparse
   import asyncio
   import json
   import logging
   import subprocess
   from pathlib import Path

   from aiohttp import web
   from aiortc import RTCPeerConnection, RTCSessionDescription
   from aiortc.contrib.media import MediaBlackhole, MediaPlayer

   logger = logging.getLogger(__name__)

   HLS_ROOT = Path('/var/www/hls')  # Nginx serves this directory.


   async def start_ffmpeg_hls(channel: str) -> subprocess.Popen:
       """Start FFmpeg writing HLS segments for the given channel."""
       out_dir = HLS_ROOT / channel
       out_dir.mkdir(parents=True, exist_ok=True)
       cmd = [
           'ffmpeg', '-hide_banner', '-loglevel', 'warning',
           '-f', 'f32le',        # raw PCM from aiortc audio sink
           '-ar', '48000',       # 48 kHz sample rate
           '-ac', '1',           # mono (interpreter is always mono)
           '-i', 'pipe:0',       # read from stdin
           '-c:a', 'aac',
           '-b:a', '64k',        # 64 kbps is plenty for speech
           '-f', 'hls',
           '-hls_time', '2',                    # 2-second segments
           '-hls_list_size', '10',              # keep last 10 segments in manifest
           '-hls_flags', 'delete_segments',     # auto-delete old .ts files
           '-hls_segment_filename', str(out_dir / 'seg%05d.ts'),
           str(out_dir / 'playlist.m3u8'),
       ]
       return subprocess.Popen(cmd, stdin=subprocess.PIPE)


   class InterpreterTrackSink:
       """Receives audio frames from aiortc and writes PCM to FFmpeg stdin."""

       def __init__(self, ffmpeg_proc: subprocess.Popen, loop: asyncio.AbstractEventLoop) -> None:
           self.ffmpeg = ffmpeg_proc
           self.loop = loop

       async def recv(self, frame):
           pcm_bytes = frame.to_ndarray().astype('float32').tobytes()
           # stdin.write is blocking I/O — run it in a thread pool so we
           # do not stall the asyncio event loop.
           await self.loop.run_in_executor(None, self.ffmpeg.stdin.write, pcm_bytes)


   async def handle_connect(request: web.Request) -> web.Response:
       data = await request.json()
       channel = request.match_info['channel']

       pc = RTCPeerConnection()
       ffmpeg = await start_ffmpeg_hls(channel)
       sink = InterpreterTrackSink(ffmpeg, asyncio.get_event_loop())

       @pc.on('track')
       def on_track(track):
           if track.kind == 'audio':
               asyncio.ensure_future(_relay_audio(track, sink))

       offer = RTCSessionDescription(sdp=data['sdp'], type='offer')
       await pc.setRemoteDescription(offer)
       answer = await pc.createAnswer()
       await pc.setLocalDescription(answer)

       return web.json_response({'sdp': pc.localDescription.sdp})


   async def _relay_audio(track, sink: InterpreterTrackSink) -> None:
       while True:
           try:
               frame = await track.recv()
               await sink.recv(frame)
           except (ConnectionError, EOFError):
               logger.info('Audio relay ended — interpreter disconnected')
               break
           except OSError:
               logger.exception('Audio relay I/O error')
               break


   def main() -> None:
       parser = argparse.ArgumentParser()
       parser.add_argument('--port', type=int, default=8765)
       args = parser.parse_args()

       app = web.Application()
       app.router.add_post('/api/interpreter/connect/{channel}', handle_connect)

       logging.basicConfig(level=logging.INFO)
       web.run_app(app, port=args.port)


   if __name__ == '__main__':
       main()

Component 3 — Nginx HLS Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Add this ``location`` block inside your existing Nginx ``server {}`` block.
No extra Nginx modules are required.

.. code-block:: nginx

   # /etc/nginx/sites-available/eventyay  (add inside the server {} block)

   location /hls/ {
       alias /var/www/hls/;

       # Correct MIME types so browsers and hls.js recognise the files.
       types {
           application/vnd.apple.mpegurl  m3u8;
           video/mp2t                     ts;
       }

       # The manifest changes every 2 seconds — never cache it.
       location ~* \.m3u8$ {
           add_header Cache-Control "no-cache, no-store, must-revalidate";
           add_header Access-Control-Allow-Origin "*";
       }

       # Segments are immutable once written — cache briefly.
       location ~* \.ts$ {
           add_header Cache-Control "public, max-age=10";
           add_header Access-Control-Allow-Origin "*";
       }
   }

Component 4 — Viewer Sync Controller (Vue 3)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This component implements the full state machine described in Part 1 —
normal playback, pause/resume coupling, buffer stall handling, and hard
resync on seek or background-tab return.

.. code-block:: javascript

   // static/js/audio-sync-controller.js
   // Manages interpreter audio playback and synchronisation with YouTube video.
   //
   // Implements the state machine: LOADING → PLAYING ↔ PAUSED ↔ STALLED
   //
   // Usage:
   //   import { AudioSyncController } from './audio-sync-controller.js'
   //   const ctrl = new AudioSyncController(youtubePlayer, offsetSeconds)
   //   await ctrl.start('https://example.com/hls/mandarin/playlist.m3u8')
   //   ctrl.stop()

   import Hls from 'hls.js';

   const DRIFT_NUDGE_THRESHOLD = 0.3;    // seconds — start nudging playbackRate
   const DRIFT_HARD_SYNC_THRESHOLD = 2;  // seconds — jump immediately
   const SYNC_INTERVAL_MS = 500;
   const SLOW_RATE = 0.98;               // audio ahead → slow down
   const FAST_RATE = 1.02;               // audio behind → speed up

   export class AudioSyncController {
     /**
      * @param {YT.Player} ytPlayer      — YouTube IFrame player instance
      * @param {number}    offsetSeconds — pipeline latency measured at sound check
      */
     constructor(ytPlayer, offsetSeconds) {
       this.ytPlayer = ytPlayer;
       this.offset = offsetSeconds;
       this.audio = new Audio();
       this.hls = null;
       this.syncTimer = null;

       // State flags — see the state machine in Part 1.
       this.isPaused = false;
       this.isAudioStalled = false;

       // Bind event handlers so we can remove them in stop().
       this._onYtStateChange = this._onYtStateChange.bind(this);
       this._onAudioWaiting  = this._onAudioWaiting.bind(this);
       this._onAudioPlaying  = this._onAudioPlaying.bind(this);
     }

     /** Load the HLS manifest and begin playback + sync. */
     async start(manifestUrl) {
       if (!Hls.isSupported()) {
         // Safari has native HLS — use the audio element directly.
         this.audio.src = manifestUrl;
       } else {
         this.hls = new Hls();
         this.hls.loadSource(manifestUrl);
         this.hls.attachMedia(this.audio);

         this.hls.on(Hls.Events.ERROR, (_event, data) => {
           if (data.fatal) {
             this._onFatalError();
           } else {
             console.warn('[AudioSyncController] non-fatal HLS error', data.type, data.details);
           }
         });
       }

       // Listen for YouTube state changes (play, pause, buffering, seeking).
       this.ytPlayer.addEventListener('onStateChange', this._onYtStateChange);

       // Listen for audio buffer stalls and recoveries.
       this.audio.addEventListener('waiting', this._onAudioWaiting);
       this.audio.addEventListener('playing', this._onAudioPlaying);

       // Mute YouTube; we are taking over audio.
       this.ytPlayer.mute();

       await new Promise(resolve => {
         this.audio.addEventListener('canplay', resolve, { once: true });
       });

       // Resync before first play to land on the correct live position.
       this.audio.currentTime = this.ytPlayer.getCurrentTime() - this.offset;
       this.audio.play();

       // Start the 500 ms sync loop.
       this.syncTimer = setInterval(() => this._syncTick(), SYNC_INTERVAL_MS);
     }

     /** Stop playback, remove all listeners, restore YouTube audio. */
     stop() {
       clearInterval(this.syncTimer);
       this.syncTimer = null;

       this.audio.removeEventListener('waiting', this._onAudioWaiting);
       this.audio.removeEventListener('playing', this._onAudioPlaying);
       this.ytPlayer.removeEventListener('onStateChange', this._onYtStateChange);

       this.audio.pause();
       this.hls?.destroy();
       this.hls = null;

       this.isPaused = false;
       this.isAudioStalled = false;

       this.ytPlayer.unMute();
     }

     // -------------------------------------------------------------------------
     // YouTube state change handler — couples pause/play with the audio element.
     // -------------------------------------------------------------------------

     _onYtStateChange(event) {
       switch (event.data) {
         case YT.PlayerState.PAUSED:
           // Viewer (or YouTube itself) paused the video.
           // Pause audio so both timelines freeze together.
           this.isPaused = true;
           this.audio.pause();
           break;

         case YT.PlayerState.PLAYING:
           if (this.isPaused) {
             // Viewer resumed after a deliberate pause.
             // Resync to the current video position before resuming audio,
             // because the viewer may have seeked while paused, or the
             // previously buffered segment may have expired on the server.
             this.isPaused = false;
             this.audio.currentTime = this.ytPlayer.getCurrentTime() - this.offset;
             this.audio.play();
           } else {
             // PLAYING also fires after YouTube finishes buffering following a
             // seek (BUFFERING → PLAYING). Call _syncTick immediately so the
             // hard resync happens now rather than waiting up to 500 ms.
             this._syncTick();
           }
           break;

         case YT.PlayerState.BUFFERING:
           // YouTube is rebuffering (e.g. after a seek on a recording).
           // The video position will stall. The sync loop will detect the
           // resulting drift and issue a hard resync when PLAYING resumes.
           // No action needed here, but we log it for debugging.
           console.debug('[AudioSyncController] YouTube buffering');
           break;

         default:
           break;
       }
     }

     // -------------------------------------------------------------------------
     // Audio stall handler — audio buffer ran dry while video was playing.
     // -------------------------------------------------------------------------

     _onAudioWaiting() {
       if (!this.isPaused) {
         this.isAudioStalled = true;
         // Pause the video so it does not race ahead while we wait for
         // the next segment to download.
         this.ytPlayer.pauseVideo();
         console.debug('[AudioSyncController] audio stalled — pausing YouTube');
       }
     }

     _onAudioPlaying() {
       if (this.isAudioStalled) {
         this.isAudioStalled = false;
         // Resume the video and immediately resync rather than waiting for
         // the next 500 ms tick.
         this.ytPlayer.playVideo();
         this._syncTick();
         console.debug('[AudioSyncController] audio recovered — resuming YouTube');
       }
     }

     // -------------------------------------------------------------------------
     // 500 ms sync loop — corrects position drift between audio and video.
     // -------------------------------------------------------------------------

     _syncTick() {
       // Do not adjust while paused or stalled — positions are frozen.
       if (this.isPaused || this.isAudioStalled) {
         return;
       }

       const videoPos       = this.ytPlayer.getCurrentTime();  // seconds
       const audioPos       = this.audio.currentTime;          // seconds
       const idealAudioPos  = videoPos - this.offset;
       const drift          = audioPos - idealAudioPos;

       if (Math.abs(drift) >= DRIFT_HARD_SYNC_THRESHOLD) {
         // Large drift (seek, background tab, long stall) — jump immediately.
         console.debug(`[AudioSyncController] hard resync drift=${drift.toFixed(2)}s`);
         this.audio.currentTime = idealAudioPos;
         this.audio.playbackRate = 1.0;
       } else if (drift > DRIFT_NUDGE_THRESHOLD) {
         // Audio is slightly ahead — slow it down to let video catch up.
         this.audio.playbackRate = SLOW_RATE;
       } else if (drift < -DRIFT_NUDGE_THRESHOLD) {
         // Audio is slightly behind — speed it up to catch the video.
         this.audio.playbackRate = FAST_RATE;
       } else {
         // Within tolerance — restore normal rate.
         this.audio.playbackRate = 1.0;
       }
     }

     /** Called when hls.js reports an unrecoverable error. */
     _onFatalError() {
       this.stop();
       // Dispatch a custom event so the Vue component can show a fallback UI.
       this.audio.dispatchEvent(new CustomEvent('interpretation-unavailable'));
     }
   }

Component 5 — Vue 3 Language Selector Component
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A minimal Vue 3 component that wires the language selector UI to the sync
controller above.

.. code-block:: html

   <!-- templates/eventyay/video/language-selector.html -->
   <!-- Included inside stage.vue template via <language-selector> tag. -->

   <div id="language-selector-app">
     <language-selector
       :youtube-player="ytPlayer"
       :channels="channels"
     />
   </div>

.. code-block:: javascript

   // static/js/language-selector.js
   // Vue 3 component for interpreter language selection.

   import { createApp, ref, onUnmounted } from 'vue';
   import { AudioSyncController } from './audio-sync-controller.js';

   const LanguageSelector = {
     props: {
       youtubePlayer: { type: Object, required: true },
       // channels: [{ label: 'Mandarin', url: '/hls/mandarin/playlist.m3u8',
       //              offsetSeconds: 8 }, ...]
       channels: { type: Array, required: true },
     },

     setup(props) {
       const active = ref(null);   // currently selected channel label or null
       let ctrl = null;

       const errorMessage = ref(null);

       async function select(channel) {
         errorMessage.value = null;
         // Stop the previous channel if any.
         if (ctrl) {
           ctrl.stop();
           ctrl = null;
         }

         if (channel === null) {
           // "Original audio" selected — nothing more to do, stop() already
           // restored YouTube audio above.
           active.value = null;
           return;
         }

         active.value = channel.label;
         ctrl = new AudioSyncController(props.youtubePlayer, channel.offsetSeconds);

         ctrl.audio.addEventListener('interpretation-unavailable', () => {
           active.value = null;
           errorMessage.value = `Interpretation (${channel.label}) is temporarily unavailable.`;
         });

         await ctrl.start(channel.url);
       }

       onUnmounted(() => ctrl?.stop());

       return { active, errorMessage, select };
     },

     template: `
       <div class="language-selector">
         <p v-if="errorMessage" class="language-selector__error" role="alert">
           {{ errorMessage }}
         </p>
         <button
           :class="{ active: active === null }"
           @click="select(null)"
         >Original</button>
         <button
           v-for="ch in channels"
           :key="ch.label"
           :class="{ active: active === ch.label }"
           @click="select(ch)"
         >{{ ch.label }}</button>
       </div>
     `,
   };

   // Bootstrap: read channel config from the json_script element (see Component 7).
   const mountEl = document.getElementById('language-selector-app');
   if (mountEl) {
     const dataEl = document.getElementById('interpreter-channels-data');
     const channels = dataEl ? JSON.parse(dataEl.textContent) : [];
     const ytPlayerRef = { value: null };

     // Wait for the YouTube IFrame API to fire onYouTubeIframeAPIReady.
     window.onYouTubeIframeAPIReady = () => {
       ytPlayerRef.value = new YT.Player('yt-player', {
         events: { onReady: () => {
           createApp(LanguageSelector, {
             youtubePlayer: ytPlayerRef.value,
             channels,
           }).mount(mountEl);
         }},
       });
     };
   }

Component 6 — Django Model: Storing Channel Config
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The channel list (URL, offset, label) is stored in the ``StreamSchedule``
model's ``config`` JSON field, which already exists in the codebase.

.. code-block:: python

   # app/eventyay/video/models.py  (existing model, add a helper method)
   from typing import TypedDict


   class InterpreterChannel(TypedDict):
       label: str          # shown to the viewer, e.g. "Mandarin"
       hls_url: str        # full URL to playlist.m3u8
       offset_seconds: float  # pipeline latency measured during sound check


   # Add to the existing StreamSchedule model:
   class StreamSchedule(models.Model):
       # ... existing fields ...
       config = models.JSONField(default=dict)

       def get_interpreter_channels(self) -> list[InterpreterChannel]:
           """Return interpreter channel config, empty list if not configured."""
           return self.config.get('interpreter_channels', [])

       def set_interpreter_channels(self, channels: list[InterpreterChannel]) -> None:
           self.config['interpreter_channels'] = channels
           self.save(update_fields=['config'])

The ``config`` JSON structure looks like this:

.. code-block:: json

   {
     "interpreter_channels": [
       {
         "label": "Mandarin",
         "hls_url": "https://stream.example.com/hls/mandarin/playlist.m3u8",
         "offset_seconds": 8.0
       },
       {
         "label": "French",
         "hls_url": "https://stream.example.com/hls/french/playlist.m3u8",
         "offset_seconds": 7.5
       }
     ]
   }

Component 7 — Django View: Injecting Config into the Page
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The channel config must reach the browser. Use Django's ``json_script``
template tag, which renders the data inside a ``<script type="application/json">``
element with all values properly escaped — safe against XSS even if
interpreter labels contain quotes or angle brackets. No inline ``<script>``
execution happens, so CSP is not violated.

.. code-block:: python

   # app/eventyay/video/views.py  (relevant snippet)
   from django.views.generic import DetailView
   from eventyay.video.models import StreamSchedule


   class StageView(DetailView):
       model = StreamSchedule
       template_name = 'eventyay/video/stage.html'

       def get_context_data(self, **kwargs):
           ctx = super().get_context_data(**kwargs)
           ctx['interpreter_channels'] = self.object.get_interpreter_channels()
           return ctx

.. code-block:: html

   {# In templates/eventyay/video/stage.html #}
   {# json_script escapes the data and places it in a <script type="application/json"> tag. #}
   {{ interpreter_channels|json_script:'interpreter-channels-data' }}
   <div id='language-selector-app'></div>

And update the bootstrap block in ``language-selector.js`` to read from the
``json_script`` output element instead of a ``data-`` attribute:

.. code-block:: javascript

   // static/js/language-selector.js  — bootstrap section
   const mountEl = document.getElementById('language-selector-app');
   if (mountEl) {
     const dataEl = document.getElementById('interpreter-channels-data');
     const channels = dataEl ? JSON.parse(dataEl.textContent) : [];

----

Part 3 — Deployment Steps
--------------------------

1. **Install FFmpeg** on the eventyay server::

       sudo apt install ffmpeg

2. **Install aiortc** (server-side WebRTC library)::

       cd app && uv add aiortc

3. **Configure Nginx** — paste the ``location /hls/`` block from Component 3
   into your server config and reload::

       sudo nginx -t && sudo systemctl reload nginx

4. **Start the ingest service** before the event. For a single event you can
   start it manually; for production wrap it in a systemd unit::

       python -m eventyay.video.ingest --port 8765

5. **Run sound check** — have the interpreter connect 10 minutes early.
   Open the offset calibration page and adjust ``offset_seconds`` until the
   audio aligns with the video. Save the value.

6. **Go live** — the interpreter connects through their portal page, FFmpeg
   starts writing segments, Nginx serves them, and viewers can select the
   language.

----

Part 4 — Scale Limits and When to Upgrade
-------------------------------------------

This single-server setup is appropriate for:

- Up to **500 concurrent viewers** per language channel.
- Up to **4 language channels** on one server before you need a second FFmpeg
  process per channel.
- Events lasting up to **8 hours** (segment files auto-delete thanks to
  ``hls_flags delete_segments``).

If you grow beyond 500 viewers or need geographic redundancy, the natural next
step is to put a CDN (CloudFront, Cloudflare, or BunnyCDN) in front of the
Nginx ``/hls/`` endpoint. The viewer code and FFmpeg pipeline do not change at
all — only Nginx gets a CDN origin configuration.

----

Security Summary
-----------------

- The interpreter portal page should be behind an eventyay login (or a
  signed token URL) so only authorised interpreters can push audio.
- The Nginx ``/hls/`` endpoint is read-only public — viewers download
  segments, they cannot upload anything.
- ``Access-Control-Allow-Origin: *`` on HLS files is intentional — it allows
  ``hls.js`` running on any origin to fetch segments (the segments contain no
  secrets).
- The WebRTC signalling endpoint (``/api/interpreter/connect``) must be
  rate-limited (e.g., one active connection per authenticated user) to prevent
  resource exhaustion.
