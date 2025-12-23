export type Effect = {
  affection?: number;
};

export type InlineNode = {
  speaker: string;
  text: string;
  choices?: Choice[];
  end?: boolean;
};

export type Choice = {
  text: string;
  effects?: Effect;
  next: InlineNode | InlineNode[];
};

export type Chapter = {
  id: number;
  title: string;
  order: number | null;
  cost: number;
  actruve: boolean;
  startCharacters: number[];
};

export type GameChapter = Chapter & {
  dialogue: Dialogue[];
};

export type Dialogue = {
  id: string;
  content: InlineNode[];
};
