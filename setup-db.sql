-- Create the database
CREATE DATABASE brighthope;

-- Connect to the database
\c brighthope

-- Create the schema
CREATE SCHEMA IF NOT EXISTS public;

-- Grant privileges
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public; 