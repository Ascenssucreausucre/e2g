import test from "../assets/dialogues/test.json";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GamePlay from "../components/GamePlay";

export default function Game() {
  const [gameState, setGameState] = useState<any>(null);
  const chapters = [
    { name: "Chapter 1", id: "test" },
    { name: "Chapter 2", id: "test", locked: true },
    { name: "Chapter 3", id: "test", locked: true },
    { name: "Chapter 4", id: "test", locked: true },
  ];
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  if (!userName) {
    navigate("/");
    return;
  }
  const playChapter = (chapter: any) => {
    setGameState(chapter);
  };
  return (
    <div className="game-select bg-amber-200 w-2xl px-12 py-4 rounded-2xl">
      <h2 className="font-black text-xl text-black">
        Cc mon {userName} sucré au sucre
      </h2>
      <p className="font-black text-md text-black">Voici les chapitres :</p>
      <ul>
        {chapters.map((chapter) => {
          if (!chapter.locked) {
            return (
              <li
                className={`bg-amber-800 cursor-pointer my-3 py-2 rounded-md`}
                onClick={() => playChapter(test)}
              >
                {chapter.name}
              </li>
            );
          } else {
            return (
              <li
                className={`bg-amber-500 cursor-not-allowed my-3 py-2 rounded-md`}
              >
                {chapter.name}
              </li>
            );
          }
        })}
      </ul>
      {gameState ? (
        <GamePlay
          chapter={gameState}
          userName={userName}
          onClose={() => setGameState(null)}
        />
      ) : null}
    </div>
  );
}
