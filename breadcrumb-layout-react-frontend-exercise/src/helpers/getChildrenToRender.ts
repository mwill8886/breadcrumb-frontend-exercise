import { range } from 'lodash';

interface BreadcrumbState {
  /** The width of each child element */
  childrenWidths: number[];

  /** The width of the truncation placeholder */
  truncationWidth: number;

  /** The width available for the parent element */
  parentWidth: number;

  /** The width of the separators between each child element */
  separatorWidth: number;
}

interface BreadcrumbResult {
  afterTruncation: number;
  beforeTruncation: number;
  truncated: number;
}

export function getChildrenToRender(state: BreadcrumbState): BreadcrumbResult {
  const { childrenWidths, parentWidth, separatorWidth } = state;

  let result: BreadcrumbResult = {
    beforeTruncation: 0,
    truncated: childrenWidths.length,
    afterTruncation: 0,
  };

  // TODO: complete this logic so it adheres to the requirements outlined in the README document
  
  if (childrenWidths.length <= 2) {
    // Display all crumbs if there are two or less items
    result.beforeTruncation = childrenWidths.length;
    result.truncated = 0;
  } else {
    // Perform display logic if there are more than two crumbs

    // Calculate the available width since considering that the first and last items are always visible
    let availableWidth = parentWidth - (childrenWidths[0] + childrenWidths[childrenWidths.length - 1]);
    // Initialize a display list with the index of the first item in the array and the last item in the array since they are always visible
    let displayCount = 2 // always the minimum of two
    let truncatedCount = 0

    // Calculate how many crumb items can be displayed in the available space account for the minimum of two visible crumb items
    for (let i = childrenWidths.length - 2; i >= 1; i--) {
      const crumbWidth = childrenWidths[i] + separatorWidth;
      if (availableWidth >= crumbWidth) {
        // Update available width and add item to the display count
        availableWidth = availableWidth - crumbWidth;
        // displayList.unshift(i);
        displayCount = displayCount + 1;
      } else {
        // Stop the loop when there is no more available width
        break;
      }
    }

    // Calculate the space for the truncation placeholders if there is still crumb items to display and space available
    if (displayCount < childrenWidths.length) {
      const remainingCount  = childrenWidths.length - displayCount;
      truncatedCount = remainingCount;
    }

    result.beforeTruncation = truncatedCount > 0 ? 1 : displayCount;
    result.truncated = truncatedCount;
    result.afterTruncation = truncatedCount > 0 ? displayCount - 2 : 0;
  }
  
  return result;
}
