import classes from './classes.module.scss';
import type { FC } from "react";
import { useDocument, useNode, useSelection } from "../../hooks";
import { renderer } from "../renderer";
import clsx from "clsx";
import { getBlockColors } from "../tokens";
import type { MOMBlockNodeType } from "../../mom/types";
import { motion } from "motion/react";
import {
  Button,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../shared";
import {
  BrushCleaning,
  CopyX,
  SquareDashedMousePointer,
  SquareMousePointer,
  SquareStack,
  SquaresUnite,
  Trash2,
} from "lucide-react";
import { MOM } from "@/mom";
import { useUI } from "@/hooks/useUi";

type Props = {
  nodeId: string;
};

/** Топ-левел нода, то что имеет свойства редактирования, этот компонент можно разделить на два, в первом - используем группировку и dnd, во втором - редактирование, так мы правильно декомпозируем и разделим ответственности */
export const Block: FC<Props> = ({ nodeId }) => {
  const node = useNode(nodeId);
  const { isSelected, selectOne, addToSelect, selectAll } = useSelection();
  const { removeNode,  } = useDocument();
  const {blockHighlighting} = useUI();
  const selected = isSelected(nodeId);

  if (!node) return null;

  const { bg, border, text } = getBlockColors(node.type as MOMBlockNodeType);

  const select = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey) {
      addToSelect(nodeId);
    } else {
      selectOne(nodeId);
    }
  };
  
  const typeCssClass = MOM.Editor.getCssClassByNode(node)

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <motion.div
          key={nodeId}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={clsx(typeCssClass, classes.wrapper)}
        >
          <div
            onClick={select}
            className={clsx(
              `rounded-sm border border-solid overflow-hidden w-full outline-[4px]`,
              !blockHighlighting && classes.highlight_disabled
            )}
            style={blockHighlighting ? {
              backgroundColor: bg,
              borderColor: text,
              borderStyle: "solid",
              outlineColor: selected ? border : "transparent",
            } : {outline: `1px dashed ${text}`, border: "none"}}
          >
            {renderer(node)}
          </div>
        </motion.div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <BrushCleaning /> Clear
        </ContextMenuItem>
        <ContextMenuItem>
          <SquareMousePointer onClick={() => selectOne(nodeId)} /> Select
        </ContextMenuItem>
        <ContextMenuItem onClick={selectAll}>
          <SquareStack /> Select all
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={() => removeNode(nodeId)}
          variant={"destructive"}
        >
          <CopyX /> Delete block
        </ContextMenuItem>
        {/* <ContextMenuItem
          onClick={() => removeNode(nodeId)}
          variant={"destructive"}
        >
          <Trash2 /> Delete all
        </ContextMenuItem> */}
      </ContextMenuContent>
    </ContextMenu>
  );
};
