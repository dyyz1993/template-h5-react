import RootErrorBoundary from '@/components/ErrorBoundary';
import { Token } from '@/utils/cacheKV';
import { ComponentType, createElement, lazy } from 'react';
import { Navigate, RouteObject, useNavigate, useRouteError } from 'react-router-dom';
// import { router } from '.';

export const NeedLogin = (props: { children: any }) => {
  const navigate = useNavigate();

  // 等待下一次宏事件跳转
  if (!Token.get()) {
    setTimeout(() => {
      // eslint-disable-next-line no-debugger
      // debugger;
      navigate(
        '/login?redirect=' + encodeURIComponent(window.location.pathname + window.location.search)
      );
    }, 0);
  }

  return props.children;
};

// 第一次访问过后会被缓存起来
const lazyImport = (
  fatory: () => Promise<{ default: ComponentType<any> }>,
  needLogin?: boolean
) => {
  // if (!Token.get() && needLogin) {
  //   // eslint-disable-next-line no-debugger
  //   // debugger;
  //   // return router.navigate(
  //   //   '/login?redirect=' + encodeURIComponent(window.location.pathname + window.location.search)
  //   // );
  //   return <NeedLogin></NeedLogin>;
  // } else {

  // }
  return createElement(lazy(fatory));
};

/**
 * 路由表
 */

export function getRoutes() {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: lazyImport(() => import('@/views/demo/1'))
    },
    // 需要登录的

    ...[
      {
        path: '/demo/1',
        element: lazyImport(() => import('@/views/demo/1'), true)
      }
    ].map((item) => ({
      ...item,
      element: <NeedLogin>{item.element}</NeedLogin>
    })),
    {
      path: '/demo/1',
      element: lazyImport(() => import('@/views/demo/1'))
    },
    // 错误页面
    {
      path: '/error',
      element: lazyImport(() => import('@/views/errorPage'))
    },
    {
      path: '*',
      element: <Navigate to="/" replace />
    }
  ].map((item) => {
    return {
      ...item,
      hasErrorBoundary: true,
      ErrorBoundary: RootErrorBoundary
    };
  });
  return routes;
}
