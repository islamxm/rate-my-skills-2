import { useDocumentActions, useNodeSelection } from "@/hooks";
import type { MOMCode } from "@/mom/types";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useDebounceCallback } from "usehooks-ts";

const LANGUAGE_OPTIONS = [
  {
    value: "javascript",
    label: "JavaScript",
  },
  {
    value: "typescript",
    label: "TypeScript",
  },
  { value: "jsx", label: "JSX" },
  { value: "tsx", label: "TSX" },
  { value: "html", label: "HTML" },
  { value: "markdown", label: "Markdown" },
  { value: "css", label: "CSS" },
  { value: "scss", label: "SCSS" },
  { value: "sass", label: "Sass" },
  { value: "less", label: "Less" },
  { value: "json", label: "json" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
  { value: "go", label: "Golang" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "yaml", label: "YAML" },
  { value: "toml", label: "TOML" },
  { value: "docker", label: "Docker" },
  { value: "sql", label: "SQL" },
  { value: "bash", label: "bash" },
  { value: "nginx", label: "nginx" },
  { value: "makefile", label: "Makefile" },
];

export function useCode(node: MOMCode) {
  const { updateNode } = useDocumentActions();
  const { isFocused } = useNodeSelection(node.id);
  const [code, setCode] = useState<string>((node as MOMCode)?.value || "");
  const [language, setLanguage] = useState<string>((node as any).lang || "javascript");
  const ref = useRef<HTMLTextAreaElement>(null);
  const languageLabel = LANGUAGE_OPTIONS.find((f) => f.value === language)?.label;

  const onCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    lazySave();
  };

  const onLangChange = (e: string) => {
    const newLang = e;
    setLanguage(newLang);
    updateNode<MOMCode>({
      nodeId: node.id,
      patch: {
        id: node.id,
        parentId: node.parentId,
        value: code,
        lang: newLang,
        type: "code",
      },
    });
  };

  const save = () => {
    updateNode<MOMCode>({
      nodeId: node.id,
      patch: {
        id: node.id,
        value: code,
        type: "code",
        parentId: node.parentId,
        lang: language,
      },
    });
  };

  const lazySave = useDebounceCallback(save, 800);

  const onBlur = () => {
    save();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  useEffect(() => {
    if (isFocused) {
      ref.current?.focus();
    }
  }, [isFocused]);

  return {
    ref,
    language,
    onLangChange,
    languageLabel,
    code,
    copyToClipboard,
    LANGUAGE_OPTIONS,
    onCodeChange,
    onBlur,
  };
}
