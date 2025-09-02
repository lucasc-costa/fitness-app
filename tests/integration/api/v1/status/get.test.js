import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      const parsedUpdateAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toEqual(parsedUpdateAt);
      expect(responseBody.dependecies.database.version).toBe("16.6");
      expect(responseBody.dependecies.database.max_connections).toBe("100");
      expect(responseBody.dependecies.database.opened_connections).toBe(1);
    });
  });
});
