Streaming Fundamentals — How Video and Audio Work in eventyay
=============================================================

.. contents:: Table of Contents
   :depth: 3
   :local:

This document explains, from scratch, how video and audio streaming works in
eventyay **without any interpretation or multi-audio features**. It is meant
as background reading before diving into the hybrid multi-audio player design
(see :doc:`hybrid-multi-audio-player`).

Every technical term used in the design documents is defined here in plain
English.


How a Normal Conference Talk Gets Streamed
-------------------------------------------

Imagine a speaker is giving a talk at a conference. Hundreds or thousands of
people want to watch remotely. Here is exactly what happens, step by step.

Step 1: Capturing the Speaker
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The speaker stands on stage in front of a **camera** and speaks into a
**microphone**.

- The **camera** captures the visual image of the speaker — their face, slides,
  gestures — as a continuous stream of video frames (typically 30 or 60 frames
  per second).
- The **microphone** captures the sound of the speaker's voice as a continuous
  stream of audio samples (typically 48,000 samples per second).

At this point the data is **raw** — uncompressed and enormous. One second of
raw HD video is roughly 150 MB. You cannot send that over the internet.

Step 2: The Video Mixer
~~~~~~~~~~~~~~~~~~~~~~~~~

A **video mixer** (also called a **vision mixer** or **video switcher**) is a
device or software that combines multiple video sources into one output. At a
conference, the mixer might switch between:

- Camera 1: the speaker's face.
- Camera 2: a wide shot of the stage.
- Screen capture: the speaker's slides.

The mixer produces a single combined video output — for example, a
picture-in-picture view with slides filling the screen and the speaker in a
small corner.

**In simple setups**, there may be no mixer at all — just one camera going
directly to the encoder.

Step 3: The Audio Mixer
~~~~~~~~~~~~~~~~~~~~~~~~~

An **audio mixer** (also called a **sound board** or **mixing console**)
combines multiple audio sources into one output. At a conference, it might mix:

- The speaker's microphone (primary source).
- A backup microphone.
- Background music (before/after the talk).

The mixer adjusts volume levels, applies equalization, and produces a single
audio output that feeds into the encoder alongside the video.

**In simple setups**, the camera's built-in microphone may provide the audio
directly.

Step 4: Encoding (Compression)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The raw video and audio from the mixers are too large to send over the internet.
An **encoder** compresses them.

**What encoding does**: It analyzes the video frames and audio samples, removes
redundant information, and produces a much smaller data stream. For example:

- Raw HD video: ~150 MB/second.
- Encoded HD video (H.264): ~0.5–5 MB/second.
- Raw audio: ~0.3 MB/second.
- Encoded audio (AAC): ~0.012–0.016 MB/second.

**Common video codecs** (compression algorithms):

- **H.264** (also called AVC): The most widely used video codec on the
  internet. Supported by every browser, phone, and streaming service.
- **H.265** (also called HEVC): Newer, more efficient, but less widely
  supported.
- **VP9**: Google's codec, used by YouTube internally.
- **AV1**: Newest and most efficient; adoption is growing.

**Common audio codecs**:

- **AAC** (Advanced Audio Coding): The standard audio codec for web streaming.
  Specifically **AAC-LC** (Low Complexity), which is the most compatible
  variant.
- **Opus**: Used in real-time communication (WebRTC). Very efficient for speech.
- **MP3**: Older, still common for music but rarely used for live streaming.

**The encoder** can be:

- **Hardware**: A dedicated device (e.g., a Blackmagic encoder) that plugs into
  the camera and mixer outputs.
- **Software**: An application running on a computer. The most popular software
  encoder is **OBS** (Open Broadcaster Software), which is free and open
  source.

Step 5: Sending to YouTube (RTMP/SRT)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The encoder sends the compressed video and audio to YouTube's servers. This
happens using a **streaming protocol** — a set of rules for how to transmit
live data over the internet.

