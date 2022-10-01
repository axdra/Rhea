-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

ALTER TABLE IF EXISTS public.issues
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
    ON public.issues
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);

ALTER TABLE IF EXISTS public.unionevents
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only union admins can update"
    ON public.unionevents
    AS PERMISSIVE
    FOR UPDATE
    TO public
    USING ((( SELECT unions.admins
   FROM unions
  WHERE (unions.id = unionevents."union")) && ARRAY[auth.uid()]))
    WITH CHECK ((( SELECT unions.admins
   FROM unions
  WHERE (unions.id = unionevents."union")) && ARRAY[auth.uid()]));


CREATE POLICY "Enable read access for all users"
    ON public.unionevents
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);

ALTER TABLE IF EXISTS public.personalcalendar
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all for users based on user_id"
    ON public.personalcalendar
    AS PERMISSIVE
    FOR ALL
    TO public
    USING ((auth.uid() = user_id));

ALTER TABLE IF EXISTS public.calendars
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
    ON public.calendars
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);

ALTER TABLE IF EXISTS public.unionpage
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only union admins can update"
    ON public.unionpage
    AS PERMISSIVE
    FOR UPDATE
    TO public
    USING ((( SELECT unions.admins
   FROM unions
  WHERE (unions.id = unions.id)) && ARRAY[auth.uid()]))
    WITH CHECK ((( SELECT unions.admins
   FROM unions
  WHERE (unions.id = unions.id)) && ARRAY[auth.uid()]));


CREATE POLICY "Enable read access for all users"
    ON public.unionpage
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);

ALTER TABLE IF EXISTS public.courses
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
    ON public.courses
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);

ALTER TABLE IF EXISTS public.events
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
    ON public.events
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);

ALTER TABLE IF EXISTS public.rooms
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
    ON public.rooms
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);

ALTER TABLE IF EXISTS public.unions
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only union admins can update"
    ON public.unions
    AS PERMISSIVE
    FOR UPDATE
    TO public
    USING ((admins && ARRAY[auth.uid()]))
    WITH CHECK ((admins && ARRAY[auth.uid()]));


CREATE POLICY "Enable read access for all users"
    ON public.unions
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);
