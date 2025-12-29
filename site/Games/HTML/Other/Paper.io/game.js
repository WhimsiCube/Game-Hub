'use strict';

/* ================== SETUP ================== */
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const TILE = 20;
const WORLD_SIZE = 300;

/* ================== HELPERS ================== */
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ================== AI NAMES ================== */
const AI_NAMES = [
  "GridGoblin", "LoopKing", "CaptureCat",
  "PixelPirate", "TrailTaker", "ZoneZilla"
];

/* ================== WORLD ================== */
const land = new Map(); // key = "x,y" → owner

function key(x, y) {
  return `${x},${y}`;
}

/* ================== PLAYER ================== */
function createPlayer(name, color, x, y, ai=false) {
  return {
    name,
    color,
    x,
    y,
    dx: 1,
    dy: 0,
    trail: [],
    land: new Set([key(x,y)]),
    alive: true,
    ai
  };
}

/* ================== PLAYERS ================== */
const player = createPlayer("You", "#4af", 0, 0);
const bots = [];

for (let i = 0; i < 3; i++) {
  bots.push(createPlayer(
    rand(AI_NAMES),
    `hsl(${Math.random()*360},70%,60%)`,
    Math.floor(Math.random()*20-10),
    Math.floor(Math.random()*20-10),
    true
  ));
}

const players = [player, ...bots];

/* ================== INPUT ================== */
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp')    [player.dx,player.dy] = [0,-1];
  if (e.key === 'ArrowDown')  [player.dx,player.dy] = [0,1];
  if (e.key === 'ArrowLeft')  [player.dx,player.dy] = [-1,0];
  if (e.key === 'ArrowRight') [player.dx,player.dy] = [1,0];
});

/* ================== AI LOGIC ================== */
function aiMove(p) {
  if (Math.random() < 0.02) {
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    [p.dx, p.dy] = rand(dirs);
  }
}

/* ================== LAND CAPTURE ================== */
function capture(p) {
  for (const t of p.trail) {
    p.land.add(t);
    land.set(t, p);
  }
  p.trail = [];
}

/* ================== UPDATE ================== */
function update() {
  players.forEach(p => {
    if (!p.alive) return;

    if (p.ai) aiMove(p);

    p.x += p.dx;
    p.y += p.dy;

    const k = key(p.x,p.y);

    if (p.trail.includes(k)) {
      p.alive = false;
      return;
    }

    // Kill if hits other trail
    players.forEach(o => {
      if (o !== p && o.trail.includes(k)) {
        o.alive = false;
      }
    });

    if (!p.land.has(k)) {
      p.trail.push(k);
    } else if (p.trail.length > 0) {
      capture(p);
    }
  });
}

/* ================== DRAW ================== */
function draw() {
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const ZOOM = 0.6;
  ctx.scale(ZOOM, ZOOM);
  ctx.translate(
    canvas.width/(2*ZOOM) - player.x*TILE,
    canvas.height/(2*ZOOM) - player.y*TILE
  );

  // Land
  land.forEach((owner, k) => {
    const [x,y] = k.split(',').map(Number);
    ctx.fillStyle = owner.color;
    ctx.fillRect(x*TILE,y*TILE,TILE,TILE);
  });

  // Trails
  players.forEach(p => {
    ctx.fillStyle = p.color;
    p.trail.forEach(k => {
      const [x,y] = k.split(',').map(Number);
      ctx.fillRect(x*TILE,y*TILE,TILE,TILE);
    });
  });

  // Players
  players.forEach(p => {
    if (!p.alive) return;
    ctx.fillStyle = "#fff";
    ctx.fillRect(p.x*TILE,p.y*TILE,TILE,TILE);
  });

  // UI
  const ui = document.getElementById('ui');
  ui.innerHTML = players.map(p =>
    `${p.name}: ${(p.land.size/(WORLD_SIZE*WORLD_SIZE)*100).toFixed(2)}%`
  ).join('<br>');
}

/* ================== LOOP ================== */
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