**RTMP (Real-Time Messaging Protocol)**:

- The most common protocol for sending live video *to* a streaming service.
- Originally created by Adobe for Flash. Still the standard for live ingest.
- The encoder connects to a URL like ``rtmp://a.rtmp.youtube.com/live2`` and
  sends the stream.
- YouTube gives the organizer a **stream key** — a secret string that
  identifies their stream.

**SRT (Secure Reliable Transport)**:

- A newer protocol designed for unreliable networks (e.g., mobile connections).
- Better error recovery than RTMP.
- Less widely supported by streaming services but gaining adoption.

At this point, the live video and audio have left the conference venue and are
on YouTube's servers.

Step 6: YouTube Processes the Stream
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

YouTube receives the incoming RTMP stream and does several things:

1. **Transcoding**: YouTube re-encodes the video into multiple quality levels
   (1080p, 720p, 480p, 360p, 144p). This allows viewers with slow connections
   to watch at lower quality. This process creates multiple versions of the same
   stream.

2. **Packaging**: YouTube wraps the video into delivery formats suitable for
   web playback. Internally, YouTube uses DASH (Dynamic Adaptive Streaming over
   HTTP) and sometimes HLS.

3. **Buffering**: YouTube keeps a buffer of several seconds of video ready so
   that viewers can start watching immediately without waiting.

All of this adds **latency** (delay). The video the viewer sees is typically
5–15 seconds behind what is happening live in the room.

Step 7: CDN Delivery to Viewers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

YouTube uses a **CDN (Content Delivery Network)** to get the video to viewers
worldwide.

**What is a CDN?** A CDN is a network of servers spread across the globe. When
a viewer in Tokyo requests the stream, they get it from a server in Tokyo —
not from a server in California. This is faster because the data travels a
shorter physical distance.

**How it works**:

1. YouTube's origin servers hold the stream.
2. The CDN has **edge servers** (also called **points of presence** or
   **PoPs**) in cities worldwide.
3. When the first viewer in Tokyo requests the stream, the edge server fetches
   it from the origin and caches it.
4. When the second viewer in Tokyo requests the same stream, the edge server
   serves it from cache — no need to fetch from the origin again.

For a conference with 3,000 viewers across 50 countries, the CDN ensures each
viewer gets fast, reliable delivery regardless of where they are.

**Examples of CDNs**: YouTube's own CDN, CloudFront (Amazon), Fastly,
Cloudflare, Akamai.

Step 8: Playback in the Viewer's Browser
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The viewer opens the eventyay session page. The page embeds a YouTube video
using the **YouTube IFrame API**.

**IFrame**: An HTML element that embeds one web page inside another. When you
see a YouTube video on a non-YouTube website, it is inside an IFrame. The
IFrame shows YouTube's player (with play/pause buttons, volume control, etc.)
but it lives inside the eventyay page.

**YouTube IFrame API**: A JavaScript library provided by YouTube that lets the
eventyay page communicate with the embedded YouTube player. It can:

- **Read** the current playback time (``player.getCurrentTime()``).
- **Control** playback: play, pause, seek, mute, unmute, change volume.
- **Detect** state changes: when the video starts playing, pauses, buffers,
  or ends.
- It uses **postMessage** — a browser feature for safe communication between
  the parent page (eventyay) and the embedded IFrame (YouTube).

**What the viewer sees**: A video player showing the speaker's talk with audio.
They can play, pause, adjust volume, go fullscreen, and (if the stream supports
it) seek to a different point in time.

**Adaptive Bitrate Streaming**: The YouTube player automatically switches
between quality levels based on the viewer's network speed. If the connection
slows down, it drops from 1080p to 720p or lower. If it speeds up, it
increases quality. This happens seamlessly — the viewer just sees a slight
change in sharpness.


How eventyay Manages Streams
------------------------------

eventyay does not just embed a single YouTube video. It has a system for
managing which stream plays in which room at which time.

Rooms
~~~~~~

