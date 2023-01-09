const config = require('../../config');

module.exports = 
{
  "development": {
    "username": "root",
    "password": 'Importante16',
    "database": "rentalis_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": config.DB_USER,
    "password": config.DB_PASSWORD,
    "database": config.DB_NAME,
    "host": config.DB_HOST,
    "dialect": config.DB_DIALECT
  }
}
