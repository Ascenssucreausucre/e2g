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
  chapterId: string;
  characters: string[];
  startNode: string;
  startCharacters: string[];
  nodes: Record<string, InlineNode[]>;
};
