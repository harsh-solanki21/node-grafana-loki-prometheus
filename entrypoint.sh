#!/bin/sh

# Wait for the database to be ready
until nc -z postgres 5432; do
    echo "Waiting for postgres..."
    sleep 1
done

echo "PostgreSQL started"

# Run migrations
npx prisma generate
npx prisma migrate deploy

# Start the application
exec pnpm start