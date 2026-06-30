"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment } from "react";
import { cn } from "@/lib/cn";

type Segment = { text: string; gradient?: boolean };

type WordRevealProps = {
  /** Lines of text; each splits into words that reveal in sequence. */
  lines: Segment[][];
  className?: string;
  /** Per-word stagger in seconds. */
  stagger?: number;
};

/**
 * Motion word-by-word reveal for hero headlines. The brand clip-text gradient
 * lives on a STATIC inner leaf span — the animated `motion.span` only carries
 * the transform, so `background-clip: text` survives the compositor.
 * Reduced-motion users get the final state immediately (no transform).
 */
export function WordReveal({
  lines,
  className,
  stagger = 0.045,
}: WordRevealProps) {
  const reduce = useReducedMotion();
  let i = 0;

  return (
    <span className={cn("block", className)}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((seg, si) =>
            seg.text.split(" ").map((word, wi) => {
              const delay = i++ * stagger;
              return (
                <Fragment key={`${li}-${si}-${wi}`}>
                  <motion.span
                    className="inline-block will-change-transform"
                    initial={reduce ? false : { opacity: 0, y: "0.5em" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.55,
                      delay,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                  >
                    {seg.gradient ? (
                      <span className="text-gradient-brand">{word}</span>
                    ) : (
                      word
                    )}
                  </motion.span>{" "}
                </Fragment>
              );
            }),
          )}
        </span>
      ))}
    </span>
  );
}
