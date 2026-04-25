import { useSelector } from "@/shared/lib";

export function useDocumentMeta() {
  const title = useSelector((s) => s.document.title);
  const id = useSelector((s) => s.document.id);

  return {
    title,
    id,
  };
}
