# Canvas Builder & Sales Ecosystem Architecture Guide

This document serves as the comprehensive technical specification for building the **"Canvas" Web Builder** and its surrounding **Sales Ecosystem**. It is designed to consume the assets defined in `TEMPLATE_LIBRARY_PREP.md` and turn them into a fully functional, high-performance commerce platform.

## 1. High-Level System Architecture

The platform consists of three distinct layers that work in unison:

1.  **The Builder (The "Figma" Layer):** A client-side React application where users visually construct pages. It consumes the JSON Templates.
2.  **The Runtime (The "Live Site" Layer):** A highly optimized Next.js rendering engine that takes the user's configuration and serves it to the public.
3.  **The Ecosystem Backend (The "Brain"):** A Node.js/Python API that manages Inventory, Analytics, Ad Integrations, and AI Generation.

---

## 2. The Canvas Core (The "Figma-Like" Editor)

The Canvas is not an iframe; it is a direct React rendering environment. It must handle the "Visual Code-to-No-Code" bridge.

### A. The Rendering Engine
The Canvas does not render HTML strings directly. It renders a **Component Tree** based on the JSON Schema.

*   **The `Renderer` Component:** This is the recursive function that loops through the `blocks` array in the Page Config.
*   **The `ComponentRegistry`:** A mapping object that links JSON types to React Components.
    *   `"hero_modern_01"` -> `<HeroModern01 />`
    *   `"smart_checkout"` -> `<SmartCheckout />`

### B. The "Editor Wrapper" Pattern
Every component rendered on the canvas is wrapped in a Higher-Order Component (HOC) called `<EditorWrapper>`.
*   **Responsibility:**
    *   Intercepts clicks (prevents links from navigating).
    *   Draws the "Blue Box" selection outline.
    *   Displays drag handles and "Delete/Duplicate" quick actions.
    *   Passes the `selectedElementID` to the Global State.

### C. Viewport Synchronization
To support the "Figma-style" infinite canvas with multiple device views:
*   **Virtualization:** Only render the active viewport in high fidelity.
*   **State Sync:** The `PageConfig` is the single source of truth. If the user edits text on the "Mobile" view, it updates the `PageConfig`, which triggers a re-render on the "Desktop" view instantly.

---

## 3. The "Auto-Panel" Logic (Dynamic UI)

This is the core feature that allows the UI to adapt to *any* template the AI generates.

### A. The Selection Flow
1.  User clicks a component on the Canvas.
2.  Global State updates: `selectedElement = { id: "hero_123", schema: ... }`.
3.  The **Sidebar Panel** reads `selectedElement.schema.controls`.

### B. The Control Factory
The Sidebar maps the JSON `type` to a specific UI Input Component.

```javascript
// Pseudocode for the Sidebar Renderer
const ControlFactory = ({ control, value, onChange }) => {
  switch (control.type) {
    case 'text_input': return <Input label={control.label} value={value} onChange={onChange} />;
    case 'color_picker': return <ColorPicker value={value} onChange={onChange} />;
    case 'inventory_picker': return <InventoryModal value={value} onChange={onChange} />; // Connects to Ecosystem
    default: return null;
  }
};
```

---

## 4. The Sales Ecosystem Integration (The "Smart" Features)

This is what separates this tool from a generic page builder. The components are "aware" of the business logic.

### A. Inventory & "Smart Elements"
*   **The Problem:** Static builders require users to manually type prices.
*   **The Solution:** The `inventory_picker` control type.
    *   **In Builder:** User selects "Red Shoes" from a modal. The JSON stores `productId: "prod_999"`.
    *   **On Live Site:** The component fetches the *current* price/stock for `prod_999` at render time. If the price changes in the dashboard, the site updates automatically.

### B. The "Invisible" Analytics Layer
*   **Event Bus:** The Runtime Layer has a built-in Event Bus (`EventTracker`).
*   **Automatic Injection:**
    *   When a `checkout_form` component is rendered, it automatically attaches listeners to the `onSubmit` event.
    *   These listeners fire:
        1.  **Internal Analytics:** To your dashboard (Views, Conversions).
        2.  **External Pixels:** To Facebook CAPI / Google Ads (if configured).
*   **User Benefit:** The user never has to paste a `<script>` tag. It's baked into the component logic.

### C. Ad Tech Integration (ROAS Engine)
*   **The Feedback Loop:** The Ecosystem Backend pulls ad spend data from Facebook API and matches it with the internal Sales Data.
*   **Dashboard:** Displays "Real Profit" (Revenue - COGS - Ad Spend).

---

## 5. Data & State Management

### A. The "Page Config" (Single Source of Truth)
The entire website is represented by one massive JSON object.
```typescript
interface PageConfig {
  meta: { title: string; pixelIds: string[] };
  theme: { primaryColor: string; font: string };
  blocks: Block[]; // The recursive tree of components
}
```

### B. History Stack (Undo/Redo)
*   We use a library like `zundo` (with Zustand) or `redux-undo`.
*   Every change to `PageConfig` pushes a snapshot to the stack.
*   **Critical:** This allows users to experiment fearlessly.

---

## 6. The Publishing Pipeline (Compiler)

How do we go from JSON in the Builder to a fast website?

### A. The "Hydration" Strategy
We do **not** generate static HTML files for every page (too slow for inventory updates). We use **Next.js ISR (Incremental Static Regeneration)** or **SSR**.

1.  **Request:** Visitor hits `shop.com/product-page`.
2.  **Fetch:** Next.js fetches the `PageConfig` JSON from the DB.
3.  **Render:** Next.js maps the JSON blocks to React Components on the server.
4.  **Hydrate:** The "Smart Components" (Price, Stock) fetch their live data.
5.  **Serve:** The user sees a fully rendered HTML page (great for SEO) that becomes interactive (React) immediately.

---

## 7. Development Roadmap

### Phase 1: The Core Engine
*   [ ] Set up the React Repo with the `EditorWrapper` and `Renderer`.
*   [ ] Build the `ControlRegistry` (Inputs, Color Pickers).
*   [ ] Implement the Drag-and-Drop logic (dnd-kit or similar).

### Phase 2: The Library Connection
*   [ ] Build the Python Script to generate JSON templates (from `TEMPLATE_LIBRARY_PREP.md`).
*   [ ] Create the "Library Sidebar" to fetch and display these assets.
*   [ ] Implement the "Drop -> Hydrate" logic.

### Phase 3: The Ecosystem
*   [ ] Build the `InventoryModal` to select dummy products.
*   [ ] Implement the "Smart Component" logic (fetching price by ID).
*   [ ] Set up the Analytics Event Bus.

### Phase 4: The Compiler
*   [ ] Set up the Next.js Runtime to consume the JSON.
*   [ ] Test the "Publish" button flow.
