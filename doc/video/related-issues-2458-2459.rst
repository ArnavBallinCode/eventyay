Related Features — Browser Interpreter Ingest and Sync Management
==================================================================

.. contents:: Table of Contents
   :depth: 3
   :local:

This document explains two features that are closely related to the Hybrid
YouTube Multi-Audio Player. Both features depend on the hybrid player being
implemented first — they extend or refine parts of the hybrid player system.

For background on how streaming works and the terminology used here, see
:doc:`streaming-fundamentals`. For the main hybrid player design, see
:doc:`hybrid-multi-audio-player`.


Feature: Browser-Based Interpreter Ingest Pipeline
----------------------------------------------------

What This Feature Is About (Plain English)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The hybrid player feature (the hybrid player) assumes that interpreter audio is already
available as an HLS stream URL. But where does that HLS stream actually come
from? Someone has to capture the interpreter's voice, encode it, convert it to
HLS, and serve it via a CDN.

The interpreter ingest feature answers this question for the simplest and most accessible scenario:
**the interpreter joins from their web browser** — no special software, no OBS,
no hardware encoder. They open a web page (the "Interpreter Portal"), grant
microphone permission, and start speaking. Their voice travels from their
browser to a server, gets converted into an HLS audio stream, and is delivered
to viewers via the hybrid player.

This is the lowest-barrier approach. A volunteer interpreter at a community
conference just needs a laptop, a microphone (or headset), and a web browser.

Why This Matters
~~~~~~~~~~~~~~~~~~

Without this feature, setting up interpreter audio requires technical expertise:
the interpreter (or a technician) must configure OBS or a hardware encoder,
set up an RTMP connection to an ingest server, and ensure the audio encoding
settings are correct. This is reasonable for large professional events but is
too complex for community-driven conferences where interpreters are volunteers.

The interpreter ingest feature makes interpretation accessible to any event, regardless of
technical resources.

The Core Problem — Echo and Audio Leakage
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This is the single hardest challenge in the entire interpreter pipeline.

Here is the situation: the interpreter needs to **hear the original speaker**
(to know what to translate) while **speaking the translation** into their
microphone. These two things happen simultaneously.

If the interpreter uses laptop speakers to listen to the speaker, their
microphone picks up **both**:

- Their own voice (the translation) — **this is what we want**.
- The speaker's audio coming from the speakers — **this is what we do NOT
  want**.

The result: viewers on the interpreter's channel hear a garbled mix of the
translation and the original speaker. This is called **echo** or **audio
leakage**, and it completely destroys the interpretation quality.

How the Interpreter Should Monitor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The issue defines three monitoring setups, from best to worst:

**Best: Headphones + separate device**

The interpreter monitors the original session on a separate device (phone or
second laptop) wearing closed-back headphones. Their main device runs the
Interpreter Portal and captures only their voice. There is zero leakage because
the speaker's audio never plays through the main device's speakers.

**Acceptable: Headphones on the same device**

The interpreter monitors the session and speaks on the same device but uses
headphones. Headphones contain the audio near the ears, so very little leaks to
the microphone. Browser echo cancellation handles the tiny residual leakage.

**Not recommended: Speakers**

Laptop speakers with the laptop's built-in microphone. Audio leakage is
severe. Browser echo cancellation helps but cannot fully fix it.

How the Interpreter Portal Works — End-to-End
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Step 1: Organizer generates an interpreter access link**

The organizer creates a special URL for each interpreter — for example:
``https://eventyay.com/interpret/{session_id}/{language}/token/{secret_token}``.
This link is private and tokenized to prevent unauthorized access.

**Step 2: Interpreter opens the link in their browser**

The Interpreter Portal page loads. Before anything else, a **pre-flight
checklist** modal appears:

- ☐ "I am using headphones" (checkbox — required).
- ☐ "I am monitoring the session on a separate device or via headphones"
  (checkbox — required).
- A **microphone selector** dropdown to choose the correct input device.
- A **live input level meter** — a visual bar that moves in real time,
  showing how loud the microphone signal is. The interpreter speaks a test
  sentence and confirms the meter responds.
- Optionally: a "Test recording" button that records 5 seconds of audio and
  plays it back so the interpreter can verify their setup.

If the interpreter does not check the headphones box, a warning banner
appears: "Monitoring via speakers can cause audio leakage. Proceed anyway?"
They must explicitly confirm.

**Step 3: Audio capture begins**

When the interpreter clicks "Start Broadcast", the browser requests microphone
access using ``getUserMedia`` — a browser API for accessing the microphone (and
camera, but this pipeline only uses audio).

The browser captures the microphone audio with these constraints:

- ``echoCancellation: true`` — the browser's built-in echo cancellation
  algorithm tries to remove any audio that is playing through the device's
  speakers from the microphone signal.
