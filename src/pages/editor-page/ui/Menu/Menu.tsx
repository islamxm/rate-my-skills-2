import { useDocumentActions, useUI } from "@/hooks";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator } from "@shared/ui";
import { BrushCleaning, HelpCircle, Keyboard, SquareStack } from "lucide-react";
import { useState } from "react";
import { ShortcutsModal } from "../ShortcutsModal/ShortcutsModal";

export const Menu = () => {
  const { toggleBlockHighlighting, blockHighlighting } = useUI();
  const { clearDocument } = useDocumentActions();

  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);

  return (
    <>
      <ShortcutsModal open={shortcutsModalOpen} setOpen={setShortcutsModalOpen} />

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>More</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={toggleBlockHighlighting}>
              <SquareStack /> {blockHighlighting ? "Disable" : "Enable"} block highlighting
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => setShortcutsModalOpen(true)}>
              <Keyboard /> Shortcuts
            </MenubarItem>
            <MenubarItem>
              <HelpCircle /> About
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={clearDocument} variant={"destructive"}>
              <BrushCleaning /> Clear
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};
