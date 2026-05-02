import { motion, useInView } from "framer-motion";
import { Activity, Database, PencilLine, RadioTower, RefreshCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(Math.round(value));
}

function useAnimatedValue(target: number, duration = 600) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    let frame = 0;
    const startValue = value;
    const startTime = performance.now();

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(startValue + (target - startValue) * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, target]);

  return value;
}

const pendencyRows = [
  { bucket: "0 - 1 yr", matters: 4216, share: "12%" },
  { bucket: "1 - 3 yrs", matters: 9822, share: "27%" },
  { bucket: "3 - 5 yrs", matters: 11496, share: "31%" },
  { bucket: "5 - 10 yrs", matters: 7364, share: "20%" },
  { bucket: "10+ yrs", matters: 3944, share: "10%" },
] as const;

export function JusticeClock() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.55, once: false });
  const [adminOpen, setAdminOpen] = useState(false);
  const [metrics, setMetrics] = useState({
    institution: 193842,
    disposed: 186174,
    ccr: 96.0,
    feedLag: "00:01:12",
  });

  useEffect(() => {
    if (!inView) {
      return;
    }

    const interval = window.setInterval(() => {
      setMetrics((current) => {
        const institutionDelta = 16 + Math.floor(Math.random() * 20);
        const disposedDelta = 14 + Math.floor(Math.random() * 18);
        const nextInstitution = current.institution + institutionDelta;
        const nextDisposed = current.disposed + disposedDelta;
        const nextCcr = Number(((nextDisposed / nextInstitution) * 100).toFixed(1));

        return {
          institution: nextInstitution,
          disposed: nextDisposed,
          ccr: nextCcr,
          feedLag: "00:00:0" + ((Math.floor(Math.random() * 4) + 1) as 1 | 2 | 3 | 4),
        };
      });
    }, 2400);

    return () => window.clearInterval(interval);
  }, [inView]);

  const animatedInstitution = useAnimatedValue(metrics.institution);
  const animatedDisposed = useAnimatedValue(metrics.disposed);
  const animatedCcr = useAnimatedValue(metrics.ccr, 500);

  const metricCards = useMemo(
    () => [
      {
        label: "Total Institution",
        value: formatNumber(animatedInstitution),
        note: "Registry intake and public filings",
        icon: Database,
      },
      {
        label: "Disposed",
        value: formatNumber(animatedDisposed),
        note: "Bench-led disposal activity",
        icon: Activity,
      },
      {
        label: "CCR %",
        value: animatedCcr.toFixed(1),
        note: "Case Clearance Rate",
        icon: RadioTower,
      },
    ],
    [animatedCcr, animatedDisposed, animatedInstitution],
  );

  return (
    <div
      ref={ref}
      className="relative grid h-full gap-4 rounded-[38px] border border-white/10 bg-[#020817] p-4 text-white shadow-[0_40px_140px_rgba(2,8,23,0.6)] sm:p-5 lg:grid-cols-[1.16fr_0.84fr] lg:p-6"
    >
      <div className="absolute inset-0 rounded-[38px] bg-[radial-gradient(circle_at_top_left,rgba(201,162,39,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_28%)]" />
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex items-start justify-between gap-4"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.36em] text-[#c9a227]/80">
              Slide 03 / The Justice Clock
            </p>
            <h2 className="mt-4 max-w-[12ch] font-display text-3xl font-semibold leading-[0.92] text-white sm:text-4xl lg:text-[3rem]">
              The Living Heart of Institutional Trust.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
              A living bench-facing dashboard where intake, disposals, and pendency are surfaced
              with the calm precision of a command room.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="border-gold/40 bg-gold/10 text-gold hover:bg-gold hover:text-[#020817]"
            onClick={() => setAdminOpen(true)}
          >
            <PencilLine className="h-4 w-4" />
            Admin: Edit
          </Button>
        </motion.div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {metricCards.map((metric, index) => {
            const Icon = metric.icon;

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + index * 0.1 }}
                className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.24em] text-white/50">
                    {metric.label}
                  </span>
                  <div className="rounded-full border border-gold/30 bg-gold/10 p-2 text-gold">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 font-sans text-[clamp(1.7rem,3vw,2.6rem)] font-semibold tracking-[0.01em] text-[#f3c85e] tabular-nums">
                  {metric.value}
                  {metric.label === "CCR %" ? "%" : ""}
                </div>
                <p className="mt-2 text-sm leading-6 text-white/60">{metric.note}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-3"
        >
          <div className="rounded-[28px] border border-gold/25 bg-[linear-gradient(180deg,rgba(201,162,39,0.14),rgba(255,255,255,0.03))] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[#f3c85e]">
              Live ingestion
            </p>
            <p className="mt-3 font-display text-[1.8rem] leading-tight text-white">
              Amber digits move with the feed.
            </p>
            <p className="mt-3 text-sm leading-6 text-white/70">
              The counter logic uses a lightweight interval to simulate real-time registry intake
              while the digits animate independently for a calm, board-ready surface.
            </p>
            <div className="mt-4 space-y-2.5">
              {[
                "Institution figures update without interrupting narration.",
                "Disposed matters and CCR surface decision-making confidence.",
                "The age table signals transparency for long-tail pendency.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/8 bg-[#0f1827] px-4 py-3 text-sm leading-6 text-white/70"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.25 }}
        className="relative flex flex-col gap-3 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#f3c85e]">Operational pulse</p>
          <div className="mt-4 rounded-[24px] border border-white/10 bg-[#08101d] p-4">
            <p className="text-sm text-white/60">Registry stream status</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="live-dot" />
              <span className="text-lg font-medium text-white">Live from synchronized matter feeds</span>
            </div>
          </div>
        </div>

        <div className="rounded-[26px] border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="live-dot" />
              <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                Age-wise Pendency
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-[#0e1728] px-3 py-2 text-xs text-white/60">
              Feed lag {metrics.feedLag}
            </div>
          </div>

          <div className="mt-3 overflow-hidden rounded-[22px] border border-white/8">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-white/5 text-xs uppercase tracking-[0.22em] text-white/40">
                  <th className="px-4 py-3 font-medium">Age Band</th>
                  <th className="px-4 py-3 font-medium">Matters</th>
                  <th className="px-4 py-3 font-medium">Share</th>
                </tr>
              </thead>
              <tbody>
                {pendencyRows.map((row, index) => (
                  <tr
                    key={row.bucket}
                    className={index !== pendencyRows.length - 1 ? "border-t border-white/8" : ""}
                  >
                    <td className="px-4 py-3 text-sm text-white/70">{row.bucket}</td>
                    <td className="px-4 py-3 text-sm font-medium text-white">
                      {formatNumber(row.matters)}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#f3c85e]">{row.share}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      <Dialog open={adminOpen} onOpenChange={setAdminOpen}>
        <DialogContent className="border-gold/40 bg-[#08111e] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Authorized Metrics Control</DialogTitle>
            <DialogDescription className="text-white/70">
              In the live system, only an authorized operator can manually override values or sync
              the dashboard against the latest registry feed.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Manual Override", "Correct a court-issued figure after verification."],
                ["Sync Registry Feed", "Pull the newest intake and disposal snapshot."],
              ].map(([label, copy]) => (
                <div
                  key={label}
                  className="rounded-[24px] border border-gold/25 bg-gold/10 p-5 text-sm leading-7 text-white/70"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-[#f3c85e]">{label}</p>
                  <p className="mt-3">{copy}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-3">
              {[
                ["Total Institution", formatNumber(metrics.institution)],
                ["Disposed", formatNumber(metrics.disposed)],
                ["CCR %", metrics.ccr.toFixed(1)],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                >
                  <span className="text-sm text-white/70">{label}</span>
                  <span className="text-sm font-medium text-white">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-end gap-3">
              <Button
                variant="outline"
                className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                onClick={() => setAdminOpen(false)}
              >
                Close Demo
              </Button>
              <Button
                variant="gold"
                className="bg-gold text-[#08111e] hover:bg-[#dfb84b]"
                onClick={() => setAdminOpen(false)}
              >
                <RefreshCcw className="h-4 w-4" />
                Sync Example Feed
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
