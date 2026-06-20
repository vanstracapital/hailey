/* ============================================================
   For Hailey — "The Letter Itself"
   Candlelit dust · break the seal · ink that writes itself · reply
   ============================================================ */

/* ---------- 1. Candlelit dust motes ---------- */
const dCanvas = document.getElementById('dustCanvas');
const dx = dCanvas.getContext('2d');
let DW, DH, DDPR;
function dSize() {
  DDPR = Math.min(devicePixelRatio || 1, 2);
  DW = innerWidth; DH = innerHeight;
  dCanvas.width = DW * DDPR; dCanvas.height = DH * DDPR;
  dCanvas.style.width = DW + 'px'; dCanvas.style.height = DH + 'px';
  dx.setTransform(DDPR, 0, 0, DDPR, 0, 0);
}
dSize();

let dust = [];
function buildDust() {
  dust = [];
  const n = Math.floor((DW * DH) / 16000);
  for (let i = 0; i < n; i++) {
    dust.push({
      x: Math.random() * DW, y: Math.random() * DH,
      r: Math.random() * 1.5 + 0.4,
      vy: -(Math.random() * 0.22 + 0.04),
      drift: Math.random() * 6.28, ds: Math.random() * 0.01 + 0.003,
      tw: Math.random() * 6.28, sp: Math.random() * 0.02 + 0.006,
      a: Math.random() * 0.4 + 0.15
    });
  }
}
buildDust();

function dustLoop() {
  dx.clearRect(0, 0, DW, DH);
  dust.forEach(m => {
    m.tw += m.sp; m.drift += m.ds;
    m.y += m.vy; m.x += Math.cos(m.drift) * 0.25;
    if (m.y < -10) { m.y = DH + 10; m.x = Math.random() * DW; }
    const a = m.a * (0.55 + 0.45 * Math.sin(m.tw));
    const g = dx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 6);
    g.addColorStop(0, `rgba(255,214,150,${a})`);
    g.addColorStop(0.4, `rgba(255,184,110,${a * 0.3})`);
    g.addColorStop(1, 'rgba(255,184,110,0)');
    dx.fillStyle = g; dx.beginPath(); dx.arc(m.x, m.y, m.r * 6, 0, 7); dx.fill();
    dx.fillStyle = `rgba(255,240,214,${a})`; dx.beginPath(); dx.arc(m.x, m.y, m.r, 0, 7); dx.fill();
  });
  requestAnimationFrame(dustLoop);
}
dustLoop();
addEventListener('resize', () => { dSize(); buildDust(); });

/* ---------- 2. Break the seal ---------- */
document.body.classList.add('locked');
const note = document.getElementById('note');
const wax = document.getElementById('wax');
const scrollCue = document.getElementById('scrollCue');
let opened = false;

function breakSeal() {
  if (opened) return; opened = true;
  startMusic();                       // begin our song on this gesture
  note.classList.add('cracked');
  setTimeout(() => note.classList.add('go'), 620);          // note expands & dissolves
  setTimeout(() => {
    document.getElementById('desk').classList.add('opened');
    document.body.classList.remove('locked');
    window.scrollTo(0, 0);
    startReading();
    scrollCue.classList.add('show');
  }, 1300);
}
wax.addEventListener('click', breakSeal);
note.addEventListener('click', breakSeal);
document.getElementById('desk').addEventListener('click', breakSeal);
addEventListener('keydown', (e) => { if (!opened && (e.key === 'Enter' || e.key === ' ')) breakSeal(); });

/* ---------- 3. A whispered P.S. (backend, with offline fallback) ---------- */
const PS_FALLBACK = [
  "Miles change nothing about how I feel.",
  "You're the first thing I think of every morning.",
  "Distance is just a number when it's you.",
  "I'd cross any distance to reach you.",
  "Every sunrise is one closer to you.",
  "You make even the waiting feel like love.",
  "Somewhere out there, you're worth every mile."
];
function showPS(text) {
  const el = document.getElementById('ps');
  el.innerHTML = '<b>P.S.</b>' + text;
  el.classList.add('show');
}
setTimeout(() => {
  fetch('/api/whisper')
    .then(r => r.json())
    .then(d => showPS(d.whisper))
    .catch(() => showPS(PS_FALLBACK[Math.floor(Math.random() * PS_FALLBACK.length)]));
}, 2600);

