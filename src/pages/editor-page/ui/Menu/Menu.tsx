import { useDocumentActions, useHistory, useStorageMutation, useUI } from "@/hooks";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator } from "@shared/ui";
import { BrushCleaning, FilePlus, HelpCircle, Keyboard, Redo2, Save, SquareStack, Trash2, Undo2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ShortcutsModal } from "../ShortcutsModal/ShortcutsModal";
import { MOM } from "@/mom";
import { toast } from "sonner";

export const Menu = () => {
  const { toggleBlockHighlighting, blockHighlighting } = useUI();
  const { clearDocument } = useDocumentActions();
  const { undo, redo } = useHistory();

  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);

  return (
    <>
      <ShortcutsModal open={shortcutsModalOpen} setOpen={setShortcutsModalOpen} />

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={undo}>
              <Undo2 /> Undo
            </MenubarItem>
            <MenubarItem onClick={redo}>
              <Redo2 /> Redo
            </MenubarItem>
            <MenubarSeparator/>
            <MenubarItem onClick={toggleBlockHighlighting}>
              <SquareStack /> {blockHighlighting ? "Disable" : "Enable"} block highlighting
            </MenubarItem>
            <MenubarSeparator/>
            <MenubarItem onClick={() => setShortcutsModalOpen(true)}>
              <Keyboard /> Shortcuts
            </MenubarItem>
            <MenubarItem>
              <HelpCircle /> About
            </MenubarItem>
            <MenubarSeparator/>
            <MenubarItem onClick={clearDocument} variant={"destructive"}>
              <BrushCleaning /> Clear
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};
