import { ReduxProvider } from "./app/providers/redux";
import { EditorPage } from "./pages/editorPage";

function App() {
  return (
    <ReduxProvider>
      <EditorPage />
    </ReduxProvider>
  );
}

export default App;
