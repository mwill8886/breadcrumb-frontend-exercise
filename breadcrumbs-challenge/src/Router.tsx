import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
// View imports
import { Root, CrumbTest } from '@/views';

const routes = [
  { path: '/', element: <Root /> },
  { path: '/dashboard', element: <Root /> },
  { path: '/hiking/packs', Component: CrumbTest },
  { path: '/hiking/packs/day', element: <CrumbTest /> },
  { path: '/hiking/packs/day/small-pack', element: <CrumbTest /> },
];

//
// Router config
//
// export const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route path="/" element={<Root />} />
//       <Route path="dashboard" Component={Root} />
//       <Route path="hiking/packs" element={<CrumbTest />} />
//       <Route path="hiking/packs/day" element={<CrumbTest />} />
//     </>
//   )
// );

export const router = createBrowserRouter(routes);
