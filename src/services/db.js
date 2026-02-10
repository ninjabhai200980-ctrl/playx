import pg from 'pg'

const { Pool } = pg

let pool

export async function initDb() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }

  pool = new Pool({ connectionString })
  await pool.query('select 1')
}

export function getDb() {
  if (!pool) {
    throw new Error('Database not initialized')
  }
  return pool
}
