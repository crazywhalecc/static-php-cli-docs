import {defineConfig} from 'vitepress'
import sidebarEn from "./sidebar.en";
import sidebarZh from "./sidebar.zh";


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "static-php-cli",
  description: "Build single static PHP binary, with PHP project together, with popular extensions included.",
  head: [
    ['script', {}, `
          var _hmt = _hmt || [];
  (function () {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?757c7c9ca14aba4044681f509e90cd65";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
  })();
      `]
  ],
  locales: {
    en: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          {text: 'Guide', link: '/en/guide/',},
          {text: 'Developing', link: '/en/develop/'},
          {text: 'contributing', link: '/en/contributing/'},
          {text: 'FAQ', link: '/en/faq/'},
        ],
        sidebar: sidebarEn,
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh', // optional, will be added  as `lang` attribute on `html` tag
      themeConfig: {
        nav: [
          {text: '构建指南', link: '/zh/guide/'},
          {text: '开发指南', link: '/zh/develop/'},
          {text: '贡献', link: '/zh/contributing/'},
          {text: 'FAQ', link: '/zh/faq/'},
        ],
        sidebar: sidebarZh,
      },
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [],
    socialLinks: [
      {icon: 'github', link: 'https://github.com/crazywhalecc/static-php-cli'}
    ]
  }
})
