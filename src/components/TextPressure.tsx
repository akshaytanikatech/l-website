import {
  type CSSProperties,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextPressureProps {
  text: string;
  className?: string;
}

const MAX_DISTANCE = 300;

function mapRange(value: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number) {
  const safeValue = Math.min(Math.max(value, inputMin), inputMax);
  const progress = (safeValue - inputMin) / (inputMax - inputMin);
  return outputMin + (1 - progress) * (outputMax - outputMin);
}

export function TextPressure({ text, className }: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const spanRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [mouse, setMouse] = useState({ x: -MAX_DISTANCE, y: -MAX_DISTANCE });
  const [centers, setCenters] = useState<Array<{ x: number; y: number }>>([]);

  const characters = useMemo(() => text.split(""), [text]);

  useLayoutEffect(() => {
    const measure = () => {
      const nextCenters = spanRefs.current.map((span) => {
        const rect = span?.getBoundingClientRect();
        if (!rect) {
          return { x: -MAX_DISTANCE, y: -MAX_DISTANCE };
        }

        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      });

      setCenters(nextCenters);
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
    const timeout = window.setTimeout(() => {
      setMouse((current) =>
        current.x < 0
          ? {
              x: window.innerWidth / 2,
              y: window.innerHeight / 2,
            }
          : current,
      );
    }, 240);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("text-pressure cursor-default select-none", className)}
      onMouseMove={(event) => setMouse({ x: event.clientX, y: event.clientY })}
      onMouseLeave={() =>
        setMouse({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        })
      }
    >
      {characters.map((character, index) => {
        const center = centers[index];
        const distance = center
          ? Math.hypot(mouse.x - center.x, mouse.y - center.y)
          : MAX_DISTANCE;
        const weight = Math.round(mapRange(distance, 0, MAX_DISTANCE, 900, 160));
        const width = Math.round(mapRange(distance, 0, MAX_DISTANCE, 150, 60));
        const lift = Math.max(0, 1 - distance / MAX_DISTANCE) * -10;

        const style = {
          fontVariationSettings: `'wght' ${weight}, 'wdth' ${width}`,
          transform: `translateY(${lift}px)`,
          color:
            distance < 120 ? "rgba(201, 162, 39, 1)" : "rgba(245, 247, 250, 0.94)",
        } satisfies CSSProperties;

        return (
          <motion.span
            key={`${character}-${index}`}
            ref={(element) => {
              spanRefs.current[index] = element;
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.025, duration: 0.5 }}
            style={style}
            aria-hidden="true"
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        );
      })}
      <span className="sr-only">{text}</span>
    </div>
  );
}
