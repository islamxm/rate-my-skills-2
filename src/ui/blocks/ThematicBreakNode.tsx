import type { FC } from "react";
import { useNode } from "../../hooks";
import { MOM } from "../../mom";

type Props = {
  nodeId: string;
};

export const ThematicBreakNode: FC<Props> = ({ nodeId }) => {
  const node = useNode(nodeId);
  const isValidNode = MOM.Guard.isThematicBreak(node);

  if (!isValidNode) return null;

  return (
    <hr
      className="block-node"
      data-id={node.id}
      data-type={node.type}
      data-parent-id={node.parentId ?? ""}
    />
  );
};
