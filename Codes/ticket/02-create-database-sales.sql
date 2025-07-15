DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'pg-tickets-sales') THEN

      CREATE ROLE "pg-tickets-sales" WITH LOGIN PASSWORD 'tickets-sales-password';
   END IF;
END
$do$;


ALTER DATABASE "tickets-sales" OWNER TO "pg-tickets-sales";