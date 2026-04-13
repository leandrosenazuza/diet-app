import { useEffect, useMemo, useState } from "react";
import { mockApi } from "../services/mockApi";
import { calculateBmr, calculateTdee } from "../utils/health";

const cardClasses =
  "rounded-2xl border border-brand-earth/35 bg-white/90 p-4 shadow-sm dark:border-brand-sage-dark/35 dark:bg-brand-night-card";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [appleHealth, setAppleHealth] = useState(false);
  const [googleFit, setGoogleFit] = useState(true);

  useEffect(() => {
    mockApi.getUser().then(setUser);
  }, []);

  const metrics = useMemo(() => {
    if (!user) return null;
    const bmr = calculateBmr(user);
    const tdee = calculateTdee(bmr, user.activityLevel);
    return { bmr, tdee };
  }, [user]);

  if (!user || !metrics) {
    return <div className="text-sm text-brand-earth">Loading profile...</div>;
  }

  const handleSave = async () => {
    setIsSaving(true);
    const updated = await mockApi.updateUser(user);
    setUser(updated);
    setIsSaving(false);
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Profile</h2>
        <p className="text-sm text-brand-earth dark:text-brand-sage">
          Static profile editor with local BMR/TDEE estimates.
        </p>
      </div>

      <article className={`${cardClasses} grid gap-3 sm:grid-cols-2`}>
        <label className="text-sm">
          Name
          <input
            className="mt-1 w-full rounded-lg border border-brand-earth/55 px-3 py-2 dark:border-brand-sage-dark dark:bg-brand-night"
            value={user.name}
            onChange={(event) =>
              setUser((previous) => ({ ...previous, name: event.target.value }))
            }
          />
        </label>
        <label className="text-sm">
          Age
          <input
            className="mt-1 w-full rounded-lg border border-brand-earth/55 px-3 py-2 dark:border-brand-sage-dark dark:bg-brand-night"
            type="number"
            value={user.age}
            onChange={(event) =>
              setUser((previous) => ({
                ...previous,
                age: Number(event.target.value),
              }))
            }
          />
        </label>
        <label className="text-sm">
          Weight (kg)
          <input
            className="mt-1 w-full rounded-lg border border-brand-earth/55 px-3 py-2 dark:border-brand-sage-dark dark:bg-brand-night"
            type="number"
            value={user.weight}
            onChange={(event) =>
              setUser((previous) => ({
                ...previous,
                weight: Number(event.target.value),
              }))
            }
          />
        </label>
        <label className="text-sm">
          Height (cm)
          <input
            className="mt-1 w-full rounded-lg border border-brand-earth/55 px-3 py-2 dark:border-brand-sage-dark dark:bg-brand-night"
            type="number"
            value={user.height}
            onChange={(event) =>
              setUser((previous) => ({
                ...previous,
                height: Number(event.target.value),
              }))
            }
          />
        </label>
      </article>

      <article className={cardClasses}>
        <h3 className="text-lg font-semibold">BMR / TDEE</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-brand-sand/70 p-3 dark:bg-brand-night">
            <p className="text-xs uppercase text-brand-earth dark:text-brand-sage">BMR</p>
            <p className="text-xl font-bold">{metrics.bmr} kcal/day</p>
          </div>
          <div className="rounded-xl bg-brand-sand/70 p-3 dark:bg-brand-night">
            <p className="text-xs uppercase text-brand-earth dark:text-brand-sage">
              TDEE
            </p>
            <p className="text-xl font-bold">{metrics.tdee} kcal/day</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="mt-4 rounded-lg bg-brand-caramel px-3 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save profile (mock)"}
        </button>
      </article>

      <article className={cardClasses}>
        <h3 className="text-lg font-semibold">Integrations (UI only)</h3>
        <div className="mt-3 flex flex-col gap-2 text-sm">
          <label className="flex items-center justify-between rounded-lg bg-brand-sand/70 px-3 py-2 dark:bg-brand-night">
            Apple Health
            <input
              type="checkbox"
              checked={appleHealth}
              onChange={(event) => setAppleHealth(event.target.checked)}
            />
          </label>
          <label className="flex items-center justify-between rounded-lg bg-brand-sand/70 px-3 py-2 dark:bg-brand-night">
            Google Fit
            <input
              type="checkbox"
              checked={googleFit}
              onChange={(event) => setGoogleFit(event.target.checked)}
            />
          </label>
        </div>
      </article>
    </section>
  );
}
