import user from "../mock/user.json";
import foods from "../mock/foods.json";
import dailyLog from "../mock/dailyLog.json";
import progress from "../mock/progress.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  async getUser() {
    await delay(400);
    return user;
  },

  async getFoods() {
    await delay(400);
    return foods;
  },

  async getDailyLog() {
    await delay(400);
    return dailyLog;
  },

  async getProgress() {
    await delay(400);
    return progress;
  },

  async updateUser(data) {
    await delay(500);
    return { ...user, ...data };
  },

  async addFood(food) {
    await delay(300);
    return { success: true, food };
  },
};
