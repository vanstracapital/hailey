"""
For Hailey — "The Letter Itself".
A candlelit desk, a wax-sealed note she breaks open, ink that writes
itself line by line, and our song playing softly underneath.
Run:  pip install flask  &&  python app.py
Then open http://127.0.0.1:5000
"""

from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

# ----------------------------------------------------------------------------
# The letter. Each passage is one beat, written word-by-word in ink as she
# scrolls; the writing stays on the page like a real letter. Phrases wrapped
# in | | are emphasized in wine-red ink with a hand-drawn underline.
# Three movements: across the miles · if you only knew · and always.
# ----------------------------------------------------------------------------
STORY = [
    # — movement one : across the miles —
    {"eyebrow": "for you",
     "text": "Hailey, no matter how many miles separate us, my heart has never felt |closer to yours.|"},
    {"eyebrow": "",
     "text": "Every sunrise reminds me that it's one day closer to |holding you again.|"},
    {"eyebrow": "",
     "text": "Until then, I'll keep loving you with |all that I am.|"},
    {"eyebrow": "",
     "text": "Distance may keep our hands apart, but |nothing can separate our hearts.|"},
    {"eyebrow": "",
     "text": "You are my peace, my happiness, and the |most beautiful part of every day.|"},
    {"eyebrow": "",
     "text": "I love you more than words could ever express, |Hailey.|"},

    # — movement two : if you only knew —
    {"eyebrow": "if you only knew",
     "text": "If I could give you one thing, it would be the ability to |see yourself through my eyes.|"},
    {"eyebrow": "",
     "text": "Then you'd know just how deeply you're loved, how endlessly you're |cherished,| and how grateful I am to |call you mine.|"},
    {"eyebrow": "",
     "text": "I love you, |Hailey.|"},

    # — movement three : and always —
    {"eyebrow": "and always",
     "text": "You are more than my girlfriend — you are my |safe place,| my greatest blessing, and the person who gives my future |meaning.|"},
    {"eyebrow": "",
     "text": "No matter where life takes us, my heart will always |find its way back to you.|"},

    # — finale —
    {"eyebrow": "endlessly", "text": "Hailey", "is_name": True,
     "closer": "I love you endlessly,"},
]

# Tender lines the backend serves at random as the "P.S." on the sealed note.
WHISPERS = [
    "Miles change nothing about how I feel.",
    "You're the first thing I think of every morning.",
    "Distance is just a number when it's you.",
    "I'd cross any distance to reach you.",
    "Every sunrise is one closer to you.",
    "You make even the waiting feel like love.",
    "Somewhere out there, you're worth every mile.",
]

@app.route("/")
def index():
    return render_template("index.html", story=STORY)


@app.route("/api/whisper")
def whisper():
    """A random tender line — shown as the P.S. on the sealed note."""
    return jsonify({"whisper": random.choice(WHISPERS)})


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
