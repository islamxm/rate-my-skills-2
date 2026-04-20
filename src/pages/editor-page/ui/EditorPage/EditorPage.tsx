import { Canvas } from "../Canvas/Canvas";
import { CanvasMap } from "../CanvasMap/CanvasMap";
import { EditorToolbar } from "../EditorToolbar/EditorToolbar";
import { TopToolbar } from "../TopToolbar/TopToolbar";

export const EditorPage = () => {
  return (
    <div className={"flex flex-col h-screen"}>
      <TopToolbar />
      <div className="flex flex-1 min-h-0">
        <EditorToolbar />
        <div className={"p-5 gap-3 flex-1 flex hatching"}>
          <Canvas />
          <CanvasMap/>
        </div>
      </div>
    </div>
  );
};