- ``noiseSuppression: true`` — reduces background noise (fans, typing, etc.).
- ``autoGainControl: true`` — automatically adjusts volume so quiet speech
  is amplified and loud speech is reduced.

Crucially, the portal captures **only the microphone**. It does not capture
system audio, browser tab audio, or any other sound source. The interpreter's
outgoing audio contains only their voice.

**Step 4: Audio is sent to the server via WebRTC**

The browser establishes a **WebRTC** connection to the media server. WebRTC is
a browser technology for real-time audio/video communication — the same
technology used for video calls. It is low-latency (under 1 second) and
handles network fluctuations gracefully.

The audio is encoded using the **Opus** codec (WebRTC's native audio codec)
and sent to the media server.

**Step 5: Server converts to HLS**

The media server receives the WebRTC Opus audio and:

1. Decodes it from Opus.
2. Re-encodes it as **AAC-LC** at 48 kHz, 96–128 kbps (the format required by
   HLS).
3. Segments it into 2-second HLS chunks.
4. Writes the segments and updates the HLS manifest (``.m3u8`` file).

**Step 6: CDN distributes the HLS stream**

The segments and manifest are served through a CDN. CORS headers are set to
allow the eventyay domain to fetch them.

**Step 7: Viewers hear the interpreter via the hybrid player**

The viewer selects the interpreter's language in the hybrid player (issue
the hybrid player). The player loads the HLS stream URL, syncs it to the YouTube video,
and the viewer hears the translation.

The Latency Budget
~~~~~~~~~~~~~~~~~~~~

Let us trace the total delay from when the speaker says a word to when the
viewer hears the interpreter's translation of that word:

1. **Speaker says "Good morning"** — T=0.

2. **Interpreter hears it** — The interpreter is monitoring the session via a
   real-time channel (e.g., Google Meet or a direct audio feed). Delay:
   ~500 ms to 2000 ms, depending on the monitoring method.

3. **Interpreter processes and speaks "Bonjour"** — The human brain needs time
   to hear, understand, and translate. Delay: ~1000 ms to 2000 ms.

4. **Browser captures the interpreter's voice** — Essentially instant.

5. **WebRTC transmits to the server** — Delay: ~100 ms to 300 ms (WebRTC is
   very low latency).

6. **Server encodes and segments into HLS** — The segmenter must wait until a
   full 2-second segment is complete before writing it. Average delay: ~1000 ms
   (half a segment, since the word could arrive at any point within a segment).

7. **CDN distributes** — Delay: ~200 ms to 500 ms.

8. **Viewer's browser downloads and plays** — The player needs to download at
   least one segment before it can start playing. Delay: ~2000 ms.

**Total: approximately 5 to 8 seconds** from when the interpreter says
"Bonjour" to when the viewer hears it. Plus the 1.5 to 4 seconds from when the
speaker said "Good morning" to when the interpreter spoke.

Meanwhile, the YouTube video of the speaker saying "Good morning" arrives with
its own delay (typically 6 to 10 seconds behind real-time).

This is why **offset calibration** (from the hybrid player feature) is essential — the
organizer must measure the actual delays for each language and configure the
offset so the interpreter's words match the video.

Server-Side Safety Checks
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The media server can perform lightweight checks on the incoming audio to detect
problems:

- **Voice Activity Detection (VAD)**: Is the interpreter actually speaking? If
  the microphone is picking up continuous background speech (the original
  speaker leaking through), VAD can flag this to the organizer.
- **Peak limiter and level normalization**: Prevents audio from being too loud
  or too quiet.
- **Connection health monitoring**: Tracks packet loss, jitter, and bitrate.
  Alerts the organizer panel if the interpreter's connection is unstable.

Failure and Recovery
~~~~~~~~~~~~~~~~~~~~~~

- If the interpreter's browser tab crashes or their internet drops, the WebRTC
  connection closes. The HLS stream stops producing segments.
- The hybrid player (the hybrid player feature) detects the stall and falls back to original
  YouTube audio within 5 seconds.
- The interpreter can reconnect by reloading the portal page and clicking
  "Start Broadcast" again.
- WebRTC has built-in auto-reconnect capabilities that can handle brief network
  hiccups without the interpreter doing anything.

Security
~~~~~~~~~~

- Interpreter access links are tokenized — each link contains a secret token
  that expires.
- Only one interpreter connection per language per session is allowed at a time
  (prevents unauthorized joining).
- Ingest server endpoints are protected from abuse (rate limiting, token
  validation).
- IP restrictions can optionally be applied for extra security.


Feature: Synchronization and Latency Management
--------------------------------------------------

