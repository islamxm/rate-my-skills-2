import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateDocumentModal } from "../CreateDocumentModal/CreateDocumentModal";

export const CreateDocumentCard = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <>
      <CreateDocumentModal open={createModalOpen} setOpen={setCreateModalOpen} />
      <div
        onClick={() => setCreateModalOpen(true)}
        className="bg-white cursor-pointer border border-dashed border-[2px] border-blue-300 w-[200px] h-[280px] rounded-lg flex justify-center items-center gap-[10px] flex-col hover:bg-blue-50 hover:text-blue-400 transition-all text-blue-300"
      >
        <Plus size={40} />
        <span className="text-lg">New Document</span>
      </div>
    </>
  );
};
