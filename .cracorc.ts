import type { CracoConfig } from '@craco/types';
import path from 'path';
import { name } from './package.json';

const CracoLessPlugin = require('craco-less');
const CracoCSSModules = require('craco-css-modules');

const cracoConfig: CracoConfig = {
  plugins: [
    { plugin: CracoCSSModules }
    // { plugin: CracoLessPlugin }
  ],
  style: {
    modules: {
      localIdentName: '[local]--[hash:base64:5]'
    },
    postcss:
      // process.env.NODE_ENV === 'production'
      true
        ? {
            mode: 'extends',
            loaderOptions: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [
                  [
                    'postcss-px-to-viewport',
                    {
                      unitToConvert: 'px', // 需要转换的单位，默认为"px"
                      viewportWidth: 375, // 设计稿的视口宽度
                      unitPrecision: 6, // 单位转换后保留的精度
                      propList: ['*'], // 能转化为vw的属性列表
                      transformRuntime: true // 设置 transformation:true 之后，可以转换被字符串模板嵌套的字符串表达式
                    }
                  ]
                ]
              }
            }
          }
        : {}
    // postcss: {

    //   plugins: [
    //     require('postcss-px-to-viewport')({
    //       unitToConvert: 'px', // 需要转换的单位，默认为"px"
    //       viewportWidth: 375, // 设计稿的视口宽度
    //       unitPrecision: 6, // 单位转换后保留的精度
    //       propList: ['*'], // 能转化为vw的属性列表
    //       transformRuntime: true // 设置 transformation:true 之后，可以转换被字符串模板嵌套的字符串表达式
    //     })
    //   ]
    // }
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },

    configure(config, { paths } = {}) {
      const IS_PROD = process.env.REACT_APP_BUILD_ENV === 'prod';

      // 生成环境更改静态资源路径
      if (process.env.NODE_ENV === 'production') {
        if (config.output) {
          paths!.appBuild = 'dist';
          config.output.path = path.resolve(__dirname, 'dist'); // 打包路径为dist目录
          // console.log('[][[][][][][][]', config.output);
          // 发布正式环境，静态资源路径改为cdn地址
          // const { publicPath } = config.output;
          // if (IS_PROD && typeof publicPath === 'string' && !/\/\//.test(publicPath)) {
          // }
        }
      }

      return config;
    }
  },

  babel: {
    plugins: [
      // { plugin: CracoLessPlugin },
      // styled-components 插件，可以通过 class 观察到组件名称
      // https://styled-components.com/docs/tooling#better-debugging
      ['babel-plugin-styled-components', { displayName: true }]
    ]
  }
};

export default cracoConfig;