What This Feature Is About (Plain English)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The hybrid player feature describes the overall hybrid player system. The sync management feature dives deep
into one specific (and the hardest) part: **how to keep the interpreter audio
synchronized with the YouTube video** despite both streams having different and
changing latencies.

While the hybrid player describes the sync controller at a high level (measure drift,
correct it), sync management specifies the exact algorithms, thresholds, edge cases, and
configuration options needed to make synchronization work reliably in
production.

The Three Problems This Feature Solves
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Problem 1: Startup alignment**

When the viewer first selects an interpreter language, the YouTube video is
already playing at some position (e.g., 5 minutes and 32 seconds into the
stream). The interpreter audio stream starts loading from its live edge (the
most recent segment). These two starting positions are different — YouTube might
be at T+332s while the HLS audio starts at its live edge which corresponds to
a different real-world moment.

Simply starting both and hoping they align does not work. The audio typically
lags behind by 5–10 seconds relative to the YouTube playback position.

**Problem 2: Ongoing drift**

Even after initial alignment, the two streams gradually drift apart. This
happens because:

- YouTube's adaptive streaming might add extra buffering (slowing down
  playback slightly).
- The HLS audio segments arrive at slightly irregular intervals.
- The browser's audio clock and the YouTube player's internal clock run at
  microscopically different speeds (clock skew).
- Network congestion causes one stream to stutter while the other continues.

Over a 45-minute talk, uncorrected drift can accumulate to several seconds.

**Problem 3: Seeking**

If the YouTube stream supports DVR (the ability to scrub backward to earlier
points in the stream), the viewer might seek to a different position. The
interpreter audio must follow. But not all audio sources are seekable:

- **HLS audio**: seekable within the available live window (last 30–60 seconds)
  and fully seekable for VOD (recorded) content.
- **Icecast/continuous streams**: not seekable at all. If the viewer seeks the
  video, the audio cannot follow.

The Proposed Solutions
~~~~~~~~~~~~~~~~~~~~~~~

**Solution 1: Artificial Video Delay (for startup alignment)**

Instead of trying to make the audio catch up to the video, briefly **pause the
video** at startup to let the audio load and align.

How it works:

1. The viewer selects an interpreter language.
2. The YouTube video pauses (programmatically).
3. A "Preparing interpretation..." indicator appears.
4. The system captures YouTube's current time and starts loading the HLS audio.
5. After a configurable delay (e.g., 5–10 seconds), the audio has loaded and
   buffered.
6. The system seeks the audio to the correct position (YouTube time + offset).
7. The YouTube video resumes.
8. Both start playing from the same aligned position.

The delay is configurable per session because different setups have different
latencies. The organizer sets a default during rehearsal.

This approach is only used when interpreter audio is first selected — not for
regular viewing with original audio.

**Solution 2: Dynamic Drift Correction (for ongoing drift)**

A correction loop runs continuously (every 500 ms) and applies one of two
strategies depending on how large the drift is:

**Small drift (under 300 ms): playbackRate micro-adjustment**

Instead of jumping the audio to the correct position (which causes an audible
glitch), the system slightly changes the playback speed:

- Audio is 200 ms ahead → slow it down to ``playbackRate = 0.98`` (2% slower).
- Audio is 150 ms behind → speed it up to ``playbackRate = 1.02`` (2% faster).

A 2% speed change is imperceptible for speech. Over a few seconds, it brings
the audio back in sync without any audible artifact.

The formula used::

  rate = 1.0 - (drift_seconds × 0.05)
  rate = clamp(rate, 0.95, 1.05)

This means:

- 100 ms drift → rate = 0.995 (barely noticeable).
- 300 ms drift → rate = 0.985 (still imperceptible).
- More aggressive correction for larger drift, capped at ±5%.

**Large drift (500 ms or more): hard resync**

If drift exceeds 500 ms, gentle correction would take too long. The system
performs a hard resync:

1. Seek the ``<audio>`` element's ``currentTime`` to the target position
   (YouTube time + offset).
2. Reset ``playbackRate`` to 1.0.

This causes a brief audio glitch (a fraction-of-a-second skip), but
immediately corrects large drift. It is the "last resort" when smooth
correction cannot keep up.

**Solution 3: Seek management (for DVR/seeking)**

When the viewer seeks the YouTube video:

- The sync controller detects the time jump (YouTube's time changed by more
  than 500 ms since the last check).
- If the audio source is HLS (seekable): seek the audio to the new target
  position. Resume drift correction.
- If the audio source is Icecast or another non-seekable protocol: disable the
  seek bar in the UI when interpreter audio is active, or show a message:
  "Seeking is not available with this audio channel." This prevents a broken
  state where the video jumps but the audio cannot follow.

Configuration
~~~~~~~~~~~~~~~

This issue introduces configuration options that the organizer sets per session:

