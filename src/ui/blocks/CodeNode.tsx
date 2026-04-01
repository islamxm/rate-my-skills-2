import { useEffect, useState, type FC } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useDocument, useNode, useSelection } from "../../hooks";
import { MOM } from "../../mom";
import type { MOMCode } from "../../mom/types";

type Props = {
  nodeId: string;
};

const LANGUAGE_OPTIONS = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
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

export const CodeNode: FC<Props> = ({ nodeId }) => {
  const node = useNode(nodeId);
  const { updateNode, removeNode } = useDocument();
  const { clearAll } = useSelection();

  const [code, setCode] = useState<string>((node as any)?.value || "");
  const [language, setLanguage] = useState<string>(
    (node as any).lang || "javascript",
  );
  const isValidNode = MOM.Guard.isCodeNode(node);

  if (!isValidNode) return null;

  useEffect(() => {
    if (node) {
      setCode(node.value);
    }
  }, [node]);

  const handleCodeChange = (evn: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = evn.target.value;
    setCode(newValue);
  };

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    updateNode<MOMCode>({
      nodeId,
      patch: {
        id: nodeId,
        parentId: node.parentId,
        value: code,
        lang: newLang,
        type: "code",
      },
    });
  };

  const onBlur = () => {
    updateNode<MOMCode>({
      nodeId,
      patch: {
        id: nodeId,
        value: code,
        type: "code",
        parentId: node.parentId,
        lang: language,
      },
    });
    clearAll();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code) {
      removeNode(nodeId);
    }
  };

  return (
    <div
      data-id={nodeId}
      data-type={node.type}
      data-parent-id={node.parentId ?? ""}
      className="block-node code-block"
    >
      <div className="code-block-header">
        <select value={language} onChange={handleLangChange}>
          {LANGUAGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="code-block-body">
        {language && (
          <CodeEditor
            value={code}
            language={language}
            placeholder="..."
            onChange={handleCodeChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            className="code-block-editor"
          />
        )}
      </div>
    </div>
  );
};
