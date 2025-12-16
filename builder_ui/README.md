# Canvas Builder UI Prototype

This is a functional React prototype of the Canvas Builder UI.

## New Features (v2)

### Dynamic Templates & Components
We have upgraded the builder with 6 robust industry-specific templates and a fully dynamic component system.

### Available Templates
1. **Auto Care Products**: E-commerce focus with feature grids and bundle pricing.
2. **Digital Marketing Ebook**: Info-product layout with curriculum grid.
3. **Dental Implant Pro**: Service lead generation with testimonials.
4. **Home Renovation**: Service quote request with process steps.
5. **Online Cooking Class**: Course sales with curriculum and pricing.
6. **Wealth Seminar KL**: Event registration with ticket tiers and FAQ.

### Dynamic Editing
You can now edit complex lists directly in the Properties Panel:
- **Feature Grids**: Add/Remove features, edit titles and descriptions.
- **Pricing Cards**: Manage product variants and prices.
- **Testimonials**: Add customer reviews dynamically.
- **FAQs**: Manage questions and answers.
- **Lead Forms**: Add or remove form fields using the "Tags" input.

### Sales Funnel Logic
The builder now includes a mock sales funnel flow:
1. **Checkout**: Clicking any "Buy" or "Get Started" button opens a checkout modal.
2. **Upsell**: After "paying", users are shown a one-time offer (Upsell).
3. **Thank You**: The final step shows a receipt with the main item and any upsells added.

## How to Run

### Option 1: VS Code Live Server
1. Right-click `index.html` in VS Code.
2. Select "Open with Live Server" (if installed).

### Option 2: Python Simple Server
1. Open a terminal in this directory:
   ```bash
   cd "c:\Users\sales\x.ide pp builder\builder_ui"
   ```
2. Run the Python server:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser to `http://localhost:8000`.

## Features Included

- **Builder Interface**:
  - **Component Library**: Click to add Hero, Features, or CTA sections.
  - **Canvas**: Visual representation of the page. Click elements to select them.
  - **Auto-Panel**: The right sidebar automatically generates controls based on the selected element's schema (Text, Color, Toggle, etc.).
- **Analytics Dashboard**: Visual mockups of sales data.
- **Inventory Management**: Product list view.
- **Integrations**: UI for connecting Meta Pixel and Google Analytics.

## Tech Stack
- **React 18**: UI Library.
- **Tailwind CSS**: Styling.
- **Babel Standalone**: In-browser JSX compilation (no build step required).
- **Remix Icons**: Icon set.
