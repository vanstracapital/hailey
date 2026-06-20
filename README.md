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
├── index.html              # standalone static letter (GitHub Pages entry)
├── templates/index.html    # Flask/Jinja version (served by app.py)
├── static/css/style.css    # all styling
├── static/js/main.js       # intro, ink-writing scroll, Spotify song
├── .nojekyll               # serve static assets as-is on GitHub Pages
├── requirements.txt
└── README.md
```

## Customizing
Open `app.py` and edit the `STORY` list to change the message wording, or
`WHISPERS` for the tender *P.S.* lines on the sealed note. Wrap any phrase in
`|pipes|` to emphasize it in wine-red ink with a hand-drawn underline.

## Previewing / GitHub Pages
`index.html` (repo root) is a standalone static render of the letter — no
server needed. Open it directly in a browser, or publish it with GitHub Pages
(it's the site's entry point). The only thing it can't do statically is the
random *P.S.* (that needs the Flask `/api/whisper` route), so it falls back to a
built-in line. `templates/index.html` is the Flask/Jinja version used by
`app.py`. The `.nojekyll` file tells GitHub Pages to serve the `static/` assets
as-is.
