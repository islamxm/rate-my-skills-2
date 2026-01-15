import { useSelector } from "../../../../shared/lib";
import {
  isEmphasisElement,
  isHeadingElement,
  isParagraphElement,
  isTextElement,
} from "../../lib/utils";
import type { BlockComponentProps } from "../../model/types";
import { EmphasisBlock } from "../blocks/EmphasisBlock/EmphasisBlock";
import { TextBlock } from "../blocks/TextBlock/TextBlock";
import { HeadingBlock } from "../surfaceBlocks/HeadingBlock/HeadingBlock";
import { ParagraphBlock } from "../surfaceBlocks/ParagraphBlock/ParagraphBlock";

export const ElementRenderer: BlockComponentProps = ({ id }) => {
  const element = useSelector(s => s.blocksStore.blocks[id]);

  if (isHeadingElement(element)) {
    return <HeadingBlock id={element.id} />;
  }
  if (isParagraphElement(element)) {
    return <ParagraphBlock id={element.id} />;
  }
  if (isEmphasisElement(element)) {
    return <EmphasisBlock id={element.id} />;
  }
  if (isTextElement(element)) {
    return <TextBlock id={element.id} />;
  }

  return null;
};
