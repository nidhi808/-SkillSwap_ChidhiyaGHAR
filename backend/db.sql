-- =======================================================
-- SkillSwap Database Schema (Production PostgreSQL + pgvector)
-- =======================================================

-- ✅ Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector"; -- pgvector

-- Create schemas if needed
CREATE SCHEMA IF NOT EXISTS public;

-- =======================================================
-- 1. Users Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email character varying(255) NOT NULL UNIQUE,
  username character varying(50) UNIQUE,
  password_hash text,
  role character varying(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  is_email_verified boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  is_banned boolean NOT NULL DEFAULT false,
  mfa_enabled boolean NOT NULL DEFAULT false,
  mfa_secret text,
  password_reset_token text,
  password_reset_expires timestamp with time zone,
  deleted_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON public.users(username);

-- =======================================================
-- 2. Profiles Table (with Vector Embedding for Matching)
-- =======================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  full_name character varying(100),
  avatar_url text,
  cover_url text,
  bio text,
  timezone character varying(50) DEFAULT 'UTC',
  location text,
  city character varying(100),
  state_code character varying(50),
  country_code character varying(5),
  latitude double precision,
  longitude double precision,
  website_url text,
  github_url text,
  linkedin_url text,
  twitter_url text,
  is_verified_mentor boolean NOT NULL DEFAULT false,
  is_profile_complete boolean NOT NULL DEFAULT false,
  teaching_hours double precision NOT NULL DEFAULT 0.0,
  learning_hours double precision NOT NULL DEFAULT 0.0,
  total_sessions integer NOT NULL DEFAULT 0,
  avg_rating double precision NOT NULL DEFAULT 0.0,
  total_reviews integer NOT NULL DEFAULT 0,
  reputation_points integer NOT NULL DEFAULT 100, -- default starting points
  followers_count integer NOT NULL DEFAULT 0,
  following_count integer NOT NULL DEFAULT 0,
  embedding vector(1536), -- 1536 dimensions for text-embedding-ada-002
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Index for vector search (cosine similarity)
CREATE INDEX IF NOT EXISTS idx_profiles_embedding ON public.profiles USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- =======================================================
-- 3. Skill Categories Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.skill_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name character varying(100) NOT NULL UNIQUE,
  slug character varying(100) NOT NULL UNIQUE,
  icon character varying(50),
  color character varying(20) DEFAULT '#6366f1',
  description text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- =======================================================
-- 4. Skills Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.skills (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id uuid REFERENCES public.skill_categories(id) ON DELETE SET NULL,
  name character varying(100) NOT NULL UNIQUE,
  slug character varying(100) NOT NULL UNIQUE,
  description text,
  icon_url text,
  tags text[],
  usage_count integer NOT NULL DEFAULT 0,
  is_verified boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_skills_category ON public.skills(category_id);
CREATE INDEX IF NOT EXISTS idx_skills_slug ON public.skills(slug);

-- =======================================================
-- 5. User Offered Skills Table (with Embeddings)
-- =======================================================
CREATE TABLE IF NOT EXISTS public.user_skills_offered (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  skill_id uuid NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  proficiency_level character varying(20) NOT NULL CHECK (proficiency_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  years_experience double precision DEFAULT 0.0,
  description text,
  is_verified boolean NOT NULL DEFAULT false,
  embedding vector(1536),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT unique_user_offered_skill UNIQUE (user_id, skill_id)
);

CREATE INDEX IF NOT EXISTS idx_user_skills_offered_user ON public.user_skills_offered(user_id);

-- =======================================================
-- 6. User Wanted Skills Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.user_skills_wanted (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  skill_id uuid NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  current_level character varying(20) DEFAULT 'beginner',
  target_level character varying(20) DEFAULT 'intermediate',
  urgency character varying(20) DEFAULT 'medium' CHECK (urgency IN ('low', 'medium', 'high')),
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT unique_user_wanted_skill UNIQUE (user_id, skill_id)
);

-- =======================================================
-- 7. Education Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.education (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  institution character varying(255) NOT NULL,
  degree character varying(100),
  field_of_study character varying(150),
  start_year integer,
  end_year integer,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- =======================================================
-- 8. Experience Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.experience (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  company character varying(255) NOT NULL,
  title character varying(150) NOT NULL,
  start_date date,
  end_date date,
  is_current boolean DEFAULT false,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- =======================================================
-- 9. Availability Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.availability (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  day_of_week integer NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sunday, 6=Saturday
  start_time time without time zone NOT NULL,
  end_time time without time zone NOT NULL,
  timezone character varying(50) DEFAULT 'UTC',
  is_recurring boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT unique_user_availability_slot UNIQUE (user_id, day_of_week, start_time)
);

-- =======================================================
-- 10. Follow System Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.user_follows (
  follower_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  following_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (follower_id, following_id)
);

-- =======================================================
-- 11. Matches Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.matches (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_a_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  user_b_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status character varying(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'blocked')),
  user_a_action character varying(20) DEFAULT 'none',
  user_b_action character varying(20) DEFAULT 'none',
  match_score double precision DEFAULT 0.0,
  skill_similarity_score double precision DEFAULT 0.0,
  availability_score double precision DEFAULT 0.0,
  reputation_score double precision DEFAULT 0.0,
  ai_explanation text,
  matched_skills text[],
  initiated_by uuid REFERENCES public.users(id) ON DELETE SET NULL,
  expires_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_matches_users ON public.matches(user_a_id, user_b_id);

-- =======================================================
-- 12. Learning Sessions Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.learning_sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id uuid REFERENCES public.matches(id) ON DELETE SET NULL,
  host_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  participant_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title character varying(255) NOT NULL,
  description text,
  scheduled_at timestamp with time zone NOT NULL,
  duration_minutes integer NOT NULL,
  actual_duration_minutes integer,
  status character varying(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  cancellation_reason text,
  agora_channel character varying(100),
  session_notes text,
  host_attendance boolean DEFAULT false,
  participant_attendance boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- =======================================================
-- 13. Reviews Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id uuid NOT NULL REFERENCES public.learning_sessions(id) ON DELETE CASCADE,
  reviewer_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  reviewee_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment text,
  response_comment text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT reviews_unique UNIQUE (session_id, reviewer_id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_reviewee_id ON public.reviews(reviewee_id);

-- =======================================================
-- 14. Reputation Points Ledger Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.reputation_points (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  points integer NOT NULL,
  action character varying(100) NOT NULL,
  reference_type character varying(50),
  reference_id uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- =======================================================
-- 15. Badge Definitions Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.badge_definitions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name character varying(100) NOT NULL UNIQUE,
  slug character varying(100) NOT NULL UNIQUE,
  description text NOT NULL,
  icon_url text,
  tier character varying(20) NOT NULL DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
  criteria jsonb NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- =======================================================
-- 16. User Badges Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.user_badges (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  badge_id uuid NOT NULL REFERENCES public.badge_definitions(id) ON DELETE CASCADE,
  earned_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT unique_user_badge UNIQUE (user_id, badge_id)
);

-- =======================================================
-- 17. Conversations Table (Direct Messaging)
-- =======================================================
CREATE TABLE IF NOT EXISTS public.conversations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_a_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  user_b_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  last_message_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT unique_conversation_pair UNIQUE (user_a_id, user_b_id)
);

-- =======================================================
-- 18. Messages Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  text text NOT NULL,
  attachment_url text,
  attachment_type character varying(50),
  is_read boolean NOT NULL DEFAULT false,
  read_at timestamp with time zone,
  deleted_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(conversation_id);

-- =======================================================
-- 19. Message Reactions Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.message_reactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id uuid NOT NULL REFERENCES public.messages(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  emoji character varying(50) NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT unique_message_reaction UNIQUE (message_id, user_id)
);

-- =======================================================
-- 20. Notifications Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  actor_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  type character varying(50) NOT NULL,
  title text NOT NULL,
  body text,
  data jsonb,
  is_read boolean NOT NULL DEFAULT false,
  read_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON public.notifications(user_id) WHERE (is_read = false);

-- =======================================================
-- 21. Notification Preferences Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.notification_preferences (
  user_id uuid PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  email_matches boolean DEFAULT true,
  email_sessions boolean DEFAULT true,
  email_messages boolean DEFAULT true,
  email_badges boolean DEFAULT true,
  push_matches boolean DEFAULT true,
  push_sessions boolean DEFAULT true,
  push_messages boolean DEFAULT true,
  push_badges boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- =======================================================
-- 22. User Settings Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.user_settings (
  user_id uuid PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  profile_visibility character varying(20) DEFAULT 'public',
  show_location boolean DEFAULT true,
  allow_matching boolean DEFAULT true,
  theme character varying(20) DEFAULT 'dark',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- =======================================================
-- 23. Activities Feed Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.activities (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  actor_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  type character varying(100) NOT NULL,
  title text NOT NULL,
  body text,
  reference_type character varying(50),
  reference_id uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- =======================================================
-- 24. Session Note Vectors Table (for RAG Search)
-- =======================================================
CREATE TABLE IF NOT EXISTS public.session_note_vectors (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id uuid NOT NULL REFERENCES public.learning_sessions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  embedding vector(1536) NOT NULL,
  chunk_index integer NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_session_note_vectors_embedding ON public.session_note_vectors USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- =======================================================
-- 25. User Sessions Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  session_token text NOT NULL UNIQUE,
  refresh_token text,
  device_info jsonb,
  ip_address character varying(45),
  user_agent text,
  is_active boolean NOT NULL DEFAULT true,
  expires_at timestamp with time zone NOT NULL,
  last_seen_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- =======================================================
-- 26. Login History Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.login_history (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  ip_address character varying(45),
  user_agent text,
  success boolean NOT NULL,
  failure_reason character varying(100),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- =======================================================
-- 27. Audit Logs Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  action character varying(100) NOT NULL,
  resource_type character varying(50),
  resource_id uuid,
  ip_address character varying(45),
  details jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- =======================================================
-- 28. Whiteboards Table
-- =======================================================
CREATE TABLE IF NOT EXISTS public.whiteboards (
  session_id uuid PRIMARY KEY REFERENCES public.learning_sessions(id) ON DELETE CASCADE,
  elements jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- =======================================================
-- ✅ RPC Functions and Stored Procedures
-- =======================================================

-- 1. Increment Reputation
CREATE OR REPLACE FUNCTION public.increment_reputation(user_id_input uuid, points_input integer)
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET reputation_points = reputation_points + points_input
  WHERE id = user_id_input;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Increment Follow Counts
CREATE OR REPLACE FUNCTION public.increment_follow_counts(follower_id uuid, following_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET following_count = following_count + 1
  WHERE id = follower_id;

  UPDATE public.profiles
  SET followers_count = followers_count + 1
  WHERE id = following_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Increment Skill Usage Count
CREATE OR REPLACE FUNCTION public.increment_skill_usage(skill_id_input uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.skills
  SET usage_count = usage_count + 1
  WHERE id = skill_id_input;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Increment Teaching Hours
CREATE OR REPLACE FUNCTION public.increment_teaching_hours(user_id_input uuid, hours_input double precision)
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET teaching_hours = teaching_hours + hours_input,
      total_sessions = total_sessions + 1
  WHERE id = user_id_input;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Increment Learning Hours
CREATE OR REPLACE FUNCTION public.increment_learning_hours(user_id_input uuid, hours_input double precision)
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET learning_hours = learning_hours + hours_input,
      total_sessions = total_sessions + 1
  WHERE id = user_id_input;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Match Session Notes (Vector Search for RAG)
CREATE OR REPLACE FUNCTION public.match_session_notes(
  query_embedding vector,
  user_id_filter uuid,
  match_count integer,
  match_threshold double precision
)
RETURNS TABLE (
  id uuid,
  session_id uuid,
  content text,
  similarity double precision
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    sn.id,
    sn.session_id,
    sn.content,
    1 - (sn.embedding <=> query_embedding) AS similarity
  FROM public.session_note_vectors sn
  WHERE sn.user_id = user_id_filter
    AND 1 - (sn.embedding <=> query_embedding) > match_threshold
  ORDER BY sn.embedding <=> query_embedding
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Match Embeddings (Cosine similarity vector search for match recommendations)
CREATE OR REPLACE FUNCTION public.match_embeddings(
  query_embedding vector,
  match_count integer,
  user_id_filter uuid
)
RETURNS TABLE (
  id uuid,
  full_name varchar,
  avatar_url text,
  avg_rating double precision,
  reputation_points integer,
  similarity double precision
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.full_name,
    p.avatar_url,
    p.avg_rating,
    p.reputation_points,
    1 - (p.embedding <=> query_embedding) AS similarity
  FROM public.profiles p
  WHERE p.id <> user_id_filter
  ORDER BY p.embedding <=> query_embedding
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Get Nearby Profiles (Haversine/Distance search fallback or PostGIS)
CREATE OR REPLACE FUNCTION public.get_nearby_profiles(
  user_lat double precision,
  user_lon double precision,
  radius_km double precision
)
RETURNS TABLE (
  id uuid,
  full_name varchar,
  avatar_url text,
  city varchar,
  country_code varchar,
  avg_rating double precision,
  distance double precision
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.full_name,
    p.avatar_url,
    p.city,
    p.country_code,
    p.avg_rating,
    (6371 * acos(
      cos(radians(user_lat)) * cos(radians(p.latitude)) *
      cos(radians(p.longitude) - radians(user_lon)) +
      sin(radians(user_lat)) * sin(radians(p.latitude))
    )) AS distance
  FROM public.profiles p
  WHERE p.latitude IS NOT NULL AND p.longitude IS NOT NULL
    AND (6371 * acos(
      cos(radians(user_lat)) * cos(radians(p.latitude)) *
      cos(radians(p.longitude) - radians(user_lon)) +
      sin(radians(user_lat)) * sin(radians(p.latitude))
    )) <= radius_km
  ORDER BY distance ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- =======================================================
-- ✅ Row Level Security (RLS) Policies
-- =======================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills_offered ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills_wanted ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whiteboards ENABLE ROW LEVEL SECURITY;

-- 1. Users policies
CREATE POLICY "Users can view their own record" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own record" ON public.users FOR UPDATE USING (auth.uid() = id);

-- 2. Profiles policies
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 3. Skills policies (categories/definitions are open, user selections are own)
CREATE POLICY "Offered skills are viewable by everyone" ON public.user_skills_offered FOR SELECT USING (true);
CREATE POLICY "Users can manage offered skills" ON public.user_skills_offered FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Wanted skills are viewable by everyone" ON public.user_skills_wanted FOR SELECT USING (true);
CREATE POLICY "Users can manage wanted skills" ON public.user_skills_wanted FOR ALL USING (auth.uid() = user_id);

-- 4. Education & Experience policies
CREATE POLICY "Education viewable by everyone" ON public.education FOR SELECT USING (true);
CREATE POLICY "Users can manage education" ON public.education FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Experience viewable by everyone" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Users can manage experience" ON public.experience FOR ALL USING (auth.uid() = user_id);

-- 5. Availability policies
CREATE POLICY "Availability viewable by everyone" ON public.availability FOR SELECT USING (true);
CREATE POLICY "Users can manage availability" ON public.availability FOR ALL USING (auth.uid() = user_id);

-- 6. Follow system policies
CREATE POLICY "Follows are viewable by everyone" ON public.user_follows FOR SELECT USING (true);
CREATE POLICY "Users can manage follows" ON public.user_follows FOR ALL USING (auth.uid() = follower_id);

-- 7. Matches policies
CREATE POLICY "Users can view matches they are part of" ON public.matches FOR SELECT USING (auth.uid() = user_a_id OR auth.uid() = user_b_id);
CREATE POLICY "Users can update matches they are part of" ON public.matches FOR UPDATE USING (auth.uid() = user_a_id OR auth.uid() = user_b_id);

-- 8. Sessions policies
CREATE POLICY "Users can view sessions they are part of" ON public.learning_sessions FOR SELECT USING (auth.uid() = host_id OR auth.uid() = participant_id);
CREATE POLICY "Users can update sessions they are part of" ON public.learning_sessions FOR UPDATE USING (auth.uid() = host_id OR auth.uid() = participant_id);

-- 9. Reviews policies
CREATE POLICY "Reviews viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert reviews for their sessions" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "Users can update reviews they wrote" ON public.reviews FOR UPDATE USING (auth.uid() = reviewer_id);

-- 10. Conversations policies
CREATE POLICY "Users can view conversations they are part of" ON public.conversations FOR SELECT USING (auth.uid() = user_a_id OR auth.uid() = user_b_id);
CREATE POLICY "Users can update conversations they are part of" ON public.conversations FOR UPDATE USING (auth.uid() = user_a_id OR auth.uid() = user_b_id);

-- 11. Messages policies
CREATE POLICY "Users can view messages in their conversations" ON public.messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.conversations c 
    WHERE c.id = conversation_id AND (c.user_a_id = auth.uid() OR c.user_b_id = auth.uid())
  )
);
CREATE POLICY "Users can insert messages in their conversations" ON public.messages FOR INSERT WITH CHECK (
  auth.uid() = sender_id AND EXISTS (
    SELECT 1 FROM public.conversations c 
    WHERE c.id = conversation_id AND (c.user_a_id = auth.uid() OR c.user_b_id = auth.uid())
  )
);

-- 12. Whiteboard policies
CREATE POLICY "Users can view whiteboards for their sessions" ON public.whiteboards FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.learning_sessions s 
    WHERE s.id = session_id AND (s.host_id = auth.uid() OR s.participant_id = auth.uid())
  )
);
CREATE POLICY "Users can manage whiteboards for their sessions" ON public.whiteboards FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.learning_sessions s 
    WHERE s.id = session_id AND (s.host_id = auth.uid() OR s.participant_id = auth.uid())
  )
);


-- =======================================================
-- ✅ Seed Data
-- =======================================================

-- Seed Skill Categories
INSERT INTO public.skill_categories (id, name, slug, icon, color, description) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Technology & Software', 'software-tech', 'code', '#3b82f6', 'Software engineering, web development, cloud computing, and IT infrastructures.'),
  ('c1000000-0000-0000-0000-000000000002', 'Design & Creative', 'design-creative', 'palette', '#ec4899', 'UI/UX design, graphic design, animation, 3D modeling, photography, and video editing.'),
  ('c1000000-0000-0000-0000-000000000003', 'Languages & Linguistics', 'languages', 'globe', '#10b981', 'Foreign languages, translation, grammar, writing, and speech tutoring.'),
  ('c1000000-0000-0000-0000-000000000004', 'Business & Marketing', 'business-marketing', 'trending-up', '#f59e0b', 'Product management, sales, financial modeling, SEO, copywriting, and social media.'),
  ('c1000000-0000-0000-0000-000000000005', 'Music & Performing Arts', 'music-arts', 'music', '#8b5cf6', 'Instruments playing, vocal coaching, music production, dance, and theater.')
ON CONFLICT (slug) DO NOTHING;

-- Seed Skills
INSERT INTO public.skills (name, slug, category_id, description, is_verified, is_active) VALUES
  ('JavaScript Programming', 'javascript', 'c1000000-0000-0000-0000-000000000001', 'Core JS foundations, DOM, event loops, async patterns, and modern ES6+ practices.', true, true),
  ('React Frontend Development', 'react-dev', 'c1000000-0000-0000-0000-000000000001', 'React components, state hooks, routing, global state, performance optimization, and styling.', true, true),
  ('Python Programming', 'python', 'c1000000-0000-0000-0000-000000000001', 'Basic scripts, data structures, OOP, file operations, web scraping, and automation.', true, true),
  ('Figma UI/UX Design', 'figma-design', 'c1000000-0000-0000-0000-000000000002', 'Wireframing, interactive prototyping, layout grids, components, auto-layouts, and user testing.', true, true),
  ('Spanish Conversation', 'spanish', 'c1000000-0000-0000-0000-000000000003', 'Daily conversational skills, Spanish grammar, accent improvement, and vocabulary.', true, true),
  ('Search Engine Optimization (SEO)', 'seo', 'c1000000-0000-0000-0000-000000000004', 'On-page/off-page SEO, keyword research, core web vitals, indexation issues, and content optimization.', true, true)
ON CONFLICT (slug) DO NOTHING;

-- Seed Badge Definitions
INSERT INTO public.badge_definitions (name, slug, description, tier, criteria) VALUES
  ('First Step', 'first-session', 'Completed your first learning or teaching session', 'bronze', '{"type":"session_count","threshold":1}'),
  ('Century Swapper', 'century-club', 'Completed 100 learning sessions', 'gold', '{"type":"session_count","threshold":100}'),
  ('Super Mentor', 'super-mentor', 'Taught for over 50 total hours', 'platinum', '{"type":"teaching_hours","threshold":50}'),
  ('Top Rated', 'top-rated', 'Maintained a rating of 4.8+ with at least 10 reviews', 'gold', '{"type":"review_rating","minRating":4.8,"minCount":10}'),
  ('Community Pillar', 'reputation-titan', 'Earned more than 1000 reputation points', 'platinum', '{"type":"reputation_points","threshold":1000}')
ON CONFLICT (slug) DO NOTHING;
