import { Button, ErrorBlock } from '@xyz/cat-design';
import styles from './index.module.scss';
import cs from 'classnames';
import { useLocation } from 'react-router-dom';
import { ReactChild, ReactFragment, ReactPortal, Key } from 'react';
import { useStore } from 'zustand';
import useUser from '@/store/user';
import { ButtonProps } from '@xyz/cat-design/es/package/Button';

export type ButtonsProps = ButtonProps & {
  actionType: 'contact' | 'logout' | 'never';
  text: string;
  children?: string;
};
export type ErrorPageProps = React.PropsWithChildren<{
  className?: string;
  title?: string;
  desc?: string;
  buttons?: ButtonsProps[];
  detailCode?: string;
}>;
// 错误页
// 标题、描述、按钮
export default function ErrorPage(props: ErrorPageProps) {
  const { state }: any = useLocation();
  const userStore = useUser();
  const title = props?.title || state?.title || '404';
  const desc = props?.desc || state?.description || state?.desc || '页面不存在';
  const buttons = props?.buttons || state?.button || state?.buttons || [];
  return (
    <div className={cs(styles['ErrorPage'], props.className)}>
      <ErrorBlock fullPage title={title} description={desc}>
        <div className={styles['button-group']}>
          {buttons.map(
            ({ text, actionType, ...item }: ButtonsProps, index: Key | null | undefined) => {
              return (
                <Button
                  key={index}
                  {...item}
                  onClick={async (e) => {
                    switch (actionType) {
                      // 联系客服
                      case 'contact':
                        window.location.href = userStore.config?.contactCustomerUrl!;
                        break;
                      // 退出登录
                      case 'logout':
                        console.log('logout');
                        break;
                      default:
                        item?.onClick?.(e);
                        break;
                    }
                  }}
                >
                  {text}
                </Button>
              );
            }
          )}
        </div>
        {props.detailCode && <div className={styles['detail-error-code']}>{props.detailCode}</div>}
      </ErrorBlock>
    </div>
  );
}
