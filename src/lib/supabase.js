import { createClient } from '@supabase/supabase-js';

/**
 * Supabase 클라이언트 (싱글턴)
 * 접속 정보는 .env 의 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY 에서 읽는다.
 * anon 키만 사용하며, 보안은 서버 측 RLS 정책으로 처리한다.
 */
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);
