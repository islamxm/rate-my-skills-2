import type { FC, JSX } from "react";
import { useNode } from "../../hooks";
import { MOM } from "../../mom";

type Props = { nodeId: string };

/** @deprecated */
export const TextNode: FC<Props> = ({ nodeId }) => {
  const node = useNode(nodeId);
  const isValidNode = MOM.Guard.isTextNode(node);
  
  if (!isValidNode) return null;

  const {italic, bold, lineThrough, link} = node.marks;
  
  return (
    <span
      data-id={node.id}
      data-type={node.type}
      data-parent-id={node.parentId || ""}
      data-italic={italic ? "true" : undefined}
      data-bold={bold ? "true" : undefined}
      data-link={link ? "true" : undefined}
      data-linethrough={lineThrough ? "true" : undefined}
      style={{color: link ? "blue" : "inherit"}}
    >
      {node.value}
    </span>
  );
};
