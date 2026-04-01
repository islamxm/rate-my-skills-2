import { useDocument } from "../../hooks";
import { Block } from "../Block/Block";
import { motion } from "motion/react";
import { LinkTooltip } from "../LinkTooltip/LinkTooltip";
import { useRef } from "react";

export const Canvas = () => {
  const { rootOrder } = useDocument();
  const ref = useRef<HTMLDivElement>(null);
  const { updateNode, getNode } = useDocument();

  /** инкапсулировать!!! */
  const addUrl = (opt: { url: string; linkId: string }) => {
    const { linkId, url } = opt;
    const node = getNode(linkId);
    updateNode({
      nodeId: linkId,
      patch: { ...node, url },
    });
  };

  return (
    <>
      <LinkTooltip addUrl={addUrl} containerRef={ref as any} />
      <motion.div
        ref={ref}
        layout
        className="markdown-body rounded-lg border h-full flex-1 p-2"
      >
        {rootOrder.map((nodeId) => (
          <Block nodeId={nodeId} key={nodeId} />
        ))}
      </motion.div>
    </>
  );
};
