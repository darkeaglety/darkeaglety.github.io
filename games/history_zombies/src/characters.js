import * as THREE from 'three';

const std = (color, extra = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.05, ...extra });

/**
 * @typedef {{
 *  skin: number, shirt: number, pants: number, scale?: number,
 *  hat?: string | string[], extra?: string, zombie?: boolean, gait?: number
 * }} CharOpts
 */

/**
 * Builds a goofy rigged character out of primitives.
 * @param {CharOpts} o
 */
export function buildCharacter(o) {
  const root = new THREE.Group();
  const rig = new THREE.Group();
  root.add(rig);

  const skinMat = std(o.skin);
  const shirtMat = std(o.shirt);
  const pantsMat = std(o.pants);
  const shoeMat = std(0x2b2b33);

  // Soft blob shadow that always reads on the grass.
  const disc = new THREE.Mesh(
    new THREE.CircleGeometry(0.75, 20),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.22, depthWrite: false }),
  );
  disc.rotation.x = -Math.PI / 2;
  disc.position.y = 0.03;
  root.add(disc);

  const mkLeg = (x) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, 0.8, 0);
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.13, 0.72, 10), pantsMat);
    leg.position.y = -0.36;
    leg.castShadow = true;
    pivot.add(leg);
    const shoe = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), shoeMat);
    shoe.scale.set(1, 0.6, 1.4);
    shoe.position.set(0, -0.74, 0.07);
    pivot.add(shoe);
    rig.add(pivot);
    return pivot;
  };
  const legL = mkLeg(0.2);
  const legR = mkLeg(-0.2);

  const body = new THREE.Group();
  body.position.y = 1.2;
  rig.add(body);
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.36, 0.8, 12), shirtMat);
  torso.castShadow = true;
  body.add(torso);

  const mkArm = (x) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, 1.5, 0);
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.1, 0.68, 8), shirtMat);
    arm.position.y = -0.34;
    arm.castShadow = true;
    pivot.add(arm);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 8), skinMat);
    hand.position.y = -0.72;
    pivot.add(hand);
    rig.add(pivot);
    return pivot;
  };
  const armL = mkArm(0.52);
  const armR = mkArm(-0.52);

  const head = new THREE.Group();
  head.position.y = 2.0;
  rig.add(head);
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.44, 16, 14), skinMat);
  skull.castShadow = true;
  head.add(skull);

  // Googly eyes: whites + pupils that wander.
  const whiteMat = std(0xffffff, { roughness: 0.3 });
  const pupilMat = std(0x111111, { roughness: 0.3 });
  const pupils = [];
  for (const sx of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(o.zombie ? 0.14 : 0.1, 12, 10), whiteMat);
    eye.position.set(sx * 0.17, 0.07, 0.34);
    head.add(eye);
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(o.zombie ? 0.065 : 0.055, 8, 8), pupilMat);
    pupil.position.set(0, 0, o.zombie ? 0.115 : 0.085);
    eye.add(pupil);
    pupils.push(pupil);
  }
  // Silly mouth.
  const mouth = new THREE.Mesh(
    new THREE.BoxGeometry(o.zombie ? 0.26 : 0.2, o.zombie ? 0.1 : 0.05, 0.06),
    std(0x4a1d2a),
  );
  mouth.position.set(0, -0.17, 0.4);
  head.add(mouth);
  if (o.zombie) {
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.05), whiteMat);
    tooth.position.set(0.06, -0.12, 0.43);
    head.add(tooth);
  }

  const hats = Array.isArray(o.hat) ? o.hat : o.hat ? [o.hat] : [];
  for (const h of hats) addHat(head, h);
  if (o.extra) addExtra(body, o.extra);

  root.traverse((m) => {
    if (m.isMesh) m.castShadow = !!o.cast;
  });
  root.scale.setScalar(o.scale || 1);
  return {
    root,
    rig,
    head,
    body,
    armL,
    armR,
    legL,
    legR,
    pupils,
    skinMat,
    gait: o.gait || 6,
    zombie: !!o.zombie,
    mouth,
  };
}

