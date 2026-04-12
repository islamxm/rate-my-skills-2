/**
 *
 * @param {KeyboardEvent} e - Обьект нативного DOM события keydown
 * @param {[ModCode, ModCode, KeyCode] | [ModCode, KeyCode] | [KeyCode]} combination - Комбинация нажатых клавиш в виде кортежа
 * @param {(...args:any[]) => void} callback - Функция которая выполнится при выполнении условии
 * @param {boolean} preventDefault - нужно ли сделать e.preventDefault()
 */
export function shortcut(
  e: KeyboardEvent,
  combination: [ModCode, ModCode, KeyCode] | [ModCode, KeyCode] | [KeyCode],
  callback?: (...args: any[]) => any,
  preventDefault?: boolean,
) {
  const key = combination[combination.length - 1] as KeyCode;
  const mods = combination.slice(0, combination.length - 1) as Array<ModCode>;

  if (!keyDetect(e, key)) return false;

  const possibleMods: Array<ModCode> = ["Alt", "Ctrl", "Shift"];
  const modsMatch = possibleMods.every((mod) => {
    const isRequired = mods.includes(mod);
    const isPressed = modDetect[mod](e);
    return isRequired === isPressed;
  });

  if (modsMatch) {
    if (preventDefault) e.preventDefault();
    callback?.();
    return true;
  }
  return false;
}

const modDetect: Record<ModCode, any> = {
  Ctrl: (e: KeyboardEvent) => e.metaKey || e.ctrlKey,
  Alt: (e: KeyboardEvent) => e.altKey,
  Shift: (e: KeyboardEvent) => e.shiftKey,
};

const keyDetect = (e: KeyboardEvent, key: KeyCode) => e.code === keyCodes[key];

type ModCode = "Ctrl" | "Shift" | "Alt";
type KeyCode = keyof typeof keyCodes;
const keyCodes = {
  Tab: "Tab",
  Esc: "Escape",
  Enter: "Enter",
  Backspace: "Backspace",
  "1": "Digit1",
  "2": "Digit2",
  "3": "Digit3",
  "4": "Digit4",
  "5": "Digit5",
  "6": "Digit6",
  "7": "Digit7",
  "8": "Digit8",
  "9": "Digit9",
  "10": "Digit0",
  "-": "Minus",
  "=": "Equal",
  "[": "BracketLeft",
  "]": "BracketRight",
  "/": "Slash",
  "\\": "BackSlash",
  "'": "Quote",
  ":": "Semicolon",
  ",": "Comma",
  ".": "Period",
  "`": "Backquote",
  Q: "KeyQ",
  W: "KeyW",
  E: "KeyE",
  R: "KeyR",
  T: "KeyT",
  Y: "KeyY",
  U: "KeyU",
  I: "KeyI",
  O: "KeyO",
  P: "KeyP",
  A: "KeyA",
  S: "KeyS",
  D: "KeyD",
  F: "KeyF",
  G: "KeyG",
  H: "KeyH",
  J: "KeyJ",
  K: "KeyK",
  L: "KeyL",
  Z: "KeyZ",
  X: "KeyX",
  C: "KeyC",
  V: "KeyV",
  B: "KeyB",
  N: "KeyN",
  M: "KeyM",
} as const;
