import { useEffect, useState } from "react";
import { mockApi } from "../services/mockApi";

const cardClasses =
  "rounded-2xl border border-brand-earth/35 bg-white/90 p-4 shadow-sm dark:border-brand-sage-dark/35 dark:bg-brand-night-card";

export default function Dashboard({ onLogout }) {
  const [dailyLog, setDailyLog] = useState(null);
  const [exerciseBurn, setExerciseBurn] = useState(120);

  useEffect(() => {
    mockApi.getDailyLog().then(setDailyLog);
  }, []);

  if (!dailyLog) {
    return <div className="text-sm text-brand-earth">Loading dashboard...</div>;
  }

  const waterGoalMl = 2500;
  const waterPercentage = Math.min(
    100,
    Math.round((dailyLog.waterMl / waterGoalMl) * 100),
  );
  const netCalories = dailyLog.caloriesConsumed - dailyLog.caloriesBurned;

  return (
    <section className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-sm text-brand-earth dark:text-brand-sage">
            Static nutrition overview powered by local mock JSON.
          </p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-lg border border-brand-ink bg-brand-ink px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3b3128]"
        >
          Sair
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className={cardClasses}>
          <p className="text-xs uppercase text-brand-earth dark:text-brand-sage">
            Calories consumed
          </p>
          <p className="mt-2 text-2xl font-bold">{dailyLog.caloriesConsumed} kcal</p>
        </article>

        <article className={cardClasses}>
          <p className="text-xs uppercase text-brand-earth dark:text-brand-sage">
            Calories burned
          </p>
          <p className="mt-2 text-2xl font-bold">{dailyLog.caloriesBurned} kcal</p>
        </article>

        <article className={cardClasses}>
          <p className="text-xs uppercase text-brand-earth dark:text-brand-sage">
            Net calories
          </p>
          <p className="mt-2 text-2xl font-bold">{netCalories} kcal</p>
        </article>

        <article className={cardClasses}>
          <p className="text-xs uppercase text-brand-earth dark:text-brand-sage">Water</p>
          <p className="mt-2 text-2xl font-bold">{dailyLog.waterMl} ml</p>
        </article>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <article className={`${cardClasses} lg:col-span-2`}>
          <h3 className="text-lg font-semibold">Macro split</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-brand-sand/70 p-3 dark:bg-brand-night">
              <p className="text-xs text-brand-earth dark:text-brand-sage">Protein</p>
              <p className="text-xl font-semibold">{dailyLog.macros.protein} g</p>
            </div>
            <div className="rounded-xl bg-brand-sand/70 p-3 dark:bg-brand-night">
              <p className="text-xs text-brand-earth dark:text-brand-sage">Carbs</p>
              <p className="text-xl font-semibold">{dailyLog.macros.carbs} g</p>
            </div>
            <div className="rounded-xl bg-brand-sand/70 p-3 dark:bg-brand-night">
              <p className="text-xs text-brand-earth dark:text-brand-sage">Fats</p>
              <p className="text-xl font-semibold">{dailyLog.macros.fats} g</p>
            </div>
          </div>
        </article>

        <article className={cardClasses}>
          <h3 className="text-lg font-semibold">Hydration</h3>
          <p className="mt-1 text-sm text-brand-earth dark:text-brand-sage">
            Goal: {waterGoalMl} ml per day
          </p>
          <div className="mt-3 h-3 w-full rounded-full bg-brand-sand dark:bg-brand-night">
            <div
              className="h-full rounded-full bg-brand-caramel transition-all"
              style={{ width: `${waterPercentage}%` }}
            />
          </div>
          <p className="mt-2 text-sm font-medium">{waterPercentage}% completed</p>
        </article>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className={cardClasses}>
          <h3 className="text-lg font-semibold">Fasting timer</h3>
          <p className="mt-2 text-3xl font-bold">14h 20m</p>
          <p className="mt-1 text-sm text-brand-earth dark:text-brand-sage">
            Placeholder UI for a future real timer feature.
          </p>
          <button
            type="button"
            className="mt-3 rounded-lg border border-brand-earth/60 px-3 py-2 text-sm font-medium dark:border-brand-sage-dark"
          >
            Reset timer (UI only)
          </button>
        </article>

        <article className={cardClasses}>
          <h3 className="text-lg font-semibold">Exercise tracking</h3>
          <p className="mt-2 text-2xl font-bold">{exerciseBurn} kcal</p>
          <p className="mt-1 text-sm text-brand-earth dark:text-brand-sage">
            Mock calories burned in workouts.
          </p>
          <button
            type="button"
            className="mt-3 rounded-lg bg-brand-caramel px-3 py-2 text-sm font-medium text-white"
            onClick={() => setExerciseBurn((previous) => previous + 35)}
          >
            Add workout session
          </button>
        </article>
      </div>
    </section>
  );
}
