import { motion, useReducedMotion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { useEffect, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import landscapeVideo from "@/media/attendence/employee_attendence_view_landscape.mp4";
import portraitImage from "@/media/attendence/employee_attendence_view_portrait.png";
import { cn } from "@/lib/utils";

export type Tone = "light" | "dark";

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      duration: 0.45,
      bounce: 0.16,
    },
  },
};

export function SlideShell({
  tone = "light",
  gridClassName,
  className,
  ambient,
  children,
}: {
  tone?: Tone;
  gridClassName?: string;
  className?: string;
  ambient?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative h-full overflow-hidden",
        tone === "dark"
          ? "proposal-shell-dark text-[var(--pf-text-strong)]"
          : "proposal-shell-light text-[var(--pf-text-dark)]",
        className,
      )}
    >
      <div
        className={cn(
          "proposal-grid absolute inset-0",
          tone === "dark" ? "opacity-[0.18]" : "opacity-[0.3]",
        )}
      />
      {ambient}
      <div
        className={cn(
          "relative mx-auto grid h-full w-full max-w-[1600px] content-start gap-6 px-6 pb-6 pt-20 sm:px-10 sm:pb-8 sm:pt-22 lg:px-16 lg:pb-8 lg:pt-20",
          gridClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function SectionLabel({
  index,
  label,
  tone = "light",
}: {
  index: string;
  label: string;
  tone?: Tone;
}) {
  return (
    <p
      className={cn(
        "text-xs uppercase tracking-[0.36em]",
        tone === "dark" ? "text-emerald-300/88" : "text-emerald-600/90",
      )}
    >
      Slide {index} / {label}
    </p>
  );
}

export function TopNavPill({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "proposal-nav-pill px-4 py-2 text-xs uppercase tracking-[0.28em]",
        tone === "dark" ? "proposal-nav-pill-dark" : "proposal-nav-pill-light",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function TrustBadge({
  icon: Icon,
  label,
  tone = "light",
  className,
}: {
  icon: LucideIcon;
  label: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "proposal-badge inline-flex items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-[0.24em]",
        tone === "dark" ? "proposal-badge-dark" : "proposal-badge-light",
        className,
      )}
    >
      <Icon className={cn("h-4 w-4", tone === "dark" ? "text-emerald-300" : "text-emerald-600")} />
      {label}
    </div>
  );
}

export function GlassCard({
  children,
  tone = "light",
  className,
  hover = false,
  style,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  hover?: boolean;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      style={style}
      className={cn(
        "rounded-[28px] p-5",
        tone === "dark" ? "proposal-card-dark" : "proposal-card-light",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

export function FeatureCard({
  icon: Icon,
  title,
  body,
  eyebrow,
  tone = "light",
  className,
  hover = true,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  eyebrow?: string;
  tone?: Tone;
  className?: string;
  hover?: boolean;
}) {
  return (
    <GlassCard tone={tone} className={className} hover={hover}>
      <div
        className={cn(
          "w-max rounded-2xl border p-3",
          tone === "dark"
            ? "border-emerald-400/25 bg-emerald-400/12 text-emerald-300"
            : "border-emerald-400/18 bg-emerald-50 text-emerald-700",
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      {eyebrow ? (
        <p
          className={cn(
            "mt-5 text-xs uppercase tracking-[0.2em]",
            tone === "dark" ? "text-emerald-300/76" : "text-emerald-600",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h3
        className={cn(
          "mt-3 font-sans text-2xl font-semibold leading-tight",
          tone === "dark" ? "text-white" : "text-[var(--pf-text-dark)]",
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-3 text-sm leading-7",
          tone === "dark" ? "text-[var(--pf-text-muted-dark)]" : "text-[var(--pf-text-muted-light)]",
        )}
      >
        {body}
      </p>
    </GlassCard>
  );
}

export function MetricCard({
  label,
  value,
  note,
  tone = "light",
  className,
}: {
  label: string;
  value: string;
  note?: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[22px] border px-4 py-3.5",
        tone === "dark"
          ? "border-white/10 bg-white/6"
          : "border-[var(--pf-border-light)] bg-white/92",
        className,
      )}
    >
      <p
        className={cn(
          "text-xs uppercase tracking-[0.18em]",
          tone === "dark" ? "text-[var(--pf-text-subtle-dark)]" : "text-slate-500",
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "mt-3 text-xl font-semibold",
          tone === "dark" ? "text-white" : "text-[var(--pf-text-dark)]",
        )}
      >
        {value}
      </p>
      {note ? (
        <p
          className={cn(
            "mt-2 text-sm",
            tone === "dark" ? "text-[var(--pf-text-muted-dark)]" : "text-[var(--pf-text-muted-light)]",
          )}
        >
          {note}
        </p>
      ) : null}
    </div>
  );
}

export function ProgressBar({
  value,
  tone = "light",
  className,
  ...props
}: {
  value: number;
  tone?: Tone;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      {...props}
      className={cn(
        "h-3 overflow-hidden rounded-full",
        tone === "dark" ? "bg-[#0F172A]" : "bg-slate-200",
        className,
      )}
    >
      <motion.div
        initial={{ width: reduceMotion ? `${value}%` : 0 }}
        animate={{ width: `${value}%` }}
        transition={reduceMotion ? { duration: 0 } : { type: "spring", duration: 0.55, bounce: 0 }}
        className="h-full rounded-full bg-[linear-gradient(90deg,#22C55E,#4ADE80)]"
      />
    </div>
  );
}

export function TimelineStep({
  index,
  label,
  note,
  active,
  current,
}: {
  index: number;
  label: string;
  note: string;
  active: boolean;
  current: boolean;
}) {
  return (
    <div className="flex flex-col items-start gap-3 md:items-center md:text-center">
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold transition",
          active
            ? "border-emerald-400/45 bg-emerald-400/14 text-emerald-700 shadow-[0_0_0_8px_rgba(34,197,94,0.08)]"
            : "border-slate-200 bg-white text-slate-500",
        )}
      >
        {index}
      </div>
      <div
        className={cn(
          "rounded-[22px] border px-4 py-4",
          current
            ? "border-emerald-400/30 bg-emerald-50 shadow-[0_14px_32px_rgba(34,197,94,0.12)]"
            : "border-slate-200 bg-white",
        )}
      >
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
        <p className="mt-2 text-sm leading-6 text-[#334155]">{note}</p>
      </div>
    </div>
  );
}

export function DashboardPanel({
  icon: Icon,
  title,
  subtitle,
  badge,
  tone = "dark",
  className,
  children,
}: {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  badge?: string;
  tone?: Tone;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[28px] border p-4",
        tone === "dark"
          ? "border-white/10 bg-white/6"
          : "border-[var(--pf-border-light)] bg-white",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {Icon ? (
            <div
              className={cn(
                "rounded-2xl border p-3",
                tone === "dark"
                  ? "border-emerald-400/25 bg-emerald-400/12 text-emerald-300"
                  : "border-emerald-400/18 bg-emerald-50 text-emerald-700",
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
          ) : null}
          <div>
            <p
              className={cn(
                "text-xs uppercase tracking-[0.22em]",
                tone === "dark" ? "text-emerald-300/86" : "text-emerald-600",
              )}
            >
              {title}
            </p>
            {subtitle ? (
              <p
                className={cn(
                  "mt-2 text-sm",
                  tone === "dark" ? "text-[var(--pf-text-muted-dark)]" : "text-[var(--pf-text-muted-light)]",
                )}
              >
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>

        {badge ? (
          <div
            className={cn(
              "proposal-badge px-2.5 py-1.5 text-[10px] uppercase tracking-[0.18em]",
              tone === "dark" ? "proposal-badge-dark" : "proposal-badge-light",
            )}
          >
            {badge}
          </div>
        ) : null}
      </div>
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}

export function DeviceMockup({
  active,
  alt,
  titlePill,
  footerPill,
  floatingNote,
  className,
  mediaClassName,
  children,
}: {
  active: boolean;
  alt: string;
  titlePill?: ReactNode;
  footerPill?: ReactNode;
  floatingNote?: ReactNode;
  className?: string;
  mediaClassName?: string;
  children?: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    if (!active) {
      return;
    }

    if (reduceMotion) {
      setShouldLoadVideo(true);
      return;
    }

    const timeout = window.setTimeout(() => setShouldLoadVideo(true), 140);
    return () => window.clearTimeout(timeout);
  }, [active, reduceMotion]);

  return (
    <div className={cn("relative w-full max-w-[820px]", className)}>
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-10 inset-y-10 rounded-[38px] bg-emerald-400/14 blur-3xl"
        animate={reduceMotion ? undefined : { opacity: [0.38, 0.7, 0.38], scale: [0.96, 1.02, 0.96] }}
        transition={reduceMotion ? undefined : { duration: 4.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <div className="relative rounded-[34px] border border-white/10 bg-[#091323] p-3 shadow-[0_42px_120px_rgba(2,6,23,0.45)]">
        <div className="absolute left-1/2 top-3 hidden h-3 w-28 -translate-x-1/2 rounded-b-2xl bg-black/45 md:block" />
        <div className="relative overflow-hidden rounded-[26px]">
          <div className="attendance-placeholder absolute inset-0" />
          {shouldLoadVideo ? (
            <video
              className={cn("hidden aspect-[16/10] w-full object-cover md:block", mediaClassName)}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={landscapeVideo} type="video/mp4" />
            </video>
          ) : (
            <img
              src={portraitImage}
              alt=""
              aria-hidden="true"
              className={cn("hidden aspect-[16/10] w-full scale-110 object-cover opacity-35 blur-xl md:block", mediaClassName)}
            />
          )}
          <img
            src={portraitImage}
            alt={alt}
            className={cn("aspect-[16/10] w-full object-cover md:hidden", mediaClassName)}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.3))]" />
          {children}
        </div>
      </div>
      <div className="mx-auto hidden h-4 w-[86%] rounded-b-[22px] bg-[linear-gradient(180deg,#CBD5E1,#94A3B8)] shadow-[0_16px_40px_rgba(15,23,42,0.18)] md:block" />
      <div className="mx-auto -mt-1 hidden h-3 w-[38%] rounded-b-[18px] bg-slate-300/75 md:block" />

      {titlePill ? <div className="absolute left-5 top-5">{titlePill}</div> : null}
      {footerPill ? <div className="absolute bottom-5 left-5">{footerPill}</div> : null}
      {floatingNote ? <div className="absolute -right-5 bottom-10 hidden lg:block">{floatingNote}</div> : null}
    </div>
  );
}
