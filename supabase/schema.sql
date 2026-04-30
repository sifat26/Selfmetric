-- Selfmetric: Supabase schema for quiz results + admin dashboard
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- 1. Quiz Results Table
create table if not exists public.quiz_results (
  id              uuid primary key default gen_random_uuid(),
  session_id      text not null,
  primary_type    text not null check (primary_type in ('red','blue','green','yellow')),
  secondary_type  text not null check (secondary_type in ('red','blue','green','yellow')),
  confidence_level text not null check (confidence_level in ('high','medium','balanced')),
  blend_label     text not null,
  is_blend        boolean not null default false,
  is_adaptive     boolean not null default false,
  total_answered  integer not null check (total_answered between 10 and 40),
  scores          jsonb not null,
  percentages     jsonb not null,
  goal            text check (goal is null or goal in ('career','relationship','teamwork','self_growth')),
  ref_code        text,
  respondent_name text,
  created_at      timestamptz not null default now()
);

-- 2. Shared Links Table
--    Person Y creates a link, gets a unique code. Person X takes quiz via that link.
--    Person Y can then view all results tagged with their code.
create table if not exists public.shared_links (
  id          uuid primary key default gen_random_uuid(),
  code        text unique not null,
  label       text not null default '',
  created_at  timestamptz not null default now()
);

-- 3. RLS is DISABLED — all access goes through the Express server which handles
--    authentication and validation. The secret key is used server-side only.
alter table public.quiz_results disable row level security;
alter table public.shared_links disable row level security;

-- 4. Indexes for dashboard queries
create index if not exists idx_results_created_at on public.quiz_results (created_at desc);
create index if not exists idx_results_primary_type on public.quiz_results (primary_type);
create index if not exists idx_results_ref_code on public.quiz_results (ref_code);
create unique index if not exists idx_shared_links_code on public.shared_links (code);
