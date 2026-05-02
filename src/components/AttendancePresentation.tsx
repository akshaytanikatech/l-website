import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  BarChart3,
  BellRing,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Laptop,
  LayoutDashboard,
  Lock,
  Monitor,
  Music,
  Scale,
  ShieldCheck,
  Sparkles,
  Trash2,
  Workflow,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  DeviceMockup,
  DashboardPanel,
  FeatureCard,
  GlassCard,
  MetricCard,
  ProgressBar,
  SectionLabel,
  SlideShell,
  TimelineStep,
  TopNavPill,
  TrustBadge,
  staggerContainer,
  staggerItem,
} from "@/components/attendancePrimitives";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import landscapeVideo from "@/media/attendence/employee_attendence_view_landscape.mp4";
import portraitImage from "@/media/attendence/employee_attendence_view_portrait.png";
import { cn } from "@/lib/utils";

const sections = [
  { id: "trust", label: "Trust" },
  { id: "challenge", label: "Challenge" },
  { id: "balance", label: "Balance" },
  { id: "platforms", label: "Platforms" },
  { id: "workflow", label: "Workflow" },
  { id: "auto-punch", label: "Auto Punch" },
  { id: "privacy", label: "Privacy" },
  { id: "admin", label: "Admin" },
  { id: "benefits", label: "Benefits" },
  { id: "culture", label: "Culture" },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function SnapSection({
  children,
  sectionRef,
  testId,
}: {
  children: ReactNode;
  sectionRef?: (element: HTMLElement | null) => void;
  testId?: string;
}) {
  return (
    <section
      ref={sectionRef}
      data-scroll-section="true"
      data-testid={testId}
      className="relative h-screen w-screen snap-start overflow-hidden"
    >
      {children}
    </section>
  );
}

function SlideCopy({
  inView,
  index,
  label,
  title,
  subtitle,
  body,
  tone = "light",
  titleClassName,
  className,
}: {
  inView: boolean;
  index: string;
  label: string;
  title: ReactNode;
  subtitle: string;
  body: string;
  tone?: "light" | "dark";
  titleClassName?: string;
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={cn("flex flex-col justify-center", className)}
    >
      <motion.div variants={staggerItem}>
        <SectionLabel index={index} label={label} tone={tone} />
      </motion.div>
      <motion.h2
        variants={staggerItem}
        className={cn(
          "mt-5 max-w-[12ch] font-sans text-[clamp(2.7rem,4.5vw,5rem)] font-semibold leading-[0.95]",
          tone === "dark" ? "text-white" : "text-[var(--pf-text-dark)]",
          titleClassName,
        )}
      >
        {title}
      </motion.h2>
      <motion.p
        variants={staggerItem}
        className={cn(
          "mt-5 max-w-2xl text-lg leading-8",
          tone === "dark" ? "text-slate-100/86" : "text-[var(--pf-text-mid)]",
        )}
      >
        {subtitle}
      </motion.p>
      <motion.p
        variants={staggerItem}
        className={cn(
          "mt-5 max-w-2xl text-base leading-8",
          tone === "dark" ? "text-[var(--pf-text-muted-dark)]" : "text-[var(--pf-text-muted-light)]",
        )}
      >
        {body}
      </motion.p>
    </motion.div>
  );
}

function OpeningSlide({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="h-full">
      <SlideShell
        tone="dark"
        gridClassName="lg:grid-cols-[0.84fr_1.16fr] lg:items-center lg:gap-12"
        ambient={
          <>
            <motion.div
              aria-hidden="true"
              className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-emerald-500/18 blur-3xl"
              animate={reduceMotion ? undefined : { x: [0, 18, 0], y: [0, -16, 0] }}
              transition={reduceMotion ? undefined : { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute -right-10 bottom-8 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl"
              animate={reduceMotion ? undefined : { x: [0, -20, 0], y: [0, 14, 0] }}
              transition={reduceMotion ? undefined : { duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </>
        }
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col justify-center"
        >
          <motion.div variants={staggerItem}>
            <TrustBadge icon={ShieldCheck} label="Bedi & Associates proposal" tone="dark" />
          </motion.div>
          <motion.div variants={staggerItem} className="mt-5">
            <SectionLabel index="01" label="Opening / Big Idea" tone="dark" />
          </motion.div>

          <div className="mt-6 space-y-2">
            {["Attendance", "Built on Trust."].map((line, index) => (
              <motion.h1
                key={line}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, filter: "blur(10px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={reduceMotion ? { duration: 0 } : { type: "spring", duration: 0.55, bounce: 0.14, delay: 0.06 + index * 0.12 }}
                className="max-w-[11ch] font-sans text-[clamp(3.2rem,12vw,6rem)] font-semibold leading-[0.9] text-white"
              >
                {line}
              </motion.h1>
            ))}
          </div>

          <motion.p variants={staggerItem} className="mt-6 max-w-2xl text-xl leading-8 text-slate-100/86">
            Helping Bedi & Associates balance accountability, transparency, and employee comfort.
          </motion.p>
          <motion.p variants={staggerItem} className="mt-5 max-w-2xl text-base leading-8 text-[var(--pf-text-muted-dark)]">
            Every workplace wants productive and happy teams. Real challenge is keeping attendance
            accurate without making people feel watched. PulseFlow gives Bedi & Associates modern
            attendance flow built around fairness, clarity, and trust.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-8 grid gap-4 sm:grid-cols-3"
          >
            {[
              {
                icon: CheckCircle2,
                title: "Accountability",
                note: "Working hours stay clear, consistent, and easy to review.",
              },
              {
                icon: Scale,
                title: "Transparency",
                note: "Employees and leadership see same attendance story, not competing versions.",
              },
              {
                icon: ShieldCheck,
                title: "Trust",
                note: "System supports fair habits without turning work into pressure.",
              },
            ].map(({ icon: Icon, title, note }) => (
              <GlassCard key={title} tone="dark" hover className="min-h-[192px] p-4">
                <div className="rounded-2xl border border-emerald-400/22 bg-emerald-400/12 p-3 text-emerald-300 w-max">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.24em] text-emerald-300/82">{title}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--pf-text-muted-dark)]">{note}</p>
              </GlassCard>
            ))}
          </motion.div>
        </motion.div>

        <div className="flex items-center justify-center lg:justify-end">
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, rotateX: 8 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", duration: 0.55, bounce: 0.12, delay: 0.08 }}
            className="relative w-full"
          >
            <DeviceMockup
              active={active}
              alt="PulseFlow hero preview for Bedi & Associates"
              titlePill={<TopNavPill tone="dark">Leadership + Employee View</TopNavPill>}
              footerPill={<TrustBadge icon={ShieldCheck} label="Trust-centered system" tone="dark" />}
              floatingNote={
                <GlassCard tone="dark" className="hidden w-56 p-4 xl:block">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/82">Proposal Focus</p>
                  <p className="mt-3 text-lg font-semibold text-white">Comfort + Visibility</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--pf-text-muted-dark)]">
                    Same product surface supports both team comfort and leadership clarity.
                  </p>
                </GlassCard>
              }
            >
              <div className="absolute left-6 right-6 top-6 hidden items-start justify-between gap-4 md:flex">
                <MetricCard label="Records Synced" value="98%" note="Attendance signal" tone="dark" className="w-44 bg-[#0d1a2b]/76" />
                <MetricCard label="Breaks Respected" value="Visible" note="Employee-side control" tone="dark" className="w-44 bg-[#0d1a2b]/76" />
              </div>
              <div className="absolute bottom-6 right-6 hidden w-[46%] md:block">
                <div className="grid gap-3 sm:grid-cols-2">
                  <MetricCard label="Clock In" value="One tap" note="Low-friction start" tone="dark" className="bg-[#0d1a2b]/78" />
                  <MetricCard label="Dashboard" value="Live" note="Leadership view" tone="dark" className="bg-[#0d1a2b]/78" />
                </div>
              </div>
            </DeviceMockup>
          </motion.div>
        </div>
      </SlideShell>
    </div>
  );
}

function ChallengeSlide() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.45, once: false });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="h-full">
      <SlideShell tone="light" gridClassName="lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-10">
        <SlideCopy
          inView={inView}
          index="02"
          label="Current Challenge"
          title="From Manual Confusion to Clear Visibility."
          subtitle="Attendance should not create extra pressure for employers or employees."
          body="Without proper attendance system, working hours become hard to verify, admin teams lose time in follow-ups, and leadership loses clear visibility. At same time, employees can start feeling attendance is friction instead of support."
          titleClassName="max-w-[11ch]"
        />

        <div className="grid gap-5 xl:grid-cols-[0.86fr_1.14fr]">
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", duration: 0.45, bounce: 0.16, delay: 0.06 }}
            className="proposal-panel-light relative rounded-[34px] p-6"
          >
            <div className="absolute inset-x-0 top-0 h-24 rounded-t-[34px] bg-[linear-gradient(180deg,rgba(248,113,113,0.08),transparent)]" />
            <TrustBadge icon={Workflow} label="Manual records" className="relative" />
            <div className="relative mt-5 grid gap-3">
              {[
                ["09:07 AM", "Missing punch-out", "Follow-up needed"],
                ["10:13 AM", "Late update", "Manual correction"],
                ["01:12 PM", "Break not marked", "Time unclear"],
                ["03:18 PM", "Sheet conflict", "Admin review"],
                ["05:46 PM", "Duplicate row", "Manual cleanup"],
              ].map(([time, title, tag], index) => (
                <motion.div
                  key={`${time}-${title}`}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.28, delay: 0.08 + index * 0.05 }}
                  className="grid grid-cols-[86px_1fr_auto] items-center gap-3 rounded-[22px] border border-slate-200 bg-white/94 px-4 py-4 text-sm text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
                >
                  <span className="font-medium text-slate-500">{time}</span>
                  <span>{title}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                    {tag}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <MetricCard label="Follow-ups" value="5" note="Same day" />
              <MetricCard label="Corrections" value="3" note="Manual edits" />
              <MetricCard label="Visibility" value="Low" note="No live trend" />
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", duration: 0.5, bounce: 0.14, delay: 0.1 }}
            className="proposal-stage-light relative overflow-hidden rounded-[34px] p-6"
          >
            <motion.div
              initial={reduceMotion ? { x: 0 } : { x: "-120%" }}
              animate={inView ? { x: "125%" } : {}}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.9, ease: "easeInOut", delay: 0.14 }}
              className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-[linear-gradient(90deg,transparent,rgba(34,197,94,0.26),transparent)]"
            />
            <DashboardPanel
              icon={LayoutDashboard}
              tone="light"
              title="Attendance Overview"
              subtitle="Clear daily visibility for leadership, HR/admin, and employees."
              className="border-none bg-transparent p-0 shadow-none"
            >
              <div className="rounded-[28px] border border-slate-200 bg-[#F8FAFC] p-4">
                <img
                  src={portraitImage}
                  alt="Attendance overview dashboard preview"
                  className="h-[280px] w-full rounded-[20px] object-cover object-top shadow-[0_18px_40px_rgba(15,23,42,0.1)]"
                  loading="lazy"
                />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <MetricCard label="Hours Worked" value="8h 27m" note="Clear daily working time" />
                <MetricCard label="Breaks Taken" value="2 logged" note="Visible and respectful" />
                <MetricCard label="Attendance Synced" value="Realtime" note="No spreadsheet lag" />
                <MetricCard label="Daily Total" value="Healthy" note="Status overview ready" />
              </div>
            </DashboardPanel>
          </motion.div>
        </div>
      </SlideShell>
    </div>
  );
}

