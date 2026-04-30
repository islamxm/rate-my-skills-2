import type { MOMRaw } from "@/mom/types";
import { useEffect, useRef, useState } from "react";
import type { TextareaAutosizeProps } from "react-textarea-autosize";
import type { Tabs } from "radix-ui";
import { MOM } from "@/mom";
import { useDocumentActions, useNodeSelection } from "@/hooks";
import { useDebounceCallback } from "@shared/lib";

type ViewType = "preview" | "raw";

export function useRaw(node: MOMRaw) {
  const { updateNode } = useDocumentActions();
  const { isFocused } = useNodeSelection(node.id);
  const ref = useRef<HTMLTextAreaElement>(null);
  const [viewType, setViewType] = useState<ViewType>("raw");

  useEffect(() => {
    if (!ref.current) return;
    ref.current.value = node.value;
  }, [node.value]);

  const save = () => {
    if (!ref.current) return;
    const canSkipUpdate = MOM.Editor.shoulSkipUpdateState(node.value, ref.current.value);
    if (canSkipUpdate) return;
    updateNode<MOMRaw>({
      nodeId: node.id,
      patch: {
        id: node.id,
        value: ref.current.value,
        type: "raw",
        parentId: node.parentId,
      },
    });
  };

  const lazySave = useDebounceCallback(save, 800);

  const blur = () => {
    if (!ref.current) return;
    ref.current.blur();
  };

  const onBlur = () => {
    save();
    blur();
  };

  const onViewTypeChange = (value: ViewType) => {
    setViewType(value);
    save();
  };

  useEffect(() => {
    if (isFocused) {
      ref.current?.focus();
    }
  }, [isFocused]);

  const fieldProps: TextareaAutosizeProps = {
    defaultValue: node.value,
    onChange: lazySave,
    placeholder: "...",
    minRows: 1,
    spellCheck: false,
    tabIndex: -1,
    onBlur,
  };

  const tabProps: React.ComponentProps<typeof Tabs.Root> = {
    value: viewType,
    onValueChange: (v) => onViewTypeChange(v as ViewType),
  };

  return {
    ref,
    fieldProps,
    tabProps,
  };
}
