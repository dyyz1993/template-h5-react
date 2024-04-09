import { Button, Dialog, Input, Toast } from '@xyz/cat-design';
import styles from './index.module.scss';
import cs from 'classnames';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useMount } from 'ahooks';

export type Demo1Props = React.PropsWithChildren<{
  className?: string;
}>;
export default function Demo1(props: Demo1Props) {
  const ref = useRef<any>();
  return (
    <div className={cs(styles['demo1'], props.className)}>
      <Button
        onClick={() => {
          Dialog.confirm({
            onConfirm() {
              const value = ref?.current.getValue();
              console.log(value);
              ref.current.setTips('setTips' + value);
              //   发起请求进行校验，如果错误的话，则需要刷新验证码，并进行toast提示。
              return false;
            },
            title: '图形验证码',
            content: <CaptchaContent ref={ref}></CaptchaContent>
          });
        }}
      >
        弹出验证码
      </Button>
    </div>
  );
}
const CaptchaContent = forwardRef((props, ref) => {
  const [code, setCode] = useState('');
  const [tips, setTips] = useState('');
  const [imgUrl, setImgUrl] = useState<any>();
  useImperativeHandle(
    ref,
    () => ({
      getValue: () => {
        setTips('');
        return code;
      },
      setTips: (msg: string) => {
        setTips(msg);
      }
    }),
    [code]
  );

  // async function getCaptcha() {
  //   setTips('');
  //   const [isError, res] = await getOauthCaptcha({});
  //   if (isError) {
  //     setImgUrl(<span>暂无验证码</span>);
  //     return Toast.info(res?.message || '验证码获取失败');
  //   }
  //   setImgUrl(res.data.data);
  // }

  useMount(async () => {
    // getCaptcha();
  });
  return (
    <div className={styles['container']}>
      {/* <img src={imgUrl} alt="" className={styles['captcha-img']} /> */}
      <div className={styles['content']}>
        <Input
          className={styles['input']}
          clearable
          value={code}
          onChange={(e) => {
            setCode(e);
          }}
        ></Input>
        <div
          onClick={() => {
            // 重新获取图形验证码，这里应该需要限制获取的次数
            // getCaptcha();
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
