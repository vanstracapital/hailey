# For Hailey ✉️

A little full-stack love letter — *"The Letter Itself."* Flask backend,
animated frontend, candlelit and made of warm paper.

## What it does
1. **Break the seal** — a wax-sealed note rests on a candlelit desk. She
   clicks the wax seal; it cracks, the note opens, and a tender *P.S.* (served
   at random by the Python backend) glows beneath it.
2. **The letter** — a single aged sheet of paper. As she scrolls, each line is
   written in ink, word by word, and stays on the page like a real letter —
   pressed flowers in the margins, candlelight at the edges. Breaking the seal
   also reveals **our song** (a Spotify embed) that fades in and loops.

## The song
The song is a Spotify track embedded via the Spotify Iframe API. To change it,
edit `SONG_URI` near the top of section 7 in `static/js/main.js` (use the
`spotify:track:<id>` form). Notes/limits of Spotify embeds: they only play a
**30-second preview** unless the listener is signed into Spotify in that
browser, and autoplay may require a click — the player card stays visible so it
can always be started by hand.

## Run it

```bash
pip install flask
python app.py
```

Then open **http://127.0.0.1:5000** in a browser (full-screen looks best).

## Files
```
hailey/
├── app.py                  # Flask backend + routes + message data
├── templates/index.html    # the page
├── static/css/style.css    # all styling
├── static/js/main.js       # intro, ink-writing scroll, Spotify song
├── requirements.txt
└── README.md
```

## Customizing
Open `app.py` and edit the `STORY` list to change the message wording, or
`WHISPERS` for the tender *P.S.* lines on the sealed note. Wrap any phrase in
`|pipes|` to emphasize it in wine-red ink with a hand-drawn underline.

## Previewing without Python
`preview.html` is a static render of the letter (no server needed) — just open
it in a browser. The animations all work; only the *P.S.* fetch and saving a
reply need the live Flask server (the page falls back gracefully without it).
