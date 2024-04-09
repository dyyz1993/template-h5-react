import styles from './index.module.scss';
import cs from 'classnames';
import QRCode from 'react-qr-code';

export type TicketQrcodeProps = React.PropsWithChildren<{
  className?: string;
  // token 应该要单独刷新
  token?: string;
  title?: React.ReactNode;
  desc?: React.ReactNode;
}>;
export default function TicketQrcode(props: TicketQrcodeProps) {
  return (
    <div className={cs(styles['ticket-qrcode'], props.className)}>
      <div className={styles['title']}>{props.title}</div>
      <div className={styles['desc']}>{props.desc}</div>
      <div className={styles['qrcode']}>
        <QRCode
          size={225}
          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
          value={props?.token!}
          viewBox={`0 0 225 225`}
        />
      </div>
    </div>
  );
}