- ``initialization_delay_seconds``: how long to pause the video at startup for
  interpreter audio alignment. Default: 5–10 seconds.
- ``enable_dvr_seek``: whether seeking is allowed (mirrors YouTube's DVR
  setting).
- ``audio_source_type`` per language:

  - ``hls_seekable``: the audio source is HLS and supports seeking.
  - ``non_seekable``: the audio source is a continuous stream (Icecast-style)
    and does not support seeking.

- Drift correction thresholds (can be tuned but have sensible defaults):

  - Micro-adjust zone: < 300 ms.
  - Hard resync zone: ≥ 500 ms.
  - playbackRate bounds: 0.95 to 1.05.

Practical Scenario Walkthrough
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Startup alignment scenario:**

1. Viewer opens a session. YouTube is playing at T=332s.
2. Viewer clicks "French" in the language selector.
3. YouTube pauses. Viewer sees "Preparing French interpretation..."
4. The system loads the French HLS audio manifest, downloads the first segment.
5. After 7 seconds (the configured delay), the audio has loaded.
6. The system seeks the audio to T=332s + 2.5s (French offset) = T=334.5s.
7. YouTube resumes from T=332s. Audio plays from T=334.5s.
8. Both are now aligned. The viewer hears the French interpreter's translation
   matching the video.

**Ongoing drift scenario:**

1. After 10 minutes of viewing, the sync loop detects drift = +180 ms (audio
   is 180 ms ahead).
2. It sets ``playbackRate = 1.0 - (0.18 × 0.05) = 0.991`` (0.9% slower).
3. Over the next few seconds, the audio slows down and drift reduces to 50 ms.
4. The loop sets ``playbackRate = 1.0`` (back to normal).
5. Viewer never noticed anything.

**Large drift after YouTube buffering scenario:**

1. YouTube encounters network congestion and buffers for 3 seconds.
2. The sync controller detects ``YT.PlayerState.BUFFERING`` and pauses the
   interpreter audio.
3. YouTube resumes playing. The sync controller detects ``PLAYING``.
4. It measures: YouTube is at T=500s, audio is at T=497s (3 seconds behind
   due to the buffering pause).
5. Drift = 3 seconds → exceeds 500 ms threshold → hard resync.
6. The audio seeks to T=500s + offset. Brief audio skip, then perfect sync.

**Seek scenario:**

1. The stream has DVR enabled. Viewer drags the progress bar back 2 minutes.
2. YouTube seeks to T=200s.
3. The sync controller detects the jump (previous time was T=320s, now T=200s).
4. Audio source is HLS (seekable) → seek audio to T=200s + offset.
5. Audio and video are aligned at the new position.


How These Features Depend on the Hybrid Player
------------------------------------------------

The hybrid player is the **parent feature** — the "epic" that
defines the overall system. The interpreter ingest and sync management are
sub-features that must be solved for the full system to work:

- **The hybrid player** defines the architecture, admin UI, viewer UI, and
  overall system design. It is the "what" and "where."
- **The interpreter ingest** solves the "where does interpreter audio come
  from?" question for the browser-based scenario. Without it, organizers must
  set up OBS/RTMP manually — which works but is complex.
- **Sync management** solves the "how do we keep audio and video in sync?"
  question with production-quality algorithms. Without it, the sync controller
  described in the hybrid player is a high-level sketch; sync management
  provides the precise thresholds, initialization delay technique, and seeking
  rules.

**Dependency order**:

1. **First**: Implement the hybrid player core — YouTube + external HLS
   audio, basic sync, language selector, admin UI.
2. **Then**: Implement sync management — production-grade sync: initialization
   delay, playbackRate smoothing, seek management. This refines the sync
   controller from the hybrid player.
3. **Then**: Implement the interpreter ingest — browser-based interpreter
   portal. This provides a user-friendly way to produce the HLS audio streams
   that the hybrid player consumes.

The interpreter ingest and sync management can be developed in parallel since
they address different parts of the system (audio ingest vs. playback
synchronization), but both require the foundation from the hybrid player.


Summary
--------

- **Hybrid Player**: The main system — YouTube video + external interpreter
  audio, language selector, admin configuration.
- **Interpreter Ingest**: A browser-based portal where interpreters join via
  their browser, speak into their microphone, and their audio is captured via
  WebRTC, converted to HLS, and delivered via CDN. Key challenge: preventing
  echo/leakage from the interpreter's monitoring of the original session.
- **Sync Management**: Production-grade synchronization — startup alignment via
  artificial video delay, ongoing drift correction via playbackRate
  micro-adjustments, hard resync for large drift, and seek management for
  DVR-enabled streams.

Together, these three features deliver a complete end-to-end system for
multilingual live interpretation at scale.
