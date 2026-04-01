export type SelectionFragment = {
  spanId: string;
  spanElement: HTMLElement;
  selectedText: string;
  beforeText: string;
  afterText: string;
  isFullySelected: boolean;
};

export type CursorPosition = {
  offset: number;
};