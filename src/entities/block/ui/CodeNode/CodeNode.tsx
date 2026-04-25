import { type FC } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@shared/ui";
import { Copy } from "lucide-react";
import { useNodeSelection } from "@/hooks/useNodeSelection";
import clsx from "clsx";
import { useNode, useUI } from "@/hooks";
import type { MOMCode } from "@/mom/types";
import { MOM } from "@/mom";
import { getBlockColors } from "../../lib/getBlockColors";
import { useCode } from "../../lib/useCode";
import classes from "./classes.module.scss";

type Props = {
  nodeId: string;
};

/**
 * этот блок нужно сделать динамическим, то есть будут два состояния:
 *
 * - активный (обычный превью)
 * - неактивный (включается редактор и селект языков)
 *
 * иначе даже 3 такого блока с инициализированным редактором (даже простым как *@uiw*) тормозят приложение
 * можно рассмотреть библиотеку *BlockNode* вместо *@uiw*
 */

export const CodeNode: FC<Props> = ({ nodeId }) => {
  const node = useNode(nodeId);
  const { isSelected } = useNodeSelection(nodeId);
  const { blockHighlighting } = useUI();
  const { ref, language, onLangChange, languageLabel, code, copyToClipboard, LANGUAGE_OPTIONS, onCodeChange, onBlur } = useCode(node as MOMCode);

  const isValidNode = MOM.Guard.isCodeNode(node);

  if (!isValidNode) return null;

  const { border } = getBlockColors(node.type);

  return (
    <div
      data-id={nodeId}
      data-type={node.type}
      data-parent-id={node.parentId ?? ""}
      className={clsx("block-node p-[5px]", !blockHighlighting && classes.preview, classes.wrapper)}
    >
      <div className="flex gap-2 justify-between">
        {isSelected ? (
          <Select value={language} onValueChange={onLangChange}>
            <SelectTrigger style={{ backgroundColor: border }} className="w-full max-w-48 shadow-none border-none rounded-sm">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a language</SelectLabel>
                {LANGUAGE_OPTIONS.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ) : (
          <div className="text-[0.875rem] px-[12px] py-[8px]">{language ? languageLabel : "Select a language"}</div>
        )}

        {code && (
          <Tooltip>
            <TooltipTrigger>
              <Button onClick={copyToClipboard} variant={"outline"} className="bg-transparent" size={"icon"}>
                <Copy />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy</TooltipContent>
          </Tooltip>
        )}
      </div>

      <div className={classes.body}>
        {language && (
          <CodeEditor
            value={code}
            language={language}
            placeholder="..."
            onChange={onCodeChange}
            onBlur={onBlur}
            className={classes.editor}
            ref={ref}
          />
        )}
      </div>
    </div>
  );
};