function BalanceSlide() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.45, once: false });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="h-full">
      <SlideShell
        tone="dark"
        gridClassName="lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-12"
        ambient={
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl"
            animate={reduceMotion ? undefined : { scale: [0.96, 1.04, 0.96], opacity: [0.36, 0.72, 0.36] }}
            transition={reduceMotion ? undefined : { duration: 5.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        }
      >
        <SlideCopy
          inView={inView}
          index="03"
          label="Why It Matters"
          title="Time Should Feel Valued, Not Watched."
          subtitle="Good attendance system should support people, not pressure them."
          body="Attendance is not only clock-in and clock-out. It is signal of fair workplace. When time is recorded correctly, breaks are respected, and data is handled transparently, employees feel more comfortable. When leaders get accurate data, they can decide clearly without micromanaging."
          tone="dark"
        />

        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={reduceMotion ? { duration: 0 } : { type: "spring", duration: 0.5, bounce: 0.14, delay: 0.08 }}
          className="proposal-card-dark relative rounded-[38px] p-8"
        >
          <div className="relative grid gap-5 lg:grid-cols-[0.94fr_1.1fr_0.94fr] lg:items-center">
            <GlassCard tone="dark" className="min-h-[230px] bg-[rgba(255,255,255,0.05)]">
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-300/82">Employer clarity</p>
              <h3 className="mt-4 text-3xl font-semibold text-white">Clear hours. Clear trends.</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--pf-text-muted-dark)]">
                Leadership sees working hours, team consistency, and break patterns without waiting
                for manual cleanup.
              </p>
              <div className="mt-5 grid gap-3">
                <MetricCard label="Hours" value="Verified" note="Daily totals stay clean" tone="dark" />
                <MetricCard label="Trends" value="Visible" note="Decision-ready view" tone="dark" />
              </div>
            </GlassCard>

            <div className="relative flex min-h-[340px] items-center justify-center">
              <motion.div
                className="absolute left-[6%] right-[6%] top-1/2 hidden h-px bg-[linear-gradient(90deg,rgba(148,163,184,0.02),rgba(74,222,128,0.95),rgba(148,163,184,0.02))] lg:block"
                animate={reduceMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
                transition={reduceMotion ? undefined : { duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <motion.div
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.12 }}
                className="proposal-glow-ring relative z-10 flex h-60 w-60 flex-col items-center justify-center rounded-full border border-emerald-400/28 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.24),rgba(8,16,29,0.98))] text-center"
              >
                <Scale className="h-8 w-8 text-emerald-300" />
                <p className="mt-5 text-xs uppercase tracking-[0.26em] text-emerald-300/84">Center</p>
                <p className="mt-3 max-w-[11ch] text-[1.7rem] font-semibold leading-tight text-white">
                  Trust-Based Attendance
                </p>
              </motion.div>
            </div>

            <GlassCard tone="dark" className="min-h-[230px] bg-[rgba(255,255,255,0.05)]">
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-300/82">Employee comfort</p>
              <h3 className="mt-4 text-3xl font-semibold text-white">Clear records. Less pressure.</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--pf-text-muted-dark)]">
                Employees keep visibility into records, know what matters, and feel supported instead
                of watched.
              </p>
              <div className="mt-5 grid gap-3">
                <MetricCard label="Breaks" value="Respected" note="Employee comfort visible" tone="dark" />
                <MetricCard label="Records" value="Fair" note="Correction path stays open" tone="dark" />
              </div>
            </GlassCard>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {[
              "Working time valued",
              "Breaks respected",
              "Records kept fair",
              "Decisions backed by data",
            ].map((item) => (
              <motion.div key={item} variants={staggerItem}>
                <MetricCard label="Trust signal" value={item} tone="dark" note="Same system serves both sides" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </SlideShell>
    </div>
  );
}

function PlatformProposalSlide() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.45, once: false });
  const reduceMotion = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const supportCards = useMemo(
    () => [
      {
        label: "Windows 11",
        title: "Operational desktop",
        note: "Familiar flow for daily attendance actions.",
        icon: Monitor,
        style: { left: "7%", top: "14%" },
      },
      {
        label: "macOS",
        title: "Leadership polish",
        note: "Same premium experience for admin and employee desks.",
        icon: Laptop,
        style: { right: "7%", top: "8%" },
      },
      {
        label: "Linux",
        title: "Engineering continuity",
        note: "Consistent attendance support across Linux-heavy workstations.",
        icon: Lock,
        style: { right: "12%", bottom: "11%" },
      },
    ],
    [],
  );

  return (
    <div ref={ref} className="h-full">
      <SlideShell tone="light" gridClassName="lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-10">
        <SlideCopy
          inView={inView}
          index="04"
          label="Proposed Solution"
          title="Cross-Platform Attendance Software."
          subtitle="One system for Windows, macOS, and Linux."
          body="Proposed solution gives Bedi & Associates single attendance system across major desktop operating systems. Employees can clock in, clock out, and manage breaks easily. Leadership and admins get clear trend visibility without creating feeling of constant surveillance."
          titleClassName="max-w-[10ch]"
        />

        <div className="grid gap-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
          >
            {[
              { icon: CheckCircle2, title: "Clock in and clock out", body: "Low-friction daily start and close." },
              { icon: Clock3, title: "Break tracking", body: "Clear, employee-visible break handling." },
              { icon: LayoutDashboard, title: "Attendance dashboard", body: "Trends and daily totals for admins." },
              { icon: Workflow, title: "Cross-platform support", body: "Same system across every desktop." },
              { icon: ShieldCheck, title: "Employee-visible records", body: "Transparency stays built in." },
            ].map((item, index) => (
              <motion.div key={item.title} variants={staggerItem} className={index < 3 ? "xl:col-span-1" : "xl:col-span-1"}>
                <FeatureCard tone="light" hover={false} eyebrow="Core Feature" {...item} className="h-full min-h-[220px]" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", duration: 0.5, bounce: 0.12, delay: 0.12 }}
            className="proposal-stage-light relative min-h-[560px] overflow-hidden rounded-[40px] p-6"
            onMouseMove={(event) => {
              if (reduceMotion) {
                return;
              }

              const rect = event.currentTarget.getBoundingClientRect();
              setPointer({
                x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
                y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
              });
            }}
            onMouseLeave={() => setPointer({ x: 0, y: 0 })}
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-x-20 top-12 h-52 rounded-full bg-emerald-400/12 blur-3xl"
              animate={reduceMotion ? undefined : { opacity: [0.42, 0.8, 0.42] }}
              transition={reduceMotion ? undefined : { duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />

            <motion.div
              style={
                reduceMotion
                  ? undefined
                  : {
                      transform: `perspective(1600px) rotateX(${pointer.y * -3.2}deg) rotateY(${pointer.x * 5.2}deg)`,
                    }
              }
              className="relative h-full"
            >
              <div className="absolute left-1/2 top-[14%] w-[min(92%,620px)] -translate-x-1/2">
                <div className="proposal-panel-light rounded-[34px] p-4">
                  <div className="flex items-center justify-between gap-3 rounded-[22px] border border-slate-200 bg-white/88 px-4 py-3">
                    <TrustBadge icon={ShieldCheck} label="Same system everywhere" />
                    <TopNavPill>Windows / macOS / Linux</TopNavPill>
                  </div>
                  <div className="mt-4 rounded-[26px] border border-slate-200 bg-[#F8FAFC] p-4">
                    <img
                      src={portraitImage}
                      alt="Cross-platform PulseFlow dashboard preview"
                      className="h-[280px] w-full rounded-[20px] object-cover object-top shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <MetricCard label="Clock In" value="Shared flow" note="No OS-specific friction" />
                    <MetricCard label="Breaks" value="Consistent" note="Same rule visibility" />
                    <MetricCard label="Dashboard" value="Unified" note="One admin surface" />
                  </div>
                </div>
              </div>

              {supportCards.map(({ label, title, note, icon: Icon, style }) => (
                <motion.div
                  key={label}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.35, delay: 0.12 }}
                  style={
                    reduceMotion
                      ? style
                      : {
                          ...style,
                          transform: `translate3d(${pointer.x * 10}px, ${pointer.y * 8}px, 0)`,
                        }
                  }
                  className="absolute w-[280px]"
                >
                  <GlassCard tone="light" className="p-4">
                    <div className="rounded-2xl border border-emerald-400/18 bg-emerald-50 p-3 text-emerald-700 w-max">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-xs uppercase tracking-[0.2em] text-emerald-600">{label}</p>
                    <h3 className="mt-2 text-xl font-semibold text-[var(--pf-text-dark)]">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--pf-text-muted-light)]">{note}</p>
                  </GlassCard>
                </motion.div>
              ))}

              <div className="absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-3">
                {[
                  "Windows-ready attendance flow",
                  "macOS-ready leadership view",
                  "Linux-ready team continuity",
                ].map((item) => (
                  <TopNavPill key={item} className="justify-center text-center">
                    {item}
                  </TopNavPill>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </SlideShell>
    </div>
  );
}

function WorkflowSlide() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.45, once: false });
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [timerProgress, setTimerProgress] = useState(0);

  const steps = useMemo(
    () => [
      { label: "Install", note: "Software setup on employee system" },
      { label: "Clock In", note: "Workday begins with one tap" },
      { label: "Break", note: "Breaks marked clearly" },
      { label: "Clock Out", note: "Day closes cleanly" },
      { label: "Dashboard", note: "Admin trend view updates" },
    ],
    [],
  );

  useEffect(() => {
    if (!inView) {
      setActiveStep(0);
      return;
    }

    if (reduceMotion) {
      setActiveStep(steps.length - 1);
      return;
    }

    setActiveStep(0);
    let next = 0;
    const interval = window.setInterval(() => {
      next = Math.min(next + 1, steps.length - 1);
      setActiveStep(next);
      if (next >= steps.length - 1) {
        window.clearInterval(interval);
      }
    }, 900);

    return () => window.clearInterval(interval);
  }, [inView, reduceMotion, steps.length]);

  useEffect(() => {
    if (!inView) {
      setTimerProgress(0);
      return;
    }

    if (reduceMotion) {
      setTimerProgress(1);
      return;
    }

    let frame = 0;
    const duration = 7200;
    const start = performance.now();

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      setTimerProgress(progress);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion]);

  const totalMinutes = Math.round(timerProgress * 507);
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minutes = String(totalMinutes % 60).padStart(2, "0");
  const seconds = String(Math.floor((timerProgress * 60) % 60)).padStart(2, "0");
  const lineWidth = (activeStep / (steps.length - 1)) * 100;

  return (
    <div ref={ref} className="h-full">
      <SlideShell tone="light" gridClassName="grid-rows-[auto_1fr] gap-4">
        <div className="max-w-3xl">
          <SlideCopy
            inView={inView}
            index="05"
            label="How It Works"
            title="Simple for Employees. Clear for Admins."
            subtitle="Smooth daily attendance flow from start to finish."
            body="System installs once, employees clock in, mark breaks, clock out, then employer dashboard updates records and trends automatically."
            titleClassName="max-w-[16ch] text-[clamp(2.15rem,3.65vw,4rem)]"
          />
        </div>

        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={reduceMotion ? { duration: 0 } : { type: "spring", duration: 0.52, bounce: 0.12, delay: 0.1 }}
          className="proposal-stage-light min-h-0 rounded-[38px] p-5"
        >
          <div className="flex h-full min-h-0 flex-col gap-4">
            <div className="rounded-[30px] border border-slate-200 bg-white/86 p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <TrustBadge icon={Workflow} label="Five-step attendance flow" />
                <TopNavPill>Install → Clock In → Break → Clock Out → Dashboard</TopNavPill>
              </div>
              <div className="relative mt-4">
                <div className="absolute left-6 right-6 top-6 hidden h-[3px] rounded-full bg-slate-200 md:block" />
                <div className="absolute left-6 top-6 hidden w-[calc(100%-3rem)] md:block">
                  <ProgressBar value={lineWidth} className="h-[3px]" />
                </div>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="relative grid gap-3 md:grid-cols-5"
                >
                  {steps.map((step, index) => (
                    <motion.div key={step.label} variants={staggerItem}>
                      <TimelineStep
                        index={index + 1}
                        label={step.label}
                        note={step.note}
                        active={index <= activeStep}
                        current={index === activeStep}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="grid min-h-0 flex-1 gap-3 xl:grid-cols-[1.02fr_0.94fr_0.82fr]">
              <DashboardPanel
                icon={CheckCircle2}
                tone="light"
                title="Employee Attendance Flow"
                subtitle="Punch button, active timer, break ledger, and current state stay visible."
              >
                <div className="rounded-[26px] border border-slate-200 bg-[#F8FAFC] p-4">
                  <motion.button
                    type="button"
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scale: activeStep >= 1 && activeStep < 3 ? [1, 1.02, 1] : 1,
                            boxShadow:
                              activeStep >= 1 && activeStep < 3
                                ? "0 0 0 14px rgba(34,197,94,0.08)"
                                : "0 0 0 0 rgba(34,197,94,0)",
                          }
                    }
                    transition={reduceMotion ? undefined : { duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className={cn(
                      "inline-flex h-24 w-full items-center justify-center rounded-[24px] border text-[1.65rem] font-semibold",
                      activeStep >= 3
                        ? "border-slate-200 bg-white text-slate-500"
                        : "border-emerald-400/35 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.18),rgba(255,255,255,0.98))] text-[#0F172A]",
                    )}
                  >
                    {activeStep >= 3 ? "Clock Out Complete" : "Clock In Active"}
                  </motion.button>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <MetricCard label="Active Timer" value={`${hours}:${minutes}:${seconds}`} note="Time grows while workday stays active." />
                    <MetricCard label="Status" value={activeStep >= 4 ? "Dashboard synced" : "Employee flow active"} note="Clear daily attendance visibility." />
                  </div>

                  <div className="mt-3 grid gap-2.5">
                    {[
                      ["Lunch break", activeStep >= 2 ? "Marked 30m" : "Pending"],
                      ["Tea break", activeStep >= 2 ? "Marked 10m" : "Pending"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className={cn(
                          "flex items-center justify-between rounded-[18px] px-4 py-2.5 text-sm",
                          activeStep >= 2 ? "bg-emerald-50 text-emerald-800" : "bg-white text-slate-500",
                        )}
                      >
                        <span className="font-medium">{label}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </DashboardPanel>

              <DashboardPanel
                icon={BriefcaseBusiness}
                tone="light"
                title="Recent Activity"
                subtitle="Admins and employees both see clean step-by-step confirmations."
              >
                <div className="grid gap-2.5">
                  {[
                    { label: "Install completed", ready: activeStep >= 0 },
                    { label: "Clock in confirmed", ready: activeStep >= 1 },
                    { label: "Break recorded", ready: activeStep >= 2 },
                    { label: "Clock out confirmed", ready: activeStep >= 3 },
                    { label: "Dashboard updated", ready: activeStep >= 4 },
                  ].map(({ label, ready }) => (
                    <div
                      key={label}
                      className={cn(
                        "flex items-center gap-3 rounded-[20px] border px-4 py-3.5",
                        ready
                          ? "border-emerald-400/24 bg-emerald-50 text-emerald-800"
                          : "border-slate-200 bg-[#F8FAFC] text-slate-500",
                      )}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-sm">{label}</span>
                    </div>
                  ))}
                </div>
              </DashboardPanel>

              <div className="grid gap-4">
                <DashboardPanel
                  icon={LayoutDashboard}
                  tone="light"
                  title="Admin Update"
                  subtitle="Attendance records and trends refresh once flow completes."
                >
                  <div className="grid gap-3">
                    <MetricCard label="Daily total" value="8h 27m" note="Ready for review" />
                    <MetricCard label="Team trend" value="Updated" note="Dashboard reflects same-day flow" />
                  </div>
                </DashboardPanel>
                <DashboardPanel
                  icon={ShieldCheck}
                  tone="light"
                  title="Workflow Promise"
                  subtitle="Low friction for employees. Clear operational record for admins."
                >
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {[
                      "Less friction for employees",
                      "No extra manual chasing",
                      "Breaks stay visible",
                      "Attendance trends update automatically",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-[18px] border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[var(--pf-text-muted-light)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </DashboardPanel>
              </div>
            </div>
          </div>
        </motion.div>
      </SlideShell>
    </div>
  );
}

function AutoPunchSlide() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });
  const reduceMotion = useReducedMotion();
  const [autoPunchEnabled, setAutoPunchEnabled] = useState(true);
  const [progress, setProgress] = useState(0);
  const [alertReady, setAlertReady] = useState(false);

  useEffect(() => {
    if (!inView || !autoPunchEnabled) {
      setProgress(0);
      setAlertReady(false);
      return;
    }

    if (reduceMotion) {
      setProgress(100);
      setAlertReady(true);
      return;
    }

    let frame = 0;
    const duration = 5600;
    const start = performance.now();

    const tick = (timestamp: number) => {
      const nextProgress = Math.min((timestamp - start) / duration, 1);
      setProgress(nextProgress * 100);
      setAlertReady(nextProgress >= 1);

      if (nextProgress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoPunchEnabled, inView, reduceMotion]);

  return (
    <div ref={ref} className="h-full">
      <SlideShell tone="dark" gridClassName="lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-10">
        <SlideCopy
          inView={inView}
          index="06"
          label="Smart Accuracy"
          title="Punches That Don&apos;t Get Forgotten."
          subtitle="Smart reminders and optional auto-punch logic help keep records clean."
          body="Employees may forget to clock out sometimes. Smart reminders, audio cues, and configurable auto-punch logic reduce missed entries and admin follow-ups. Goal is cleaner records, not punishing mistakes."
          tone="dark"
          titleClassName="max-w-[10ch]"
        />

        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 18 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={reduceMotion ? { duration: 0 } : { type: "spring", duration: 0.5, bounce: 0.12, delay: 0.1 }}
          className={cn(
            "proposal-card-dark grid gap-5 rounded-[38px] p-6 lg:grid-cols-[0.9fr_1.1fr]",
            autoPunchEnabled
              ? "bg-[linear-gradient(180deg,rgba(34,197,94,0.09),rgba(13,21,38,0.94))]"
              : "bg-[linear-gradient(180deg,rgba(148,163,184,0.06),rgba(13,21,38,0.96))]",
          )}
        >
          <div className="flex flex-col justify-between gap-5">
            <DashboardPanel
              icon={BellRing}
              title="Smart Accuracy"
              subtitle="Employees see current state. Admins get cleaner end-of-day records."
              tone="dark"
              className="bg-white/5"
            >
              <div className="rounded-[22px] border border-white/10 bg-[#101a2d] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--pf-text-subtle-dark)]">
                      Auto Punch Logic
                    </p>
                    <p className="mt-2 text-sm text-[var(--pf-text-muted-dark)]">
                      Toggle optional clean-up rule with one tap.
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-pressed={autoPunchEnabled}
                    data-state={autoPunchEnabled ? "on" : "off"}
                    data-testid="auto-punch-toggle"
                    onClick={() => setAutoPunchEnabled((current) => !current)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-3 text-xs uppercase tracking-[0.22em] transition-transform duration-200 hover:-translate-y-0.5",
                      autoPunchEnabled
                        ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-200"
                        : "border-white/10 bg-white/5 text-slate-300/82",
                    )}
                  >
                    <span
                      className={cn(
                        "h-2.5 w-2.5 rounded-full",
                        autoPunchEnabled ? "bg-[#22C55E]" : "bg-slate-400",
                      )}
                    />
                    {autoPunchEnabled ? "Auto Punch On" : "Auto Punch Off"}
                  </button>
                </div>
              </div>
            </DashboardPanel>

            <div className="grid gap-4 sm:grid-cols-2">
              <FeatureCard
                icon={BellRing}
                title="Reminder before logout"
                body="Gentle alert helps employees close workday cleanly before admin follow-up becomes necessary."
                eyebrow="Reminder Layer"
                tone="dark"
                className="h-full bg-white/5"
              />
              <FeatureCard
                icon={Workflow}
                title="Cleaner attendance ledger"
                body="Optional auto-punch logic reduces missing entries and repeated spreadsheet corrections."
                eyebrow="Admin Relief"
                tone="dark"
                className="h-full bg-white/5"
              />
            </div>
          </div>

          <div className="grid gap-4">
            <div className="proposal-panel-dark rounded-[34px] p-6 text-center">
              <motion.div
                animate={
                  reduceMotion || !autoPunchEnabled
                    ? undefined
                    : { boxShadow: ["0 0 0 0 rgba(34,197,94,0.1)", "0 0 0 22px rgba(34,197,94,0)", "0 0 0 0 rgba(34,197,94,0.1)"] }
                }
                transition={reduceMotion ? undefined : { duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className={cn(
                  "mx-auto inline-flex h-44 w-44 items-center justify-center rounded-full border text-3xl font-semibold md:h-56 md:w-56",
                  autoPunchEnabled
                    ? "border-emerald-400/38 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.26),rgba(9,19,35,0.96))] text-white"
                    : "border-white/10 bg-white/5 text-slate-300/82",
                )}
              >
                Punch Out
              </motion.div>

              <div className="mt-8 rounded-[24px] border border-white/10 bg-white/6 p-5 text-left">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--pf-text-subtle-dark)]">
                      15-minute Auto-Punch Out
                    </p>
                    <p className="mt-2 text-sm text-[var(--pf-text-muted-dark)]">
                      Progress fills only while optional smart accuracy rule is armed.
                    </p>
                  </div>
                  <Clock3 className="h-5 w-5 text-emerald-300" />
                </div>
                <div className="mt-4">
                  <ProgressBar value={progress} tone="dark" data-testid="auto-punch-progress" />
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[0.84fr_1.16fr]">
              <DashboardPanel
                icon={Music}
                tone="dark"
                title="Audio Cue Alert"
                subtitle="Reminder becomes visible and audible when timer completes."
              >
                <div className="audio-wave mt-4">
                  {Array.from({ length: 14 }).map((_, index) => (
                    <span
                      key={index}
                      style={{ animationDelay: `${index * 0.08}s` }}
                      className={alertReady ? "is-active" : ""}
                    />
                  ))}
                </div>
              </DashboardPanel>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { icon: BellRing, label: "Reminder before logout" },
                  { icon: Music, label: "Audio cue alert" },
                  { icon: Workflow, label: "Auto-punch rule" },
                  { icon: CheckCircle2, label: "Employee-visible status" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="rounded-[22px] border border-white/10 bg-[#111C2D] p-4 text-sm text-slate-100/84"
                  >
                    <div className="flex min-h-[96px] flex-col justify-between gap-4">
                      <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/12 p-2 text-emerald-300">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="max-w-[12ch] text-base font-medium leading-6 text-white">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </SlideShell>
    </div>
  );
}

function PrivacySlide() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.45, once: false });
  const reduceMotion = useReducedMotion();
  const [slots, setSlots] = useState([
    { id: 0, label: "09:15", status: "Review interval" },
    { id: 1, label: "10:00", status: "Visible record" },
    { id: 2, label: "11:30", status: "Correction ready" },
    { id: 3, label: "01:00", status: "Visible record" },
    { id: 4, label: "02:45", status: "Review interval" },
    { id: 5, label: "04:30", status: "Employee control" },
  ]);
  const [selectedSlotId, setSelectedSlotId] = useState(2);
  const [slotToEdit, setSlotToEdit] = useState<number | null>(null);

  const selectedSlot = slots.find((slot) => slot.id === selectedSlotId) ?? slots[0];

  return (
    <div ref={ref} className="h-full">
      <SlideShell tone="light" gridClassName="lg:grid-cols-[0.68fr_1.32fr] lg:items-center lg:gap-8">
        <SlideCopy
          inView={inView}
          index="07"
          label="Privacy and Employee Trust"
          title="Monitoring with Consent."
          subtitle="Transparency must protect employee comfort."
          body="System is not about micromanagement. It is about fairness, clarity, and consent-based visibility. Employees should be able to see relevant attendance records, understand what is being captured, and request corrections when needed."
        />

        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 18 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={reduceMotion ? { duration: 0 } : { type: "spring", duration: 0.5, bounce: 0.12, delay: 0.08 }}
          className="proposal-stage-light rounded-[36px] p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <TrustBadge icon={ShieldCheck} label="Consent-based visibility" />
            <div className="flex flex-wrap gap-2">
              {["Visibility + Correction"].map((item) => (
                <TopNavPill key={item}>{item}</TopNavPill>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
            <GlassCard tone="light" className="p-4">
              <div className="rounded-[24px] border border-slate-200 bg-[#F8FAFC] p-4">
                <img
                  src={portraitImage}
                  alt="Selected consent interval preview"
                  className="h-[320px] w-full rounded-[20px] object-cover object-top shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">Selected interval</p>
                  <p className="mt-2 text-2xl font-semibold text-[var(--pf-text-dark)]">{selectedSlot.label}</p>
                </div>
                <div className="rounded-full bg-emerald-50 px-4 py-2 text-xs uppercase tracking-[0.18em] text-emerald-700">
                  {selectedSlot.status}
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <MetricCard label="Visibility" value="Employee-side" note="Same record is visible to person affected." />
                <MetricCard label="Action Path" value="Open" note="Review, correction, or removal request." />
              </div>
            </GlassCard>

            <div className="grid gap-4">
              <DashboardPanel
                icon={ShieldCheck}
                tone="light"
                title="Important Message"
                subtitle="Fairness, clarity, and comfort stay visible in same attendance experience."
              >
                <p className="text-sm leading-7 text-[var(--pf-text-muted-light)]">
                  Employees can see what matters, request correction when needed, and avoid any
                  hidden-surveillance feeling.
                </p>
              </DashboardPanel>
              <DashboardPanel
                icon={Workflow}
                tone="light"
                title="Employee-Side Controls"
                subtitle="Relevant actions stay clear inside same attendance surface."
              >
                <div className="grid gap-3">
                  {[
                    "Review interval",
                    "Request correction",
                    "Remove timestamp",
                    "View attendance record",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[18px] border border-emerald-400/18 bg-emerald-50 px-4 py-4 text-sm text-emerald-800"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </DashboardPanel>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto pb-1">
            <div className="flex min-w-max gap-4">
              {slots.map((slot, index) => {
                const selected = slot.id === selectedSlotId;

                return (
                  <motion.div
                    key={slot.id}
                    data-testid={`timeline-slot-${slot.id}`}
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.28, delay: 0.08 + index * 0.04 }}
                    onMouseEnter={() => setSelectedSlotId(slot.id)}
                    className={cn(
                      "group relative w-52 rounded-[24px] border p-3 transition",
                      selected
                        ? "border-emerald-400/26 bg-white shadow-[0_24px_60px_rgba(34,197,94,0.12)]"
                        : "border-slate-200 bg-white/92 shadow-[0_14px_36px_rgba(15,23,42,0.06)]",
                    )}
                  >
                    <img
                      src={portraitImage}
                      alt=""
                      aria-hidden="true"
                      className="h-32 w-full rounded-[18px] object-cover object-top"
                      loading="lazy"
                    />
                    <div className="mt-4 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Slot {index + 1}</p>
                        <p className="mt-1 text-sm font-medium text-[var(--pf-text-dark)]">{slot.label}</p>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-emerald-700">
                        {slot.status}
                      </span>
                    </div>
                    <button
                      type="button"
                      data-testid={`delete-screenshot-trigger-${slot.id}`}
                      onClick={() => setSlotToEdit(slot.id)}
                      className="absolute right-4 top-4 rounded-full border border-emerald-400/18 bg-white/96 p-2 text-emerald-600 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100"
                      aria-label={`Request correction for ${slot.label}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </SlideShell>

      <Dialog open={slotToEdit !== null} onOpenChange={(open) => !open && setSlotToEdit(null)}>
        <DialogContent
          className="border-[#22C55E]/25 bg-[#F8FAFC]"
          data-testid="delete-screenshot-modal"
        >
          <DialogHeader>
            <DialogTitle>Review or Correct Interval</DialogTitle>
            <DialogDescription>
              Employees can request correction or remove irrelevant timestamp interval when privacy
              needs extra protection. Visibility stays clear, and trust story stays intact.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 grid gap-4">
            <MetricCard
              label="Selected slot"
              value={slotToEdit !== null ? slots.find((slot) => slot.id === slotToEdit)?.label ?? "11:30" : "11:30"}
              note="Action stays visible to employee."
            />

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Request correction",
                "View attendance record",
                "Remove irrelevant timestamp",
                "Keep trust story visible",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[20px] border border-slate-200 bg-white px-4 py-4 text-sm text-[var(--pf-text-muted-light)]"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setSlotToEdit(null)}>
                Cancel
              </Button>
              <Button variant="gold" className="bg-[#22C55E] text-[#052E16] hover:bg-[#4ADE80]">
                Request Correction
              </Button>
              <Button
                variant="outline"
                className="border-emerald-400/25 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                onClick={() => {
                  setSlots((current) =>
                    slotToEdit === null ? current : current.filter((slot) => slot.id !== slotToEdit),
                  );
                  setSlotToEdit(null);
                }}
              >
                Remove Interval
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AdminSlide({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.45, once: false });
  const reduceMotion = useReducedMotion();
  const [shouldLoadAmbient, setShouldLoadAmbient] = useState(false);

  useEffect(() => {
    if (!active) {
      return;
    }

    const timeout = window.setTimeout(() => setShouldLoadAmbient(true), reduceMotion ? 0 : 120);
    return () => window.clearTimeout(timeout);
  }, [active, reduceMotion]);

  const analytics = useMemo(
    () => [
      { label: "Legal Team", value: 88, note: "Attendance overview" },
      { label: "Accounts", value: 79, note: "Daily totals" },
      { label: "Operations", value: 84, note: "Break trends" },
      { label: "Support", value: 91, note: "Team consistency" },
    ],
    [],
  );

  return (
    <div ref={ref} className="h-full">
      <SlideShell
        tone="dark"
        gridClassName="lg:grid-cols-[0.68fr_1.32fr] lg:items-center lg:gap-8"
        ambient={
          <div className="absolute inset-0 overflow-hidden">
            {shouldLoadAmbient ? (
              <video
                className="hidden h-full w-full object-cover opacity-18 saturate-50 md:block"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={landscapeVideo} type="video/mp4" />
              </video>
            ) : null}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,21,38,0.74),rgba(13,21,38,0.92))]" />
          </div>
        }
      >
        <SlideCopy
          inView={inView}
          index="08"
          label="Employer Dashboard"
          title={
            <>
              <span>Real-Time</span>
              <br />
              <span>Intelligence</span>
              <br />
              <span>Without</span>
              <br />
              <span>Micromanagement.</span>
            </>
          }
          subtitle="Leadership gets visibility into trends, not unnecessary surveillance."
          body="Dashboard gives Bedi & Associates clear overview of attendance health: working hours, breaks, daily totals, team consistency, and operational status. It helps leadership make better decisions while keeping employee trust story visible."
          tone="dark"
          titleClassName="max-w-none text-[clamp(2.35rem,3.8vw,4.35rem)]"
        />

        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 18 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={reduceMotion ? { duration: 0 } : { type: "spring", duration: 0.5, bounce: 0.12, delay: 0.08 }}
          className="proposal-card-dark rounded-[38px] p-4"
        >
          <div className="grid gap-3">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ["Attendance trends", "Live", "Clear pulse of daily attendance"],
                ["Daily totals", "Ready", "Cleanly visible across teams"],
                ["Break trends", "Stable", "Respectful context for leadership"],
                ["Team consistency", "Healthy", "Operational confidence"],
              ].map(([label, value, note]) => (
                <MetricCard key={label} label={label} value={value} note={note} tone="dark" />
              ))}
            </div>

            <div className="grid gap-3 xl:grid-cols-[1.18fr_0.82fr]">
              <DashboardPanel
                icon={BarChart3}
                tone="dark"
                title="Attendance Overview"
                subtitle="Live trend view for Bedi & Associates departments."
              >
                <div className="grid gap-4">
                  {analytics.map((item, index) => (
                    <div key={item.label} className="rounded-[22px] border border-white/10 bg-[#111C2D] p-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white">{item.label}</span>
                        <span className="font-medium text-emerald-300">{item.value}%</span>
                      </div>
                      <div className="mt-3">
                        <ProgressBar value={inView ? item.value : 0} tone="dark" />
                      </div>
                      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--pf-text-subtle-dark)]">
                        {item.note}
                      </p>
                    </div>
                  ))}
                </div>
              </DashboardPanel>

              <div className="grid gap-3">
                {[
                  {
                    title: "System Status",
                    value: "Healthy",
                    icon: LayoutDashboard,
                  },
                  {
                    title: "Consent Layer",
                    value: "Active",
                    icon: ShieldCheck,
                  },
                  {
                    title: "Global Settings",
                    value: "Synced",
                    icon: Workflow,
                  },
                  {
                    title: "Attendance Trends",
                    value: "Live",
                    icon: Clock3,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <DashboardPanel
                      key={item.title}
                      icon={Icon}
                      tone="dark"
                      title={item.title}
                      subtitle={item.value}
                    >
                      <motion.div
                        animate={reduceMotion ? undefined : { opacity: [0.72, 1, 0.72] }}
                        transition={reduceMotion ? undefined : { duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs uppercase tracking-[0.18em] text-emerald-300"
                      >
                        <span className="live-dot" />
                        {item.value}
                      </motion.div>
                    </DashboardPanel>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-[0.95fr_1.05fr]">
              <DashboardPanel
                icon={LayoutDashboard}
                tone="dark"
                title="Admin Controls"
                subtitle="Clear attendance surface for HR/admin and leadership teams."
              >
                <div className="grid gap-2.5 sm:grid-cols-3">
                  {[
                    ["Daily totals", "Cleanly visible"],
                    ["Break trends", "Respectful context"],
                    ["Team consistency", "Operationally useful"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-3 text-sm"
                    >
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--pf-text-subtle-dark)]">{label}</p>
                      <p className="mt-2 text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </DashboardPanel>

              <DashboardPanel
                icon={ShieldCheck}
                tone="dark"
                title="Dashboard Note"
                subtitle="Visibility into trends should strengthen trust, not replace it."
              >
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {[
                    "Leadership sees trends, not unnecessary surveillance.",
                    "Attendance data stays useful without feeling invasive.",
                    "Employee trust story remains visible at every layer.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-3 text-sm text-[var(--pf-text-muted-dark)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </DashboardPanel>
            </div>
          </div>
        </motion.div>
      </SlideShell>
    </div>
  );
}

function BenefitsSlide() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.45, once: false });

  return (
    <div ref={ref} className="h-full">
      <SlideShell tone="light" gridClassName="grid-rows-[auto_1fr] gap-5">
        <div className="max-w-4xl">
          <SlideCopy
            inView={inView}
            index="09"
            label="Benefits for Bedi & Associates"
            title="Less Admin Work. More Workplace Clarity."
            subtitle="System helps both leadership and employees."
            body="For Bedi & Associates, value is straightforward: more accurate attendance, less manual admin work, better transparency, cross-platform coverage, stronger decisions, and healthier trust-based culture."
            titleClassName="max-w-[12ch]"
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-3 md:grid-cols-2 xl:grid-cols-3"
        >
          {[
            {
              icon: CheckCircle2,
              title: "Clear attendance records",
              body: "Daily hours and attendance states stay accurate and easy to review.",
            },
            {
              icon: Workflow,
              title: "Less manual cleanup",
              body: "Admins spend less time chasing corrections and spreadsheet fixes.",
            },
            {
              icon: Clock3,
              title: "Transparent working hours",
              body: "Employees and leadership can rely on same daily time view.",
            },
            {
              icon: ShieldCheck,
              title: "Breaks respected",
              body: "Break handling stays visible, fair, and easy to understand.",
            },
            {
              icon: LayoutDashboard,
              title: "Better HR decisions",
              body: "Leadership gets clearer trends for staffing and operations.",
            },
            {
              icon: Sparkles,
              title: "Trust-based culture",
              body: "Attendance becomes support system, not source of extra pressure.",
            },
          ].map((item) => (
            <motion.div key={item.title} variants={staggerItem}>
              <FeatureCard
                tone="light"
                eyebrow="Benefit"
                hover
                className="h-full min-h-[228px]"
                {...item}
              />
            </motion.div>
          ))}
        </motion.div>
      </SlideShell>
    </div>
  );
}

function CultureSlide() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="h-full">
      <SlideShell
        tone="dark"
        gridClassName="items-center"
        ambient={
          <>
            <motion.div
              aria-hidden="true"
              className="proposal-grid absolute -inset-10 opacity-[0.16]"
              animate={reduceMotion ? undefined : { x: [0, 20, 0], y: [0, 20, 0] }}
              transition={reduceMotion ? undefined : { duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/16 blur-3xl"
              animate={reduceMotion ? undefined : { scale: [0.92, 1.08, 0.92], opacity: [0.34, 0.7, 0.34] }}
              transition={reduceMotion ? undefined : { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </>
        }
      >
        <div className="flex h-full items-center justify-center">
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", duration: 0.55, bounce: 0.12 }}
            className="proposal-card-dark w-full max-w-5xl rounded-[40px] p-8 text-center sm:p-12"
          >
            <SectionLabel index="10" label="Closing / Culture Shift" tone="dark" />
            <h2 className="mt-5 font-sans text-[clamp(2.8rem,5vw,5.1rem)] font-semibold leading-[0.94] text-white">
              More Than Software. A Culture Shift.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-xl leading-8 text-slate-100/86">
              Where accountability and trust work together.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[var(--pf-text-muted-dark)]">
              This proposal is not only about installing attendance software. It is about helping
              Bedi & Associates create more transparent, fair, and balanced workplace where
              employees work with confidence and leadership manages attendance with clarity.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              {["Accountability", "Transparency", "Team comfort"].map((item) => (
                <TopNavPill key={item} tone="dark">
                  {item}
                </TopNavPill>
              ))}
            </div>

            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.14 }}
              className="proposal-glow-ring mx-auto mt-8 max-w-3xl rounded-[36px] border border-emerald-400/24 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.16),rgba(11,18,32,0.92))] px-6 py-7"
            >
              <Sparkles className="mx-auto h-7 w-7 text-emerald-300" />
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-emerald-300/88">Final Statement</p>
              <p className="mt-4 font-sans text-[clamp(2rem,3.3vw,3.5rem)] font-semibold leading-tight text-white">
                Accountability + Trust = Better Workplace Flow
              </p>
            </motion.div>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-100/80">
              With this system, Bedi & Associates can support both team comfort and leadership
              visibility, helping everyone succeed together.
            </p>

            <motion.div
              animate={reduceMotion ? undefined : { scale: [1, 1.02, 1], opacity: [0.9, 1, 0.9] }}
              transition={reduceMotion ? undefined : { duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="mx-auto mt-6 max-w-xl rounded-full border border-white/10 bg-white/7 px-6 py-4 text-sm uppercase tracking-[0.22em] text-emerald-100 backdrop-blur-xl"
            >
              Let&apos;s tailor PulseFlow for Bedi & Associates.
            </motion.div>
          </motion.div>
        </div>
      </SlideShell>
    </div>
  );
}

export function AttendancePresentation({
  onNavigateHome,
}: {
  onNavigateHome: () => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const activeIndexRef = useRef(0);
  const wheelLockRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    document.title = "PulseFlow for Bedi & Associates";
  }, []);

  const navigateTo = (index: number) => {
    const nextIndex = clamp(index, 0, sections.length - 1);
    const container = containerRef.current;
    const target = sectionRefs.current[nextIndex];
    if (!container || !target) {
      return;
    }

    container.scrollTo({
      top: target.offsetTop,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.scrollTo({ top: 0, behavior: "auto" });
    activeIndexRef.current = 0;
    setActiveIndex(0);

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / container.clientHeight);
      activeIndexRef.current = index;
      setActiveIndex(index);
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 20 || wheelLockRef.current) {
        return;
      }

      event.preventDefault();
      wheelLockRef.current = true;
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 700);

      navigateTo(activeIndexRef.current + (event.deltaY > 0 ? 1 : -1));
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /input|textarea|select/i.test(target.tagName)) {
        return;
      }

      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        navigateTo(activeIndexRef.current + 1);
      }

      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        navigateTo(activeIndexRef.current - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[var(--pf-bg-light)] text-[var(--pf-text-dark)]">
      <div className="pointer-events-none absolute right-6 top-6 z-30 hidden lg:block">
        <TopNavPill>PULSEFLOW / {sections[activeIndex]?.label}</TopNavPill>
      </div>

      <div className="absolute left-4 top-4 z-30 flex items-center gap-3 sm:left-6 sm:top-6">
        <Button
          variant="outline"
          size="sm"
          onClick={onNavigateHome}
          className="proposal-nav-pill proposal-nav-pill-light h-10 rounded-full border-[var(--pf-border-light)] bg-white/84 px-3 text-xs text-[var(--pf-text-dark)] hover:bg-white sm:px-4 sm:text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Legacy
        </Button>
      </div>

      <div
        ref={containerRef}
        data-testid="attendance-scroll-story"
        className="story-container relative h-screen w-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden scroll-smooth"
      >
        <SnapSection
          sectionRef={(element) => {
            sectionRefs.current[0] = element;
          }}
          testId="attendance-slide-hero"
        >
          <OpeningSlide active={activeIndex === 0} />
        </SnapSection>

        <SnapSection
          sectionRef={(element) => {
            sectionRefs.current[1] = element;
          }}
          testId="attendance-slide-transition"
        >
          <ChallengeSlide />
        </SnapSection>

        <SnapSection
          sectionRef={(element) => {
            sectionRefs.current[2] = element;
          }}
          testId="attendance-slide-balance"
        >
          <BalanceSlide />
        </SnapSection>

        <SnapSection
          sectionRef={(element) => {
            sectionRefs.current[3] = element;
          }}
          testId="attendance-slide-platforms"
        >
          <PlatformProposalSlide />
        </SnapSection>

        <SnapSection
          sectionRef={(element) => {
            sectionRefs.current[4] = element;
          }}
          testId="attendance-slide-workflow"
        >
          <WorkflowSlide />
        </SnapSection>

        <SnapSection
          sectionRef={(element) => {
            sectionRefs.current[5] = element;
          }}
          testId="attendance-slide-trigger"
        >
          <AutoPunchSlide />
        </SnapSection>

        <SnapSection
          sectionRef={(element) => {
            sectionRefs.current[6] = element;
          }}
          testId="attendance-slide-privacy"
        >
          <PrivacySlide />
        </SnapSection>

        <SnapSection
          sectionRef={(element) => {
            sectionRefs.current[7] = element;
          }}
          testId="attendance-slide-admin"
        >
          <AdminSlide active={activeIndex === 7} />
        </SnapSection>

        <SnapSection
          sectionRef={(element) => {
            sectionRefs.current[8] = element;
          }}
          testId="attendance-slide-benefits"
        >
          <BenefitsSlide />
        </SnapSection>

        <SnapSection
          sectionRef={(element) => {
            sectionRefs.current[9] = element;
          }}
          testId="attendance-slide-culture"
        >
          <CultureSlide />
        </SnapSection>
      </div>

    </div>
  );
}
