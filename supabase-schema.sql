-- ============================================================
-- Cucina Plus — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ─────────────────────────────────────────────
-- 1. Projects (Portfolio) Table
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.projects (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  title      text        NOT NULL,
  image_url  text        NOT NULL,
  category   text        NOT NULL CHECK (category IN ('kitchen', 'bedroom', 'decor')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view projects"
  ON public.projects FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert projects"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update projects"
  ON public.projects FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admins can delete projects"
  ON public.projects FOR DELETE
  TO authenticated
  USING (true);


-- ─────────────────────────────────────────────
-- 2. Messages (Contact Form) Table
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.messages (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  name       text        NOT NULL,
  phone      text        NOT NULL,
  service    text,
  message    text        NOT NULL,
  status     text        DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a message"
  ON public.messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view messages"
  ON public.messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update message status"
  ON public.messages FOR UPDATE
  TO authenticated
  USING (true);


-- ─────────────────────────────────────────────
-- 3. Supabase Storage — Portfolio Bucket
-- ─────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT DO NOTHING;

CREATE POLICY "Public can view portfolio images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio');

CREATE POLICY "Admins can upload portfolio images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'portfolio');

CREATE POLICY "Admins can delete portfolio images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'portfolio');
