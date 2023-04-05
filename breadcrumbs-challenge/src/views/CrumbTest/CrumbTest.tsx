import { useEffect, useState } from 'react';
import { Breadcrumbs } from '@/components';
import { useLocation, useNavigate } from 'react-router-dom';

//
// Component
//
export const CrumbTest = () => {
  const [crumbsState, setCrumbsState] = useState<Array<string>>([]);
  const location = useLocation();
  const navigate = useNavigate();

  //   console.log('location: ', location);
  //   console.log('href: ', href);
  //   console.log('path: ', path);
  //   const crumbArray = location.pathname.split('/');

  //   console.log('pathArr: ', pathArr);

  const handleCrumbClick = (crumbIndex: number) => {
    console.log('handle click');
    // construct a path string from the array
    const pathString = crumbsState.slice(0, crumbIndex + 1);
    //   .join('/')
    //   .trim();

    console.log('pathstring: ', pathString);

    setCrumbsState(pathString);
    // the home "/" route will only be a "" so handle this scenario
    // const path = pathString === '' ? '/' : pathString;
    // console.log();
    // console.log(path);
    // navigate(path);
  };

  useEffect(() => {
    const crumbArray = location?.pathname?.split('/');
    console.log('crumbArray: ', crumbArray);
    setCrumbsState(crumbArray);
  }, [location]);

  return (
    <div>
      <h1>Crumb Test</h1>
      <Breadcrumbs
        crumbsArray={crumbsState}
        handleCrumbClick={handleCrumbClick}
      />
    </div>
  );
};
