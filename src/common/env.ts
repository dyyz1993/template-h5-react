const NODE_ENV = process.env.NODE_ENV;
const BUILD_ENV = process.env.REACT_APP_BUILD_ENV ?? 'prod';

const env = {
  /** 本地调试 */
  dev: NODE_ENV === 'development',

  /** 非正式环境（本地调试、temp、test） */
  debug: BUILD_ENV !== 'prod',

  /** temp环境 */
  temp: BUILD_ENV === 'temp',

  /** test环境 */
  test: BUILD_ENV === 'test',

  /** 正式环境 */
  prod: BUILD_ENV === 'prod',

  BUILD_ENV
} as const;

export default env;
