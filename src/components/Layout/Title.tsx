import { NavBar, Popover, Space, Toast } from '@xyz/cat-design';
import { NavBarProps } from '@xyz/cat-design/es/package/NavBar';
import { Action } from '@xyz/cat-design/es/package/Popover/popover';
import {
  AntOutline,
  CloseOutline,
  HandPayCircleOutline,
  MoreOutline,
  ScanningOutline,
  TransportQRcodeOutline
} from 'antd-mobile-icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface ITitleProps {
  children?: React.ReactNode;
  showDropDownMenu?: boolean;
  backArrow?: NavBarProps['backArrow'];
  onBack?: () => any;
}
Title.defaultProps = {
  showDropDownMenu: false
};
function Title(p: ITitleProps) {
  const navigate = useNavigate();
  const back = () => {
    console.log('back');
    navigate(-1);

    // 200ms 还在当前页面，则定位到首页
    setTimeout(() => {
      console.log('留在当前的页面');
      // navigate('/', { replace: true });
    }, 200);
  };

  const actions: Action[] = [
    { key: 'scan', icon: <ScanningOutline />, text: '扫一扫' },
    { key: 'payment', icon: <HandPayCircleOutline />, text: '付钱/收钱' },
    { key: 'bus', icon: <TransportQRcodeOutline />, text: '乘车码' },
    { key: 'assistant', icon: <AntOutline />, text: '智能助理' }
  ];

  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ '--gap': '16px' }}>
        {p.showDropDownMenu && (
          <Popover.Menu
            mode="dark"
            actions={actions.map((action) => ({
              ...action,
              icon: null
            }))}
            onAction={(node: { text: any }) => Toast.show(`选择了 ${node.text}`)}
            placement="bottom-start"
            trigger="click"
          >
            <MoreOutline />
          </Popover.Menu>
        )}
      </Space>
    </div>
  );

  return (
    <NavBar backArrow={p.backArrow} onBack={p.onBack || back} right={right}>
      {p.children}
    </NavBar>
  );
}

export default Title;
