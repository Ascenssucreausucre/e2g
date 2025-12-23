import { useEffect, useRef, useState } from "react";
import dialogueSkip from "../assets/audio/skip.wav";
import type { InlineNode, Choice, GameChapter } from "../utils/types";

type Props = {
  chapter: GameChapter;
  userName: string;
  onComplete?: () => void;
  onApplyEffects?: (effects?: { affection?: number }) => void;
};

type Slot = {
  name: string | null | number;
};

export default function DialogueBox({
  chapter,
  userName,
  onComplete,
  onApplyEffects,
}: Props) {
  const startCharacters = chapter.startCharacters;

  const [script, setScript] = useState<InlineNode[]>(
    chapter.dialogue[0].content
  );
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [slots, setSlots] = useState<[Slot, Slot]>([
    { name: null },
    { name: null },
  ]);

  const [activeSlot, setActiveSlot] = useState<0 | 1>(1);

  console.log(isTyping);

  const typingRef = useRef<number | null>(null);
  const line = script[index];
  const formatText = (text: string) =>
    String(text).charAt(0).toUpperCase() + String(text).slice(1);

  const resolvedText = line.text.replace("{name}", userName);
  const speaker =
    line.speaker === "{name}" ? userName : formatText(line.speaker);

  useEffect(() => {
    let i = 0;
    setDisplayText("");
    setIsTyping(true);

    typingRef.current = window.setInterval(() => {
      if (i < resolvedText.length) {
        setDisplayText((p) => p + resolvedText[i - 1]);
        i++;
      } else {
        clearInterval(typingRef.current!);
        setIsTyping(false);
      }
    }, 20);

    return () => {
      if (typingRef.current) clearInterval(typingRef.current);
    };
  }, [index, script]);

  useEffect(() => {
    if (!speaker) return;
    if (startCharacters && slots[0].name === null) {
      setSlots((prev) => {
        if (prev[0].name !== null || prev[1].name !== null) {
          return prev;
        }

        const left = startCharacters[0] ?? null;
        const right = startCharacters[1] ?? null;

        return [{ name: left }, { name: right }];
      });
    }

    setSlots((prev) => {
      const left = prev[0];
      const right = prev[1];

      // déjà présent
      if (left.name === speaker) {
        setActiveSlot(0);
        return prev;
      }

      if (right.name === speaker) {
        setActiveSlot(1);
        return prev;
      }

      // nouveau speaker
      const replaceIndex = activeSlot === 0 ? 1 : 0;

      const next: [Slot, Slot] = [...prev] as [Slot, Slot];
      next[replaceIndex] = { name: speaker };

      setActiveSlot(replaceIndex);
      return next;
    });
  }, [speaker]);

  const handleNext = () => {
    const clickSound = new Audio(dialogueSkip);
    clickSound.volume = 0.3;

    if (isTyping) {
      setDisplayText(resolvedText);
      setIsTyping(false);
      if (typingRef.current) clearInterval(typingRef.current);
      return;
    }

    if (line.end) {
      onComplete?.();
      clickSound.play();
      return;
    }

    if (line.choices) {
      return;
    }

    if (index < script.length - 1) {
      setIndex((i) => i + 1);
      setIsTyping(true);
      clickSound.play();
    } else {
      onComplete?.();
      clickSound.play();
    }
  };

  const choose = (choice: Choice) => {
    onApplyEffects?.(choice.effects);

    const injected = Array.isArray(choice.next) ? choice.next : [choice.next];

    setScript((prev) => {
      const before = prev.slice(0, index + 1);
      const after = prev.slice(index + 1);
      console.log([before, injected, after]);

      return [...before, ...injected, ...after];
    });

    setIndex((i) => i + 1);
  };

  return (
    <div
      className="cursor-pointer rounded-2xl border border-black py-5 px-10 relative w-xl min-h-24 flex flex-col justify-center mx-auto mt-32  bg-white"
      onClick={handleNext}
    >
      <div className="absolute -top-15 left-0 flex items-center justify-between px-12 w-full h-32 select-none">
        {slots.map((slot, i) => (
          <div className="relative">
            <h2
              className={`text-2xl  py-1 px-2.5 rounded-xl bg-amber-500 ${
                activeSlot === i ? "opacity-100" : "opacity-0"
              }`}
              key={i}
            >
              {slot.name}
            </h2>
            <img
              key={i}
              src={
                slot.name
                  ? `/assets/characters/${
                      slot.name === userName
                        ? "{name}"
                        : slot.name.toString().toLowerCase()
                    }/default.png`
                  : "/assets/empty.png"
              }
              className={`transition-opacity absolute -top-30 -z-10 h-45 aspect-1/2 ${
                activeSlot === i ? "opacity-100" : "opacity-40"
              } ${i === 0 ? "left-0" : "right-0"}`}
            />
          </div>
        ))}
      </div>
      <p className="select-none">{displayText}</p>

      {!isTyping && line.choices && (
        <div className="w-full flex flex-col gap-2 mt-2">
          {line.choices.map((c, i) => (
            <button
              className="bg-amber-50/75 text-black text-start hover:bg-pink-100 transition-colors"
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                choose(c);
              }}
            >
              {c.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
