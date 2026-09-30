import * as THREE from 'three';

const std = (color, extra = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.02, ...extra });

/**
 * Stylized White House grounds. Layout is inspired by the real site (mansion in the
 * north, columned south portico, fountain on the lawn, perimeter fence, the
 * Washington Monument in the distance) but hand-built and cartoony.
 *
 * Map interface shared by all future maps:
 *  { name, bounds, obstacles, spawnPoints, playerStart, bossSpawn, bossName, update(playerPos, dt, t) }
 * @param {THREE.Scene} scene
 */
export function buildWhiteHouse(scene) {
  const g = new THREE.Group();
  scene.add(g);

  const bounds = { minX: -36, maxX: 36, minZ: -32, maxZ: 26 };
  /** @type {import('../collision.js').CircleObs[] | any[]} */
  const obstacles = [];

  // ---- Ground: mowed-lawn stripes ----
  const cv = document.createElement('canvas');
  cv.width = cv.height = 256;
  const c2 = cv.getContext('2d');
  for (let i = 0; i < 8; i++) {
    c2.fillStyle = i % 2 ? '#7fd06b' : '#8bda76';
    c2.fillRect(0, i * 32, 256, 32);
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(30, 30);
  tex.colorSpace = THREE.SRGBColorSpace;
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(600, 600), new THREE.MeshStandardMaterial({ map: tex, roughness: 1 }));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  g.add(ground);

  // Paths: straight walk from gate to portico plus a ring path around the fountain.
  const pathMat = std(0xe9dfc4, { roughness: 1 });
  const walk = new THREE.Mesh(new THREE.PlaneGeometry(5, 40), pathMat);
  walk.rotation.x = -Math.PI / 2;
  walk.position.set(0, 0.02, 6);
  walk.receiveShadow = true;
  g.add(walk);
  const ringPath = new THREE.Mesh(new THREE.RingGeometry(4.5, 7.2, 48), pathMat);
  ringPath.rotation.x = -Math.PI / 2;
  ringPath.position.set(0, 0.025, -2);
  ringPath.receiveShadow = true;
  g.add(ringPath);
  const crossWalk = new THREE.Mesh(new THREE.PlaneGeometry(60, 3), pathMat);
  crossWalk.rotation.x = -Math.PI / 2;
  crossWalk.position.set(0, 0.02, 12);
  g.add(crossWalk);

  // ---- The mansion ----
  const wallMat = std(0xf7f3e8, { transparent: true });
  const roofMat = std(0x9aa3ad, { transparent: true });
  const glassMat = std(0x7fb6e8, { emissive: 0x1d3550, transparent: true });
  const fadeMats = [wallMat, roofMat, glassMat];
  const mansion = new THREE.Group();
  g.add(mansion);
  const mz = -18;

  const main = new THREE.Mesh(new THREE.BoxGeometry(26, 6, 9), wallMat);
  main.position.set(0, 3, mz);
  main.castShadow = main.receiveShadow = true;
  mansion.add(main);
  const roof = new THREE.Mesh(new THREE.BoxGeometry(26.6, 0.5, 9.6), roofMat);
  roof.position.set(0, 6.25, mz);
  roof.castShadow = true;
  mansion.add(roof);
  for (const sx of [-1, 1]) {
    const wing = new THREE.Mesh(new THREE.BoxGeometry(12, 4, 7), wallMat);
    wing.position.set(sx * 19, 2, mz + 0.5);
    wing.castShadow = wing.receiveShadow = true;
    mansion.add(wing);
    const wroof = new THREE.Mesh(new THREE.BoxGeometry(12.5, 0.4, 7.5), roofMat);
    wroof.position.set(sx * 19, 4.2, mz + 0.5);
    mansion.add(wroof);
    obstacles.push({ t: 'b', x: sx * 19, z: mz + 0.5, hw: 6, hd: 3.5 });
  }
  obstacles.push({ t: 'b', x: 0, z: mz, hw: 13, hd: 4.5 });

  // Windows on the south face.
  for (let i = -5; i <= 5; i++) {
    if (Math.abs(i) < 2) continue;
    for (const y of [1.8, 4.4]) {
      const w = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.5, 0.1), glassMat);
      w.position.set(i * 2.2, y, mz + 4.55);
      mansion.add(w);
    }
  }
  // Portico: columns, pediment, steps.
  const pediment = new THREE.Mesh(new THREE.CylinderGeometry(6, 6, 0.6, 3), wallMat);
  pediment.rotation.set(Math.PI / 2, 0, Math.PI / 2);
  pediment.scale.set(1, 1, 0.3);
  pediment.position.set(0, 6.4, mz + 6.2);
  mansion.add(pediment);
  const beam = new THREE.Mesh(new THREE.BoxGeometry(9, 0.8, 3.4), wallMat);
  beam.position.set(0, 5.4, mz + 6.0);
  beam.castShadow = true;
  mansion.add(beam);
  for (let i = 0; i < 6; i++) {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.34, 5, 12), wallMat);
    col.position.set(-3.75 + i * 1.5, 2.5, mz + 7.3);
    col.castShadow = true;
    mansion.add(col);
  }
  const steps = new THREE.Mesh(new THREE.BoxGeometry(9.5, 0.3, 3.6), std(0xdcd3bb));
  steps.position.set(0, 0.15, mz + 6.0);
  mansion.add(steps);
  // Door.
  const door = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.6, 0.1), std(0x4a6fa5, { transparent: true }));
  door.position.set(0, 1.6, mz + 4.55);
  mansion.add(door);
  fadeMats.push(door.material);
  // Flag on the roof.
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 4, 6), std(0xcccccc));
  pole.position.set(0, 8.5, mz);
  mansion.add(pole);
  const flag = new THREE.Group();
  const stripes = [0xd33b3b, 0xffffff, 0xd33b3b, 0xffffff];
  stripes.forEach((c, i) => {
    const s = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.25, 0.04), std(c));
    s.position.set(0.85, -i * 0.25, 0);
    flag.add(s);
  });
  const canton = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.05), std(0x2d4fa8));
  canton.position.set(0.35, -0.12, 0.01);
  flag.add(canton);
  flag.position.set(0.05, 10.2, mz);
  mansion.add(flag);

  // ---- Fountain ----
  const fx0 = 0;
  const fz0 = -2;
  const basin = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.8, 0.7, 24), std(0xd7d3c8));
  basin.position.set(fx0, 0.35, fz0);
  basin.castShadow = basin.receiveShadow = true;
  g.add(basin);
  const water = new THREE.Mesh(
    new THREE.CylinderGeometry(2.3, 2.3, 0.05, 24),
    new THREE.MeshStandardMaterial({ color: 0x5fc8ff, emissive: 0x114466, roughness: 0.2 }),
  );
  water.position.set(fx0, 0.72, fz0);
  g.add(water);
  const jet = new THREE.Mesh(new THREE.ConeGeometry(0.35, 2.6, 10), std(0xa8e8ff, { transparent: true, opacity: 0.75, emissive: 0x2288aa }));
  jet.position.set(fx0, 1.9, fz0);
  g.add(jet);
  obstacles.push({ t: 'c', x: fx0, z: fz0, r: 2.9 });

  // ---- Hedges, rose garden, trees ----
  const hedgeMat = std(0x2f9e4a, { roughness: 1 });
  const addHedge = (x, z, hw, hd) => {
    const h = new THREE.Mesh(new THREE.BoxGeometry(hw * 2, 1.3, hd * 2), hedgeMat);
    h.position.set(x, 0.65, z);
    h.castShadow = h.receiveShadow = true;
    g.add(h);
    obstacles.push({ t: 'b', x, z, hw, hd });
  };
  addHedge(-15, 4, 5, 0.9);
  addHedge(15, 4, 5, 0.9);
  addHedge(-24, -8, 0.9, 4);
  addHedge(24, -8, 0.9, 4);

  // Rose garden (west).
  const bed = new THREE.Mesh(new THREE.BoxGeometry(6, 0.4, 4), std(0x6b4a2f));
  bed.position.set(-22, 0.2, 12);
  bed.receiveShadow = true;
  g.add(bed);
  const petals = [0xff5e8a, 0xffd84a, 0xffffff, 0xc07dff];
  for (let i = 0; i < 18; i++) {
    const f = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), std(petals[i % 4], { roughness: 0.6 }));
    f.position.set(-24.5 + (i % 6) * 1.0, 0.65, 10.6 + Math.floor(i / 6) * 1.3);
    g.add(f);
  }
  obstacles.push({ t: 'b', x: -22, z: 12, hw: 3, hd: 2 });

  const trunkMat = std(0x7a5230);
  const leafMats = [std(0x2e9b45), std(0x3fb356)];
  const addTree = (x, z, s = 1) => {
    const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.35 * s, 0.5 * s, 3 * s, 8), trunkMat);
    tr.position.set(x, 1.5 * s, z);
    tr.castShadow = true;
    g.add(tr);
    for (let i = 0; i < 3; i++) {
      const l = new THREE.Mesh(new THREE.SphereGeometry((1.9 - i * 0.3) * s, 12, 10), leafMats[i % 2]);
      l.position.set(x + (i - 1) * 0.3 * s, (3.6 + i * 0.9) * s, z + (i % 2) * 0.3);
      l.castShadow = true;
      g.add(l);
    }
    obstacles.push({ t: 'c', x, z, r: 0.7 * s });
  };
  [[-30, 18], [30, 18], [-31, -4], [31, -4], [-10, -26], [10, -26], [-28, -24], [28, -24], [-12, 20], [12, 20], [-32, 8], [32, 8]].forEach(([x, z]) =>
    addTree(x, z, 1 + Math.abs((x * z) % 3) * 0.08),
  );
  // Hiding tree cluster behind the mansion for a fun "where is he?" feel.
  addTree(-6, -26, 1.2);
  addTree(6, -26, 1.2);

  // ---- Fence around the grounds (south gate left open) ----
  const posts = [];
  const fenceLine = (x1, z1, x2, z2, skip) => {
    const len = Math.hypot(x2 - x1, z2 - z1);
    const n = Math.floor(len / 1.6);
    for (let i = 0; i <= n; i++) {
      const p = i / n;
      const x = x1 + (x2 - x1) * p;
      const z = z1 + (z2 - z1) * p;
      if (skip && skip(x, z)) continue;
      posts.push([x, z]);
    }
    const rail = new THREE.Mesh(new THREE.BoxGeometry(Math.abs(x2 - x1) || 0.1, 0.12, Math.abs(z2 - z1) || 0.1), std(0x22252b));
    rail.position.set((x1 + x2) / 2, 1.5, (z1 + z2) / 2);
    g.add(rail);
    const rail2 = rail.clone();
    rail2.position.y = 0.6;
    g.add(rail2);
  };
  const { minX, maxX, minZ, maxZ } = bounds;
  const gate = (x) => Math.abs(x) < 4;
  fenceLine(minX, minZ, maxX, minZ);
  fenceLine(minX, maxZ, maxX, maxZ, (x) => gate(x));
  fenceLine(minX, minZ, minX, maxZ);
  fenceLine(maxX, minZ, maxX, maxZ);
  const postGeo = new THREE.CylinderGeometry(0.08, 0.08, 2, 6);
  const tipGeo = new THREE.ConeGeometry(0.14, 0.3, 6);
  const postInst = new THREE.InstancedMesh(postGeo, std(0x22252b), posts.length);
  const tipInst = new THREE.InstancedMesh(tipGeo, std(0xffd24a, { metalness: 0.5, roughness: 0.4 }), posts.length);
  const m4 = new THREE.Matrix4();
  posts.forEach(([x, z], i) => {
    m4.makeTranslation(x, 1, z);
    postInst.setMatrixAt(i, m4);
    m4.makeTranslation(x, 2.1, z);
    tipInst.setMatrixAt(i, m4);
  });
  postInst.castShadow = true;
  g.add(postInst, tipInst);

  // ---- Skyline: Washington Monument and clouds ----
  const monument = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 4.2, 70, 4), std(0xfaf8f0, { roughness: 0.6 }));
  shaft.rotation.y = Math.PI / 4;
  shaft.position.y = 35;
  monument.add(shaft);
  const cap = new THREE.Mesh(new THREE.ConeGeometry(2.5, 6, 4), std(0xfaf8f0));
  cap.rotation.y = Math.PI / 4;
  cap.position.y = 73;
  monument.add(cap);
  monument.position.set(-30, 0, -135);
  g.add(monument);
  const cloudMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, fog: false });
  const clouds = [];
  for (let i = 0; i < 9; i++) {
    const c = new THREE.Group();
    for (let j = 0; j < 4; j++) {
      const b = new THREE.Mesh(new THREE.SphereGeometry(5 + Math.random() * 4, 10, 8), cloudMat);
      b.position.set(j * 6 - 9, Math.random() * 2, Math.random() * 3);
      b.scale.y = 0.6;
      c.add(b);
    }
    c.position.set(-140 + i * 36, 55 + (i % 3) * 10, -120 - (i % 2) * 40);
    g.add(c);
    clouds.push(c);
  }

  const spawnPoints = [
    [-34, 22], [34, 22], [-34, 0], [34, 0], [-20, 25], [20, 25], [-33, -30], [33, -30], [0, -30],
  ].map(([x, z]) => ({ x, z }));

  return {
    name: 'The White House',
    bounds,
    obstacles,
    spawnPoints,
    playerStart: { x: 0, z: 18 },
    bossSpawn: { x: 0, z: -27 },
    bossName: 'Zombie George Washington',
    /** @param {{x:number,z:number}} playerPos */
    update(playerPos, dt, t) {
      // See-through mansion when the hero walks behind it.
      const behind = playerPos.z < mz - 3 && Math.abs(playerPos.x) < 28;
      const target = behind ? 0.4 : 1;
      for (const m of fadeMats) {
        m.opacity += (target - m.opacity) * Math.min(1, dt * 6);
        m.transparent = m.opacity < 0.99;
        m.needsUpdate = false;
      }
      flag.rotation.y = Math.sin(t * 3) * 0.25;
      flag.rotation.z = Math.sin(t * 4.3) * 0.06;
      jet.scale.y = 1 + Math.sin(t * 6) * 0.12;
      clouds.forEach((c, i) => {
        c.position.x += dt * (1.2 + (i % 3) * 0.4);
        if (c.position.x > 190) c.position.x = -190;
      });
    },
  };
}
