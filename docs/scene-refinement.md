# Refining the 3D scene

How to take `/scene/revelation-4` from primitives to something finished, in the
order that pays off soonest. Written 12 August 2026, when the scene was first built.

**Files it concerns**

| Path | What it holds |
| --- | --- |
| `src/lib/components/ThroneScene.svelte` | The whole scene: renderer, controls, geometry, animation loop, hotspot projection |
| `src/lib/data/revelation-4.js` | The seven-plus-one elements, their passages, and the anchor each hotspot is pinned to |
| `src/routes/scene/revelation-4/+page.svelte` | Page around the scene: header, reading panel, the written list |


---

## Where it stands now

Everything is built from three.js primitives — no external assets at all.

- **Sea of glass** — 160-unit `CircleGeometry`, `roughness: 0.06`, `metalness: 1`, plus five additive rings drifting over it.
- **Dais and throne** — stacked cylinders; boxes for seat, back, arms, posts. Jasper-toned emissive material with gold fittings.
- **The One seated** — capsule torso, flattened sphere for shoulders, box-and-cylinder robe, featureless head. Emissive, pulsing with the throne light. No face: the chapter gives an appearance, not features.
- **Rainbow** — seven additive torus rings, billboarded to the camera each frame so it always arcs behind the throne.
- **Seven lamps** — arc at radius 11.5, each flame flickering on its own phase.
- **Four living creatures** — capsule bodies, six plane wings apiece, at the quarters.
- **Twenty-four elders** — ring at radius 22, each with seat, figure, gold torus crown.
- **The innumerable company** — 1,243 instances in 17 ranks, radius 30 → 98. One merged geometry (body + head + two wings), one `InstancedMesh`, one draw call. Per-instance jitter, scale and tint.
- **Lightnings** — five bolts firing at irregular intervals with a light spike.
- **Environment** — `RoomEnvironment` through a PMREM pass (procedural, no HDRI file). `scene.environmentIntensity = 0.32`.
- **Fog** — `FogExp2(0x0e1a2b, 0.0085)`: haze rather than darkness, so the far ranks recede into light.

Cost: three lazy-loads as its own ~720 KB chunk (~180 KB gzipped) and no other page pays for it.

---

## Stage 0 — get a tuning loop first

Everything below is guesswork without this. Every position in the scene is a
literal that was written without seeing the result.

Add `lil-gui` behind a dev flag, bind the numbers that actually matter, tune
live, then paste the values back into source and delete the binding.

```js
if (import.meta.env.DEV) {
  const { GUI } = await import('lil-gui');
  // Worth binding first:
  //   renderer.toneMappingExposure
  //   throneLight.intensity, scene.environmentIntensity
  //   scene.fog.density
  //   rainbow.position.y, ring radius
  //   the figure's scale and seat height
  //   company ring step (4.2) and per-ring count (r * 1.15)
}
```

`new THREE.AxesHelper(20)` and `GridHelper` while laying things out — delete before shipping.

**One afternoon here is worth more than a week of blind edits.**

---

## Stage 1 — light and post-processing

Where it stops looking like grey primitives. Biggest jump, no new geometry.

- **Bloom.** The glory, lamps and lightning are emissive but nothing blooms.
  `EffectComposer` + `UnrealBloomPass` from `three/addons/postprocessing/` is the
  single change that makes light read *as light*. Put `OutputPass` last and move
  colour-space handling off the renderer onto the composer.
- **A real HDRI.** Swap `RoomEnvironment` for an `.hdr` via `RGBELoader` — a
  cathedral or bright-sky probe. Gold and the sea of glass currently reflect a
  procedural studio box; an HDRI changes their character completely. ~2–4 MB, so
  lazy-load it alongside the scene.
- Re-tune `toneMappingExposure` and `environmentIntensity` afterwards — the
  present values are set for the procedural environment and will be wrong.

---

## Stage 2 — materials and textures

Same geometry, far more detail. Textures fool the eye long before polygons do.

- PBR maps on what already exists: normal + roughness for the marble dais,
  a scratched-metal roughness map for the gold, cloth normal for the robes.
- **Sea of glass** is a flat mirror at the moment. Either `Reflector`
  (`three/addons/objects/Reflector.js`) for true planar reflection of the throne,
  or keep the metal and scroll a low-amplitude normal map across it so the
  crystal has a surface.
- `MeshPhysicalMaterial` with `transmission` / `thickness` for the jasper throne,
  so it reads as stone lit from within.

---

## Stage 3 — geometry and models

Only worth custom modelling once the light and materials are right.

Cheap upgrades without leaving code:

- `LatheGeometry` for the lampstands — a profile curve beats cylinder + cone.
- `ExtrudeGeometry` with bevel for the throne.
- `TubeGeometry` along a jagged curve for the lightning.

Real assets: model in Blender → export `.glb` (Draco-compressed) → `GLTFLoader`.

**Do the four living creatures and the seated figure first** — they carry the
most meaning and are the weakest as primitives. Keep the existing placement code
and swap the mesh in; the anchors in `revelation-4.js` do not change.

For the company, a modelled angel at ~500 tris still instances fine at 1,200+.
Two or three variants picked per instance would break up the repetition.

---

## Stage 4 — performance and honesty

- Budget by device: cap `setPixelRatio` (already at 2), scale the instance count
  and drop bloom on weak GPUs.
- Compress textures to KTX2/Basis before shipping more than a couple.
- **Every new mesh needs a line in the dispose block.** That discipline is
  already in the file — keep it, or the scene leaks on navigation.
- Add real loading progress once assets arrive; the present spinner assumes
  near-instant setup.

---

## Structure

When `ThroneScene.svelte` passes ~600 lines, split the builders out —
`src/lib/scene/throne.js`, `company.js`, `sea.js`, each exporting
`build(THREE, scene, track)` — and leave the component owning only the renderer,
controls, loop and hotspots.

Don't do it before then. Premature splitting only makes the tuning loop slower.

---

## Worth keeping as it is

- Hotspot anchors living in data, not in the scene code.
- The lazy `import('three')` — no other page should ever pay for it.
- The `track()` / `trackM()` dispose tracking.
- Hotspots as projected HTML rather than in-scene sprites: they stay crisp,
  selectable and styled like the rest of the site.

## Decisions already made, worth not re-litigating by accident

- **The figure has no face.** Revelation 4 gives an appearance — jasper and
  sardine stone — rather than features. The closing section of the page states
  this openly. Changing it means changing that copy too.
- **The company is from Revelation 5:11, not 4.** It is labelled with its own
  passage rather than being folded into the chapter-4 elements. The comment in
  `revelation-4.js` says so.