A **room** is a virtual space in an event. Think of it as a conference room or
auditorium. An event might have:

- Room A: Main Stage
- Room B: Workshop Room
- Room C: Lightning Talks

Each room can have a live stream associated with it.

Stream Types
~~~~~~~~~~~~~

eventyay supports multiple types of streams:

- **YouTube**: A YouTube live stream or video, embedded via IFrame.
- **HLS**: A direct HLS stream (not from YouTube — see below for what HLS is).
- **Vimeo**: A Vimeo video, embedded via IFrame.
- **IFrame**: Any arbitrary web page embedded as a video source.
- **Native**: A built-in HLS player using ``hls.js`` (not an IFrame).

Stream Schedules
~~~~~~~~~~~~~~~~~~

The **StreamSchedule** model in eventyay allows organizers to schedule different
streams for different time slots within a room. For example:

- 9:00–10:00: Keynote (YouTube stream A)
- 10:30–11:30: Panel Discussion (YouTube stream B)
- 14:00–15:00: Workshop (HLS stream C)

Each schedule entry has:

- **Room**: which room this stream belongs to.
- **URL**: the stream address.
- **Stream type**: youtube, hls, vimeo, iframe, or native.
- **Start/end times**: when this stream is active.
- **Config**: a JSON field for extra settings (e.g., YouTube video ID, language
  mappings).

The system automatically switches streams based on the current time.

The ``config`` JSONField
~~~~~~~~~~~~~~~~~~~~~~~~~~

Each ``StreamSchedule`` has a ``config`` field that stores additional settings
as JSON. This is a flexible "catch-all" for extra configuration that does not
need its own database column. For YouTube streams, it might contain:

- The YouTube video ID.
- Whether to hide YouTube's controls.
- Whether to enable privacy-enhanced mode.
- Language mappings for translation audio (used by the multi-audio player).

This field is what the hybrid multi-audio player uses to store interpreter
stream configuration without needing new database tables.


Glossary — Every Technical Term Explained
------------------------------------------

This glossary covers every technical term used in the hybrid multi-audio player
design document.

Audio and Video Fundamentals
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Audio codec**
  A compression algorithm for audio. Converts raw audio samples into a smaller
  encoded format. Examples: AAC, Opus, MP3.

**Video codec**
  A compression algorithm for video. Converts raw video frames into a smaller
  encoded format. Examples: H.264, VP9, AV1.

**Bitrate**
  The amount of data per second in a stream. Measured in kilobits per second
  (kbps) or megabits per second (Mbps). Higher bitrate = higher quality = more
  bandwidth required. For speech audio, 96–128 kbps is sufficient.

**Sample rate**
  How many audio measurements are taken per second. 48 kHz (48,000 samples per
  second) is the standard for professional audio and web streaming.

**Mono / Stereo**
  Mono: one audio channel (same sound in both ears). Stereo: two channels
  (different sound in left and right ears). Speech interpretation is fine in
  mono.

**Frame rate**
  How many video frames are shown per second. 30 fps (frames per second) is
  standard for live streaming.

**Resolution**
  The size of the video image in pixels. Common resolutions: 1080p
  (1920×1080), 720p (1280×720), 360p (640×360).

**Latency**
  The delay between when something happens in the real world and when a viewer
  sees or hears it. For YouTube live streams, latency is typically 5–15 seconds.

**Drift**
  When two things that should be synchronized gradually get out of sync. For
  example, if the interpreter audio slowly falls behind the video by 0.5
  seconds over 10 minutes, that is drift.

Streaming Protocols
~~~~~~~~~~~~~~~~~~~~

**RTMP (Real-Time Messaging Protocol)**
  A protocol for sending live video from an encoder to a streaming service
  (like YouTube). Reliable and widely supported. Used for *ingest* (sending),
  not for *delivery* (watching).

**SRT (Secure Reliable Transport)**
  A newer protocol for live video ingest. More resilient on unreliable networks
  than RTMP. Uses error correction to handle packet loss.

