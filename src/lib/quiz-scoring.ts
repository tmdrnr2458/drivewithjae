import { Vehicle } from "./inventory-data";

export interface QuizAnswers {
  driving: number;
  passengers: number;
  hobbies: number;
  vibe: number;
  fuel: number;
  selectedFeatures: string[]; // multi-select feature keys from Q6
  budget: number;
}

const BUDGET_MAP: Record<number, string> = {
  0: "under_20k",
  1: "20k_30k",
  2: "30k_40k",
  3: "over_40k",
};

const DRIVING_ENV_MAP: Record<number, string[]> = {
  0: ["city"],
  1: ["suburban"],
  2: ["highway"],
  3: ["city", "suburban", "highway"],
};

const FAMILY_SIZE_MAP: Record<number, string[]> = {
  0: ["solo_couple"],
  1: ["small_family"],
  2: ["large_family"],
  3: ["solo_couple", "small_family"],
};

const FEEL_MAP: Record<number, string[]> = {
  0: ["practical"],
  1: ["sporty"],
  2: ["luxury"],
  3: ["rugged"],
};

const FUEL_MAP: Record<number, string[]> = {
  0: ["gas"],
  1: ["hybrid"],
  2: ["ev"],
  3: ["gas", "hybrid", "ev"],
};

export function scoreVehicle(vehicle: Vehicle, answers: QuizAnswers): number {
  let score = 0;
  const tags = vehicle.lifestyleTags;

  // Budget is a hard filter
  const budgetKey = BUDGET_MAP[answers.budget];
  if (tags.budget !== budgetKey) {
    const budgetOrder = ["under_20k", "20k_30k", "30k_40k", "over_40k"];
    const userIdx = budgetOrder.indexOf(budgetKey);
    const carIdx = budgetOrder.indexOf(tags.budget);
    if (Math.abs(userIdx - carIdx) > 1) return -1;
  } else {
    score += 5;
  }

  // Driving environment (0-5 points)
  const drivingEnvs = DRIVING_ENV_MAP[answers.driving] || [];
  for (const env of drivingEnvs) {
    if (tags.drivingEnv.includes(env)) score += 5;
  }

  // Family size (0-5 points)
  const familySizes = FAMILY_SIZE_MAP[answers.passengers] || [];
  for (const size of familySizes) {
    if (tags.familySize.includes(size)) score += 5;
  }

  // Feel / vibe (0-5 points)
  const feels = FEEL_MAP[answers.vibe] || [];
  for (const feel of feels) {
    if (tags.feel.includes(feel)) score += 5;
  }

  // Fuel preference (0-5 points)
  const fuels = FUEL_MAP[answers.fuel] || [];
  for (const fuel of fuels) {
    if (tags.fuel.includes(fuel)) score += 5;
  }

  // Features: each selected feature that matches the car's features = +2 points
  for (const feature of answers.selectedFeatures) {
    if (tags.features.includes(feature)) score += 2;
  }

  return score;
}

export function getQuizResults(
  inventory: Vehicle[],
  answers: QuizAnswers
): Vehicle[] {
  const scored = inventory
    .map((v) => ({ vehicle: v, score: scoreVehicle(v, answers) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 5).map((s) => s.vehicle);
}
