import CaptchaPopup from '@/components/CaptchaPopup';
import { reactHistory, router } from '@/router';
import { CaptchaToken, Token } from '@/utils/cacheKV';
import { sleep } from '@/utils/common';
import { Toast, Dialog } from '@xyz/cat-design';
import instance, { RequestConfig } from '../instance';
import { CAPTCHA_TOKEN_HEADER_KEY } from '@/common/config';

// 自定义拦截请求
instance.interceptors.request.use(
  (request) => {
    const config = request as RequestConfig;
    const headers = { ...request.headers };
    // 添加token
    const token = Token.get();
    if (!headers.Authorization && token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // 将图形验证码的凭证带上去
    const captchaToken = CaptchaToken.get();
    if (captchaToken) {
      headers[CAPTCHA_TOKEN_HEADER_KEY] = captchaToken;
    }

    if (config.isLoading) {
      Toast.loading('加载中');
    }

    return {
      ...request,
      headers
    };
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
