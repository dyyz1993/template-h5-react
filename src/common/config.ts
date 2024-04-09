export const CONFIG = {
  /** 页面标题 */
  TITLE: ''
} as const;

// 订单状态
export enum TicketOrderStatusEnum {
  // 未付款
  NO_PAY = '-2',
  // 取消订单
  CANNEL = '-1',
  // // 待发货
  // WAIT_SEND = '0',
  // 待核销
  // DOING = '1',
  // 交易完成
  DONE = '2',
  // 退款成功
  REFUND = '3'
}

// 订单状态
export const TicketOrderStatusMapName = {
  // 未付款
  [TicketOrderStatusEnum.NO_PAY]: '未付款',
  // 取消订单
  [TicketOrderStatusEnum.CANNEL]: '已取消',
  // // 待发货
  // WAIT_SEND = '0',
  // 待核销
  // [TicketOrderStatusEnum.DOING]: '待核销',
  // 交易完成
  [TicketOrderStatusEnum.DONE]: '交易完成',
  // 退款成功
  [TicketOrderStatusEnum.REFUND]: '退款成功'
} as const;

// 票的状态
export enum TicketWalletStatusEnum {
  // 待核销
  WAIT_VERIFY = '1',
  // 冻结 - 再卖的过程中
  FROZEN = '2',
  // 3已核销
  CONSUMED = '3',
  // 4 转增
  DONATE = '4'
}
// 图形验证码的验证头
export const CAPTCHA_TOKEN_HEADER_KEY = 'x-captcha-token';
