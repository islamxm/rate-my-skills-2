import { type FC } from "react";
import { useChildren, useEditor, useNode } from "../../hooks";
import { MOM } from "../../mom";
import { FormatToolbar } from "../FormatToolbar/FormatToolbar";

type Props = { nodeId: string };

export const ParagraphNode: FC<Props> = ({ nodeId }) => {
  const children = useChildren(nodeId);
  const { ref, editorProps, applyFormat, save } =
    useEditor<HTMLParagraphElement>(nodeId, children);
  const node = useNode(nodeId);
  const isValidNode = MOM.Guard.isParagraphNode(node);

  if (!isValidNode) return;

  return (
    <>
      <FormatToolbar
        save={save}
        containerRef={ref as any}
        applyFormat={applyFormat}
      />
      
      <p
        ref={ref}
        {...editorProps}
        data-id={nodeId}
        data-type={node.type}
        data-parent-id={node.parentId ?? ""}
      />
    </>
  );
};
