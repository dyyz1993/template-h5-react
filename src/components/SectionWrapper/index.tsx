import { judgeSimply } from '@/utils/common';
import styles from './index.module.scss';
import cs from 'classnames';

export interface ISectionItemKV {
  title: React.ReactNode;
  value: React.ReactNode;
}
export type SectionWrapperProps = React.PropsWithChildren<{
  title?: string;
  className?: string;
  list?: ISectionItemKV[];
  onClick?: () => void;
}>;
export function SectionWrapper(props: SectionWrapperProps) {
  const children = judgeSimply(() => {
    if (props.list) {
      return props.list?.map(({ title, value }, index) => {
        return (
          <div className={styles['list-item-kv']} key={index}>
            <div className={styles['title']}>{title}</div>
            <div className={styles['value']}>{value}</div>
          </div>
        );
      });
    }
    return props.children;
  });
  return (
    <div
      onClick={() => props?.onClick?.()}
      className={cs(styles['section-wrapper'], props.className)}
    >
      {props.title && <div className={styles['header-title']}>{props.title}</div>}
      {children}
    </div>
  );
}
