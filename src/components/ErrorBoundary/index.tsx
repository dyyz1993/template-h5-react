import ErrorPage from '@/views/errorPage';
import React, { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

function RootErrorBoundary() {
  const error = useRouteError() as Error;
  // TODO 这里做错误监控
  console.error('RootErrorBoundary', error);
  // useEffect
  const navigate = useNavigate();

  return (
    <ErrorPage
      title="异常情况"
      desc={'“程序员哥哥”都未知的错误，客观对待，可截图反馈客服'}
      detailCode={error.stack}
      buttons={[
        {
          actionType: 'never',
          text: '返回首页',
          onClick: () => {
            navigate('/');
          }
        }
      ]}
    ></ErrorPage>
  );
}

export default RootErrorBoundary;
