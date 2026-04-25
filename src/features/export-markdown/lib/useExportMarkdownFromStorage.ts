import { MOM } from "@/mom";
import type { CommonStatus } from "@/shared/model";
import { useState } from "react";

export function useExportMarkdownFromStorage() {
  const [status, setStatus] = useState<CommonStatus>("idle");

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  const exportMarkdown = async (id: string) => {
    try {
      setStatus("loading");
      const doc = await MOM.Storage.getDocument(id);
      if (!doc) throw new Error();
      const { rootOrder, nodes, title } = doc;
      MOM.Export.exportMarkdown(rootOrder, nodes, title);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return {
    exportMarkdown,
    isLoading,
    isSuccess,
    isError,
  };
}
