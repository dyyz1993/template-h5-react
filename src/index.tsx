import ReactDOM from 'react-dom';
import App from './App';
import createWatermark from './rpf/un/createWatermark';
import isPARS from './rpf/un/isPARS';
import isWeChat from './rpf/un/isWeChat';
import loadSentry from './rpf/un/loadSentry';
import './rpf/react/vconsole';
import '@xyz/cat-design/es/package/Styles/index';
import '@xyz/cat-design/es/global/index';

// import getQuery from './rpf/un/getQuery';
import { get, set } from './utils/cacheKV';
import getQuery from './rpf/un/getQuery';
import filterQuery from './rpf/un/filterQuery';

// document.querySelector('body')?.addEventListener(
//   'touchmove',
//   function (e) {
//     const parent: any = getScrollParent(e.target! as any);
//     console.log(parent);
//     if (parent === window || parent?.scrollHeight === parent?.clientHeight) e.preventDefault();
//   },
//   {
//     passive: false
//   }
// );
const documentHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
};
window.addEventListener('resize', documentHeight);
documentHeight();
createWatermark();

(async () => {
  await Promise.all([
    loadSentry(window.$TZ_CONFIG?.conf.sentry?.dsn ?? '').catch(() => {
      console.warn('sentry 加载失败');
    })
  ]);

  ReactDOM.render(<App />, document.getElementById('root'));
})();
