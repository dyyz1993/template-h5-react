import {
  CSSProperties,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo
} from 'react';
import { CurrentTime } from './hook';
import useCountDown from './hook';
import { parseFormat } from './utils';

export interface CountDownInstance {
  /** 开始倒计时	 */
  start: () => void;
  /** 暂停倒计时	 */
  pause: () => void;
  /** 重设倒计时，若 autoStart 为 true，重设后会自动开始倒计时	 */
  reset: () => void;
}

export interface CountDownProps {
  /**
   * 是否自动开始倒计时
   * @default true
   */
  autoStart?: boolean;
  /**
   * 是否开启毫秒级渲染
   */
  millisecond?: boolean;
  /**
   * 倒计时时长，单位毫秒
   * @default 0
   */
  time?: number | string;
  /**
   * 时间格式
   * @default 'HH:mm:ss'
   */
  format?: string;
  style?: CSSProperties;
  className?: string;
  /** 倒计时变化时触发	 */
  onChange?: (currentTime: CurrentTime) => void;
  /** 倒计时结束时触发	*/
  onFinish?: () => void;
  children?: (currentTime: CurrentTime) => ReactNode;
}

export function noop(): void {
  /**/
}

const CountDown = forwardRef<CountDownInstance, CountDownProps>((props, ref) => {
  const { start, pause, reset, current } = useCountDown({
    time: +props.time!,
    millisecond: props.millisecond,
    onChange: props.onChange,
    onFinish: props.onFinish
  });

  const timeText = useMemo(() => parseFormat(props.format!, current), [current]);

  const resetTime = () => {
    reset(+props.time!);

    if (props.autoStart) {
      start();
    }
  };

  useEffect(() => {
    resetTime();

    return () => {
      pause();
    };
  }, [props.time]);

  useImperativeHandle(ref, () => ({
    start,
    pause,
    reset: resetTime
  }));

  return (
    <div className={props.className} style={props.style}>
      {props.children ? props.children(current) : timeText}
    </div>
  );
});

CountDown.defaultProps = {
  autoStart: true,
  time: 0,
  format: 'HH:mm:ss',
  onChange: noop,
  onFinish: noop
};

export default CountDown;
