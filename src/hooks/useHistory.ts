import { useDispatch, useSelector } from "../shared/lib";
import { documentStoreActions } from "../store/slices/documentSlice";

export function useHistory() {
  const dispatch = useDispatch();

  const past = useSelector((s) => s.document.history.past);
  const future = useSelector((s) => s.document.history.future);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  const historySize = past.length;

  function undo() {
    if (!canUndo) return;
    dispatch(documentStoreActions.undo());
  }

  function redo() {
    if (!canRedo) return;
    dispatch(documentStoreActions.redo());
  }

  return {
    canRedo,
    canUndo,
    historySize,
    undo,
    redo,
  };
}
