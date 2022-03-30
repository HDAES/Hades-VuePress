/*
 * @Author: HADES
 * @Date: 2022-03-29
 * @LastEditTime: 2022-03-29
 * @Description:
 */
import { defineUserConfig } from "vuepress";
import sidebar from "./config/sidebar";
import type { DefaultThemeOptions } from "vuepress";
import navbar from "./config/navbar";

export default defineUserConfig<DefaultThemeOptions>({
  // 站点配置
  lang: "en-US",
  title: "HDAES",
  description:
    "Expensive has never been its weakness, poor has always been your weakness.",

  // 主题和它的配置
  theme: "@vuepress/theme-default",
  themeConfig: {
    sidebar,
    logo: "https://vuejs.org/images/logo.png",

    //仓库地址
    repo: "https://github.com/HDAES/Hades-VuePress",
    navbar,
  },

  // vite打包
  bundler: "@vuepress/bundler-vite",
  //Vite 打包工具的配置项
  bundlerConfig: {},
});
