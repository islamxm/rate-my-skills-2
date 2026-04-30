import type {
  MOMAlert,
  MOMAllContent,
  MOMBlockquote,
  MOMCode,
  MOMDocument,
  MOMGroupMeta,
  MOMHeading,
  MOMImage,
  MOMInlineCode,
  MOMList,
  MOMListItem,
  MOMNode,
  MOMParagraph,
  MOMText,
  MOMThematicBreak,
} from "../types";

export type InsertOp = {
  type: "insert";
  node: MOMNode<MOMAllContent>;
  parentId: string | null;
  index: number;
  descendants: Record<string, MOMNode<MOMAllContent>>;
};

export type RemoveOp = {
  type: "remove";
  nodeId: string;
  node: MOMNode<MOMAllContent>;
  parentId: string | null;
  index: number;
  descendants: Record<string, MOMNode<MOMAllContent>>;
};

export type UpdateOp = {
  type: "update";
  nodeId: string;
  patch: Partial<MOMAllContent>;
  prevPatch: Partial<MOMAllContent>;
};

export type MoveOp = {
  type: "move";
  nodeId: string;
  fromParentId: string | null;
  fromIndex: number;
  toParentId: string | null;
  toIndex: number;
};

export type GroupOp = {
  type: "group";
  nodeIds: string[];
  fromIndex: number;
  toIndex: number;
  group: MOMGroupMeta;
};

export type UngroupOp = {
  type: "ungroup";
  groupId: string;
  prevGroup: MOMGroupMeta;
  nodeIds: string[];
  fromIndex: number;
  toIndex: number;
};

export type RenameGroupOp = {
  type: "renameGroup";
  groupId: string;
  label: string;
  prevLabel: string;
};

export type BatchOp = {
  type: "batch";
  ops: MOMOperation[];
};

export type MOMOperation = InsertOp | RemoveOp | UpdateOp | MoveOp | GroupOp | UngroupOp | RenameGroupOp | BatchOp;

export type EngineResult = {
  doc: MOMDocument;
  op: MOMOperation;
};

export declare function insertNode(opt: { doc: MOMDocument; node: MOMAllContent; parentId: string | null; index: number }): EngineResult;

export declare function removeNode(opt: { doc: MOMDocument; nodeId: string }): EngineResult;

export declare function updateNode(opt: { doc: MOMDocument; nodeId: string; patch: Partial<MOMAllContent> }): EngineResult;

export declare function moveNode(opt: { doc: MOMDocument; nodeId: string; toParentId: string | null; toIndex: number }): EngineResult;

export declare function convertNode(opt: { doc: MOMDocument; nodeId: string; toType: MOMAllContent["type"] }): EngineResult;

export declare function groupNodes(opt: { doc: MOMDocument; nodeIds: string[]; label: string }): EngineResult;

export declare function ungroupNodes(opt: { doc: MOMDocument; groupId: string }): EngineResult;

export declare function renameGroup(opt: { doc: MOMDocument; groupId: string; label: string }): EngineResult;

export declare function applyOp(opt: { doc: MOMDocument; op: MOMOperation }): MOMDocument;

export declare function invertOp(op: MOMOperation): MOMOperation;

export declare function groupNodes(opt: { doc: MOMDocument; nodeIds: string[]; label: string }): EngineResult;

export declare function ungroupNodes(opt: { doc: MOMDocument; groupId: string }): EngineResult;

export declare function renameGroup(opt: { doc: MOMDocument; groupId: string; label: string }): EngineResult;

export declare function applyOp(opt: { doc: MOMDocument; op: MOMOperation }): MOMDocument;

export declare function invertOp(op: MOMOperation): MOMOperation;

export type MOMCreateParams = {
  paragraph: { parentId?: string | null };
  heading: {
    depth: MOMHeading["depth"];
    value?: string;
    parentId?: string | null;
  };
  code: { lang?: string; parentId?: string | null };
  image: { parentId?: string | null };
  list: { ordered?: boolean; parentId?: string | null };
  listItem: { parentId: string };
  blockquote: { parentId?: string | null };
  alert: { parentId: string | null };
  thematicBreak: { parentId?: string | null };
  text: { value?: string; parentId?: string | null };
  inlineCode: { value?: string; parentId?: string | null };
};

export type MOMCreateResult = {
  paragraph: MOMParagraph;
  heading: MOMHeading;
  code: MOMCode;
  image: MOMImage;
  list: MOMList;
  listItem: MOMListItem;
  blockquote: MOMBlockquote;
  alert: MOMAlert;
  thematicBreak: MOMThematicBreak;
  text: MOMText;
  inlineCode: MOMInlineCode;
};
