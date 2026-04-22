/** функция для сохранения текущего активного редактируемого блока до запуска внешнего изменения стейта */
export const saveStateBeforeExternalUpdate = (cb?: () => void) => {
  const activeEl = document.activeElement;
  if (activeEl && activeEl instanceof HTMLElement && activeEl.dataset.editable) {
    // потому что во всех contenteditable, textarea где меняется блоки сохранение триггерится на ивент blur
    activeEl.blur();
  }
  cb?.();
};
