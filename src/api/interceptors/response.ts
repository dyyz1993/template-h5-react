import CaptchaPopup from '@/components/CaptchaPopup';
import { reactHistory, router } from '@/router';
import { CaptchaToken, Token } from '@/utils/cacheKV';
import { sleep } from '@/utils/common';
import { Toast, Dialog } from '@xyz/cat-design';
import instance, { RequestConfig } from '../instance';
import { CAPTCHA_TOKEN_HEADER_KEY } from '@/common/config';

// 自定义拦截响应
instance.interceptors.response.use(
  async (response) => {
    const config = response.config as RequestConfig;
    const res = response?.data;
    let isError = false;
    if (config.isLoading) {
      Toast.hide();
    }
    if (config?.isUploadOss) {
      return [false];
    }
    // 获取验证码的凭证
    if (response.headers[CAPTCHA_TOKEN_HEADER_KEY]) {
      // 存起来
      CaptchaToken.set(response.headers[CAPTCHA_TOKEN_HEADER_KEY]);
    }
    // 统一拦截拉黑信息
    if (res?.code === 60018) {
      // TODO 其实可以在这里抛出错误，然后在Layout里做处理
      // TODO 按钮类型最好有一个地方统一管理
      router.navigate('/error', {
        replace: true,
        state: {
          title: '您的账号已被禁用',
          desc: '由于您的违规操作，您当前的账号已被禁用，如需解禁账号请联系官方工作人员。',
          button: [
            {
              text: '联系客服',
              color: 'primary',
              actionType: 'contact'
            },
            {
              text: '退出登录',
              actionType: 'logout'
            }
          ]
        }
      });
      return [true];
    }
    // 统一拦截需要弹出图形验证码的场景
    if (res?.code === 80000) {
      // 当有值的时候，非首次，需要展示错误原因
      if (config.__retryCount! > 0) {
        Toast.info(res.message || '验证码失效,请重新输入');
        // 确保消息能正常漏出
        await sleep(1000);
      }
      // 这里需要hold住。
      return new Promise((resolve) => {
        CaptchaPopup.show({
          // 这里是成功的回调
          onConfirm: () => {
            config.__retryCount = (config?.__retryCount || 0) + 1;
            // 然后重新发起请求
            resolve(instance.request(config));
            return true;
          }
        });
      });
    }
    // 统一拦截错误信息
    if (res?.code !== 10000) {
      isError = true;
    }
    // TODO 对退出登录做统一的处理
    if (config?.url?.indexOf('/logout') !== -1) {
      Token.set('');
    }
    if (res?.data?.scope === 'user' && res?.data?.accessToken) {
      Token.set(res?.data?.accessToken);
      // 植入 accessToken
      // 未登录
    } else if (res?.code === 61000) {
      Token.set('');
      // window.location.href = '/login';
      window.location.replace(
        '/login?redirect=' + encodeURIComponent(window.location.pathname + window.location.search)
      );
      // 响应头要求重定向到某个位置
    } else if (response.headers['x-redirect']) {
      window.location.replace(response.headers['x-redirect']);
    }

    // 默认展示错误信息
    if (config.showErrorTips === true && isError) {
      // eslint-disable-next-line no-debugger
      Toast.info(res?.message);
    }

    return [isError, res];
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // return Promise.reject(error);
    return [true, error];
  }
);
