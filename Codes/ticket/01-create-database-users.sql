-- Creates the user only if it doesn't exist
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'pg-tickets-users') THEN

      CREATE ROLE "pg-tickets-users" WITH LOGIN PASSWORD 'tickets-users-password';
   END IF;
END
$do$;

-- Creates the database only if it doesn't exist
-- Note: You cannot run CREATE DATABASE inside a transaction block,
-- so we check for its existence in a separate query.
-- This part is a bit tricky and often it's better to rely on the
-- POSTGRES_DB environment variable. However, to make your script work:
-- You can connect to the default 'postgres' database and run:
-- SELECT 'CREATE DATABASE "tickets-users"'
-- WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'tickets-users')\gexec
-- For simplicity in the entrypoint script, we'll just alter the owner.

ALTER DATABASE "tickets-users" OWNER TO "pg-tickets-users";