/** @param {THREE.Group} head @param {string} kind */
function addHat(head, kind) {
  if (kind === 'cone') {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.75, 14), std(0xff7a1a));
    cone.position.y = 0.72;
    cone.castShadow = true;
    head.add(cone);
    const stripe = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.045, 6, 16), std(0xffffff));
    stripe.rotation.x = Math.PI / 2;
    stripe.position.y = 0.62;
    head.add(stripe);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.06, 14), std(0xff7a1a));
    base.position.y = 0.37;
    head.add(base);
  } else if (kind === 'sunhat') {
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 0.05, 20), std(0xf6e08a));
    brim.position.y = 0.36;
    head.add(brim);
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2),
      std(0xf6e08a),
    );
    dome.position.y = 0.36;
    head.add(dome);
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.04, 6, 16), std(0xff5fa2));
    band.rotation.x = Math.PI / 2;
    band.position.y = 0.42;
    head.add(band);
  } else if (kind === 'wig') {
    const white = std(0xfaf8f2, { roughness: 0.9 });
    const top = new THREE.Mesh(new THREE.SphereGeometry(0.5, 14, 12), white);
    top.position.set(0, 0.1, -0.08);
    head.add(top);
    for (const sx of [-1, 1]) {
      for (let i = 0; i < 2; i++) {
        const curl = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 8), white);
        curl.position.set(sx * 0.46, -0.05 - i * 0.2, 0.0);
        head.add(curl);
      }
    }
    const bow = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), std(0x111111));
    bow.position.set(0, -0.25, -0.5);
    head.add(bow);
  } else if (kind === 'tricorn') {
    const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.66, 0.66, 0.16, 3), std(0x1d2340));
    hat.position.y = 0.56;
    hat.rotation.y = Math.PI / 6;
    hat.castShadow = true;
    head.add(hat);
    const trim = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.04, 3), std(0xffd24a));
    trim.position.y = 0.5;
    trim.rotation.y = Math.PI / 6;
    head.add(trim);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 8), std(0x1d2340));
    dome.position.y = 0.55;
    head.add(dome);
  } else if (kind === 'helmet') {
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2),
      std(0xffd23f, { roughness: 0.35 }),
    );
    dome.position.y = 0.07;
    dome.scale.set(1, 0.95, 1.02);
    dome.castShadow = true;
    head.add(dome);
    const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.13), std(0xff3b5c, { emissive: 0x551122 }));
    star.position.set(0, 0.36, 0.34);
    head.add(star);
  }
}

/** @param {THREE.Group} body @param {string} kind */
function addExtra(body, kind) {
  if (kind === 'camera') {
    const cam = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.24, 0.2), std(0x222222));
    cam.position.set(0, -0.05, 0.42);
    body.add(cam);
    const lens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.07, 0.1, 10),
      std(0x88ccff, { emissive: 0x224466 }),
    );
    lens.rotation.x = Math.PI / 2;
    lens.position.set(0, -0.05, 0.54);
    body.add(lens);
  } else if (kind === 'tie') {
    const tie = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.05), std(0xd63a3a));
    tie.position.set(0, 0.05, 0.4);
    body.add(tie);
  } else if (kind === 'cape') {
    const cape = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.0, 0.06), std(0xff3b5c, { roughness: 0.5 }));
    cape.position.set(0, -0.05, -0.42);
    cape.rotation.x = 0.12;
    cape.castShadow = true;
    body.add(cape);
  } else if (kind === 'coat') {
    const sash = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.8, 0.05), std(0xffd24a));
    sash.position.set(0, 0, 0.4);
    body.add(sash);
    const tails = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.08), std(0x1f3d8f));
    tails.position.set(0, -0.5, -0.32);
    body.add(tails);
  }
}

/**
 * Goofy walk / idle animation.
 * @param {ReturnType<typeof buildCharacter>} ch
 * @param {number} t
 * @param {number} amount 0..1 movement amount
 */
export function animateWalk(ch, t, amount) {
  const ph = t * ch.gait;
  const s = Math.sin(ph);
  ch.legL.rotation.x = s * 0.85 * amount;
  ch.legR.rotation.x = -s * 0.85 * amount;
  if (ch.zombie) {
    ch.armL.rotation.x = -1.35 + Math.sin(ph * 0.5) * 0.2;
    ch.armR.rotation.x = -1.35 + Math.cos(ph * 0.5) * 0.2;
    ch.armL.rotation.z = 0.15;
    ch.armR.rotation.z = -0.15;
  } else {
    ch.armL.rotation.x = -s * 0.8 * amount;
    ch.armR.rotation.x = s * 0.8 * amount;
  }
  ch.rig.position.y = Math.abs(s) * 0.09 * amount;
  ch.rig.rotation.z = Math.sin(ph * 0.5) * 0.1 * amount;
  ch.body.scale.y = 1 + Math.sin(t * 2.3) * 0.02;
  ch.head.rotation.z = Math.sin(ph * 0.5) * 0.08 * amount;
  const wob = Math.sin(t * 3.7) * 0.03;
  ch.pupils[0].position.x = wob;
  ch.pupils[1].position.x = -wob * 0.6;
}
