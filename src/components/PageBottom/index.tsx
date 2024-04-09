import { Badge, TabBar } from '@xyz/cat-design';
import { Route, useLocation, MemoryRouter as Router, useNavigate } from 'react-router-dom';
import { AppOutline, MessageOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons';
import { FC } from 'react';
import { createHashHistory } from 'history';
import useUser from '@/store/user';
export const hashHistory = createHashHistory();

const PageBottom: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { redMessageCount } = useUser();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    // location.replace(value);
    navigate(value);
  };

  const tabs = [
    {
      key: '/',
      title: '首页',
      icon: <AppOutline />
    },
    {
      key: '/wallet',
      title: '票夹',
      icon: <UnorderedListOutline />
    },
    {
      key: '/message',
      title: '消息',
      icon: <MessageOutline />,
      badge: redMessageCount ? Badge.dot : null
    },
    {
      key: '/me',
      title: '我的',
      icon: <UserOutline />
    }
  ];

  return (
    <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} badge={item.badge as any} />
      ))}
    </TabBar>
  );
};

export default PageBottom;
