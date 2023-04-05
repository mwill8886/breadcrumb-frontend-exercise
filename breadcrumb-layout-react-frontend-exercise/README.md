### Setup

- `npm install`
- `npm run start` - run the react app in browser

### Optional

- `npm run format` - format code based on the provided prettier settings

### Evaluation Criteria

Complete the provided code to mimic the behavior that's demonstrated in the requirements section. You may optionally choose to scrap any or all of the scaffolding based on your preferences, but be very mindful of the time constraints to complete the solution.

Please organize, design, and document code as if it were going into production - then push your changes to origin before the timer runs out.

Have fun coding! 🚀
-The Causal Team

### Requirements

- The main entry point for updating the display logic is contained within `getChildrenToRender.ts`
- Some styles are lacking in `Breadcrumb.modules.scss` to matching the final designs

#### Spec

- Display as many breadcrumbs items that will fit within the parent container's width
  - include space for separators and truncation placeholder (ellipsis) that might be necessary
- If there are two or fewer items, display them even if there isn't enough room
- When truncation is required, start with the second item and keep removing until everything fits.
  - Said another way, the first and last items should always display, then prioritize displaying from the right most item to the left.
  - Example:
    - [1, 2, 3, 4, 5] - original list
    - [1,..., 3, 4, 5] - first truncation step
    - [1,..., 4, 5] - second truncation step
    - [1,..., 5] - third and maximum truncation
- The component should update based on changes to the item contents or browser width
  - Clicking the "Toggle Item Length" button will change the contents of each item between larger and smaller

#### Designs

- See `/examples/interactions.mov` for a demonstration of how the final solution should behave
- See `/examples/*.png` for static designs
