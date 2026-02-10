-- Create bookings table
-- Assumes PostgreSQL

CREATE TABLE IF NOT EXISTS bookings (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    contact TEXT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT bookings_date_time_unique UNIQUE (booking_date, booking_time)
);

-- Helpful index for date-based queries
CREATE INDEX IF NOT EXISTS idx_bookings_booking_date
    ON bookings (booking_date);
