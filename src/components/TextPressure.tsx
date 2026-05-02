import {
  type CSSProperties,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextPressureProps {
  text: string;
  className?: string;
}

const MAX_DISTANCE = 300;
const EASING = 0.1;

function mapRange(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number,
) {
  const safeValue = Math.min(Math.max(value, inputMin), inputMax);
  const progress = (safeValue - inputMin) / (inputMax - inputMin);
  return outputMin + (1 - progress) * (outputMax - outputMin);
}

export function TextPressure({ text, className }: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const spanRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const centersRef = useRef<Array<{ x: number; y: number }>>([]);
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  const characters = useMemo(() => text.split(""), [text]);

  const applyStyles = () => {
    centersRef.current.forEach((center, index) => {
      const span = spanRefs.current[index];
      if (!span) {
        return;
      }

      const distance = Math.hypot(
        currentMouseRef.current.x - center.x,
        currentMouseRef.current.y - center.y,
      );
      const weight = Math.round(mapRange(distance, 0, MAX_DISTANCE, 900, 220));
      const width = Math.round(mapRange(distance, 0, MAX_DISTANCE, 132, 88));
      const lift = Math.max(0, 1 - distance / MAX_DISTANCE) * -8;

      span.style.fontVariationSettings = `'wght' ${weight}, 'wdth' ${width}`;
      span.style.transform = `translateY(${lift}px)`;
      span.style.color =
        distance < 140 ? "rgba(201, 162, 39, 1)" : "rgba(245, 247, 250, 0.96)";
    });
  };

  const startAnimation = () => {
    if (frameRef.current !== null) {
      return;
    }

    const tick = () => {
      const current = currentMouseRef.current;
      const target = targetMouseRef.current;

      current.x += (target.x - current.x) * EASING;
      current.y += (target.y - current.y) * EASING;

      applyStyles();

      const delta = Math.hypot(target.x - current.x, target.y - current.y);
      if (delta > 0.35) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      currentMouseRef.current = { ...target };
      applyStyles();
      frameRef.current = null;
    };

    frameRef.current = requestAnimationFrame(tick);
  };

  useLayoutEffect(() => {
    const measure = () => {
      centersRef.current = spanRefs.current.map((span) => {
        const rect = span?.getBoundingClientRect();
        if (!rect) {
          return { x: 0, y: 0 };
        }

        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      });

      if (!targetMouseRef.current.x && !targetMouseRef.current.y) {
        const centered = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        };
        targetMouseRef.current = centered;
        currentMouseRef.current = centered;
      }

      applyStyles();
    };

    const observer = new ResizeObserver(measure);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    measure();
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [text]);

  useEffect(() => {
    const centered = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    targetMouseRef.current = centered;
    currentMouseRef.current = centered;
    startAnimation();

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const hiddenStyle = {
    fontVariationSettings: "'wght' 220, 'wdth' 88",
    transform: "translateY(0px)",
    color: "rgba(245, 247, 250, 0.96)",
  } satisfies CSSProperties;

  return (
    <div
      ref={containerRef}
      className={cn("text-pressure cursor-default select-none", className)}
      onMouseMove={(event) => {
        targetMouseRef.current = { x: event.clientX, y: event.clientY };
        startAnimation();
      }}
      onMouseLeave={() => {
        targetMouseRef.current = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        };
        startAnimation();
      }}
    >
      {characters.map((character, index) => (
        <motion.span
          key={`${character}-${index}`}
          ref={(element) => {
            spanRefs.current[index] = element;
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.02, duration: 0.45 }}
          style={hiddenStyle}
          aria-hidden="true"
        >
          {character === " " ? "\u00A0" : character}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </div>
  );
}
