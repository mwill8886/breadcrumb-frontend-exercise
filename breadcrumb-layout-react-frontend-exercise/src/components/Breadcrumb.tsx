import React, { useMemo, useRef, useState } from 'react';
import { range } from 'lodash';

import { getChildrenToRender } from '../helpers/getChildrenToRender';
import { useElementWidth } from '../helpers/useElementWidth';
import { stylePixelToInt } from '../helpers/stylePixelToInt';

import styles from './Breadcrumb.module.scss';

const SEPARATOR_WIDTH_PX = stylePixelToInt(styles.separatorWidth);
const TRUNCATION_WIDTH_PX = stylePixelToInt(styles.truncationWidth);

export interface BreadcrumbProps extends React.PropsWithChildren {}

/**
 * Renders children in a horizontal list with separators,
 * removing children and replacing with a single truncation placeholder when
 * the component gets too wide for its container.
 */
export function Breadcrumb({ children, ...childProps }: BreadcrumbProps) {
  const childrenArray = React.Children.toArray(children);
  const containerRef = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState<number>(0);

  /**
   * Array of widths of child elements. It is kept up to date such that `childrenWidths[i]`
   * corresponds with `children[i]` as long as `children[i]` is currently being rendered. If
   * `children[i]` is not currently being rendered, this will remember the width it had the last
   * time it was rendered.
   */
  const [childrenWidths, setChildrenWidths] = useState<number[]>(() =>
    new Array(childrenArray.length).fill(0)
  );

  useElementWidth(containerRef, setParentWidth);

  /**
   * Holds a callback per child which the children can use to update their own width. Needs to be
   * memoized to maintain a stable reference.
   */
  const setChildWidthCallbacks = useMemo(
    () =>
      range(childrenArray.length).map(
        (i): ((width: number) => void) =>
          (width) =>
            setChildrenWidths((curr) => {
              const updated = [...curr];
              updated[i] = width;
              return updated;
            })
      ),
    [setChildrenWidths, childrenArray.length]
  );

  const { beforeTruncation, truncated, afterTruncation } = useMemo(
    () =>
      getChildrenToRender({
        childrenWidths: childrenArray.map((_, i) => childrenWidths[i]),
        truncationWidth: TRUNCATION_WIDTH_PX,
        parentWidth,
        separatorWidth: SEPARATOR_WIDTH_PX,
      }),
    [childrenArray, childrenWidths, parentWidth]
  );

  const beforeTruncationIndices = range(0, beforeTruncation);
  const afterTruncationIndices = range(
    beforeTruncation + truncated,
    beforeTruncation + truncated + afterTruncation
  );

  return (
    <div className={styles.container} ref={containerRef}>
      <WithSeparators>
        {/* elements before */}
        {beforeTruncation > 0 &&
          beforeTruncationIndices.map((i) => (
            <BreadcrumbChild
              key={i}
              {...childProps}
              setWidth={setChildWidthCallbacks[i]}
            >
              {childrenArray[i]}
            </BreadcrumbChild>
          ))}

        {/* truncation placeholder */}
        {truncated > 0 && <div className={styles.truncationPlaceholder}>…</div>}

        {/* elements after */}
        {afterTruncation > 0 &&
          afterTruncationIndices.map((i) => (
            <BreadcrumbChild
              key={i}
              {...childProps}
              setWidth={setChildWidthCallbacks[i]}
            >
              {childrenArray[i]}
            </BreadcrumbChild>
          ))}
      </WithSeparators>
    </div>
  );
}

interface BreadcrumbChildProps extends React.PropsWithChildren {
  /** Tells the parent about the width of this child.  */
  setWidth: (width: number) => void;
}

/**
 * Monitors the width of breadcrumb element children.
 */
function BreadcrumbChild({ children, setWidth }: BreadcrumbChildProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  useElementWidth(elementRef, setWidth);

  return (
    <div ref={elementRef} className={styles.element}>
      {children}
    </div>
  );
}

/** Stylized `/` to separate elements in the breadcrumbs component. */
function BreadcrumbSeparator() {
  return (
    <div className={styles.separator}>
      <svg
        width="10"
        height="16"
        viewBox="0 0 10 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 2.5L2 13"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/** Adds {@link BreadcrumbSeparator}s between every child element. */
function WithSeparators({ children }: React.PropsWithChildren) {
  const childrenArray = React.Children.toArray(children);
  if (childrenArray.length === 0) return null;
  return (
    <>
      {React.Children.toArray(children).reduce((prev, curr, i) => [
        prev,
        <BreadcrumbSeparator key={i} />,
        curr,
      ])}
    </>
  );
}
