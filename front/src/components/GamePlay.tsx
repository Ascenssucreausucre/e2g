import { useEffect, useRef } from "react";
import DialogueBox from "./DialogueBox";

interface GamePlayProps {
  chapter: any;
  userName: string;
  onClose: () => void;
}

export default function GamePlay({
  chapter,
  userName,
  onClose,
}: GamePlayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={onClose}
      className="
        rounded-xl
        p-0
        w-[90vw]
        max-w-2xl
        bg-white
        shadow-2xl
        text-slate-900
        backdrop:bg-black/50
        open:animate-fade-in
        mx-auto
        mt-32
      "
    >
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">{`Chapitre ${chapter.chapterId} : ${chapter.chapterName}`}</h2>

        <form method="dialog">
          <button
            className="
              rounded-full
              p-2
              text-slate-500
              hover:bg-slate-100
            "
          >
            ✕
          </button>
        </form>
      </header>

      {/* Content */}
      <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
        <DialogueBox chapter={chapter} userName={userName} />
      </div>
    </dialog>
  );
}
