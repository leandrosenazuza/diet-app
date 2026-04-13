import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { mockApi } from "../services/mockApi";

const cardClasses =
  "rounded-2xl border border-brand-earth/35 bg-white/90 p-4 shadow-sm dark:border-brand-sage-dark/35 dark:bg-brand-night-card";

export default function Progress() {
  const [progress, setProgress] = useState(null);
  const [dailyLog, setDailyLog] = useState(null);

  useEffect(() => {
    mockApi.getProgress().then(setProgress);
    mockApi.getDailyLog().then(setDailyLog);
  }, []);

  const macroData = useMemo(() => {
    if (!dailyLog) return [];
    return [
      { name: "Protein", value: dailyLog.macros.protein },
      { name: "Carbs", value: dailyLog.macros.carbs },
      { name: "Fats", value: dailyLog.macros.fats },
    ];
  }, [dailyLog]);

  if (!progress || !dailyLog) {
    return <div className="text-sm text-brand-earth">Loading progress...</div>;
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Progress</h2>
        <p className="text-sm text-brand-earth dark:text-brand-sage">
          Chart widgets built entirely from local mock datasets.
        </p>
      </div>

      <article className={cardClasses}>
        <h3 className="text-lg font-semibold">Weight trend</h3>
        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progress.weightHistory}>
              <XAxis dataKey="date" />
              <YAxis domain={["dataMin - 0.5", "dataMax + 0.5"]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#8fa88b"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className={cardClasses}>
        <h3 className="text-lg font-semibold">Macro grams today</h3>
        <div className="mt-4 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={macroData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#d99952" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  );
}
