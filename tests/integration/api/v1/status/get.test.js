test("GET to /api/v1/status should return 200", async () => {
  var response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  const versionDatabase = responseBody.version_database;
  const parsedUpdateAt =  new Date(responseBody.update_at).toISOString();
  const maxConnections = responseBody.max_connections;
  const openConnections =  responseBody.open_connections;
  expect(responseBody.update_at).toBeDefined();
  
  expect(responseBody.update_at).toEqual(parsedUpdateAt);
  
  expect(responseBody.version_database).toBeDefined();
  expect(responseBody.version_database).not.toBeNull();
  expect(responseBody.max_connections).toBeDefined();
  expect(responseBody.max_connections).not.toBeNull();
  
  expect(responseBody.open_connections).toBeDefined();
  expect(responseBody.open_connections).not.toBeNull();
});
