<script>
    import { onMount } from 'svelte';
    import { THRONE_ELEMENTS, LIVING_CREATURES } from '$lib/data/revelation-4.js';

    /** Called with an element id when a hotspot is hovered, and null when it is left. */
    let { onactive = (/** @type {string | null} */ id) => {} } = $props();

    /** @type {HTMLDivElement | undefined} */
    let host = $state();
    let ready = $state(false);
    let failed = $state(false);
    /** Screen positions of the hotspots, recomputed each frame. */
    let markers = $state(
        THRONE_ELEMENTS.map((element) => ({ ...element, x: 0, y: 0, visible: false }))
    );
    let hovered = $state(/** @type {string | null} */ (null));

    function setHovered(/** @type {string | null} */ id) {
        hovered = id;
        onactive(id);
    }

    onMount(() => {
        let disposed = false;
        /** @type {any} */ let cleanup = null;

        // three is loaded on demand: it is far larger than the rest of the
        // site, and no other page needs it.
        (async () => {
            const THREE = await import('three');
            const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
            const { RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js');
            const { mergeGeometries } = await import('three/addons/utils/BufferGeometryUtils.js');
            if (disposed || !host) return;

            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            /** @type {any} */ let renderer;
            try {
                renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
            } catch (err) {
                failed = true;
                return;
            }
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(host.clientWidth, host.clientHeight);
            renderer.outputColorSpace = THREE.SRGBColorSpace;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.05;
            host.appendChild(renderer.domElement);

            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x05070c);
            // Haze rather than darkness: the far ranks of the company should
            // recede into light, the way the room is described.
            scene.fog = new THREE.FogExp2(0x0e1a2b, 0.0085);

            // A procedural environment, so the gold and the sea of glass have
            // something to reflect without shipping an HDRI.
            const pmrem = new THREE.PMREMGenerator(renderer);
            scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
            scene.environmentIntensity = 0.32;

            const camera = new THREE.PerspectiveCamera(48, host.clientWidth / host.clientHeight, 0.1, 400);
            camera.position.set(0, 8.5, 30);

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.target.set(0, 4.5, 0);
            controls.enableDamping = true;
            controls.dampingFactor = 0.06;
            controls.minDistance = 14;
            // Far enough back to take in the whole company round about.
            controls.maxDistance = 82;
            // Kept above the sea of glass and below the zenith.
            controls.minPolarAngle = 0.35;
            controls.maxPolarAngle = 1.48;
            controls.enablePan = false;
            controls.autoRotate = !reduceMotion;
            controls.autoRotateSpeed = 0.35;

            // ---------------------------------------------------------- materials
            const stone = new THREE.MeshStandardMaterial({ color: 0xe8e2d6, roughness: 0.42, metalness: 0.08 });
            const gold = new THREE.MeshStandardMaterial({ color: 0xd9a441, roughness: 0.22, metalness: 0.95 });
            const robe = new THREE.MeshStandardMaterial({ color: 0xf3efe6, roughness: 0.62, metalness: 0.02 });
            const jasper = new THREE.MeshStandardMaterial({
                color: 0xd8834f,
                roughness: 0.3,
                metalness: 0.35,
                emissive: 0x612714,
                emissiveIntensity: 0.35
            });

            /** Everything built here is tracked so it can be disposed on teardown. */
            /** @type {any[]} */ const geometries = [];
            /** @type {any[]} */ const materials = [stone, gold, robe, jasper];
            /** @param {any} g */ const track = (g) => { geometries.push(g); return g; };
            /** @param {any} m */ const trackM = (m) => { materials.push(m); return m; };

            // ------------------------------------------------- the sea of glass
            const sea = new THREE.Mesh(
                track(new THREE.CircleGeometry(160, 96)),
                trackM(new THREE.MeshStandardMaterial({
                    color: 0x0b1a2a,
                    roughness: 0.06,
                    metalness: 1,
                    envMapIntensity: 1.4
                }))
            );
            sea.rotation.x = -Math.PI / 2;
            scene.add(sea);

            // Rings of light spreading out over the sea — the crystal catching
            // the throne, rather than a flat mirror.
            /** @type {any[]} */ const ripples = [];
            for (let i = 0; i < 5; i++) {
                const ring = new THREE.Mesh(
                    track(new THREE.RingGeometry(9 + i * 6, 9.35 + i * 6, 128)),
                    trackM(new THREE.MeshBasicMaterial({
                        color: 0x8fd0ff,
                        transparent: true,
                        opacity: 0.16 - i * 0.022,
                        blending: THREE.AdditiveBlending,
                        side: THREE.DoubleSide,
                        depthWrite: false
                    }))
                );
                ring.rotation.x = -Math.PI / 2;
                ring.position.y = 0.02 + i * 0.001;
                scene.add(ring);
                ripples.push(ring);
            }

            // ------------------------------------------------------- the dais
            const daisGroup = new THREE.Group();
            for (let i = 0; i < 3; i++) {
                const step = new THREE.Mesh(
                    track(new THREE.CylinderGeometry(8.6 - i * 1.5, 9 - i * 1.5, 0.85, 64)),
                    stone
                );
                step.position.y = 0.42 + i * 0.85;
                daisGroup.add(step);
            }
            scene.add(daisGroup);

            // ------------------------------------------------------ the throne
            const throne = new THREE.Group();
            const seat = new THREE.Mesh(track(new THREE.BoxGeometry(5.2, 0.9, 4.4)), jasper);
            seat.position.y = 4.2;
            const back = new THREE.Mesh(track(new THREE.BoxGeometry(5.2, 6.4, 0.7)), jasper);
            back.position.set(0, 7.6, -1.9);
            throne.add(seat, back);
            for (const x of [-2.4, 2.4]) {
                const arm = new THREE.Mesh(track(new THREE.BoxGeometry(0.55, 0.55, 4.4)), gold);
                arm.position.set(x, 5.05, 0);
                throne.add(arm);
                const post = new THREE.Mesh(track(new THREE.CylinderGeometry(0.3, 0.3, 4.6, 16)), gold);
                post.position.set(x, 2.35, -1.9);
                throne.add(post);
            }
            scene.add(throne);

            // ------------------------------------------- the one on the throne
            // Rendered as light: the chapter gives an appearance — jasper and
            // sardine stone — rather than features, so the figure carries a
            // form and a robe, and no face.
            const figureMat = trackM(new THREE.MeshStandardMaterial({
                color: 0xfff8ec,
                roughness: 0.5,
                metalness: 0.04,
                emissive: 0xffe3b0,
                emissiveIntensity: 0.7
            }));
            const seated = new THREE.Group();

            // The robe falls over the lap and down the front of the seat.
            const lap = new THREE.Mesh(track(new THREE.BoxGeometry(3.4, 1.5, 3.1)), figureMat);
            lap.position.set(0, 5.35, 0.5);
            const skirt = new THREE.Mesh(track(new THREE.CylinderGeometry(1.9, 2.5, 2.4, 24)), figureMat);
            skirt.position.set(0, 4.9, 0.3);
            const torso = new THREE.Mesh(track(new THREE.CapsuleGeometry(1.1, 1.9, 8, 20)), figureMat);
            torso.position.set(0, 7.2, -0.35);
            const shoulders = new THREE.Mesh(track(new THREE.SphereGeometry(1.35, 24, 24)), figureMat);
            shoulders.scale.set(1.15, 0.55, 0.9);
            shoulders.position.set(0, 8.15, -0.35);
            const head = new THREE.Mesh(track(new THREE.SphereGeometry(0.74, 24, 24)), figureMat);
            head.position.set(0, 9.1, -0.4);
            seated.add(skirt, lap, torso, shoulders, head);

            // Arms resting along the arms of the throne.
            for (const side of [-1, 1]) {
                const arm = new THREE.Mesh(track(new THREE.CapsuleGeometry(0.36, 2.1, 6, 14)), figureMat);
                arm.position.set(side * 1.62, 6.55, -0.1);
                arm.rotation.z = side * 0.22;
                arm.rotation.x = -0.35;
                seated.add(arm);
            }
            scene.add(seated);

            // The glory: a nimbus behind the head, and shells of light around
            // the whole figure.
            const presence = new THREE.Mesh(
                track(new THREE.SphereGeometry(1.75, 32, 32)),
                trackM(new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    transparent: true,
                    opacity: 0.9,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false
                }))
            );
            presence.position.set(0, 9.1, -1.15);
            scene.add(presence);

            /** @type {any[]} */ const halos = [];
            for (let i = 0; i < 3; i++) {
                const halo = new THREE.Mesh(
                    track(new THREE.SphereGeometry(3.4 + i * 2.6, 32, 32)),
                    trackM(new THREE.MeshBasicMaterial({
                        color: i === 0 ? 0xfff4d8 : 0x9fc9ff,
                        transparent: true,
                        opacity: 0.14 - i * 0.04,
                        blending: THREE.AdditiveBlending,
                        depthWrite: false
                    }))
                );
                halo.position.set(0, 7.6, -0.5);
                scene.add(halo);
                halos.push(halo);
            }

            const throneLight = new THREE.PointLight(0xfff1d4, 900, 160, 2);
            throneLight.position.set(0, 7.8, 0.4);
            scene.add(throneLight);
            scene.add(new THREE.AmbientLight(0x6f86a8, 0.55));
            scene.add(new THREE.HemisphereLight(0xbcd6ff, 0x0a1018, 0.6));

            // ------------------------------------------------------ the rainbow
            // Round about the throne — billboarded, so it keeps arcing behind
            // the throne from wherever the camera comes to rest.
            const rainbow = new THREE.Group();
            const spectrum = [0xff6b6b, 0xffa552, 0xffe066, 0x63d471, 0x4fb8ff, 0x6f7dff, 0xa86ede];
            spectrum.forEach((color, i) => {
                const ring = new THREE.Mesh(
                    track(new THREE.TorusGeometry(11.4 + i * 0.5, 0.24, 10, 160)),
                    trackM(new THREE.MeshBasicMaterial({
                        color,
                        transparent: true,
                        opacity: 0.3,
                        blending: THREE.AdditiveBlending,
                        depthWrite: false
                    }))
                );
                rainbow.add(ring);
            });
            rainbow.position.set(0, 6.4, -0.6);
            scene.add(rainbow);

            // ------------------------------------------------- the seven lamps
            /** @type {any[]} */ const lamps = [];
            for (let i = 0; i < 7; i++) {
                const angle = -0.85 + (i / 6) * 1.7;
                const lamp = new THREE.Group();
                const stem = new THREE.Mesh(track(new THREE.CylinderGeometry(0.12, 0.3, 2.2, 12)), gold);
                stem.position.y = 1.1;
                const bowl = new THREE.Mesh(track(new THREE.CylinderGeometry(0.52, 0.28, 0.5, 14)), gold);
                bowl.position.y = 2.35;
                const flameMat = trackM(new THREE.MeshBasicMaterial({ color: 0xffd591, transparent: true, opacity: 0.95 }));
                const flame = new THREE.Mesh(track(new THREE.SphereGeometry(0.42, 16, 16)), flameMat);
                flame.position.y = 2.95;
                lamp.add(stem, bowl, flame);
                lamp.position.set(Math.sin(angle) * 11.5, 0, Math.cos(angle) * 11.5);
                scene.add(lamp);
                lamps.push({ flame, mat: flameMat, phase: i * 0.9 });
            }
            const lampLight = new THREE.PointLight(0xffb35c, 260, 60, 2);
            lampLight.position.set(0, 3.4, 11);
            scene.add(lampLight);

            // ------------------------------------------ the four living creatures
            for (const creature of LIVING_CREATURES) {
                const group = new THREE.Group();
                const body = new THREE.Mesh(track(new THREE.CapsuleGeometry(0.95, 3.4, 8, 20)), robe);
                body.position.y = 3.2;
                group.add(body);
                const head = new THREE.Mesh(track(new THREE.SphereGeometry(0.78, 20, 20)), stone);
                head.position.y = 5.6;
                group.add(head);
                // Six wings apiece, as the chapter has it.
                for (let w = 0; w < 6; w++) {
                    const wing = new THREE.Mesh(
                        track(new THREE.PlaneGeometry(4.6, 1.5)),
                        trackM(new THREE.MeshStandardMaterial({
                            color: 0xf3efe6,
                            roughness: 0.7,
                            metalness: 0.02,
                            transparent: true,
                            opacity: 0.82,
                            side: THREE.DoubleSide
                        }))
                    );
                    const side = w % 2 === 0 ? 1 : -1;
                    const tier = Math.floor(w / 2);
                    wing.position.set(side * 2.5, 4.6 - tier * 1.15, -0.2);
                    wing.rotation.z = side * (0.5 - tier * 0.28);
                    wing.rotation.y = side * 0.25;
                    group.add(wing);
                }
                group.position.set(Math.sin(creature.angle) * 10.5, 0, Math.cos(creature.angle) * 10.5);
                group.lookAt(0, 3, 0);
                scene.add(group);
            }

            // ------------------------------------- the four and twenty elders
            for (let i = 0; i < 24; i++) {
                const angle = (i / 24) * Math.PI * 2;
                const group = new THREE.Group();
                const seatBlock = new THREE.Mesh(track(new THREE.BoxGeometry(2.2, 1.5, 2)), stone);
                seatBlock.position.y = 0.75;
                const seatBack = new THREE.Mesh(track(new THREE.BoxGeometry(2.2, 2.6, 0.4)), stone);
                seatBack.position.set(0, 2.1, -0.8);
                const figure = new THREE.Mesh(track(new THREE.CapsuleGeometry(0.62, 1.5, 6, 14)), robe);
                figure.position.y = 2.35;
                const head = new THREE.Mesh(track(new THREE.SphereGeometry(0.42, 16, 16)), robe);
                head.position.y = 3.55;
                const crown = new THREE.Mesh(track(new THREE.TorusGeometry(0.42, 0.09, 8, 20)), gold);
                crown.position.y = 3.85;
                crown.rotation.x = Math.PI / 2;
                group.add(seatBlock, seatBack, figure, head, crown);
                group.position.set(Math.sin(angle) * 22, 0, Math.cos(angle) * 22);
                group.lookAt(0, 2.4, 0);
                scene.add(group);
            }

            // ------------------------------------ the innumerable company
            // Ten thousand times ten thousand is not a count anyone renders, so
            // the ranks are drawn thick enough to read as a multitude and left
            // to the fog beyond that. One instanced draw call carries the lot.
            const angelParts = [
                track(new THREE.CapsuleGeometry(0.5, 1.5, 4, 10)).translate(0, 1.25, 0),
                track(new THREE.SphereGeometry(0.36, 10, 8)).translate(0, 2.36, 0)
            ];
            for (const side of [-1, 1]) {
                const wing = track(new THREE.PlaneGeometry(1.7, 0.55));
                wing.rotateY(side * 0.5);
                wing.rotateZ(side * 0.45);
                wing.translate(side * 0.85, 1.75, -0.15);
                angelParts.push(wing);
            }
            const angelGeometry = track(mergeGeometries(angelParts, false));

            /** @type {{ x: number, z: number, y: number, angle: number, scale: number }[]} */
            const places = [];
            let ring = 0;
            for (let r = 30; r <= 98; r += 4.2, ring++) {
                const perRing = Math.round(r * 1.15);
                for (let i = 0; i < perRing; i++) {
                    // Jitter on both axes, or the ranks read as a wire grid.
                    const angle = (i / perRing) * Math.PI * 2 + (ring % 2 ? Math.PI / perRing : 0) + (Math.random() - 0.5) * 0.05;
                    const radius = r + (Math.random() - 0.5) * 2.2;
                    places.push({
                        x: Math.sin(angle) * radius,
                        z: Math.cos(angle) * radius,
                        // Outer ranks lift, so the company banks away like an
                        // amphitheatre instead of lying flat.
                        y: (radius - 30) * 0.055,
                        angle,
                        scale: 0.88 + Math.random() * 0.26
                    });
                }
            }

            const angelMat = trackM(new THREE.MeshStandardMaterial({
                color: 0xf6f2e8,
                roughness: 0.66,
                metalness: 0.03,
                emissive: 0xcfe0ff,
                emissiveIntensity: 0.22,
                side: THREE.DoubleSide
            }));
            const company = new THREE.InstancedMesh(angelGeometry, angelMat, places.length);
            const dummy = new THREE.Object3D();
            const tint = new THREE.Color();
            places.forEach((place, i) => {
                dummy.position.set(place.x, place.y, place.z);
                dummy.rotation.set(0, place.angle + Math.PI, 0);
                dummy.scale.setScalar(place.scale);
                dummy.updateMatrix();
                company.setMatrixAt(i, dummy.matrix);
                // A little warmth nearer the throne, cooler further out.
                const warmth = 1 - Math.min(1, (Math.hypot(place.x, place.z) - 30) / 68);
                tint.setRGB(1, 0.97 + warmth * 0.03, 0.92 + (1 - warmth) * 0.08);
                company.setColorAt(i, tint);
            });
            company.instanceMatrix.needsUpdate = true;
            if (company.instanceColor) company.instanceColor.needsUpdate = true;
            company.frustumCulled = false;
            scene.add(company);

            // The light the far ranks recede into, rather than plain darkness.
            const horizon = new THREE.Mesh(
                track(new THREE.RingGeometry(74, 132, 128)),
                trackM(new THREE.MeshBasicMaterial({
                    color: 0x7fb2e8,
                    transparent: true,
                    opacity: 0.14,
                    blending: THREE.AdditiveBlending,
                    side: THREE.DoubleSide,
                    depthWrite: false
                }))
            );
            horizon.rotation.x = -Math.PI / 2;
            horizon.position.y = 0.04;
            scene.add(horizon);

            // ------------------------------------------------------- lightnings
            /** @type {any[]} */ const bolts = [];
            const boltMat = trackM(new THREE.MeshBasicMaterial({
                color: 0xdcefff,
                transparent: true,
                opacity: 0,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            }));
            for (let i = 0; i < 5; i++) {
                const bolt = new THREE.Mesh(track(new THREE.CylinderGeometry(0.05, 0.16, 16, 6)), boltMat);
                const angle = (i / 5) * Math.PI * 2 + 0.4;
                bolt.position.set(Math.sin(angle) * 5, 11, Math.cos(angle) * 5);
                bolt.rotation.z = Math.sin(angle) * 0.5;
                bolt.rotation.x = Math.cos(angle) * 0.5;
                scene.add(bolt);
                bolts.push(bolt);
            }
            const boltLight = new THREE.PointLight(0xbfe0ff, 0, 120, 2);
            boltLight.position.set(0, 12, 0);
            scene.add(boltLight);

            // ------------------------------------------------------- hotspots
            const anchors = THRONE_ELEMENTS.map((element) => new THREE.Vector3(...element.anchor));
            const projected = new THREE.Vector3();

            function updateMarkers() {
                if (!host) return;
                const w = host.clientWidth;
                const h = host.clientHeight;
                markers = THRONE_ELEMENTS.map((element, i) => {
                    projected.copy(anchors[i]).project(camera);
                    return {
                        ...element,
                        x: (projected.x * 0.5 + 0.5) * w,
                        y: (-projected.y * 0.5 + 0.5) * h,
                        // Behind the camera, or off the edge: don't draw it.
                        visible: projected.z < 1 && Math.abs(projected.x) < 0.92 && Math.abs(projected.y) < 0.92
                    };
                });
            }

            // ---------------------------------------------------------- loop
            const clock = new THREE.Clock();
            let raf = 0;
            let nextBolt = 2.5;

            function frame() {
                raf = requestAnimationFrame(frame);
                // getDelta() advances the clock, so elapsed is read after it —
                // calling getElapsedTime() first would leave delta at zero.
                const delta = clock.getDelta();
                const t = clock.elapsedTime;

                if (!reduceMotion) {
                    // The lamps burn rather than glow flatly.
                    for (const lamp of lamps) {
                        const flicker = 0.86 + Math.sin(t * 5.5 + lamp.phase) * 0.09 + Math.sin(t * 11.3 + lamp.phase) * 0.05;
                        lamp.mat.opacity = flicker;
                        lamp.flame.scale.setScalar(0.92 + flicker * 0.14);
                    }

                    const pulse = 1 + Math.sin(t * 1.15) * 0.045;
                    presence.scale.setScalar(pulse);
                    halos.forEach((halo, i) => halo.scale.setScalar(pulse + Math.sin(t * 0.8 + i) * 0.03));
                    throneLight.intensity = 900 + Math.sin(t * 1.15) * 90;
                    // The figure brightens and settles with the same breath.
                    figureMat.emissiveIntensity = 0.7 + Math.sin(t * 1.15) * 0.09;

                    ripples.forEach((ring, i) => {
                        ring.rotation.z += delta * (0.05 - i * 0.006);
                    });

                    // Lightnings out of the throne, at intervals rather than
                    // on a beat — they should never look like a metronome.
                    nextBolt -= delta;
                    if (nextBolt <= 0) {
                        boltMat.opacity = 0.85;
                        boltLight.intensity = 700;
                        nextBolt = 2.2 + Math.random() * 5;
                    } else {
                        boltMat.opacity *= 0.86;
                        boltLight.intensity *= 0.82;
                    }
                }

                rainbow.quaternion.copy(camera.quaternion);
                controls.update();
                updateMarkers();
                renderer.render(scene, camera);
            }
            frame();
            ready = true;

            // --------------------------------------------------------- resize
            const observer = new ResizeObserver(() => {
                if (!host) return;
                const w = host.clientWidth;
                const h = host.clientHeight;
                if (!w || !h) return;
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h);
            });
            observer.observe(host);

            cleanup = () => {
                cancelAnimationFrame(raf);
                observer.disconnect();
                controls.dispose();
                company.dispose();
                for (const geometry of geometries) geometry.dispose();
                for (const material of materials) material.dispose();
                pmrem.dispose();
                scene.environment?.dispose?.();
                renderer.dispose();
                renderer.domElement.remove();
            };
        })();

        return () => {
            disposed = true;
            cleanup?.();
        };
    });
