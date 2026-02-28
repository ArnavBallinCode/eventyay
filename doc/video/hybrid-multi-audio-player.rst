Hybrid YouTube Multi-Audio Player — Issue 2456 End-to-End Explanation
=====================================================================

.. contents:: Table of Contents
   :depth: 3
   :local:

Prerequisites — Read This First
---------------------------------

If you are not familiar with how video and audio streaming works, or if any
technical term in this document is unclear, read
:doc:`streaming-fundamentals` first. That document explains, from scratch:

- How a conference talk goes from speaker → camera → encoder → YouTube → viewer.
- What every component does (video mixer, audio mixer, encoder, CDN, etc.).
- A full glossary of every technical term used in this document (HLS, RTMP,
  CDN, IFrame API, hls.js, postMessage, AAC, WebRTC, drift, offset, etc.).

The rest of this document assumes you understand the normal streaming flow and
the terminology defined there.


Audio Streaming Basics — From Scratch
--------------------------------------

Before explaining the hybrid multi-audio player, it helps to understand how
audio streaming works independently of video.

What Is Audio Streaming?
~~~~~~~~~~~~~~~~~~~~~~~~~~

Audio streaming means sending audio data over the internet in real time (or
near real time) so that a listener can hear it as it is being produced, without
waiting for a complete file to download.

There are two fundamentally different approaches:

1. **Continuous streaming** (e.g., Icecast, radio-style): The server sends a
   never-ending flow of audio data. The listener connects and hears whatever is
   playing "right now." They cannot rewind or skip ahead. Think of it like FM
   radio — you tune in and hear what is live.

2. **Segmented streaming** (e.g., HLS): The audio is split into small files
   called **segments** (each 2–6 seconds long). A **manifest** file lists the
   available segments. The listener's player downloads segments one at a time
   and plays them back-to-back. This is more complex but enables adaptive
   quality, seeking (within the available window), and better compatibility with
   CDNs.

The hybrid player uses **HLS (segmented streaming)** for interpreter audio
because it works well with CDNs, is seekable within a live window, and is
already supported in the eventyay codebase via ``hls.js``.

How HLS Audio-Only Streaming Works Step by Step
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Here is what happens when an interpreter's audio is delivered via HLS:

1. **The interpreter speaks** into their microphone. Their voice is captured as
   raw audio by the browser (via WebRTC) or by software like OBS.

2. **The audio is encoded** — compressed using the AAC-LC codec at 48 kHz,
   96–128 kbps. This is the same codec used by music streaming services, but at
   a lower bitrate because speech requires less data than music.

3. **The audio is segmented** — an HLS segmenter (part of the ingest server)
   chops the continuous audio stream into 2-second chunks. Each chunk becomes a
   ``.ts`` or ``.m4s`` file.

4. **A manifest is generated** — the segmenter creates a ``.m3u8`` file (plain
   text) that lists the URLs of the most recent segments. For live audio, this
   manifest is updated every 2 seconds as new segments are produced.

   Example manifest::

     #EXTM3U
     #EXT-X-TARGETDURATION:2
     #EXT-X-MEDIA-SEQUENCE:1042
     #EXTINF:2.000,
     segment-1042.ts
     #EXTINF:2.000,
     segment-1043.ts
     #EXTINF:2.000,
     segment-1044.ts

5. **A CDN distributes the segments** — the manifest and segments are served
   via a CDN so that viewers worldwide get fast delivery. The CDN caches segments
   (they never change) and refreshes the manifest frequently.

6. **The viewer's browser downloads the manifest**, discovers the available
   segments, downloads the most recent one, and starts playing. As each segment
   finishes playing, the browser fetches the next one.

   For a live stream, the browser also periodically re-fetches the manifest to
   discover newly produced segments.

Why Two Separate Streams Need Synchronization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you watch a normal YouTube video, the video and audio are part of the
**same stream**. They were encoded together, travel together, and arrive
together. The YouTube player handles their synchronization internally.

When you add interpreter audio as a separate HLS stream, you now have **two
independent streams**:

