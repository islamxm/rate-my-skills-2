import { useSelector } from "../../../../../shared/lib";
import { isHeadingElement } from "../../../lib/utils";
import type { BlockComponentProps } from "../../../model/types";
import { ElementRenderer } from "../../ElementRenderer/ElementRenderer";

export const HeadingBlock: BlockComponentProps = ({ id }) => {
  const element = useSelector((s) => s.blocksStore.blocks[id]);

  if (!isHeadingElement(element)) {
    return null;
  }

  const Tag = `h${element.depth}` as keyof HTMLElementTagNameMap;

  return (
    <Tag className={"editable-block"}>
      {element.children.map((childId) => (
        <ElementRenderer id={childId} key={childId} />
      ))}
    </Tag>
  );
};
