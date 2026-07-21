import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase.js';

/**
 * useProjects 훅
 * Supabase projects 테이블에서 게시된 프로젝트 목록을 표시 순서(sort_order)대로 조회한다.
 *
 * @returns {{ projects: Array, isLoading: boolean, errorMessage: string }}
 */
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');

    const { data, error } = await supabase
      .from('projects')
      .select('id, title, description, tech_stack, project_type, detail_url, thumbnail_url')
      .order('sort_order', { ascending: true });

    setIsLoading(false);

    if (error) {
      setErrorMessage('프로젝트 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    setProjects(data ?? []);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, isLoading, errorMessage };
}
