-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

-- Extension: pg_trgm

-- DROP EXTENSION pg_trgm;

DROP EXTENSION IF EXISTS pg_trgm CASCADE;
CREATE EXTENSION IF NOT EXISTS pg_trgm
    SCHEMA extensions
    VERSION "1.6";

-- CREATE INDEX IF NOT EXISTS course_name_index
--     ON public.courses USING gin
--     (name COLLATE pg_catalog."default" gin_trgm_ops)
--     TABLESPACE pg_default;

-- CREATE INDEX IF NOT EXISTS course_code_index
--     ON public.courses USING gin
--     (code COLLATE pg_catalog."default" gin_trgm_ops)
--     TABLESPACE pg_default;
