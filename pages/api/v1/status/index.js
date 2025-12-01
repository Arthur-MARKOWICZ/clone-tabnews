import database from "infra/database.js";
async function status(request, response) {
  const updateAt = new Date().toISOString();
  const versionDataBase = await database.query("SELECT version()");
  const maxConnections = await database.query("SHOW max_connections");
  const openConnections = await  database.query( "SELECT COUNT(*) FROM pg_stat_activity");
  response.status(200).json({
    update_at: updateAt,
    version_database: versionDataBase,
    max_connections: maxConnections,
    open_connections: openConnections
   });
}
export default status;
