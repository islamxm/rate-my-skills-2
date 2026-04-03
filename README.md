# ReadGen (rate my skills 2)

**ReadGen** is a specialized, block-based README builder. This project demonstrates advanced frontend engineering, high-performance text manipulation, and a strict separation of concerns between the core logic and the UI.

### 🚀 Key Features

- **WYSIWYG Editor:** The editing interface serves as the live preview. Markdown syntax is abstracted away, allowing users to build README structures via visual blocks.
- **MOM (Virtual Markdown Object Model):** A custom core built with pure TypeScript (Parser, Validator, Guard, Engine). Operates as a pure data-in-data-out system with zero external dependencies.
- **Render Optimization:** Node-level update isolation. Utilizing memoized selectors and stable Action Facades ensures $O(1)$ rendering complexity during content manipulation, maintaining consistent performance regardless of document size.
- **Normalized State:** A flat data structure in the store for O(1) node access and efficient README tree manipulation.

### 🛠 Tech Stack

- **Core:** React 19, TypeScript.
- **State Management:** Redux Toolkit (Thunks for complex business logic, distinct Document and Selection slices).
- **Architecture:** Layered Architecture (Shared, UI, MOM, Store) with a heavy focus on core logic encapsulation.
