const ACTIVITY_FACTORS = {
  low: 1.2,
  moderate: 1.55,
  high: 1.725,
};

export function calculateBmr({ gender, weight, height, age }) {
  const weightFactor = 10 * weight;
  const heightFactor = 6.25 * height;
  const ageFactor = 5 * age;

  if (gender === "male") {
    return Math.round(weightFactor + heightFactor - ageFactor + 5);
  }

  return Math.round(weightFactor + heightFactor - ageFactor - 161);
}

export function calculateTdee(bmr, activityLevel) {
  const activityFactor = ACTIVITY_FACTORS[activityLevel] ?? 1.2;
  return Math.round(bmr * activityFactor);
}
