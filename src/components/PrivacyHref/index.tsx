import { Button, Popup } from '@xyz/cat-design';
import styles from './index.module.scss';
import cs from 'classnames';
import { useState } from 'react';
export type PrivacyHrefProps = React.PropsWithChildren<{
  className?: string;
  name: string;
  popTitle?: string;
  desc: string;
  onConfirm?: () => void;
}>;
export default function PrivacyHref(props: PrivacyHrefProps) {
  const [visible, setVisible] = useState(false);
  const { name, popTitle, desc, onConfirm } = props;
  return (
    <>
      <a
        onClick={() => {
          setVisible(true);
        }}
        className={cs(styles['privacy-href'], props.className)}
      >
        {name}
      </a>
      <Popup
        className={styles['privacy-popup']}
        round
        showCloseButton
        title={popTitle || '协议'}
        visible={visible}
        onClose={() => setVisible(false)}
        footer={
          <Button
            size="large"
            block
            color="primary"
            onClick={() => {
              setVisible(false);
              onConfirm?.();
            }}
          >
            同意并关闭协议
          </Button>
        }
      >
        <div
          className={styles['content']}
          dangerouslySetInnerHTML={{
            __html: desc || ''
          }}
        ></div>
      </Popup>
    </>
  );
}
