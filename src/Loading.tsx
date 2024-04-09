import { useTimeout } from 'ahooks';
import { FC, PropsWithClassName } from 'react';
import useUser from './store/user';
import styles from './loading.module.scss';
// import
type Props = {
  /** 加载完成 */
  onComplete?: () => any;
};

/** 加载页 */
const LoadingView: FC<Props> = (props) => {
  // TODO: 加载页逻辑
  const userStore = useUser();
  useTimeout(async () => {
    await userStore.getConfig();
    userStore.getMessageRed();
    props.onComplete?.();
  }, 0);

  return (
    <div className={styles['loading-page']}>
      <div className={styles['container']}>
        <div className={styles['progress']}>
          <div className={styles['color']}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingView;
