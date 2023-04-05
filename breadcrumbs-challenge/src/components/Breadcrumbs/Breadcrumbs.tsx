import { Fragment } from 'react';

//
// Models
//

interface IBreadcrumbs {
  crumbsArray: Array<string>;
  handleCrumbClick: (crumbIndex: number) => void;
}

//
// Component
//
export const Breadcrumbs = (props: IBreadcrumbs) => {
  const { crumbsArray, handleCrumbClick } = props;
  return (
    <div>
      {crumbsArray.map((crumb, index) => {
        const displayLabel =
          crumb === ''
            ? 'Home'
            : crumb.charAt(0).toUpperCase() + crumb.slice(1).replace('-', ' ');
        const isLast = index === crumbsArray.length - 1;
        return (
          <Fragment key={`crumb-${index}`}>
            <button onClick={() => handleCrumbClick(index)} disabled={isLast}>
              {displayLabel}
            </button>
            {!isLast && ' > '}
          </Fragment>
        );
      })}
    </div>
  );
};
