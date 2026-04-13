import { useEffect, useMemo, useState } from "react";
import { mockApi } from "../services/mockApi";

const cardClasses =
  "rounded-2xl border border-brand-earth/35 bg-white/90 p-4 shadow-sm dark:border-brand-sage-dark/35 dark:bg-brand-night-card";

export default function FoodTracker() {
  const [foods, setFoods] = useState([]);
  const [newFoodName, setNewFoodName] = useState("");
  const [newFoodCalories, setNewFoodCalories] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    mockApi.getFoods().then(setFoods);
  }, []);

  const totalCalories = useMemo(
    () => foods.reduce((sum, food) => sum + Number(food.calories), 0),
    [foods],
  );

  const handleAddFood = async (event) => {
    event.preventDefault();
    if (!newFoodName.trim() || !newFoodCalories) return;

    const food = {
      id: `local-${Date.now()}`,
      name: newFoodName.trim(),
      calories: Number(newFoodCalories),
      protein: 0,
      carbs: 0,
      fats: 0,
    };

    setIsAdding(true);
    const response = await mockApi.addFood(food);
    if (response.success) {
      setFoods((previous) => [response.food, ...previous]);
      setNewFoodName("");
      setNewFoodCalories("");
    }
    setIsAdding(false);
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Food Tracker</h2>
        <p className="text-sm text-brand-earth dark:text-brand-sage">
          Local static catalog with simulated async insert.
        </p>
      </div>

      <article className={cardClasses}>
        <p className="text-xs uppercase text-brand-earth dark:text-brand-sage">
          Total catalog calories
        </p>
        <p className="mt-1 text-2xl font-bold">{totalCalories} kcal</p>
      </article>

      <article className={cardClasses}>
        <h3 className="text-lg font-semibold">Add food (mock)</h3>
        <form className="mt-3 grid gap-3 sm:grid-cols-3" onSubmit={handleAddFood}>
          <input
            className="rounded-lg border border-brand-earth/55 px-3 py-2 text-sm dark:border-brand-sage-dark dark:bg-brand-night"
            placeholder="Food name"
            value={newFoodName}
            onChange={(event) => setNewFoodName(event.target.value)}
          />
          <input
            className="rounded-lg border border-brand-earth/55 px-3 py-2 text-sm dark:border-brand-sage-dark dark:bg-brand-night"
            type="number"
            min="0"
            placeholder="Calories"
            value={newFoodCalories}
            onChange={(event) => setNewFoodCalories(event.target.value)}
          />
          <button
            type="submit"
            disabled={isAdding}
            className="rounded-lg bg-brand-caramel px-3 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {isAdding ? "Adding..." : "Add food"}
          </button>
        </form>
      </article>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {foods.map((food) => (
          <article key={food.id} className={cardClasses}>
            <h3 className="text-lg font-semibold">{food.name}</h3>
            <p className="mt-2 text-sm text-brand-earth dark:text-brand-sage">
              {food.calories} kcal
            </p>
            <p className="mt-1 text-xs text-brand-earth dark:text-brand-sage">
              P {food.protein}g | C {food.carbs}g | F {food.fats}g
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
