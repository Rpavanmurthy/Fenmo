const request = require("supertest");
const app = require("../server");

describe("Expense API", () => {
  it("should create expense", async () => {
    const res = await request(app)
      .post("/expenses")
      .send({
        amount: 100,
        category: "Food",
        date: "2025-01-01"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.amount).toBeDefined();
  });
});