/* ---------- 4. Split each line into ink-written words ---------- */
document.querySelectorAll('.line').forEach(el => {
  const raw = el.getAttribute('data-text') || '';
  el.innerHTML = '';
  raw.split('|').forEach((seg, si) => {
    const accent = si % 2 === 1;
    seg.split(' ').forEach(word => {
      if (word === '') return;
      const span = document.createElement('span');
      span.className = 'word';
      if (accent) {
        const a = document.createElement('span');
        a.className = 'accent'; a.textContent = word;
        span.appendChild(a);
      } else {
        span.textContent = word;
      }
      el.appendChild(span);
      el.appendChild(document.createTextNode(' '));
    });
  });
});

/* ---------- 5. Reveal passages as they scroll in (ink dries, stays) ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const p = en.target;
    p.classList.add('inview');
    p.querySelectorAll('.word').forEach((w, i) => {
      w.style.transitionDelay = Math.min(i * 0.05, 1.3) + 's';
    });
    if (p.classList.contains('finale')) setTimeout(petals, 900);
    io.unobserve(p);
  });
}, { threshold: 0.28, rootMargin: '0px 0px -8% 0px' });

function startReading() {
  document.querySelectorAll('.passage').forEach(p => io.observe(p));
}

/* ---------- 6. Ink progress + scroll cue ---------- */
const inkbar = document.getElementById('inkbar');
addEventListener('scroll', () => {
  const max = document.body.scrollHeight - innerHeight;
  inkbar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
  if (scrollY > 40) scrollCue.style.opacity = '0';
}, { passive: true });

/* ---------- 7. Our song (Spotify embed) ---------- */
const SONG_URI = 'spotify:track:0nuXhivBOFDiriWCpdyU93';
const songCard = document.getElementById('songCard');
let spotifyCtrl = null, wantPlay = false, looping = false;

// The Spotify Iframe API calls this once it has loaded.
window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const el = document.getElementById('spotify-embed');
  if (!el) return;
  IFrameAPI.createController(el, { uri: SONG_URI, width: '100%', height: 80 }, (ctrl) => {
    spotifyCtrl = ctrl;
    if (wantPlay) ctrl.play();                        // seal broke before the API was ready
    ctrl.addListener('playback_update', (e) => {
      const d = (e && e.data) || {};
      // loop: when the track reaches the end, start it over
      if (d.duration && d.position >= d.duration - 600 && !looping) {
        looping = true; ctrl.restart();
        setTimeout(() => { looping = false; }, 2000);
      }
    });
  });
};

// Load the Spotify Iframe API.
(function loadSpotify() {
  const s = document.createElement('script');
  s.src = 'https://open.spotify.com/embed/iframe-api/v1';
  s.async = true;
  document.body.appendChild(s);
})();

function startMusic() {
  if (songCard) songCard.classList.add('show');
  if (spotifyCtrl) spotifyCtrl.play();
  else wantPlay = true;                                // play as soon as the controller is ready
}

function petals() {
  const glyphs = ['✦', '❤', '✿', '❧', '❀'];
  for (let i = 0; i < 18; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      p.style.cssText = `position:fixed;left:${32 + Math.random() * 36}%;top:${56 + Math.random() * 22}%;` +
        `z-index:9000;font-size:${13 + Math.random() * 15}px;color:#8c2f3d;pointer-events:none;opacity:0;` +
        `transition:transform 3s ease-out, opacity 3s ease-out;`;
      document.body.appendChild(p);
      requestAnimationFrame(() => {
        p.style.opacity = '1';
        p.style.transform = `translateY(-${130 + Math.random() * 110}px) rotate(${(Math.random() - .5) * 70}deg)`;
      });
      setTimeout(() => { p.style.opacity = '0'; }, 1900);
      setTimeout(() => p.remove(), 3200);
    }, i * 110);
  }
}
