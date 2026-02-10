import pkg from 'pg';

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://booking_user:StrongPassword123@localhost:5432/play_booking'
});
