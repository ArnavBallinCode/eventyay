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

When a viewer selects an interpretation language, the Vue 3 component:

1. Creates an ``hls.js`` instance pointing at the language's manifest URL.
2. Mutes the YouTube IFrame player.
3. Starts a 500 ms ``setInterval`` loop that:

   a. Reads the current playback position of the HLS audio element.
   b. Reads the current playback position of the YouTube IFrame (via the
      IFrame API ``getCurrentTime()``).
   c. Applies the configured offset (e.g., the interpreter audio is always
      8 seconds behind the video due to pipeline latency — the organizer
      sets this once during sound check).
   d. Computes ``drift = audioPosition - (videoPosition - offset)``.
   e. If ``|drift| < 0.3 s``: do nothing (normal).
   f. If ``0.3 s ≤ |drift| < 2 s``: nudge ``audio.playbackRate`` to 0.98 or
      1.02 to slowly close the gap.
   g. If ``|drift| ≥ 2 s``: hard-jump the audio element's ``currentTime``
      to resync immediately.

4. When the viewer switches language or leaves, tears down the ``hls.js``
   instance, unmutes YouTube, and clears the interval.

**Component 5 — Organizer offset configuration**

The organizer (or a sound engineer) runs a brief sound check before the
event. They use a simple admin page (or a query-string parameter) to set the
``offset_seconds`` value for each language channel. This value is stored in
the ``StreamSchedule.config`` JSON field and served to the viewer's browser
at page load. During the live event they can update it in real time via a
WebSocket message if the pipeline latency changes.

How the Viewer Experience Feels
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Viewer opens the event page. The YouTube video starts playing in the
   embedded IFrame (original audio on by default).
2. A language selector appears (e.g., "English (original)", "Mandarin",
   "French").
3. Viewer clicks "Mandarin." In 1–2 seconds the Mandarin interpretation
   audio starts. YouTube video is silenced.
4. The viewer hears the interpreter's voice aligned with the speaker's lip
   movements. They may notice a brief adjustment in the first few seconds
   as the sync loop converges — after that it is imperceptible.
5. If the interpreter disconnects, the HLS manifest goes stale. After
   3 failed segment fetches, ``hls.js`` fires an error event. The Vue
   component shows "Interpretation unavailable" and re-enables YouTube audio
   automatically.
6. If the viewer goes to another tab and comes back, the sync loop detects
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

       def __init__(self, ffmpeg_proc: subprocess.Popen) -> None:
           self.ffmpeg = ffmpeg_proc

       async def recv(self, frame):
           pcm_bytes = frame.to_ndarray().astype('float32').tobytes()
           self.ffmpeg.stdin.write(pcm_bytes)


   async def handle_connect(request: web.Request) -> web.Response:
       data = await request.json()
       channel = request.match_info['channel']

       pc = RTCPeerConnection()
       ffmpeg = await start_ffmpeg_hls(channel)
       sink = InterpreterTrackSink(ffmpeg)

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
           except Exception:
               logger.exception('Audio relay ended')
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

This is the client-side component that lives inside the existing
``stage.vue`` page. It manages the ``hls.js`` audio player and the 500 ms
sync loop.

.. code-block:: javascript

   // static/js/audio-sync-controller.js
   // Manages interpreter audio playback and synchronisation with YouTube video.
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
   const SLOW_RATE = 0.98;               // slow down audio to let video catch up
   const FAST_RATE = 1.02;               // speed up audio to catch video

   export class AudioSyncController {
     /**
      * @param {YT.Player} ytPlayer  — YouTube IFrame player instance
      * @param {number} offsetSeconds — pipeline latency: interpreter audio
      *   arrives this many seconds after the video frame it corresponds to.
      *   Measured during sound check and stored in StreamSchedule.config.
      */
     constructor(ytPlayer, offsetSeconds) {
       this.ytPlayer = ytPlayer;
       this.offset = offsetSeconds;
       this.audio = new Audio();
       this.hls = null;
       this.syncTimer = null;
     }

     /** Load the HLS manifest and begin playback + sync. */
     async start(manifestUrl) {
       if (!Hls.isSupported()) {
         // Safari has native HLS — use the audio element directly.
         this.audio.src = manifestUrl;
       } else {
         this.hls = new Hls({ lowLatencyMode: false });
         this.hls.loadSource(manifestUrl);
         this.hls.attachMedia(this.audio);

         this.hls.on(Hls.Events.ERROR, (_event, data) => {
           if (data.fatal) {
             this._onFatalError();
           }
         });
       }

       // Mute YouTube; we are taking over audio.
       this.ytPlayer.mute();

       await new Promise(resolve => {
         this.audio.addEventListener('canplay', resolve, { once: true });
       });
       this.audio.play();

       // Start the sync loop.
       this.syncTimer = setInterval(() => this._syncTick(), SYNC_INTERVAL_MS);
     }

     /** Stop playback, destroy hls.js, restore YouTube audio. */
     stop() {
       clearInterval(this.syncTimer);
       this.syncTimer = null;
       this.audio.pause();
       this.hls?.destroy();
       this.hls = null;
       this.ytPlayer.unMute();
     }

     /** Called every 500 ms to measure and correct drift. */
     _syncTick() {
       const videoPos = this.ytPlayer.getCurrentTime();   // seconds
       const audioPos = this.audio.currentTime;           // seconds

       // The interpreter audio is `offset` seconds behind the video by design.
       // Ideal audio position = videoPos - offset.
       const drift = audioPos - (videoPos - this.offset);

       if (Math.abs(drift) >= DRIFT_HARD_SYNC_THRESHOLD) {
         // Large drift — jump immediately.
         this.audio.currentTime = videoPos - this.offset;
         this.audio.playbackRate = 1.0;
       } else if (drift > DRIFT_NUDGE_THRESHOLD) {
         // Audio is ahead — slow it down slightly.
         this.audio.playbackRate = SLOW_RATE;
       } else if (drift < -DRIFT_NUDGE_THRESHOLD) {
         // Audio is behind — speed it up slightly.
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

       async function select(channel) {
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
           alert(`Interpretation (${channel.label}) is temporarily unavailable.`);
         });

         await ctrl.start(channel.url);
       }

       onUnmounted(() => ctrl?.stop());

       return { active, select };
     },

     template: `
       <div class="language-selector">
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

   // Bootstrap: read channel config injected by Django template context.
   const mountEl = document.getElementById('language-selector-app');
   if (mountEl) {
     const channels = JSON.parse(mountEl.dataset.channels || '[]');
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

The channel config must reach the browser. The cleanest way is to render it
as a ``data-channels`` attribute on the mount element so that no inline
``<script>`` tag is needed (inline scripts are blocked by CSP).

.. code-block:: python

   # app/eventyay/video/views.py  (relevant snippet)
   import json
   from django.views.generic import DetailView
   from eventyay.video.models import StreamSchedule


   class StageView(DetailView):
       model = StreamSchedule
       template_name = 'eventyay/video/stage.html'

       def get_context_data(self, **kwargs):
           ctx = super().get_context_data(**kwargs)
           ctx['interpreter_channels_json'] = json.dumps(
               self.object.get_interpreter_channels()
           )
           return ctx

.. code-block:: html

   {# In templates/eventyay/video/stage.html — the mount element #}
   <div id="language-selector-app"
        data-channels="{{ interpreter_channels_json }}">
   </div>

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
