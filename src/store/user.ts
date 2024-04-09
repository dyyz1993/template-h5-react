import zustand from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface State {
  info: any;
  // 位置选择 全国
  city?: string;
  config?: any;
  redMessageCount?: number;
  login: () => Promise<void>;
  update: () => Promise<void>;
  getConfig: () => Promise<void>;
  getMessageRed: () => Promise<void>;
  selectCity: (v: string) => void;
}

const useUser = zustand(
  // subscribeWithSelector: 增强subscribe的能力
  // https://github.com/pmndrs/zustand#using-subscribe-with-selector
  subscribeWithSelector<State>((set) => ({
    info: {},
    redMessageCount: 0,
    config: {} as any,
    city: '全国',
    getConfig: async () => {
      // const [isError, ret] = await getApiOpenUserConfig();
      // TODO 这里错误的话，会导致全局都错误，所以要有个全局错误页
      // !isError && set({ config: ret.data });
    },
    getMessageRed: async () => {
      // const [isError, ret] = await getApiOpenRedCount();
      // if (!isError) set({ redMessageCount: ret.data });
    },

    selectCity: (city: string) => {
      set({ city: city ?? '全国' });
    },

    /**
     * 登录
     */
    login: async () => {
      // TODO：调用登录接口，接收返回的用户数据
      set({
        info: { id: 1, is_new_user: true }
      });
    },

    /**
     * 更新用户信息
     */
    update: async () => {
      // TODO: 调用更新用户信息接口，只刷新该更新的字段
      // 例如 is_new_user 字段只会在登录时返回
      set((state) => ({
        info: {
          ...state.info,
          nickname: '666'
        }
      }));
    }
  }))
);

export default useUser;