- **Stream A**: YouTube video + original audio (one combined stream from
  YouTube's CDN).
- **Stream B**: Interpreter audio (a separate HLS stream from a different CDN).

These two streams:

- Were produced by different sources (YouTube encoder vs. interpreter audio
  encoder).
- Travel through different networks (YouTube's CDN vs. the audio CDN).
- Have different amounts of delay (YouTube might buffer 8 seconds; HLS audio
  might buffer 5 seconds).
- Are played by different browser components (YouTube IFrame player vs.
  ``<audio>`` element).

**The browser has no idea these two streams are related.** It plays each one
independently. Without explicit synchronization, they drift apart — the
interpreter might be talking about something that happened 3 seconds ago on
the video, or 2 seconds in the future.

This is why the hybrid player needs a **sync controller** — a piece of
JavaScript that continuously compares the two streams' playback positions and
adjusts one to match the other.


What Issue 2456 Is About (Plain English)
-----------------------------------------

The Problem in One Sentence
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

eventyay needs a way to let conference attendees choose which language they hear
during a YouTube-streamed talk — the original speaker or a live interpreter —
and keep the audio perfectly in sync with the video.

The Full Picture
~~~~~~~~~~~~~~~~~

eventyay hosts large international conferences (like Wikimania) where talks are
delivered in one language but need to be understood by audiences speaking many
different languages. Think of it like the United Nations, where an interpreter
listens to the speaker and simultaneously translates into another language, and
attendees put on headphones to hear the translation they need.

**The core problem**: The video is streamed via YouTube, but YouTube has no
built-in way to attach separate interpreter audio tracks to a live stream. You
get one audio track — the original speaker — and that is it. There is no
YouTube setting or API that lets you say "here are three additional audio tracks
for French, Spanish, and Arabic interpreters."

**The proposed solution**: Build a "hybrid" player that shows the YouTube video
as usual, but *also* plays a separate audio stream from an external source (an
interpreter's audio feed delivered over HLS) that the viewer can select instead
of the original audio. The YouTube video acts as the "master clock" — the video
and its timing are the reference point — and the interpreter audio must follow
along, staying synchronized so that the translated words match what is happening
on screen.

In short:

- **Video**: comes from YouTube (unchanged).
- **Original audio**: comes from YouTube (muted when interpretation is active).
- **Interpreter audio**: comes from a separate HLS audio-only stream, played by
  the browser alongside the YouTube video.
- **The viewer** picks a language from a selector. If they pick "French", the
  YouTube video's audio is muted and a French interpreter audio stream starts
  playing in sync with the video.

Who Is Involved
~~~~~~~~~~~~~~~~

There are four types of people who interact with this system:

1. **The speaker** — delivers the talk in the original language. They are not
   aware of the interpretation system. Their talk is streamed to YouTube as
   usual.

2. **The interpreter** — sits in a separate room (physical or virtual), listens
   to the speaker, and speaks the translation in real time. Their audio is
   captured and sent to an audio streaming server (not YouTube).

3. **The organizer** — configures the event in eventyay admin. They set up the
   YouTube stream, add interpreter languages, configure stream URLs, and run
   rehearsals to calibrate audio timing.

4. **The attendee (viewer)** — watches the talk in their browser. They see the
   YouTube video and can choose which audio track to listen to using a language
   selector in the player.

The Data Flow
~~~~~~~~~~~~~~

Here is how data moves through the system, from source to viewer:

**Video path** (unchanged from normal YouTube streaming)::

  Speaker's camera → Event's video mixer → YouTube Live encoder
  → YouTube servers → YouTube CDN → Viewer's browser (YouTube IFrame player)

**Original audio path** (comes with the video)::

  Speaker's microphone → Event's audio mixer → YouTube Live encoder
  → YouTube servers → YouTube CDN → Viewer's browser (YouTube IFrame player)

**Interpreter audio path** (new — this is what issue 2456 adds)::

  Speaker's microphone → Room audio system → Interpreter hears the speaker
  → Interpreter speaks the translation into their microphone
  → Audio encoder (browser WebRTC or OBS/hardware)
  → Audio ingest server
  → HLS segmenter (splits audio into 2-second chunks)
  → Audio CDN (e.g., CloudFront)
  → Viewer's browser (<audio> element powered by hls.js)

The key insight is that the video and interpreter audio take **completely
different routes** to reach the viewer. This is why synchronization is the
central challenge.


Why This Is Hard — The Real Problems
-------------------------------------

1. YouTube Is a Black Box
~~~~~~~~~~~~~~~~~~~~~~~~~

YouTube's embedded player (IFrame API) gives limited control. You can
play/pause/seek/mute it, and you can read its current playback time, but you
cannot:

- Inject additional audio tracks into it.
- Get precise, frame-level timing information.
- Know exactly when its internal buffer stalls or recovers.
- Control its adaptive bitrate decisions.

This means the external audio stream must independently figure out where YouTube
is and chase it, rather than being tightly coupled at the codec level.

2. Audio–Video Synchronization (The Hardest Problem)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The interpreter audio and the YouTube video travel completely different paths
across the internet:

- **YouTube video path**: Speaker → YouTube encoder → YouTube CDN → Viewer's
  YouTube player (with its own adaptive buffering).
- **Interpreter audio path**: Speaker (live in room) → Interpreter hears and
  translates → Interpreter's microphone → Audio encoder → HLS segmenter →
  Audio CDN → Viewer's browser ``<audio>`` element.

These two paths have **different and variable delays**. The YouTube stream might
be 8 seconds behind real-time. The interpreter audio might be 5 seconds behind
real-time. That means the interpreter audio arrives 3 seconds *before* the
corresponding video, which sounds wrong — the interpreter is talking about
something the viewer has not seen yet.

The ``default_offset_ms`` setting exists to compensate for this. The organizer
runs a rehearsal, measures the gap, and configures an offset (e.g., "delay the
French audio by 2800 ms"). But this offset drifts over time because:

- YouTube's adaptive streaming changes its buffer size.
- The HLS audio segments arrive at slightly varying intervals.
- Network conditions fluctuate.
- The browser's audio clock and the YouTube player's clock are not the same.

The system must continuously measure drift and correct it — either by gently
speeding up or slowing down the audio (``playbackRate`` smoothing) or, if drift
exceeds a threshold, by hard-resyncing (seeking the audio to the correct
position).

3. Buffering State Coupling
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When YouTube buffers (spinner appears), the external audio must also pause.
Otherwise the audio runs ahead while the video is frozen. When YouTube resumes,
the audio must resume from the correct synchronized position.

The YouTube IFrame API reports state changes (``BUFFERING``, ``PLAYING``,
``PAUSED``, ``ENDED``), but these events arrive with some delay and do not tell
you *exactly* when the buffer stall started. The sync controller must handle
this imprecision.

4. Mobile Browser Restrictions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

iOS Safari and many Android browsers block audio playback until the user has
physically tapped the screen. This means:

- The interpreter audio ``<audio>`` element cannot be ``play()``-ed
  automatically when the page loads.
- A "tap to enable audio" gate must be shown before interpretation works.
- When the user switches away from the browser tab or locks the phone, audio
  playback can be interrupted. When they return, the system must detect this and
  resync.

5. HLS Audio-Only Streams Are Live — Not Seekable Like Files
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The interpreter audio is a live HLS stream. Live HLS has a small "window" of
available segments (usually the last 30–60 seconds). You cannot seek to an
arbitrary point. This means:

- If the drift exceeds the available window, you cannot resync — you can only
  wait for new segments.
- The ``<audio>`` element's ``currentTime`` for a live HLS stream is relative
  to the available window, not an absolute wall-clock time. Mapping it to
  YouTube's ``getCurrentTime()`` requires careful bookkeeping.

6. Language Switching Must Be Seamless
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When a viewer switches from French to Spanish interpretation:

- The French audio must stop.
- The Spanish HLS stream must start loading (it needs to fetch the manifest,
  then at least one segment).
- The Spanish audio must sync to the current YouTube playback position.
- All of this should complete in under 2 seconds, ideally without audible gaps.

If the Spanish stream is not yet loaded, the viewer hears silence. The UI must
show a "loading" indicator so they know it is working, not broken.

7. Failure and Recovery
~~~~~~~~~~~~~~~~~~~~~~~~

Interpreter streams can fail at any time — the interpreter disconnects, the
encoder crashes, the CDN has a hiccup. The system must:

- Detect the failure (stalled audio, load errors, decode errors).
- Automatically fall back to the original YouTube audio within 5 seconds.
- Show a non-intrusive notification (e.g., "Interpretation unavailable,
  playing original audio").
- Provide a "Retry" button so the viewer can try reconnecting.

8. Organizer Complexity
~~~~~~~~~~~~~~~~~~~~~~~~

Organizers need to:

- Configure 3+ interpreter streams per session.
- Run rehearsals to measure and set the ``default_offset_ms`` per language.
- Update stream URLs when encoders change.
- Enable/disable interpretation per session.

This requires admin UI that is powerful enough but not overwhelming.


How the System Would Work — Full End-to-End Walkthrough
---------------------------------------------------------

This section walks through the entire lifecycle of the feature: from
infrastructure setup weeks before the event, through organizer configuration,
rehearsal, the live event itself, and post-event review.

Stage 1: Infrastructure Setup (Weeks Before the Event)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Before interpretation can work, the audio delivery infrastructure must be in
place.

**What the operations team sets up**:

1. **Audio ingest server** — A server (e.g., running Nginx-RTMP, FFmpeg, or a
   managed service) that accepts incoming audio from interpreters and converts
   it to HLS audio-only playlists. Each language gets its own RTMP/SRT endpoint
   and its own HLS output URL.

   Example::

     French interpreter sends RTMP to:  rtmp://ingest.example.com/live/fr
     Server produces HLS at:            https://cdn.example.com/interpret/fr/live.m3u8

     Spanish interpreter sends RTMP to: rtmp://ingest.example.com/live/es
     Server produces HLS at:            https://cdn.example.com/interpret/es/live.m3u8

2. **CDN configuration** — A CDN (e.g., CloudFront) is placed in front of the
   HLS output. CDN settings:

   - Manifest files (``.m3u8``): cached for 2–5 seconds (must refresh
     frequently for live content).
   - Segment files (``.ts`` or ``.m4s``): cached for 1–6 hours (segments do
     not change once written).
   - CORS headers: ``Access-Control-Allow-Origin`` set to the eventyay domain.

3. **Audio encoding settings** — The ingest server is configured to produce:

   - Codec: AAC-LC
   - Sample rate: 48 kHz
   - Bitrate: 96–128 kbps (speech does not need high bitrates)
   - HLS segment duration: 2 seconds
   - Mono channel (sufficient for speech)

Stage 2: Organizer Configures the Session (Days Before the Event)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The event organizer logs into the eventyay admin panel and configures a session.

**Step-by-step**:

1. **Create or edit a session** in the event schedule. Assign it to a room.

2. **Configure the video source** — Set the stream type to "YouTube" and enter
   the YouTube video ID (e.g., ``dQw4w9WgXcQ``). This is the existing
   functionality that already works.

3. **Enable interpretation** — Toggle on "Enable interpretation" for this
   session.

4. **Add interpreter languages** — For each language, the organizer fills in:

   - **Language code**: e.g., ``fr`` (ISO 639-1).
   - **Display name**: e.g., "French" (what the viewer sees in the selector).
   - **Stream URL**: e.g., ``https://cdn.example.com/interpret/fr/live.m3u8``
     (the HLS audio-only playlist URL from Step 1).
   - **Default offset**: ``0`` ms initially (will be calibrated during
     rehearsal).

5. **Set a default language** (optional) — If most attendees speak French, the
   organizer can mark French as the default. When a viewer opens the session,
   interpretation will start in French automatically.

6. **Save the configuration** — All of this is stored in the ``config``
   JSONField of the ``StreamSchedule`` model. No new database tables are needed.

Stage 3: Rehearsal (Hours or Day Before the Event)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This is a critical step. The organizer must calibrate the timing offset for each
language so the interpreter's words match what is happening on screen.

**Why offsets are needed**:

Suppose at real-time T=0, the speaker says "Good morning." This moment:

- Reaches YouTube's CDN and is available to viewers at approximately T+6s
  (YouTube's encoding and buffering adds ~6 seconds of delay).
- Is heard by the interpreter at approximately T+0.5s (direct room audio feed).
- Is spoken by the interpreter as "Bonjour" at approximately T+2s (interpreter
  processing time).
- Reaches the viewer's browser as HLS audio at approximately T+5s (2s
  interpreter delay + 2s encoding + 1s CDN).

So the viewer sees the video at T+6s and hears the interpreter at T+5s. The
interpreter audio arrives 1 second *before* the video. Without correction, the
viewer hears "Bonjour" while the speaker on screen has not yet said "Good
morning." This is confusing.

The fix: set ``default_offset_ms = 1000`` for French, telling the system to
delay the interpreter audio by 1 second. Now both arrive at the same time.

**How the rehearsal works**:

1. The organizer starts the YouTube stream (can be a test stream).
2. The interpreters start their audio feeds.
3. The organizer opens the session page with the hybrid player.
4. A **sync cue** is used: someone in front of the camera claps their hands
   (visible clap). The organizer watches:

   - When does the clap appear on the YouTube video?
   - When does the clap sound appear in the interpreter audio?

5. If the interpreter audio arrives too early, increase the offset (delay audio
   more). If too late, decrease it.
6. The organizer adjusts ``default_offset_ms`` in the admin panel until the
   interpreter's words align with the video.
7. Repeat for each language (offsets may differ because interpreters have
   different setups and processing speeds).
8. Save the offsets.

**Practical tip**: Offsets between 500 ms and 4000 ms are typical.

Stage 4: The Live Event — What the Viewer Experiences
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This is the most important stage. Let us walk through exactly what happens when
a viewer watches the session.

**Step 1: Viewer opens the session page**

The eventyay session page loads. The YouTube video is embedded using the IFrame
API (this already works today). The video starts playing, possibly muted due to
browser autoplay policies.

**Step 2: Viewer sees the language selector**

Below or beside the video, a language selector appears. It shows:

- **Original Audio** (selected by default)
- **French** 🇫🇷
- **Spanish** 🇪🇸
- **Arabic** 🇸🇦

This selector is populated from the ``interpreter_streams`` configuration that
the organizer saved in Step 2 above.

**Step 3: Viewer selects "French"**

This triggers the following sequence of events:

a. **YouTube audio is muted** — The system sends a ``postMessage`` command to
   the YouTube IFrame to mute its audio. The video continues playing (with
   visual content) but the viewer no longer hears the original speaker. This
   uses the existing ``muteYouTubePlayer()`` function.

b. **French HLS audio stream starts loading** — The system creates a hidden
   ``<audio>`` HTML element and attaches ``hls.js`` to it. ``hls.js`` fetches
   the French HLS manifest (``live.m3u8``), discovers the available segments,
   and begins downloading and buffering the most recent audio segment.

c. **Sync controller initializes** — The sync controller reads YouTube's
   current playback time using ``yt.getCurrentTime()``, adds the configured
   ``default_offset_ms`` for French, and seeks the ``<audio>`` element to the
   corresponding position in the HLS stream.

d. **Interpreter audio starts playing** — The viewer now hears the French
   interpreter's voice. Because the sync controller positioned the audio
   correctly, the interpreter's words match the video on screen.

**Step 4: Continuous synchronization**

Once playback starts, the sync controller runs a loop every 500 milliseconds.
Each tick of the loop does this:

1. **Check YouTube's state** — Is YouTube playing, buffering, paused, or ended?

   - If YouTube is **buffering** (spinner visible): pause the interpreter audio
     immediately. Otherwise the audio runs ahead while the video is frozen.
   - If YouTube is **paused**: pause the interpreter audio.
   - If YouTube is **playing**: continue to the next step.

2. **Read the current times** — Get YouTube's playback time and the ``<audio>``
   element's current time.

3. **Compute the drift** — The expected audio time is:
   ``youtubeTime + defaultOffset + userOffset``. The drift is the difference
   between the actual audio time and the expected audio time.

4. **Correct the drift**:

   - Drift < 100 ms → **Do nothing**. This is imperceptible to humans.
   - Drift between 100 ms and 500 ms → **Gentle correction**. Slightly speed
     up or slow down the audio (e.g., ``playbackRate = 1.02`` or ``0.98``).
     This is inaudible for speech and gradually brings the audio back in sync.
   - Drift > 500 ms → **Hard resync**. Seek the ``<audio>`` element to the
     correct position immediately. This causes a brief audio glitch but fixes
     large drift instantly.

**Step 5: Viewer adjusts the timing (optional)**

Some viewers may feel the sync is slightly off for their specific network
conditions. The player overlay provides:

- **Offset slider**: ranges from -3000 ms to +3000 ms in 250 ms steps. Moving
  it left makes the interpreter audio arrive earlier; right makes it later.
- **Fine-tune buttons**: "Earlier" (-250 ms) and "Later" (+250 ms) for precise
  adjustment.
- **Reset button**: returns to the organizer's default offset.

Changes apply instantly — the sync controller immediately uses the new
``userOffset`` in its drift calculation.

**Step 6: Viewer switches languages**

The viewer decides to switch from French to Spanish:

1. The French ``<audio>`` element is paused and destroyed.
2. The ``hls.js`` instance for French is destroyed (releases memory).
3. A new ``<audio>`` element is created for the Spanish HLS stream.
4. ``hls.js`` loads the Spanish manifest and buffers the first segment (~1–2
   seconds to load).
5. The sync controller syncs the Spanish audio to the current YouTube time
   using the Spanish offset.
6. Spanish audio begins playing.

During the 1–2 second loading gap, the UI shows a "Loading Spanish..." indicator
so the viewer knows the system is working.

**Step 7: Something goes wrong (failure handling)**

Suppose the Spanish interpreter disconnects mid-talk:

1. The HLS stream stops producing new segments.
2. The ``<audio>`` element plays its remaining buffered segments (a few
   seconds), then stalls.
3. The ``<audio>`` element fires a ``stalled`` event.
4. The system starts a 5-second timer. If audio does not resume:

   a. The sync controller is stopped.
   b. The ``<audio>`` element is destroyed.
   c. YouTube is unmuted (viewer hears the original speaker again).
   d. A toast notification appears: "Spanish interpretation temporarily
      unavailable. Playing original audio."
   e. The "Spanish" option in the language selector shows a "Retry" button.

5. When the interpreter reconnects and the HLS stream resumes, the viewer can
   click "Retry". The system attempts to reload the Spanish stream. If
   successful, YouTube is muted again and the sync controller restarts.

**Step 8: Viewer selects "Original Audio"**

The simplest action:

1. The interpreter ``<audio>`` element is paused and destroyed.
2. The sync controller is stopped.
3. YouTube is unmuted. The viewer hears the original speaker.
4. Instant — no loading delay.

Stage 5: Post-Event Review
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After the event, the organizer can review metrics collected during the session:

- **Average drift**: Were most viewers well-synchronized? If drift averages were
  high, the default offsets may need adjustment for the next session.
- **Fallback count**: How often did interpreter streams fail? This indicates
  infrastructure reliability.
- **User offset distribution**: If many viewers moved the slider significantly,
  the default offset was probably wrong.
- **Language usage**: Which languages were most popular? This helps plan
  interpreter staffing for future events.


Practical Scenarios — What Could Happen in the Real World
-----------------------------------------------------------

Scenario 1: Best Case — Good Network, Desktop Chrome
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Conference: FOSSASIA Summit, 500 concurrent viewers.
- YouTube video plays smoothly at 1080p.
- Viewer selects "Mandarin" interpretation.
- Mandarin HLS audio loads in ~1 second.
- Sync loop keeps drift under 100 ms with minor ``playbackRate`` adjustments.
- Viewer watches the entire 45-minute talk without ever noticing desync.
- Outcome: perfect experience, indistinguishable from native multi-audio.

Scenario 2: Mobile Safari (iPhone)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Viewer opens the session on their iPhone during a lunch break.
- Page loads. YouTube video shows but Safari blocks audio autoplay.
- A "Tap to enable live interpretation" overlay appears over the player.
- Viewer taps. This user gesture unlocks both the YouTube player's audio and
  the ``<audio>`` element's AudioContext.
- Viewer selects "Arabic". Audio plays. Sync runs as normal.
- Viewer switches to the Messages app to reply to a text, then comes back 2
  minutes later. Safari has suspended the ``<audio>`` element in the background.
- The sync controller detects that ``audioTime`` is stale (not advancing),
  performs a hard resync: seeks audio to match the current YouTube position.
- Brief 0.5-second audio glitch, then full recovery.
- Outcome: works, with momentary glitch on return from background.

Scenario 3: Poor Network (3G, High Packet Loss)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Viewer is at a conference in a developing region with unreliable mobile data.
- YouTube's adaptive streaming downgrades to 360p and buffers frequently.
- Each time YouTube buffers, the sync controller pauses the interpreter audio.
  When YouTube resumes, audio resumes from the synced position.
- The HLS audio stream also experiences segment load failures. ``hls.js``
  retries automatically (built-in retry logic, up to 3 times per segment).
- After 30 seconds of repeated audio failures, the stall detector triggers.
- System unmutes YouTube and shows a fallback notification.
- Viewer clicks "Retry" 5 minutes later when connectivity improves. The
  interpreter audio loads and resyncs successfully.
- Outcome: degraded but functional; viewer is never stuck with silence.

Scenario 4: Interpreter Disconnects Mid-Session
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- The French interpreter's internet connection drops at minute 20 of a talk.
- The HLS stream stops producing new segments. The ingest server closes the
  connection.
- The ``<audio>`` element plays its remaining buffered segments (~4 seconds of
  audio still in the buffer), then stalls.
- The stall detection timer fires after 5 seconds of no new data.
- System automatically unmutes YouTube, shows fallback notification.
- The organizer notices the interpreter is offline and coordinates a reconnect.
- Two minutes later, the interpreter reconnects. The HLS stream resumes
  producing segments.
- The viewer clicks "Retry" in the language selector.
- French audio loads and resyncs. The viewer is back on interpretation.
- Outcome: 2+ minutes of original audio, then seamless recovery.

Scenario 5: Large Offset Required Due to Relay Workflow
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- The event uses a complex relay: Speaker → Room audio system → Dedicated
  encoder → Relay to YouTube Live (this path adds ~7 seconds of delay).
- The interpreter gets audio from a direct room feed (only ~0.5 seconds of
  delay), speaks the translation (~1.5 seconds processing), and the HLS
  pipeline adds ~3 seconds.
- Total: YouTube video arrives at T+7s, interpreter audio arrives at T+5s.
- The interpreter audio arrives 2 seconds *before* the video.
- During rehearsal, the organizer identifies this 2-second gap using a clap
  sync cue and sets ``default_offset_ms = 2000`` for French.
- At runtime, the sync controller delays audio playback by 2 seconds,
  perfectly aligning it with the video.
- Outcome: perfect sync despite a complex production pipeline.

Scenario 6: Viewer Seeks the YouTube Video
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- The session is a YouTube Premiere (pre-recorded, scheduled playback) with
  live interpretation.
- A viewer arrives 10 minutes late and scrubs the YouTube progress bar to jump
  to the current live position.
- YouTube fires a ``PLAYING`` state change after the seek completes.
- The sync controller detects that YouTube's time has jumped (the difference
  between the new time and the last known time is much larger than 500 ms).
- The controller performs a hard resync: seeks the ``<audio>`` element to the
  new position plus the offset.
- Audio quickly catches up to the new video position.
- For truly live streams, seeking within the HLS window works; seeking beyond
  the window is not possible (HLS live has a ~30–60 second window).
- Outcome: seek works for premieres and VOD; for live, bounded by HLS window.

Scenario 7: Multiple Languages Simultaneously (Stress Test)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Wikimania has 5 interpreter languages. 3000 viewers are watching.
- Each viewer's browser loads exactly one HLS audio stream at a time (not all
  5). This is efficient — the CDN serves different streams to different viewers
  but each viewer only downloads one.
- The CDN handles the load because HLS segments are cacheable. 3000 viewers
  requesting the French segment at the same second results in cache hits, not
  3000 origin fetches.
- The sync controller runs independently in each viewer's browser.
- No server-side coordination is needed between viewers.
- Outcome: scales linearly with CDN capacity, not with server resources.

Scenario 8: Organizer Updates Offset During a Live Session
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Mid-session, the organizer realizes the Spanish offset is wrong because the
  Spanish interpreter switched to a different setup with more latency.
- If a staff-only "live adjustment panel" is implemented (optional feature),
  the organizer updates ``default_offset_ms`` for Spanish from 1500 to 2200.
- This change is pushed to all viewers via WebSocket (eventyay already uses
  WebSocket for room state).
- Each viewer's sync controller picks up the new default offset and adjusts.
- Viewers who had manually tuned their ``userOffset`` keep their adjustment;
  only the base offset changes.
- Outcome: mid-session correction without requiring viewers to do anything.


What Already Exists in eventyay
--------------------------------

The codebase already has partial foundations for this feature:

1. **YouTube IFrame integration** (``MediaSource.vue``): The component creates
   YouTube iframes with ``enablejsapi=1``, can mute/unmute via ``postMessage``,
   and already has a ``youtubeTransUrl`` mechanism that creates a second hidden
   YouTube iframe for "translation audio" (a separate YouTube video ID).

2. **HLS playback** (``Livestream.vue``): Uses ``hls.js`` for HLS streaming
   with error handling, buffering detection, and quality level switching.

3. **Stream scheduling** (``StreamSchedule`` model): Supports per-room,
   time-based stream schedules with a ``config`` JSONField that already stores
   language settings.

4. **Language selection in admin** (``stage.vue``): The admin UI has a language
   selector that maps ISO 639-1 language codes to YouTube video IDs.

5. **Vuex store integration**: The store tracks ``youtubeTransUrl`` and
   ``streamingRoom``, with mutations for updating the translation audio URL.

**What is missing**:

- External HLS audio playback (currently translation uses a second YouTube
  iframe, not an independent audio stream).
- Synchronization logic (no drift detection, no playback rate correction, no
  hard resync).
- Organizer offset configuration (no ``default_offset_ms`` per language).
- Attendee offset controls (no slider or fine-tune buttons).
- Failure detection and fallback (no automatic retry or fallback to original).
- Mobile interaction gate.
- Backend models for interpreter stream URLs (currently only YouTube video IDs).
- Monitoring and metrics.


Proposed Solution — Implementation Approach
--------------------------------------------

Phase 1: Backend — Interpreter Stream Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Goal**: Let organizers configure interpreter audio streams per session.

**Changes to the ``StreamSchedule`` model's ``config`` JSONField**:

Store interpreter streams inside the existing ``config`` field::

  {
    "youtube_video_id": "dQw4w9WgXcQ",
    "enable_interpretation": true,
    "interpreter_streams": [
      {
        "language_code": "fr",
        "display_name": "French",
        "stream_url": "https://cdn.example.com/interpret/fr/live.m3u8",
        "default_offset_ms": -2500,
        "is_default_language": true
      },
      {
        "language_code": "es",
        "display_name": "Spanish",
        "stream_url": "https://cdn.example.com/interpret/es/live.m3u8",
        "default_offset_ms": -2200,
        "is_default_language": false
      }
    ]
  }

This avoids new database migrations. The ``config`` JSONField is already
designed to hold extra configuration per stream. Validation is done via a
Pydantic model or DRF serializer before saving.

**Admin UI changes** (``stage.vue``):

- Add a section for "Interpretation Streams" when stream source is YouTube.
- For each interpreter language: fields for language code, display name, HLS
  stream URL, and default offset.
- A "Test Preview" button that opens a rehearsal view.

Phase 2: Frontend — Hybrid Player Core
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Goal**: Play external HLS audio alongside YouTube video with synchronization.

**New component: ``InterpreterAudio.vue``**:

This component manages interpreter audio playback. Key responsibilities:

- Loads HLS audio-only streams via ``hls.js`` into an ``<audio>`` element.
- Exposes ``play()``, ``pause()``, ``seek(time)``, ``destroy()`` methods.
- Emits events: ``loaded``, ``playing``, ``stalled``, ``error``.

**New module: ``sync-controller.js``**:

This module implements the synchronization logic:

.. code-block:: javascript

  // Pseudocode for the sync loop
  class SyncController {
    constructor(youtubePlayer, audioElement, defaultOffsetMs) {
      this.yt = youtubePlayer
      this.audio = audioElement
      this.defaultOffset = defaultOffsetMs / 1000
      this.userOffset = 0
      this.interval = null
    }

    start() {
      this.interval = setInterval(() => this.tick(), 500)
    }

    tick() {
      // 1. If YouTube is not playing, pause audio
      const ytState = this.yt.getPlayerState()
      if (ytState !== YT.PlayerState.PLAYING) {
        if (!this.audio.paused) this.audio.pause()
        return
      }

      // 2. If audio is paused but should play, resume
      if (this.audio.paused) {
        this.syncAndPlay()
        return
      }

      // 3. Measure drift
      const ytTime = this.yt.getCurrentTime()
      const targetAudioTime = ytTime + this.defaultOffset + this.userOffset
      const drift = this.audio.currentTime - targetAudioTime

      // 4. Correct drift
      if (Math.abs(drift) < 0.1) {
        // Acceptable — reset playback rate
        this.audio.playbackRate = 1.0
      } else if (Math.abs(drift) < 0.5) {
        // Gentle correction
        this.audio.playbackRate = drift > 0 ? 0.98 : 1.02
      } else {
        // Hard resync
        this.audio.currentTime = targetAudioTime
        this.audio.playbackRate = 1.0
      }
    }

    syncAndPlay() {
      const ytTime = this.yt.getCurrentTime()
      this.audio.currentTime = ytTime + this.defaultOffset + this.userOffset
      this.audio.play()
    }

    setUserOffset(ms) {
      this.userOffset = ms / 1000
    }

    stop() {
      clearInterval(this.interval)
      this.audio.pause()
    }
  }

**Changes to ``MediaSource.vue``**:

Replace the hidden-YouTube-iframe approach for translation audio with the new
``InterpreterAudio`` component and ``SyncController``. When the viewer selects
a language:

1. Mute the YouTube IFrame (existing ``muteYouTubePlayer()``).
2. Create an ``<audio>`` element and load the HLS stream URL.
3. Start the ``SyncController``.

When the viewer switches back to original audio:

1. Stop the ``SyncController`` and destroy the ``<audio>`` element.
2. Unmute the YouTube IFrame (existing ``unmuteYouTubePlayer()``).

Phase 3: Frontend — Viewer Controls
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Goal**: Let attendees choose languages and adjust timing.

**UI overlay components**:

- **Language selector**: Dropdown or pill buttons showing available languages.
  "Original Audio" is always an option. The current selection is highlighted.
- **Offset slider**: A horizontal slider from ``-3000`` to ``+3000`` ms with
  250 ms steps. Shows the current offset value. A "Reset" button returns to
  the organizer's default.
- **Fine-tune buttons**: "Earlier" and "Later" buttons that adjust the offset
  by ±250 ms per click.
- **Status indicator**: Shows "Synced", "Syncing...", or "Interpreter
  unavailable" based on the current state.

These controls appear in the player overlay, below or beside the video.

Phase 4: Resilience and Fallback
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Goal**: Handle failures gracefully.

**Stall detection**:

- If the ``<audio>`` element fires ``stalled`` or ``waiting`` events and does
  not recover within 5 seconds, trigger fallback.

**Fallback logic**:

1. Stop the ``SyncController``.
2. Destroy the ``<audio>`` element.
3. Unmute YouTube.
4. Show a toast notification: "Interpretation temporarily unavailable."
5. Show a "Retry" button in the language selector.

**Retry logic**:

- When the viewer clicks "Retry", attempt to reload the HLS stream.
- If it loads successfully, mute YouTube and restart the ``SyncController``.
- If it fails again, remain on original audio and show the error.

Phase 5: Mobile Support
~~~~~~~~~~~~~~~~~~~~~~~~~

**Goal**: Work reliably on iOS Safari and Android Chrome.

**Interaction gate**:

- On mobile, display a "Tap to enable live interpretation" overlay.
- On tap, call ``audioElement.play()`` inside the gesture handler to unlock
  the audio context.
- Store the unlocked state so it persists during the session.

**Background/foreground handling**:

- Listen for ``visibilitychange`` events.
- When the page becomes visible again, check if the ``<audio>`` element is
  still playing. If not, perform a hard resync.

Phase 6: Monitoring and Metrics
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Goal**: Track sync quality and failures for continuous improvement.

**Client-side metrics** (sent via beacon or WebSocket):

- ``drift_avg_ms``: Rolling average drift over the last 30 seconds.
- ``drift_peak_ms``: Maximum drift observed.
- ``hard_resync_count``: Number of times a hard resync was needed.
- ``fallback_count``: Number of times fallback to original audio triggered.
- ``stream_switch_count``: Number of language switches.
- ``user_offset_ms``: The attendee's chosen offset (useful for improving
  defaults).

**Server-side storage**: A simple event log table or append to the session's
metrics data. Organizers can review this after the event to improve offsets
for future sessions.


Key Technical Decisions
------------------------

1. **Use** ``hls.js`` **for interpreter audio, not a second YouTube iframe**.
   The current codebase uses a hidden YouTube iframe for translation audio.
   This has severe limitations: you cannot control synchronization, you depend
   on YouTube to host the interpreter audio, and two YouTube players on one page
   create performance and policy issues. Using ``hls.js`` with a standard
   ``<audio>`` element gives full control over timing.

2. **Store interpreter config in the existing** ``config`` **JSONField**.
   This avoids new database tables and migrations. The ``StreamSchedule``
   model's ``config`` field was designed for exactly this kind of extensibility.
   Validate the schema in application code.

3. **Default offset is organizer-configured, user offset is additive**.
   The organizer sets a base offset per language during rehearsal. The attendee
   can adjust from there. This separation means most viewers get good sync
   out-of-the-box without needing to fiddle with sliders.

4. **Sync loop at 500 ms interval with dual correction strategy**.
   Gentle ``playbackRate`` adjustment for small drift (feels smooth), hard seek
   for large drift (quick recovery). The 500 ms interval balances CPU usage
   against sync precision.

5. **Fallback to original audio, not silence**.
   When interpretation fails, the viewer should still be able to follow the
   event. Unmuting YouTube is the safest fallback.


Migration Path from Current Implementation
--------------------------------------------

The current codebase uses a second hidden YouTube iframe for translation audio.
To migrate:

1. Keep the existing ``youtubeTransUrl`` mechanism working for backward
   compatibility.
2. Add a new ``interpreterStreams`` field in the stream config.
3. When ``interpreterStreams`` is present, use the new hybrid player.
4. When only ``youtubeTransUrl`` is present (old config), use the existing
   hidden-iframe approach.
5. Deprecate the hidden-iframe approach once the new system is validated.

This ensures events configured with the old system continue to work while new
events can use the improved hybrid player.


Summary
--------

Issue 2456 proposes a technically challenging but achievable system. The core
difficulty is **synchronizing two independent media streams** (YouTube video and
external HLS audio) that travel different network paths with different delays.
The solution combines:

- YouTube IFrame API as the video engine and timing reference.
- ``hls.js`` for independent interpreter audio playback.
- A continuous sync loop with drift correction.
- Organizer-configurable offsets refined through rehearsal.
- Attendee-adjustable fine-tuning controls.
- Automatic fallback to original audio on failure.
- Mobile-aware interaction gating.

The existing eventyay codebase provides solid foundations (YouTube integration,
HLS support, stream scheduling, admin UI) that can be extended incrementally
to deliver this feature.
