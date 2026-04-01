import { useDocument } from "../../hooks";
import { Block } from "../Block/Block";
import clsx from "clsx";
import { motion } from "motion/react";

export const Canvas = () => {
  const { rootOrder } = useDocument();

  return (
    <motion.div
      layout
      // className="markdown-body rounded-lg border h-full flex-1 p-2 gap-[2px] flex-col flex"
      className="markdown-body rounded-lg border h-full flex-1 p-2"
    >
      {rootOrder.map((nodeId) => (
        <Block nodeId={nodeId} key={nodeId} />
      ))}
    </motion.div>
  );
};
