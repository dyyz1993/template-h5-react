import { useReactive } from 'ahooks';
import { FC, useEffect } from 'react';
import Loading from './Loading';
import { HashRouter } from './router';
import './styles/global.scss';

import useUser from './store/user';

const App: FC = () => {
  const loading = useReactive({
    complete: false,
    onComplete() {
      this.complete = true;
    }
  });
  const userStore = useUser();

  useEffect(() => {
    // 增加微信分享
  }, []);

  if (!loading.complete) {
    return (
      <Loading
        onComplete={() => {
          loading.onComplete();
        }}
      />
    );
  }

  return <HashRouter />;
};

export default App;
