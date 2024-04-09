export {};

// TODO: 根据业务删除不需要的sdk类型声明
declare global {
  interface Window {
    /** 前端配置平台 */
    $TZ_CONFIG?: { conf: any; ok: boolean };

    /** 斐波sdk */
    fiboSDK?: Record<string, any>;

    /** 金管家内部sdk */
    PALifeOpen?: Record<string, any>;

    /** 金管家小程序sdk */
    PALibWX?: Record<string, any>;

    /** 微信js-sdk */
    wx?: Record<string, any>;

    WeixinJSBridge?: any;
  }
  interface Document {
    attachEvent(event: string, listener: EventListener): boolean;
    detachEvent(event: string, listener: EventListener): void;
  }
}
