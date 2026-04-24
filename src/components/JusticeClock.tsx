import { motion, useInView } from "framer-motion";
import { Activity, Clock3, DatabaseZap, Scale, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function useAnimatedNumber(target: number, shouldAnimate: boolean, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [duration, shouldAnimate, target]);

  return value;
}

const pendencyData = [
  { bucket: "0-1 Year", matters: 4100 },
  { bucket: "1-3 Years", matters: 9610 },
  { bucket: "3-5 Years", matters: 12440 },
  { bucket: "5-10 Years", matters: 8960 },
  { bucket: "10+ Years", matters: 5920 },
];

export function JusticeClock() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const metrics = useMemo(
    () => [
      {
        label: "Total Cases",
        value: 128449,
        icon: Scale,
      },
      {
        label: "Disposed",
        value: 87421,
        icon: DatabaseZap,
      },
      {
        label: "Pending",
        value: 41028,
        icon: Clock3,
      },
      {
        label: "Listed Today",
        value: 312,
        icon: Activity,
      },
    ],
    [],
  );

  const totalPendency = pendencyData.reduce((sum, item) => sum + item.matters, 0);

  return (
    <div ref={ref} className="grid h-full min-h-0 gap-4 lg:gap-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.36em] text-gold/70">
            Slide 03 / The Justice Clock
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
            Decision velocity, surfaced like an executive command center.
          </h2>
        </div>
        <div className="midnight-frost rounded-[24px] border border-white/10 px-4 py-3 text-xs leading-6 text-white/75 sm:px-5 sm:py-4 sm:text-sm">
          Based on a high-volume judiciary dashboard model, redesigned for stakeholder confidence.
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            index={index}
            icon={metric.icon}
            inView={inView}
          />
        ))}
      </div>

      <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-white/10 bg-white/5 shadow-none">
          <CardContent className="h-full p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/50">
                  Age-wise pendency
                </p>
                <h3 className="mt-2 font-display text-xl text-white sm:text-2xl">
                  High-end Recharts breakdown
                </h3>
              </div>
              <div className="rounded-full border border-gold/30 bg-gold/10 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-gold sm:text-xs">
                20-year dataset ready
              </div>
            </div>
            <div className="mt-4 h-[110px] w-full sm:mt-6 sm:h-[240px] lg:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={pendencyData}
                  layout="vertical"
                  margin={{ top: 4, right: 12, left: 6, bottom: 8 }}
                >
                  <defs>
                    <linearGradient id="pendencyFill" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#C9A227" />
                      <stop offset="100%" stopColor="#FFE089" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" horizontal={false} />
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "rgba(255,255,255,0.48)", fontSize: 10 }}
                  />
                  <YAxis
                    dataKey="bucket"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    width={64}
                    tick={{ fill: "rgba(255,255,255,0.68)", fontSize: 10 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#07172A",
                      border: "1px solid rgba(201,162,39,0.35)",
                      borderRadius: 18,
                      color: "#fff",
                    }}
                    labelStyle={{ color: "#fff" }}
                    formatter={(value: number) => [formatNumber(value), "Matters"]}
                  />
                  <Bar dataKey="matters" radius={[0, 10, 10, 0]} barSize={10}>
                    {pendencyData.map((entry) => (
                      <Cell key={entry.bucket} fill="url(#pendencyFill)" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid gap-1.5 lg:hidden">
              {pendencyData.map((item) => (
                <div
                  key={item.bucket}
                  className="rounded-2xl border border-white/8 bg-white/5 px-3 py-2"
                >
                  <div className="flex items-center justify-between gap-4 text-xs">
                    <span className="text-white/68">{item.bucket}</span>
                    <span className="font-semibold text-white">{formatNumber(item.matters)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="hidden gap-5 lg:grid">
          <Card className="border-white/10 bg-white/5 shadow-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-gold">
                <Sparkles className="h-5 w-5" />
                <p className="text-xs uppercase tracking-[0.28em] text-white/55">
                  Stakeholder Summary
                </p>
              </div>
              <div className="mt-5 grid gap-4">
                {pendencyData.map((item) => (
                  <div key={item.bucket} className="rounded-2xl border border-white/8 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/68">{item.bucket}</span>
                      <span className="font-semibold text-white">{formatNumber(item.matters)}</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-gold to-[#FFE089]"
                        style={{ width: `${(item.matters / totalPendency) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-gradient-to-br from-gold/15 to-white/5 shadow-none">
            <CardContent className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Room-stopper metric</p>
              <p className="mt-3 font-display text-3xl text-white">
                Fast enough for a 20-year case archive without losing visual clarity.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/72">
                React, Vite, and motion-driven rendering keep the dashboard fluid even when the
                dataset is large. That becomes the proof-point when you present the prototype to the board.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  index,
  icon: Icon,
  inView,
}: {
  label: string;
  value: number;
  index: number;
  icon: typeof Scale;
  inView: boolean;
}) {
  const animatedValue = useAnimatedNumber(value, inView, 1000 + index * 150);
  const pulse = label === "Listed Today";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.55, delay: index * 0.12 }}
    >
      <Card
        className={`relative overflow-hidden border-white/8 bg-white/5 text-white shadow-none ${
          pulse ? "animate-pulseGlow" : ""
        }`}
      >
        <CardContent className="p-3.5 sm:p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.28em] text-white/55">{label}</p>
            <div className="rounded-2xl border border-gold/35 bg-gold/10 p-2.5 text-gold sm:p-3">
              <Icon className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-4 text-xl font-semibold tracking-tight text-white sm:text-3xl md:text-5xl">
            {formatNumber(animatedValue)}
          </p>
          <p className="mt-2 hidden text-xs text-white/65 sm:mt-3 sm:block sm:text-sm">
            {label === "Listed Today"
              ? "Justice Pulse glows when the daily docket locks."
              : "Live metrics keep high-volume systems legible to leadership."}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