**HLS (HTTP Live Streaming)**
  A protocol for delivering video (or audio) to viewers over standard HTTP.
  Created by Apple. Works by splitting the stream into small **segments** (e.g.,
  2 seconds each) and listing them in a **manifest** file. The viewer's player
  downloads segments one by one and plays them in sequence.

  Key HLS concepts:

  - **Manifest** (``.m3u8`` file): A text file that lists available segments
    and their URLs. For live streams, this file is updated every few seconds
    with new segment URLs.
  - **Segment** (``.ts`` or ``.m4s`` file): A small chunk of audio or video,
    typically 2–6 seconds long.
  - **Live window**: For live streams, only the most recent segments are
    available (typically the last 30–60 seconds). Older segments are removed.
  - **Audio-only HLS**: HLS can deliver just audio (no video). This is what the
    hybrid player uses for interpreter audio streams.

**DASH (Dynamic Adaptive Streaming over HTTP)**
  Similar to HLS but standardized by MPEG (not Apple). YouTube uses DASH
  internally. The concepts are similar: manifests, segments, adaptive bitrate.

**WebRTC (Web Real-Time Communication)**
  A browser technology for real-time audio and video communication. Used for
  video calls, voice chat, and screen sharing. Very low latency (under 1
  second). In the interpreter pipeline, WebRTC captures the interpreter's
  microphone audio and sends it to the server.

**Icecast**
  An older streaming protocol for continuous audio delivery. Unlike HLS, an
  Icecast stream is a single continuous data flow, not segmented. This means it
  is **not seekable** — you can only listen to "now", not jump to a different
  point. Relevant to the sync/latency management feature.

Web Technologies
~~~~~~~~~~~~~~~~~~

**IFrame**
  An HTML element (``<iframe>``) that embeds one web page inside another. The
  YouTube player appears inside an IFrame on the eventyay page.

**YouTube IFrame API**
  A JavaScript library from YouTube for controlling an embedded player. Allows
  reading playback time, controlling play/pause/mute, and detecting state
  changes (playing, buffering, paused, ended).

**postMessage**
  A browser API that allows two windows (or an IFrame and its parent page) to
  send messages to each other safely. The eventyay page uses ``postMessage`` to
  tell the YouTube IFrame to mute or unmute.

**``<audio>`` element**
  An HTML element for playing audio in the browser. The hybrid player uses a
  hidden ``<audio>`` element for interpreter audio.

**``<video>`` element**
  An HTML element for playing video in the browser. Used by the Livestream
  component for HLS streams.

**hls.js**
  A JavaScript library that enables HLS playback in browsers that do not
  natively support it (most browsers except Safari). It downloads HLS segments,
  decodes them, and feeds them to an ``<audio>`` or ``<video>`` element. The
  eventyay codebase already uses ``hls.js`` for native HLS streaming.

**Vuex (store)**
  A state management library for Vue.js applications. The eventyay video
  frontend uses Vuex to share state between components — for example, which
  translation audio URL is currently selected (``youtubeTransUrl``).

**Vue 3**
  The JavaScript framework used for the eventyay video frontend. Components
  like ``MediaSource.vue`` and ``Livestream.vue`` are Vue 3 components.

**AudioContext**
  A browser API for processing audio. Mobile browsers require a user gesture
  (tap or click) to "unlock" the AudioContext before any audio can play. This
  is why the hybrid player needs a "tap to enable" gate on mobile.

**playbackRate**
  A property of ``<audio>`` and ``<video>`` elements that controls how fast
  media plays. ``1.0`` is normal speed, ``1.02`` is 2% faster, ``0.98`` is 2%
  slower. The sync controller uses small playbackRate adjustments to gently
  correct drift without audible artifacts.

Infrastructure
~~~~~~~~~~~~~~~

