import { Toaster, TooltipProvider } from "@shared/ui";
import { StoreProvider } from "./store";
import { EditorPage } from "@pages/editor-page";


function App() {
  return (
    <StoreProvider>
      <TooltipProvider>
        <EditorPage />
        <Toaster/>
      </TooltipProvider>
    </StoreProvider>
  );
}

export default App;
