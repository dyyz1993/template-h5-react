// 微信分享Sdk，把微信相关的sdk统一集成到这里

import { getThumbnail } from './common';

// 设置微信分享

export type ShareParams = {
  title: string;
  desc: string;
  link?: string;
  imgUrl: string;
};
export function setShare(params: ShareParams) {
  if (!params || !params?.title) return;
  setTimeout(() => {
    window['wx']?.updateTimelineShareData({
      title: params.title,
      desc: params.desc,
      link: params.link ?? window.location.href,
      imgUrl: getThumbnail(params.imgUrl),
      success: () => {
        console.log('分享成功');
      },
      fail: () => {
        console.log('分享失败');
      }
    });
    window['wx']?.updateAppMessageShareData({
      title: params.title,
      desc: params.desc,
      link: params.link ?? window.location.href,
      imgUrl: getThumbnail(params.imgUrl),
      success: () => {
        console.log('分享成功');
      },
      fail: () => {
        console.log('分享失败');
      }
    });
  }, 800);
}
