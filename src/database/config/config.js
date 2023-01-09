import {DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_DIALECT} from '../../config'

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
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": DB_DIALECT
  }
}
