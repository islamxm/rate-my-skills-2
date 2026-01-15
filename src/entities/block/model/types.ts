import type {
  //Node Elements
  Break as MdastBreak,
  Definition as MdastDefinition,
  Image as MdastImage,
  ImageReference as MdastImageReference,
  ThematicBreak as MdastThematicBreak,

  // Parent Elements
  Blockquote as MdastBlockquote,
  Emphasis as MdastEmphasis,
  Heading as MdastHeading,
  Link as MdastLink,
  LinkReference as MdastLinkReference,
  List as MdastList,
  ListItem as MdastListItem,
  Paragraph as MdastParagraph,
  Root as MdastRoot,
  Strong as MdastStrong,

  // Literal Elements
  Code as MdastCode,
  Html as MdastHtml,
  InlineCode as MdastInlineCode,
  Text as MdastText,

  // Global Categories
  Node as MdastNode,
  Parent as MdastParent,
  Literal as MdastLiteral,
  PhrasingContentMap,
  BlockContentMap,
} from "mdast";
import type { FC } from "react";

export type ThematicColor = {
  bg: string;
  main: string;
  accent: string;
};

// основа для элементов всех типов и категорий
export type MOMBase<MdastElement> = MdastElement & {
  // уникальный айди для react key и других операций
  id: string;
  //цветовое отличие конкретного элемента
  thematicColor?: ThematicColor;
};

export type MOMParentBase<ParentType extends MdastParent> = Omit<
  MOMBase<ParentType>,
  "children"
> & {
  // переопределение children (наверное из за этого в будущем придеться написать гарды/проверки чтобы не просочились несовместимые дети)
  children: Array<string>;
};
export type MOMLiteralBase<LiteralType extends MdastLiteral> =
  MOMBase<LiteralType>;

// NODE (ABSTRACT)
export type MOMBreak = MOMBase<MdastBreak>;
export type MOMDefinition = MOMBase<MdastDefinition>;
export type MOMImage = MOMBase<MdastImage>;
export type MOMImageReference = MOMBase<MdastImageReference>;
export type MOMThematicBreak = MOMBase<MdastThematicBreak>;

// PARENT
export type MOMBlockquote = MOMParentBase<MdastBlockquote>;
export type MOMEmphasis = MOMParentBase<MdastEmphasis>;
export type MOMHeading = MOMParentBase<MdastHeading>;
export type MOMLink = MOMParentBase<MdastLink>;
export type MOMLinkReference = MOMParentBase<MdastLinkReference>;
export type MOMList = MOMParentBase<MdastList>;
export type MOMListItem = MOMParentBase<MdastListItem>;
export type MOMParagraph = MOMParentBase<MdastParagraph>;
export type MOMRoot = MOMParentBase<MdastRoot>;
export type MOMStrong = MOMParentBase<MdastStrong>;

// LITERAL
export type MOMCode = MOMLiteralBase<MdastCode>;
export type MOMHtml = MOMLiteralBase<MdastHtml>;
export type MOMInlineCode = MOMLiteralBase<MdastInlineCode>;
export type MOMText = MOMLiteralBase<MdastText>;

export type MOMContent = MOMDefinition | MOMParagraph;
export type MOMPhrasingContent =
  | MOMBreak
  | MOMEmphasis
  | MOMHtml
  | MOMImage
  | MOMImageReference
  | MOMInlineCode
  | MOMLink
  | MOMLinkReference
  | MOMStrong
  | MOMText;
export type MOMFlowContent =
  | MOMBlockquote
  | MOMCode
  | MOMHeading
  | MOMHtml
  | MOMList
  | MOMThematicBreak
  | MOMContent;
export type MOMListContent = MOMListItem;

export type MOMElement =
  | MOMContent
  | MOMPhrasingContent
  | MOMFlowContent
  | MOMListContent
  | MOMRoot;

//редактируемые как единое целое блоки вне зависимости от children (список может расширяться) (опознавательные цвета есть только у этих блочных элементов у которых нет поля value а есть children)
export type MOMEditableSurfaceElement = MOMHeading | MOMParagraph;
export type MOMEditableSurfaceElementType = keyof Pick<
  BlockContentMap,
  "heading" | "paragraph"
>;

export type BlockComponentProps = FC<{
  id: string;
}>;
