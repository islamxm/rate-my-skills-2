import { StoreProvider } from "./store";
import { EditorPage } from "./ui/pages";
import { TooltipProvider } from "./ui/shared/tooltip";

function App() {
  return (
    <StoreProvider>
      <TooltipProvider>
        <EditorPage />
      </TooltipProvider>
    </StoreProvider>
  );
}

export default App;
