const { path } = require("@vuepress/utils");

const fooTheme = {
  name: "vuepress-theme-foo",
  // 继承默认主题
  extends: "@vuepress/theme-default",

  layouts: {
    Layout: path.resolve(__dirname, "layouts/Layout.vue"),
    404: path.resolve(__dirname, "layouts/404.vue"),
  },
};

export default fooTheme;
