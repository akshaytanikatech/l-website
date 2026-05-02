import { motion, useInView } from "framer-motion";
import { BriefcaseBusiness, Fingerprint, ShieldCheck, UserCog2 } from "lucide-react";
import { useEffect, useRef } from "react";

interface LawyerCockpitProps {
  activeStep: number;
  isActive: boolean;
  onStepChange: (step: number) => void;
}

const cockpitCards = [
  {
    id: "identity",
    label: "01 / Identity",
    title: "Identity is the first permission surface.",
    icon: Fingerprint,
    copy:
      "Every advocate, clerk, registrar, and admin operator enters through a role-defined gateway before any matter is exposed.",
  },
  {
    id: "dashboard",
    label: "02 / Dashboard",
    title: "The day begins with hearings, timelines, and next action.",
    icon: BriefcaseBusiness,
    copy:
      "The working dashboard is arranged around courtroom urgency so counsel can understand today's posture in a single glance.",
  },
  {
    id: "admin",
    label: "03 / Admin Control",
    title: "Governance tools protect operational consistency.",
    icon: UserCog2,
    copy:
      "Administrative controls route work, preserve auditability, and let institutional policy shape execution without cluttering the user experience.",
  },
] as const;

export function LawyerCockpit({
  activeStep,
  isActive,
  onStepChange,
}: LawyerCockpitProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const inView = useInView(ref, { amount: 0.5, once: false });

  useEffect(() => {
    const card = cardRefs.current[activeStep];
    if (!card) {
      return;
    }

    card.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [activeStep]);

  return (
    <div
      ref={ref}
      className="grid h-full items-stretch gap-6 rounded-[38px] border border-navy/10 bg-white/70 p-4 shadow-[0_40px_120px_rgba(5,17,33,0.14)] backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr] lg:p-6"
    >
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="marble-surface relative overflow-hidden rounded-[32px] border border-navy/10 px-6 py-8 lg:px-8 lg:py-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,162,39,0.16),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.74),rgba(245,247,250,0.9))]" />
        <div className="relative flex h-full flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.36em] text-gold/90">
              Slide 04 / The Lawyer&apos;s Cockpit
            </p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-[#051121] sm:text-5xl">
              The Lawyer&apos;s Cockpit.
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-[#051121]/70">
              A unified operating surface where identity meets efficiency.
            </p>
          </div>

          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-[28px] border border-navy/10 bg-white/80 p-5 shadow-[0_24px_90px_rgba(5,17,33,0.1)]"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-gold">
              Active Surface
            </p>
            <h3 className="mt-4 font-display text-3xl text-[#051121]">
              {cockpitCards[activeStep].title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#051121]/70">
              {cockpitCards[activeStep].copy}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Identity", "Workflow", "Governance"].map((item, index) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onStepChange(index)}
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.22em] transition ${
                    activeStep === index
                      ? "border-gold bg-gold/10 text-[#051121]"
                      : "border-navy/10 bg-paper text-[#051121]/60 hover:border-gold/30"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="inline-flex w-max items-center gap-3 rounded-full border border-navy/10 bg-white/70 px-4 py-3 text-xs uppercase tracking-[0.22em] text-[#051121]/60">
            <ShieldCheck className="h-4 w-4 text-gold" />
            Unified operating surface
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative overflow-hidden rounded-[32px] border border-[#051121]/8 bg-[#051121]"
      >
        <div
          data-cockpit-scroll="true"
          className="nested-scroll h-full snap-y snap-mandatory overflow-y-auto px-4 py-5 sm:px-5"
        >
          <div className="space-y-5">
            <section
              ref={(element) => {
                cardRefs.current[0] = element;
              }}
              onClick={() => onStepChange(activeStep === 0 && isActive ? 1 : 0)}
              className={`min-h-[74vh] snap-center rounded-[28px] border p-6 transition sm:p-8 ${
                activeStep === 0
                  ? "border-gold/40 bg-[linear-gradient(180deg,rgba(201,162,39,0.18),rgba(255,255,255,0.06))]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-gold">
                    {cockpitCards[0].label}
                  </p>
                  <h3 className="mt-4 font-display text-3xl text-white sm:text-4xl">
                    Identity Layer
                  </h3>
                </div>
                <div className="rounded-2xl border border-gold/30 bg-gold/10 p-3 text-gold">
                  <Fingerprint className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
                <div className="rounded-[24px] border border-white/10 bg-[#0b1a31] p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                    Access Persona
                  </p>
                  <div className="mt-5 space-y-3">
                    {[
                      ["Member ID", "LA-CHM-2047"],
                      ["Role", "Senior Counsel"],
                      ["Chamber", "Constitution Bench Cell"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                      >
                        <span className="text-sm text-white/60">{label}</span>
                        <span className="text-sm font-medium text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                    Gate Conditions
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      "Role-verified session",
                      "Matter-wise permission map",
                      "Conflict barrier checks",
                      "Signed audit trail",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-[#0b1628] px-4 py-4 text-sm text-white/70"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section
              ref={(element) => {
                cardRefs.current[1] = element;
              }}
              onClick={() => onStepChange(activeStep === 1 && isActive ? 2 : 1)}
              className={`min-h-[74vh] snap-center rounded-[28px] border p-6 transition sm:p-8 ${
                activeStep === 1
                  ? "border-gold/40 bg-[linear-gradient(180deg,rgba(201,162,39,0.16),rgba(255,255,255,0.05))]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-gold">
                    {cockpitCards[1].label}
                  </p>
                  <h3 className="mt-4 font-display text-3xl text-white sm:text-4xl">
                    Dashboard
                  </h3>
                </div>
                <div className="rounded-2xl border border-gold/30 bg-gold/10 p-3 text-gold">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                    Today&apos;s Hearings
                  </p>
                  <div className="mt-4 space-y-3">
                    {[
                      ["10:00", "State Bar vs. Registrar", "Court Hall 1"],
                      ["12:15", "Appeal 218 / 2026", "Division Bench"],
                      ["15:40", "Review Petition 47", "Chamber Listing"],
                    ].map(([time, matter, court]) => (
                      <div
                        key={matter}
                        className="rounded-2xl border border-white/10 bg-[#0b1628] px-4 py-4"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-lg font-semibold text-white">{time}</span>
                          <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/50">
                            {court}
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-white/75">{matter}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[24px] border border-gold/25 bg-[linear-gradient(180deg,rgba(201,162,39,0.14),rgba(255,255,255,0.04))] p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-gold">
                      Matter Timeline
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {[
                        "Draft Complete",
                        "Reply Filed",
                        "Hearing Listed",
                      ].map((item, index) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-full border border-white/10 bg-[#0b1628] px-4 py-3 text-sm text-white/70"
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-semibold text-[#051121]">
                            {index + 1}
                          </span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                      Immediate actions
                    </p>
                    <div className="mt-4 space-y-3">
                      {[
                        "Review reply filed overnight by chamber associate.",
                        "Validate annexures before noon bench upload.",
                        "Confirm appearance order with junior counsel.",
                      ].map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-white/10 bg-[#0b1628] px-4 py-4 text-sm text-white/70"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              ref={(element) => {
                cardRefs.current[2] = element;
              }}
              onClick={() => onStepChange(2)}
              className={`min-h-[74vh] snap-center rounded-[28px] border p-6 transition sm:p-8 ${
                activeStep === 2
                  ? "border-gold/40 bg-[linear-gradient(180deg,rgba(201,162,39,0.18),rgba(255,255,255,0.05))]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-gold">
                    {cockpitCards[2].label}
                  </p>
                  <h3 className="mt-4 font-display text-3xl text-white sm:text-4xl">
                    Admin Control
                  </h3>
                </div>
                <div className="rounded-2xl border border-gold/30 bg-gold/10 p-3 text-gold">
                  <UserCog2 className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[24px] border border-white/10 bg-[#0b1628] p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                    Assignment Board
                  </p>
                  <div className="mt-5 space-y-3">
                    {[
                      ["New Arbitration", "Assigned to Commercial Cell"],
                      ["Urgent Mention", "Escalated to Senior Counsel"],
                      ["Registry Follow-Up", "Clerking desk confirmed"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                      >
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">{label}</p>
                        <p className="mt-2 text-sm text-white/80">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[24px] border border-gold/25 bg-[linear-gradient(180deg,rgba(201,162,39,0.16),rgba(255,255,255,0.04))] p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-gold">
                      Governance Controls
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {[
                        "Partner Override",
                        "Conflict Firewall",
                        "Bench Sensitivity Rules",
                        "Audit Logging",
                      ].map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/12 bg-[#0b1628] px-4 py-3 text-sm text-white/72"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                      Why this matters
                    </p>
                    <p className="mt-4 text-sm leading-7 text-white/70">
                      The cockpit stays elegant because control is layered. Power is available to
                      the right people without turning the working surface into an administrative maze.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
