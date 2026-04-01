import type { FC } from "react";
import { useChildren, useEditor, useNode } from "../../hooks";
import { MOM } from "../../mom";

type TagType = React.ElementType<
  React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
>;
type Props = { nodeId: string };

export const HeadingNode: FC<Props> = ({ nodeId }) => {
  const children = useChildren(nodeId);
  const { editorProps, ref } = useEditor<HTMLHeadingElement>(
    nodeId,
    children,
    "plain",
    true,
  );
  const node = useNode(nodeId);
  const isValidNode = MOM.Guard.isHeadingNode(node);

  if (!isValidNode) return null;

  const Tag = `h${node.depth}` as TagType;

  return (
    <Tag
      ref={ref}
      {...editorProps}
      data-id={nodeId}
      data-type={node.type}
      data-parent-id={node.parentId ?? ""}
      // className="block-node border border-dashed border-sky-400"
    />
  );
};
