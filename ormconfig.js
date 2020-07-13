const isLocal = !['Test', 'Production'].includes(process.env.NODE_ENV)
const folder =  !isLocal ? 'build' : 'src';
const format = !isLocal ? 'js' : 'ts';

module.exports = {
  "type": process.env.CONNECTION || 'postgres',
  "host": process.env.RDS_HOSTNAME,
  "port": process.env.RDS_PORT,
  "cache": true,
  "username": process.env.RDS_USERNAME,
  "password": process.env.RDS_PASSWORD,
  "database": process.env.RDS_DB_NAME,
  "synchronize": true,
  "logging": true,
  "entities":  [`${folder}/entities/**/*.${format}`],
  "factories": [`${folder}/factories/**/*.${format}`],
  "migrations": [`${folder}/migrations/**/*.${format}`],
  "cli": {
    "entitiesDir": "src/entities",
    "migrationsDir": "src/migrations",
  }
}