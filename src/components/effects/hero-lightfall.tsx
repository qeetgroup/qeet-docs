"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import Lightfall from "./lightfall";

/** True when the `dark` class is on <html> (fumadocs/next-themes), reactive. */
function useIsDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const update = () => setDark(el.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

/**
 * Brand-tuned Lightfall hero background — warm Qeet-orange light streaks that
 * fall through a centered column. DARK MODE ONLY (the effect is built for dark
 * backgrounds and washes out on light), and disabled under prefers-reduced-
 * motion. The mask fades only the left/right + far-bottom edges so the streaks
 * stay centered and fall the full height.
 */
export function HeroLightfall() {
  const reduce = useReducedMotion();
  const dark = useIsDark();
  if (reduce || !dark) return null;

  return (
    <div
      aria-hidden
      className="absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_52%_92%_at_50%_50%,black_40%,transparent_100%)]"
    >
      <Lightfall
        colors={["#F26D0E", "#FB923C", "#FFD7A8"]}
        backgroundColor="#7c2d12"
        speed={0.25}
        streakCount={4}
        streakWidth={0.9}
        streakLength={1.5}
        glow={0.8}
        density={0.45}
        twinkle={1}
        zoom={3}
        backgroundGlow={0.55}
        opacity={1}
        mouseInteraction={false}
      />
    </div>
  );
}
