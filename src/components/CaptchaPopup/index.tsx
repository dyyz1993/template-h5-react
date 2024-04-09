import { renderImperatively } from '@xyz/cat-design/es/utils/render-imperatively';
import styles from './index.module.scss';
import cs from 'classnames';
import { attachPropertiesToComponent } from '@xyz/cat-design/es/utils/attach-properties-to-component';
import { Button, Dialog, Input, Popup, Toast } from '@xyz/cat-design';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useMount } from 'ahooks';
import { DialogConfirmProps, DialogProps } from '@xyz/cat-design/es/package/Dialog';
import { CaptchaToken } from '@/utils/cacheKV';
export type CaptchaPopupProps = React.PropsWithChildren<
  {
    className?: string;
    onChange?: () => void;
    visible?: boolean;
    onClose?: () => void;
  } & DialogConfirmProps
>;
CaptchaPopup.defaultProps = {
  confirmText: '确认',
  cancelText: '取消',
  cancelColor: 'plain'
};
function CaptchaPopup(props: CaptchaPopupProps) {
  const ref = useRef<any>();
  const [isSending, setIsSending] = useState<boolean>(false);
  return (
    <Dialog
      {...props}
      className={cs(styles['captcha-popup'], props.className, 'cdm-dialog-confirm')}
      showCloseButton
      visible={props.visible}
      onClose={props.onClose}
      title="请输入验证码"
      actions={[
        [
          {
            key: 'cancel',
            text: props.cancelText,
            colorType: props.cancelColor,
            onClick: async () => {
              const ret = await props.onCancel?.();
              return ret;
            }
          },
          {
            key: 'confirm',
            text: props.confirmText,
            bold: true,
            colorType: props.confirmColor,
            onClick: async () => {
              if (isSending) return;
              setIsSending(true);
              const [captchaId, value] = ref?.current.getValue() || [];
              // const [isError, res] = await getOauthCheckCaptcha({
              //   captchaId,
              //   value
              // });
              // if (isError) {
              //   ref.current.refreshCaptcha();
              //   ref.current.setTips('验证码错误，请重新输入' || res.message);
              //   setIsSending(false);
              //   return false;
              // }
              // CaptchaToken.set(res.data);
              // //   验证码验证通过，返回true
              // const ret = await props.onConfirm?.();
              // setIsSending(false);
              // return ret;
            }
          }
        ]
      ]}
      content={<CaptchaContent ref={ref}></CaptchaContent>}
    ></Dialog>
  );
}

const CaptchaContent = forwardRef((props, ref) => {
  const [code, setCode] = useState('');
  const [tips, setTips] = useState('');
  const [imgUrl, setImgUrl] = useState<any>();
  const [captchaId, setCaptchaId] = useState<any>();
  useImperativeHandle(
    ref,
    () => ({
      getValue: () => {
        setTips('');
        return [captchaId, code];
      },
      setTips: (msg: string) => {
        setTips(msg);
      },
      refreshCaptcha() {
        getCaptcha();
      }
    }),
    [captchaId, code]
  );

  async function getCaptcha() {
    // setTips('');
    // const [isError, res] = await getOauthCaptcha({});
    // if (isError) {
    //   setImgUrl(<span>暂无验证码</span>);
    //   return Toast.info(res?.message || '验证码获取失败');
    // }
    // setImgUrl(res?.data.data);
    // setCaptchaId(res?.data.captchaId);
  }

  useMount(async () => {
    getCaptcha();
  });
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <Input
          autoFocus
          placeholder="请输入图形验证码"
          className={styles['input']}
          //TODO 搭配着来的
          maxLength={4}
          clearable
          value={code}
          onChange={(e) => {
            setCode(e);
          }}
        ></Input>
        <div
          onClick={() => {
            // 重新获取图形验证码，这里应该需要限制获取的次数
            getCaptcha();
          }}
          className={styles['img-box']}
          dangerouslySetInnerHTML={{ __html: imgUrl }}
        ></div>
      </div>
      {tips && (
        <div className={styles['tips-wrap']}>
          <span>{tips}</span>
        </div>
      )}
    </div>
  );
});
function show(props: Omit<CaptchaPopupProps, 'visible' | 'onClose'>) {
  return renderImperatively(<CaptchaPopup {...props}></CaptchaPopup>);
}
export default attachPropertiesToComponent(CaptchaPopup, {
  show
});
