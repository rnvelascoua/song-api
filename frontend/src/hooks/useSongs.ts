import { useState, useEffect } from 'react';
import type { Song } from '../types/song';

const API_BASE = '/api/velasco/songs';

export function useSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(API_BASE)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Song[]) => {
        setSongs(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      });
  }, []);

  return { songs, loading, error };
}

export function useSong(id: number | null) {
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === null) return;
    setLoading(true);
    fetch(`${API_BASE}/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Song) => {
        setSong(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      });
  }, [id]);

  return { song, loading, error };
}
