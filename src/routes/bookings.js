import { Router } from 'express';
import { pool } from '../db.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = Router();

router.get('/', adminAuth, async (req, res) => {
  const page = Math.max(parseInt(req.query.page || '1', 10), 1);
  const limit = Math.min(parseInt(req.query.limit || '10', 10), 100);
  const offset = (page - 1) * limit;
  const { startDate, endDate } = req.query;

  const filters = [];
  const values = [];

  if (startDate) {
    values.push(startDate);
    filters.push(`booking_date >= $${values.length}`);
  }

  if (endDate) {
    values.push(endDate);
    filters.push(`booking_date <= $${values.length}`);
  }

  const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';

  const dataQuery = `
    SELECT * FROM bookings
    ${whereClause}
    ORDER BY booking_date DESC
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2}
  `;

  const countQuery = `SELECT COUNT(*) FROM bookings ${whereClause}`;

  try {
    const dataResult = await pool.query(dataQuery, [...values, limit, offset]);
    const countResult = await pool.query(countQuery, values);

    res.json({
      data: dataResult.rows,
      pagination: {
        page,
        limit,
        total: parseInt(countResult.rows[0].count, 10)
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

export default router;
