import 'react';

declare module 'react' {
  /** props 添加 classname 字段 */
  export type PropsWithClassName<P = unknown> = P & {
    className?: string | undefined;
  };

  /** props 扩展 style 字段 */
  export type PropsWithStyle<P> = P & { style?: React.CSSProperties };
}
