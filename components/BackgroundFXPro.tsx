"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const MOBILE = 640;

function readCSSRGB(varName: string): THREE.Color {
    const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    const [r, g, b] = v.split(",").map((n) => parseFloat(n) / 255);
    return new THREE.Color(
        Number.isFinite(r) ? r : 1,
        Number.isFinite(g) ? g : 1,
        Number.isFinite(b) ? b : 1
    );
}

export default function BackgroundFXPro() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        // a11y: уважение reduce-motion
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const container = containerRef.current!;
        const DPR = Math.min(2, window.devicePixelRatio || 1);

        // Сцена/камера/рендер
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
        camera.position.set(0, 0, 6);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
        });
        renderer.setPixelRatio(DPR);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style.position = "fixed";
        renderer.domElement.style.inset = "0";
        renderer.domElement.style.zIndex = "0";          // ВАЖНО: выше фона, но ниже контента
        renderer.domElement.style.pointerEvents = "none";
        container.appendChild(renderer.domElement);

        // ====== Звёзды (Points) ======
        const starCount = Math.min(
            1200,
            Math.max(300, Math.floor((window.innerWidth * window.innerHeight) / 2000))
        );
        const starGeo = new THREE.BufferGeometry();
        const pos = new Float32Array(starCount * 3);
        const radius = 40;
        for (let i = 0; i < starCount; i++) {
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const r = radius * Math.cbrt(Math.random());
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            pos.set([x, y, z], i * 3);
        }
        starGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

        const starMat = new THREE.PointsMaterial({
            color: 0xffffff,
            size: window.innerWidth < MOBILE ? 0.03 : 0.05,
            sizeAttenuation: true,
            transparent: true,
            opacity: parseFloat(
                getComputedStyle(document.documentElement).getPropertyValue("--fx-star-alpha").trim() || "0.3"
            ),
            depthWrite: false,
        });
        const stars = new THREE.Points(starGeo, starMat);
        scene.add(stars);

        // ====== Туманность (шейдер) ======
        const nebulaGeo = new THREE.PlaneGeometry(18, 10, 1, 1);

        // GLSL simplex noise
        const noiseGLSL = `
    vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
    vec4 mod289(vec4 x){return x - floor(x * (1.0/289.0)) * 289.0;}
    vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    float snoise(vec3 v){
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 =   v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy; 
      vec3 x3 = x0 - D.yyy;      
      i = mod289(i); 
      vec4 p = permute( permute( permute( 
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857; 
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z); 
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m*m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
    }`;

        const nebulaMat = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            uniforms: {
                uTime: { value: 0 },
                uBase: { value: new THREE.Color(1, 1, 1) },
                uAccent: { value: new THREE.Color(0.7, 0.8, 1) },
                uIntensity: { value: window.innerWidth < MOBILE ? 0.35 : 0.5 },
                uScale: { value: 1.6 },
            },
            vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
            fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uBase;
        uniform vec3 uAccent;
        uniform float uIntensity;
        uniform float uScale;
        ${noiseGLSL}
        void main(){
          vec2 uv = vUv * uScale;
          float ct = cos(uTime * 0.03), st = sin(uTime * 0.03);
          mat2 rot = mat2(ct, -st, st, ct);
          uv = rot * (uv - 0.5) + 0.5;

          float n = 0.0;
          float amp = 0.6;
          float freq = 1.0;
          for(int i=0;i<4;i++){
            n += amp * snoise(vec3(uv*freq, uTime*0.02));
            freq *= 2.0;
            amp *= 0.55;
          }
          n = smoothstep(-0.3, 0.8, n);

          vec3 col = mix(uBase, uAccent, pow(n, 1.2));
          float alpha = uIntensity * (0.35 + 0.65 * n);
          gl_FragColor = vec4(col, alpha);
        }
      `,
        });

        const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
        nebula.position.set(0, 0, -2);
        scene.add(nebula);

        // Параллакс
        const parallax = new THREE.Vector2();
        function onPointer(e: PointerEvent) {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            parallax.set(x, -y);
        }
        window.addEventListener("pointermove", onPointer, { passive: true });

        // Resize
        function onResize() {
            const w = window.innerWidth, h = window.innerHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            starMat.size = w < MOBILE ? 0.03 : 0.05;
            nebulaMat.uniforms.uIntensity.value = w < MOBILE ? 0.35 : 0.5;
        }
        window.addEventListener("resize", onResize);

        // Смена темы: слушаем класс на <html>
        const mo = new MutationObserver(() => {
            nebulaMat.uniforms.uBase.value = readCSSRGB("--fx-base");
            nebulaMat.uniforms.uAccent.value = readCSSRGB("--fx-accent");
            starMat.opacity = parseFloat(
                getComputedStyle(document.documentElement).getPropertyValue("--fx-star-alpha").trim() || "0.3"
            );
            starMat.needsUpdate = true;
        });
        mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        // Инициал цветов
        nebulaMat.uniforms.uBase.value = readCSSRGB("--fx-base");
        nebulaMat.uniforms.uAccent.value = readCSSRGB("--fx-accent");

        // Анимация
        let raf = 0;
        const target = new THREE.Vector3();
        function animate(t: number) {
            nebulaMat.uniforms.uTime.value = t * 0.001;

            const strength = 0.6;
            target.set(parallax.x * strength, parallax.y * strength, 6);
            camera.position.lerp(target, 0.05);

            if (!reduce) {
                stars.rotation.y += 0.0006;
                stars.rotation.x += 0.0002;
            }

            renderer.render(scene, camera);
            raf = requestAnimationFrame(animate);
        }
        raf = requestAnimationFrame(animate);

        // Очистка
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("pointermove", onPointer);
            mo.disconnect();
            scene.clear();
            starGeo.dispose();
            nebulaGeo.dispose();
            nebulaMat.dispose();
            starMat.dispose();
            renderer.dispose();
            container.removeChild(renderer.domElement);
        };
    }, []);

    // Контейнер ниже контента, выше фоновой заливки
    return (
        <div
            ref={containerRef}
            data-webgl-bg
            aria-hidden
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
}
