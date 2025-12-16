# Template & Element Library Preparation Guide

This document outlines the architectural standards and preparation steps required to build the "Smart" Template Library. The system relies on a **Component-Driven Architecture** where every asset (Section, Element, Page) is defined by a strict JSON Schema. This allows the Builder UI to automatically generate the editing panel ("Auto Panel") without hard-coded logic.

## 1. The Core Philosophy: "Schema-First"

Every element in the library is not just code; it is a **Manifest**. This manifest contains:
1.  **The Visuals:** The HTML/JSX structure and CSS.
2.  **The Brains:** A definition of what is editable (The Schema).
3.  **The Metadata:** Categorization for the drag-and-drop library.

## 2. The Master JSON Schema

Every generated asset must adhere to this JSON structure. This is the contract between the AI Generator and the React Builder.

```json
{
  "id": "unique_element_id_001",
  "name": "Hero Section - Modern Video",
  "category": "hero_sections", 
  "tags": ["dark-mode", "video", "high-conversion"],
  "thumbnail_url": "/assets/thumbnails/hero_001.jpg",
  
  // THE CODE: The raw structure. 
  // Use Handlebars-style syntax {{variable}} for dynamic data binding.
  "template_html": "<section class='hero-wrapper' style='background-color: {{bgColor}}'><h1 class='hero-title'>{{headline}}</h1><div class='hero-content'>{{bodyText}}</div></section>",
  
  // THE STYLES: Scoped CSS for this specific component.
  "styles": ".hero-wrapper { padding: 4rem 2rem; } .hero-title { font-size: 3rem; }",

  // THE CONTROLS: This tells the Auto Panel what inputs to render.
  "controls": [
    {
      "key": "bgColor",
      "label": "Background Color",
      "type": "color_picker",
      "defaultValue": "#ffffff",
      "group": "Style"
    },
    {
      "key": "headline",
      "label": "Main Headline",
      "type": "text_area",
      "defaultValue": "Your Catchy Headline Here",
      "group": "Content"
    },
    {
      "key": "cta_action",
      "label": "Button Action",
      "type": "link_picker",
      "defaultValue": "#",
      "group": "Interaction"
    }
  ]
}
```

## 3. Supported Control Types (The "Auto Panel" API)

When defining `controls`, use these types. The React Builder must have a corresponding component for each.

| Type | Description | UI Component Rendered |
| :--- | :--- | :--- |
| `text_input` | Single line text | `<input type="text" />` |
| `text_area` | Multi-line text | `<textarea />` |
| `rich_text` | HTML content | WYSIWYG Editor |
| `color_picker` | Hex/RGBA selector | Color Wheel / Swatch |
| `image_upload` | Image source URL | Media Library Modal |
| `slider` | Numeric range | Range Slider (Min/Max) |
| `toggle` | Boolean (True/False) | Switch / Checkbox |
| `select` | Dropdown options | `<select>` (Requires `options` array) |
| `inventory_picker` | **Smart Feature** | Product Selection Modal (Connects to DB) |
| `link_picker` | URL or Internal Page | Link Selector |
| `icon_picker` | Icon class/SVG | Icon Grid |

## 4. AI Generation Strategy (Python + Gemini)

We will use Python to batch-process requests to Gemini. The prompt must be engineered to return valid JSON.

### The Prompt Structure
> "You are a UI Component Generator.
> Task: Create a 'Pricing Table' section.
> Output Format: JSON only.
> Requirements:
> 1. HTML must use BEM naming convention.
> 2. CSS must be responsive.
> 3. Identify every editable text, color, and link.
> 4. Create a 'controls' array mapping these editable areas to the supported Control Types (text_input, color_picker, etc.)."

### The Python Script Logic (Pseudocode)
1.  **Input:** List of requested components (e.g., `["Hero", "Testimonial", "Footer"]`).
2.  **Process:** Loop through list -> Call Gemini API with Prompt -> Receive JSON string.
3.  **Validation:** Parse JSON -> Check if `template_html` and `controls` keys exist.
4.  **Output:** Save as `library/{category}/{id}.json`.

## 5. Folder Structure for the Library

Organize the generated assets logically to allow the Builder to lazy-load them.

```text
/library-assets
  /manifest.json          <-- Index of all available components (for the sidebar list)
  /sections
    /hero
      hero_001.json
      hero_002.json
    /features
      feature_grid_01.json
    /pricing
      pricing_table_01.json
  /elements
    /buttons
      btn_primary.json
    /forms
      contact_form.json
  /templates              <-- Full Page Templates
    /landing-pages
      beauty_product_launch.json
```

## 6. "Smart" vs. "Static" Elements

*   **Static Elements:** Visuals only. (e.g., A text block, a divider).
    *   *Control Type:* `text_input`, `color_picker`.
*   **Smart Elements:** Connected to the Backend/Inventory. (e.g., "Add to Cart" Button, "Product Price").
    *   *Control Type:* `inventory_picker`.
    *   *Behavior:* The Builder does not store the price text. It stores the `product_id`. The Frontend renders the price dynamically from the database at runtime.

## 7. Next Steps

1.  **Define the Control Type Registry:** Finalize the list of inputs your React Builder supports.
2.  **Build the Python Generator:** Write the script to hit the Gemini API.
3.  **Run a Test Batch:** Generate 5 simple components (Button, Header, Footer) and test loading them into your Canvas.
