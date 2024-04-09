// import { createBrowserHistory } from 'history';
import { FC, Suspense, useEffect, useState } from 'react';
import { Router, useRoutes, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { getRoutes } from './routes';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/ErrorFallback';
import { createBrowserHistory } from 'history';

// export { routes };

// export const hashHistory = createHashHistory();
export const reactHistory = createBrowserHistory();
export const router = createBrowserRouter(getRoutes());

/**
 * hash路由组件
 */
export const HashRouter: FC = () => {
  const [state, setState] = useState({
    action: reactHistory.action,
    location: reactHistory.location
  });

  useEffect(() => {
    const unListen = reactHistory.listen((data) => {
      console.log('sssssss', data);
      setState(data);
    });
    return unListen;
  }, []);

  return (
    // <Router location={state.location} navigator={reactHistory} navigationType={state.action}>
    //   <Suspense fallback="">
    //     {/* <Routes /> */}
    //     <RouterProvider router={router} />
    //   </Suspense>
    // </Router>
    <Suspense fallback="">
      <RouterProvider router={router} />
    </Suspense>
  );
};

// const Routes: FC = () => {
//   return useRoutes(getRoutes());
// };
