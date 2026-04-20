import SongGrid from '../components/SongGrid';
import type { Song } from '../types/song';

interface HomePageProps {
  songs: Song[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

export default function HomePage({ songs, loading, error, searchQuery }: HomePageProps) {
  return (
    <div>
      {!searchQuery && (
        <h2 className="text-white text-xl font-semibold mb-6">
          All Songs
          {songs.length > 0 && (
            <span className="ml-2 text-sm text-gray-500 font-normal">({songs.length})</span>
          )}
        </h2>
      )}
      {searchQuery && (
        <h2 className="text-white text-xl font-semibold mb-6">
          Results for <span className="text-gray-300">"{searchQuery}"</span>
        </h2>
      )}
      <SongGrid songs={songs} loading={loading} error={error} searchQuery={searchQuery} />
    </div>
  );
}
