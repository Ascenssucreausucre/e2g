import { useEffect, useState } from "react";
import GamePlay from "../components/GamePlay";
import { useSession } from "../hooks/useSession";
import { Navigate } from "react-router-dom";
import { apiFetch } from "../api/apiFetch";
import { useQuery } from "@tanstack/react-query";
import type { Chapter } from "../utils/types";

export default function Game() {
  const [gameState, setGameState] = useState<any>(null);
  const [playingChapterId, setPlayingChapterId] = useState<number | null>(null);
  const { data, isLoading } = useSession();
  const user = data?.user;

  const { data: chapters, isLoading: isChaptersLoading } = useQuery({
    queryKey: ["chapters"],
    queryFn: async () => apiFetch<Chapter[]>("/users/me/unlocked-chapters"),
  });

  const { data: playingChapter } = useQuery({
    queryKey: ["chapter", playingChapterId],
    queryFn: () => apiFetch<Chapter>(`/chapters/${playingChapterId}`),
    enabled: playingChapterId !== null,
  });

  useEffect(() => {
    console.log({ playingChapter });
    if (!playingChapter) return;
    setGameState(playingChapter);
  }, [playingChapter]);

  if (isLoading && isChaptersLoading) {
    return <div>Loading...</div>;
  }
  if (!isLoading && !user) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="game-select bg-amber-200 w-2xl px-12 py-4 rounded-2xl">
      <h2 className="font-black text-xl text-black">
        Cc mon {user.username} sucré au sucre
      </h2>
      <p className="font-black text-md text-black">Voici les chapitres :</p>
      <ul>
        {chapters &&
          chapters.map((chapter) => (
            <li
              className={`bg-amber-800 cursor-pointer my-3 py-2 rounded-md`}
              onClick={() => setPlayingChapterId(chapter.id)}
              key={`chapter-${chapter.id}`}
            >
              {chapter.title}
            </li>
          ))}
      </ul>
      {gameState ? (
        <GamePlay
          chapter={gameState}
          userName={user.username}
          onClose={() => setGameState(null)}
        />
      ) : null}
    </div>
  );
}
