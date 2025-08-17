import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimationIntro({ onFinish }) {
  const root = useRef(null);
  const sagiRef = useRef(null);
  const friedRef = useRef(null);
  const chickenRef = useRef(null);
  const burgerWrapRef = useRef(null);
  const sfcBrandRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([sagiRef.current, friedRef.current, chickenRef.current], {
        opacity: 0,
      });
      gsap.set(burgerWrapRef.current, {
        opacity: 0,
        scale: 0.2,
        rotate: -180,
        transformOrigin: "50% 50%",
      });
      gsap.set(sfcBrandRef.current, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Step 1: text fly in
      tl.fromTo(
        sagiRef.current,
        { x: -220, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.65 }
      )
        .fromTo(
          friedRef.current,
          { x: 220, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.65 },
          "-=0.30"
        )
        .fromTo(
          chickenRef.current,
          { x: -240, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7 },
          "-=0.28"
        );

      // Step 2: rotate + shrink text while fading
      tl.to(
        [sagiRef.current, friedRef.current, chickenRef.current],
        {
          rotate: 360,
          scale: 0.2,
          opacity: 0,
          duration: 0.8,
          transformOrigin: "center center",
        }
      );

      // Step 3: background to white
      tl.to(root.current, { backgroundColor: "#fff", duration: 0.3 }, "<");

      // Step 4: burger zooms out
      tl.to(
        burgerWrapRef.current,
        { opacity: 1, scale: 1, rotate: 360, duration: 1.0 },
        "-=0.6"
      );

      // Step 5: reveal SFC branding below the burger
      tl.to(
        sfcBrandRef.current,
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.3"
      );

      // Step 6: finish
      tl.add(() => onFinish && onFinish(), "+=0.8");
    }, root);

    return () => ctx.revert();
  }, [onFinish]);

  return (
    <div
      ref={root}
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "#000",
        color: "#ff2e2e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: '-200px', 
        }}
      >
        {/* Text and burger stacked and centered */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <div style={{ lineHeight: 1.1, fontWeight: 800, width: "100%" }}>
            <div
              ref={sagiRef}
              style={{
                fontSize: "clamp(44px, 7vw, 48px)",
                textAlign: "center",
              }}
            >
              Sagi
            </div>
            <div
              ref={friedRef}
              style={{
                fontSize: "clamp(44px, 7vw, 48px)",
                textAlign: "center",
              }}
            >
              Fried
            </div>
            <div
              ref={chickenRef}
              style={{
                fontSize: "clamp(34px, 7vw, 48px)",
                textAlign: "center",
              }}
            >
              Chicken
            </div>
          </div>
        </div>

        {/* Responsive Burger SVG */}
        <div
          ref={burgerWrapRef}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "min(75vw, 380px)",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 3,
          }}
        >
          <BurgerSVG width="100%" height="auto" />
        </div>

        {/* SFC branding below the burger */}
        <div
          ref={sfcBrandRef}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "clamp(56px, 7vw, 48px)",
            fontWeight: 900,
            color: "#bd0202",
            marginTop: "10px",
            textAlign: "center",
            zIndex: 4,
          }}
        >
          SFC <span role="img" aria-label="chicken leg">🍗</span>
        </div>
      </div>
    </div>
  );
}

function BurgerSVG({ width = "100%", height = "auto" }) {
  const bunTop = "#F3B562";
  const bunShadow = "#D39A4F";
  const sesame = "#fff3c9";
  const patty = "#5A3825";
  const cheese = "#F5C542";
  const lettuce = "#66BB6A";
  const tomato = "#E44A4A";
  const bunBottom = "#E3A652";
  const stroke = "rgba(0,0,0,0.18)";

  return (
    <svg viewBox="0 0 260 220" width={width} height={height}>
      <defs>
        <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.35" />
        </filter>
      </defs>
      <g filter="url(#softShadow)">
        <path d="M30 100 Q130 10 230 100 L30 100 Z" fill={bunTop} stroke={stroke} strokeWidth="2" />
        <path d="M48 92 Q130 30 212 92 L48 92 Z" fill={bunShadow} opacity="0.18" />
        {[
          [75, 78],[100, 68],[125, 60],[150, 68],
          [175, 78],[95, 82],[135, 74],[160, 84],
        ].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="6" ry="3" fill={sesame} stroke={stroke} strokeWidth="1"
            transform={`rotate(${(i - 2) * 6} ${x} ${y})`} />
        ))}
        <path
          d="M38 104 C58 110, 78 100, 98 108 C118 116, 138 100, 158 108 C178 116, 198 100, 218 106 L218 118 L38 118 Z"
          fill={lettuce} stroke={stroke} strokeWidth="2"
        />
        <rect x="44" y="118" width="172" height="10" rx="4" fill={tomato} stroke={stroke} strokeWidth="2" />
        <path
          d="M42 128 L218 128 L190 142 L160 132 L130 144 L100 132 L70 140 Z"
          fill={cheese} stroke={stroke} strokeWidth="2"
        />
        <rect x="38" y="140" width="184" height="20" rx="8" fill={patty} stroke={stroke} strokeWidth="2" />
        <rect x="30" y="160" width="200" height="32" rx="16" fill={bunBottom} stroke={stroke} strokeWidth="2" />
      </g>
    </svg>
  );
}
