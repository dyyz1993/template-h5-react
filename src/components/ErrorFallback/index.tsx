import styles from './index.module.scss';
import cs from 'classnames';
import { FallbackProps } from 'react-error-boundary';

export type ErrorFallbackProps = React.PropsWithChildren<
  {
    className?: string;
  } & FallbackProps
>;
export default function ErrorFallback(props: ErrorFallbackProps) {
  console.log(props);
  return <div className={cs(styles['error-fallback'], props.className)}>ErrorFallback</div>;
}