</script>

<div class="scene">
    <div class="scene__canvas" bind:this={host}></div>

    {#if failed}
        <div class="scene__fallback">
            <p class="scene__fallback-title">This scene needs WebGL.</p>
            <p class="scene__fallback-note">
                Your browser could not open a 3D context. The chapter itself is the better source:
                Revelation 4.
            </p>
        </div>
    {:else if !ready}
        <div class="scene__loading">
            <span class="scene__spinner" aria-hidden="true"></span>
            <p>Building the throne room</p>
        </div>
    {/if}

    <!-- Hotspots ride on top of the canvas, tracking their anchor in the scene. -->
    {#if ready}
        <div class="scene__markers">
            {#each markers as marker (marker.id)}
                {#if marker.visible}
                    <button
                        type="button"
                        class="scene__marker"
                        class:is-active={hovered === marker.id}
                        style="left: {marker.x}px; top: {marker.y}px;"
                        onmouseenter={() => setHovered(marker.id)}
                        onmouseleave={() => setHovered(null)}
                        onfocus={() => setHovered(marker.id)}
                        onblur={() => setHovered(null)}
                        onclick={() => setHovered(hovered === marker.id ? null : marker.id)}
                    >
                        <span class="scene__marker-dot" aria-hidden="true"></span>
                        <span class="scene__marker-label">
                            <span class="scene__marker-num">{marker.num}</span>
                            {marker.label}
                        </span>
                    </button>
                {/if}
            {/each}
        </div>

        <p class="scene__hint">Drag to orbit · scroll to draw near</p>
    {/if}
</div>

<style>
    .scene {
        position: relative;
        width: 100%;
        height: clamp(28rem, 70vh, 46rem);
        overflow: hidden;
        border: 1px solid var(--doc-line);
        border-radius: 3px;
        background: #05070c;
    }
    .scene__canvas { position: absolute; inset: 0; }
    .scene__canvas :global(canvas) { display: block; width: 100%; height: 100%; touch-action: none; }

    .scene__loading,
    .scene__fallback {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        text-align: center;
        padding: 2rem;
        color: rgba(241, 235, 224, 0.7);
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        background: #05070c;
    }
    .scene__spinner {
        width: 2.2rem;
        height: 2.2rem;
        border: 2px solid rgba(241, 235, 224, 0.16);
        border-top-color: var(--doc-ember);
        border-radius: 999px;
        animation: sceneSpin 0.9s linear infinite;
    }
    @keyframes sceneSpin { to { transform: rotate(360deg); } }
    .scene__fallback-title {
        font-family: 'Newsreader', Georgia, serif;
        font-size: 1.4rem;
        letter-spacing: normal;
        text-transform: none;
        color: #f1ebe0;
        margin: 0;
    }
    .scene__fallback-note {
        letter-spacing: 0.1em;
        text-transform: none;
        max-width: 28rem;
        line-height: 1.7;
        margin: 0;
    }

    /* Hotspots */
    .scene__markers { position: absolute; inset: 0; pointer-events: none; }
    .scene__marker {
        position: absolute;
        transform: translate(-50%, -50%);
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
        pointer-events: auto;
        background: none;
        border: none;
        padding: 0.35rem;
        cursor: pointer;
        color: rgba(241, 235, 224, 0.82);
    }
    .scene__marker-dot {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 999px;
        border: 1px solid rgba(241, 235, 224, 0.7);
        background: rgba(11, 11, 13, 0.5);
        flex: none;
        transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
    }
    .scene__marker-label {
        display: inline-flex;
        align-items: baseline;
        gap: 0.5rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        white-space: nowrap;
        background: rgba(5, 7, 12, 0.68);
        border: 1px solid rgba(241, 235, 224, 0.16);
        border-radius: 2px;
        padding: 0.4rem 0.6rem;
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        opacity: 0.9;
        transition: opacity 0.3s ease, border-color 0.3s ease, color 0.3s ease;
    }
    .scene__marker-num { color: var(--doc-ember); }
    .scene__marker:hover .scene__marker-dot,
    .scene__marker.is-active .scene__marker-dot {
        background: var(--doc-ember);
        border-color: var(--doc-ember);
        transform: scale(1.25);
    }
    .scene__marker:hover .scene__marker-label,
    .scene__marker.is-active .scene__marker-label {
        opacity: 1;
        border-color: var(--doc-ember);
        color: #ffffff;
    }

    .scene__hint {
        position: absolute;
        left: 50%;
        bottom: 0.9rem;
        transform: translateX(-50%);
        margin: 0;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: rgba(241, 235, 224, 0.45);
        pointer-events: none;
    }

    @media (prefers-reduced-motion: reduce) {
        .scene__spinner { animation: none; }
        .scene__marker-dot, .scene__marker-label { transition: none; }
    }
</style>
