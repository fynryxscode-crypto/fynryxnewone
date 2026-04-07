"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
  pulseSpeed: number;
  color: 0 | 1; // 0=blue, 1=cyan
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  life: number;
  maxLife: number;
}

interface DataPulse {
  nodeA: number;
  nodeB: number;
  t: number;       // 0→1 progress along the edge
  speed: number;
  color: 0 | 1;
}

export default function FooterBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── sizing ──────────────────────────────────────────
    let W = 0, H = 0;
    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      W = canvas.width = rect.width;
      H = canvas.height = rect.height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    // ── helpers ──────────────────────────────────────────
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const BLUE = "#2f55ff";
    const CYAN = "#00d4ff";
    const colorHex = (c: 0 | 1) => (c === 0 ? BLUE : CYAN);

    // ── nodes ────────────────────────────────────────────
    const NODE_COUNT = 38;
    const CONN_DIST = 220;

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: rand(0, 1),
      y: rand(0, 1),
      vx: rand(-0.06, 0.06),
      vy: rand(-0.04, 0.04),
      r: rand(1.5, 3.5),
      pulse: rand(0, Math.PI * 2),
      pulseSpeed: rand(0.012, 0.03),
      color: (Math.random() > 0.45 ? 0 : 1) as 0 | 1,
    }));

    // ── particles ────────────────────────────────────────
    const particles: Particle[] = [];
    const spawnParticle = () => {
      particles.push({
        x: rand(0, W),
        y: rand(0, H),
        vx: rand(-0.15, 0.15),
        vy: rand(-0.25, -0.05),
        alpha: rand(0.2, 0.5),
        size: rand(0.8, 2.2),
        life: 0,
        maxLife: rand(120, 280),
      });
    };
    for (let i = 0; i < 60; i++) spawnParticle();

    // ── data pulses ──────────────────────────────────────
    const pulses: DataPulse[] = [];
    const trySpawnPulse = () => {
      if (pulses.length >= 12) return;
      const a = Math.floor(rand(0, NODE_COUNT));
      let b = Math.floor(rand(0, NODE_COUNT));
      while (b === a) b = Math.floor(rand(0, NODE_COUNT));
      const na = nodes[a], nb = nodes[b];
      const dx = (nb.x - na.x) * W, dy = (nb.y - na.y) * H;
      if (Math.hypot(dx, dy) < CONN_DIST) {
        pulses.push({ nodeA: a, nodeB: b, t: 0, speed: rand(0.004, 0.01), color: na.color });
      }
    };

    // ── draw radial gradient glow at point ───────────────
    const drawGlow = (x: number, y: number, radius: number, hex: string, alpha: number) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, hex + Math.round(alpha * 255).toString(16).padStart(2, "0"));
      g.addColorStop(1, hex + "00");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    // ── main loop ────────────────────────────────────────
    let raf: number;
    let frame = 0;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      frame++;

      // ── background ──
      const bg = ctx.createLinearGradient(0, 0, W * 0.6, H);
      bg.addColorStop(0, "#050d1a");
      bg.addColorStop(0.5, "#071428");
      bg.addColorStop(1, "#040c18");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ── ambient glows (static large blobs) ──
      drawGlow(W * 0.25, H * 0.3, 380, BLUE, 0.07);
      drawGlow(W * 0.78, H * 0.7, 320, CYAN, 0.055);
      drawGlow(W * 0.05, H * 0.6, 200, BLUE, 0.04);

      // ── grid dots (very faint) ──
      ctx.fillStyle = "rgba(47,85,255,0.07)";
      const STEP = 60;
      for (let gx = 0; gx < W; gx += STEP)
        for (let gy = 0; gy < H; gy += STEP) {
          ctx.beginPath();
          ctx.arc(gx, gy, 1, 0, Math.PI * 2);
          ctx.fill();
        }

      // ── update nodes ──
      for (const n of nodes) {
        n.x += n.vx / W;
        n.y += n.vy / H;
        if (n.x < 0) n.x = 1;
        if (n.x > 1) n.x = 0;
        if (n.y < 0) n.y = 1;
        if (n.y > 1) n.y = 0;
        n.pulse += n.pulseSpeed;
      }

      // ── draw edges ──
      for (let i = 0; i < NODE_COUNT; i++) {
        const na = nodes[i];
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const nb = nodes[j];
          const dx = (nb.x - na.x) * W;
          const dy = (nb.y - na.y) * H;
          const dist = Math.hypot(dx, dy);
          if (dist > CONN_DIST) continue;

          const alpha = (1 - dist / CONN_DIST) * 0.28;
          const hex = na.color === 0 ? BLUE : CYAN;

          ctx.strokeStyle = hex + Math.round(alpha * 255).toString(16).padStart(2, "0");
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(na.x * W, na.y * H);
          ctx.lineTo(nb.x * W, nb.y * H);
          ctx.stroke();
        }
      }

      // ── draw data pulses ──
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed;
        if (p.t >= 1) { pulses.splice(i, 1); continue; }
        const na = nodes[p.nodeA], nb = nodes[p.nodeB];
        const px = (na.x + (nb.x - na.x) * p.t) * W;
        const py = (na.y + (nb.y - na.y) * p.t) * H;
        const a = Math.sin(p.t * Math.PI); // fade in/out
        const hex = colorHex(p.color);
        drawGlow(px, py, 10, hex, 0.5 * a);
        ctx.fillStyle = `rgba(255,255,255,${0.85 * a})`;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      if (frame % 28 === 0) trySpawnPulse();

      // ── draw nodes ──
      for (const n of nodes) {
        const nx = n.x * W, ny = n.y * H;
        const pulse = 1 + Math.sin(n.pulse) * 0.35;
        const hex = colorHex(n.color);

        // glow halo
        drawGlow(nx, ny, n.r * 14 * pulse, hex, 0.18);
        // core
        ctx.fillStyle = hex;
        ctx.beginPath();
        ctx.arc(nx, ny, n.r * pulse, 0, Math.PI * 2);
        ctx.fill();
        // bright center
        ctx.fillStyle = "rgba(255,255,255,0.65)";
        ctx.beginPath();
        ctx.arc(nx, ny, n.r * 0.45 * pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── particles ──
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const lifeRatio = p.life / p.maxLife;
        const a = p.alpha * (1 - lifeRatio);
        ctx.fillStyle = `rgba(180,210,255,${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        if (p.life >= p.maxLife) { particles.splice(i, 1); spawnParticle(); }
      }

      // ── top fade overlay (glass edge) ──
      const topFade = ctx.createLinearGradient(0, 0, 0, 80);
      topFade.addColorStop(0, "rgba(5,13,26,0.85)");
      topFade.addColorStop(1, "rgba(5,13,26,0)");
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, W, 80);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      }}
      aria-hidden
    />
  );
}
