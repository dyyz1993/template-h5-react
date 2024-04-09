import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Title, { ITitleProps } from './Title';
import './index.scss';
import { Empty, EmptyProps, SafeArea } from '@xyz/cat-design';
// import { get_class_prefix } from '@/utils/class-name';
// import SafeArea from '@/package/SafeArea';
import { useLockScroll } from '@xyz/cat-design/es/utils/use-lock-scroll';
import { judgeSimply } from '@/utils/common';
import { isObject } from 'lodash';
import { NavBarProps } from '@xyz/cat-design/es/package/NavBar';
import { ShareParams, setShare } from '@/utils/wechat';
import useUser from '@/store/user';
export type ILayoutProps = {
  children: React.ReactNode;
  title: string;
  footer?: React.ReactNode | any;
  titleProps?: ITitleProps;
  showBackArrow?: NavBarProps['backArrow'];
  className?: string;
  // 是否在加载中
  loading?: boolean;
  // 是否空状态, 搭配loading，如果有loading，则会先展示loading, 在展示空状态
  showEmpty?: EmptyProps | boolean;
  // 配置分享数据
  shareConfig?: ShareParams;
}; // & ITitleProps;
const classPrefix = 'cdm-layout';
function Layout(p: ILayoutProps) {
  const footerRef = useRef<HTMLDivElement>(null);
  const containRef = useRef<HTMLDivElement>(null);
  const [calcHeight, setCalcHeight] = useState<any>({
    '--footer-height': '0px',
    '--title-height': '44px'
  });
  const userStore = useUser();
  useEffect(() => {
    if (p?.shareConfig?.title) {
      setShare(p?.shareConfig);
    } else {
      setShare(userStore.config?.wechatShareConfig!);
    }

    return () => {
      // 还原回去
      setShare(userStore.config?.wechatShareConfig!);
    };
  }, [p?.shareConfig, userStore.config?.wechatShareConfig]);

  useLockScroll(containRef, true);
  useLayoutEffect(() => {
    const obj: any = {};
    if (footerRef.current) {
      const rect = footerRef.current.getBoundingClientRect();
      obj['--footer-height'] = rect.height + 'px';
      setCalcHeight(obj);
    }
  }, [p.loading]);
  return (
    <div ref={containRef} className={classPrefix + ' ' + (p.className ?? '')} style={calcHeight}>
      <Title backArrow={p.showBackArrow} {...(p.titleProps || {})}>
        {p.title}
      </Title>
      <div className="cdm-layout-container">
        {judgeSimply(() => {
          const content = p.loading ? <Empty description="加载中"></Empty> : p.children;
          if (!p.loading && p.showEmpty) {
            const props = isObject(p.showEmpty) ? p.showEmpty : {};
            return <Empty description="暂无内容" {...props}></Empty>;
          }
          return content;
        })}
      </div>
      {p?.footer && !p.loading && (
        <div ref={footerRef} className={classPrefix + '-footer '}>
          {p.footer} <SafeArea position="bottom" />
        </div>
      )}
    </div>
  );
}

// Layout.defaultProps={

// }

export default Layout;
