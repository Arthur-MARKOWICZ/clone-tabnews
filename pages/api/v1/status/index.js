import database from "infra/database.js";
async function status(request, response) {
  const updateAt = new Date().toISOString();

  const databaseName = process.env.POSTGRES_DB;
  

  const databaseVersion = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersion.rows[0].server_version;

  const databaseConnectionMax = await database.query("SHOW max_connections")
  const databaseConnectionMaxValue = databaseConnectionMax.rows[0].max_connections;

  
  const databaseOpenedConnection = await database.query({
    text: "SELECT count(*) :: int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName]
  });
  const databaseOpenedConnectionValue = databaseOpenedConnection.rows[0].count ;


  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseConnectionMaxValue),
        open_connections: databaseOpenedConnectionValue,

      }
    }
   });
  }
export default status;