**CDN (Content Delivery Network)**
  A geographically distributed network of servers that caches and delivers
  content close to viewers. Reduces latency and handles high traffic.

**CloudFront**
  Amazon's CDN service. One option for delivering interpreter HLS audio streams.

**Edge server**
  A CDN server located close to viewers (e.g., in their city or country). Edge
  servers cache content so it does not need to travel from the origin server for
  every request.

**Origin server**
  The source server where content is generated. For interpreter audio, this is
  the audio ingest server that produces HLS segments.

**TTL (Time to Live)**
  How long a CDN edge server keeps a cached copy before checking the origin for
  updates. For HLS manifests, TTL is short (2–5 seconds) because the manifest
  changes frequently. For HLS segments, TTL is long (hours) because segments
  never change once written.

**CORS (Cross-Origin Resource Sharing)**
  A browser security mechanism that controls which websites can load resources
  from a different domain. If the interpreter audio is served from
  ``cdn.example.com`` but the eventyay page is on ``eventyay.com``, the CDN
  must send CORS headers (``Access-Control-Allow-Origin: https://eventyay.com``)
  to allow the browser to load the audio.

**Ingest server**
  A server that receives incoming streams from encoders or interpreters. It
  accepts RTMP, SRT, or WebRTC connections and converts them into HLS for
  delivery.

**FFmpeg**
  A powerful open-source command-line tool for processing audio and video. Can
  be used as an ingest server to receive RTMP streams and produce HLS output.

**Nginx-RTMP**
  An Nginx web server module that adds RTMP support. Can receive RTMP streams
  from encoders and serve HLS output. Often used as a lightweight ingest server.

**OBS (Open Broadcaster Software)**
  Free, open-source software for live streaming and recording. Interpreters or
  production teams use OBS to capture audio/video and send it to an ingest
  server via RTMP.

Audio Engineering
~~~~~~~~~~~~~~~~~~~

**Audio mixer**
  A device or software that combines multiple audio sources into one output,
  with volume control per source. At a conference, it mixes the speaker's
  microphone with other sources.

**Video mixer (vision mixer)**
  A device or software that switches between or combines multiple video sources
  (cameras, screen captures) into one output.

**Echo cancellation**
  A software feature that prevents a microphone from picking up audio that is
  being played through the same device's speakers. Important for interpreters
  who monitor the original session while speaking their translation.

**Noise suppression**
  A software feature that reduces background noise (fans, typing, traffic) from
  a microphone signal.

**Auto gain control (AGC)**
  A software feature that automatically adjusts microphone volume so quiet
  speech gets louder and loud speech gets quieter.

**AAC-LC (AAC Low Complexity)**
  The most common variant of the AAC audio codec. "Low Complexity" means it
  uses less CPU to encode and decode, making it suitable for real-time
  streaming.

**Opus**
  An audio codec optimized for real-time communication. Used by WebRTC. Very
  efficient for speech (can produce good quality at 32–64 kbps).

Synchronization
~~~~~~~~~~~~~~~~~

**Master clock**
  The single time reference that everything else synchronizes to. In the hybrid
  player, the YouTube player is the master clock — the interpreter audio adjusts
  to match YouTube's time, not the other way around.

**Offset**
  A fixed time adjustment applied to align two streams. If the interpreter audio
  arrives 2 seconds early relative to the YouTube video, a ``default_offset_ms``
  of 2000 tells the system to delay the audio by 2 seconds.

**User offset**
  An additional offset that the viewer can adjust manually using a slider. Added
  on top of the organizer's default offset.

**Hard resync**
  Forcibly jumping the audio to the correct position (seeking). Causes a brief
  audio glitch but immediately corrects large drift (>500 ms).

**playbackRate smoothing**
  Gently speeding up or slowing down audio playback (e.g., ±2%) to correct
  small drift. Inaudible for speech and avoids the glitch of a hard resync.

**Buffering**
  When a media player is waiting for more data to arrive before it can continue
  playing. Displayed as a spinner or loading indicator.

**Stalled event**
  A browser event fired when an ``<audio>`` or ``<video>`` element has not
  received new data for a period of time. Used to detect interpreter stream
  failures.

eventyay-Specific Terms
~~~~~~~~~~~~~~~~~~~~~~~~

**StreamSchedule**
  A Django model in eventyay that defines which stream plays in which room at
  which time. Each entry has a URL, stream type, time range, and a ``config``
  JSONField for extra settings.

**MediaSource.vue**
  A Vue 3 component in the video frontend that handles rendering the correct
  media source for a room — YouTube, Janus (WebRTC), HLS, or IFrame. Contains
  the mute/unmute logic and the current translation audio mechanism.

**Livestream.vue**
  A Vue 3 component that plays HLS streams using ``hls.js``. Handles quality
  level switching, buffering detection, and error recovery.

**stage.vue**
  The admin configuration page for room streaming settings. Where organizers
  set the YouTube video ID, stream source type, and language mappings.

**muteYouTubePlayer() / unmuteYouTubePlayer()**
  Functions in ``MediaSource.vue`` that send ``postMessage`` commands to the
  YouTube IFrame to mute or unmute its audio. Used when switching between
  original audio and interpreter audio.

**youtubeTransUrl**
  A Vuex store state variable that holds the currently selected translation
  audio URL. When set, ``MediaSource.vue`` creates a hidden IFrame for the
  translation audio (in the current implementation; the hybrid player replaces
  this with an ``<audio>`` element and ``hls.js``).

**JSONField**
  A Django model field that stores JSON data. The ``StreamSchedule.config``
  field is a JSONField used to store interpreter stream configuration without
  needing new database columns.

**ISO 639-1**
  An international standard that assigns two-letter codes to languages. For
  example: ``en`` = English, ``fr`` = French, ``es`` = Spanish, ``ar`` = Arabic.
  Used in the interpreter stream configuration.

**Pydantic**
  A Python library for data validation using type annotations. Can be used to
  validate the structure of interpreter stream configuration stored in the
  JSONField.

**DRF (Django REST Framework)**
  A toolkit for building REST APIs in Django. eventyay uses DRF for its API
  endpoints. DRF serializers can validate request data.

**Celery**
  A Python library for running background tasks asynchronously. eventyay uses
  Celery for tasks like sending emails, processing exports, etc.

**Channels (Django Channels)**
  A Django extension that adds WebSocket support. eventyay uses Channels for
  real-time communication — for example, updating room state when a new stream
  becomes active.

**WebSocket**
  A protocol for real-time, two-way communication between a browser and a
  server. Unlike HTTP (request/response), WebSocket keeps a persistent
  connection open so the server can push updates to the browser instantly.


Putting It All Together — Normal Streaming in eventyay
-------------------------------------------------------

Here is the complete flow for a normal (non-interpreted) conference talk:

1. Speaker gives talk on stage.
2. Camera captures video; microphone captures audio.
3. Video mixer combines camera angles; audio mixer combines audio sources.
4. Encoder (OBS or hardware) compresses video+audio and sends via RTMP to
   YouTube.
5. YouTube transcodes to multiple quality levels, packages for delivery.
6. YouTube CDN distributes to edge servers worldwide.
7. Organizer configures the session in eventyay admin with the YouTube video ID.
8. eventyay ``StreamSchedule`` model stores the configuration.
9. Viewer opens the session page.
10. eventyay ``MediaSource.vue`` reads the room configuration and creates a
    YouTube IFrame.
11. YouTube IFrame player loads and begins playing.
12. Viewer watches the talk with original audio.

No interpretation. No extra audio streams. No synchronization logic needed.

When interpretation is added (see :doc:`hybrid-multi-audio-player`), steps 1–8 remain the same. The
changes happen at step 10 onward: ``MediaSource.vue`` also creates interpreter
audio elements, adds a language selector, and starts the sync controller.
