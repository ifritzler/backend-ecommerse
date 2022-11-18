import path from 'path'
export const knexConfig = {
  client: 'sqlite3',
  filename: path.resolve(process.cwd(), '../db/db.sqlite')
}
