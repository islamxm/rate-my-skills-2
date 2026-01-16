import { useSelector } from "../../../../../shared/lib";
import { useBlockEditor } from "../../../lib/useBlockEditor";
import { isHeadingElement } from "../../../lib/utils";
import type { BlockComponentProps } from "../../../model/types";
import { ElementRenderer } from "../../ElementRenderer/ElementRenderer";

type HeadingTag = Extract<
  keyof HTMLElementTagNameMap,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>;

export const HeadingBlock: BlockComponentProps = ({ id }) => {
  const element = useSelector((s) => s.blocksStore.blocks[id]);
  const { surfaceProps, containerRef } = useBlockEditor({
    elementId: id,
  });

  if (!isHeadingElement(element)) {
    return null;
  }

  const Tag = `h${element.depth}` as HeadingTag;

  return (
    <Tag
      {...surfaceProps}
      data-id={id}
      data-type={element.type}
      className={"editable-block"}
      key={element?.version}
      // @ts-ignore
      ref={containerRef}
    >
      {element.children.map((childId) => (
        <ElementRenderer id={childId} key={childId} />
      ))}
    </Tag>
  );
};
