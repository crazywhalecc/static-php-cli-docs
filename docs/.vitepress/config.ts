import {defineConfig} from 'vitepress'

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
          {text: 'contributing', link: '/en/contributing/'},
          {text: 'FAQ', link: '/en/faq/'},
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Guide',
              items: [
                {text: 'Guide', link: '/en/guide/'},
                {text: 'Action Build', link: '/en/guide/action-build'},
                {text: 'Native Build', link: '/en/guide/manual-build'},
                {text: 'Extension List', link: '/en/guide/extensions'},
                {text: 'Extension Notes', link: '/en/guide/extension-notes'},
                {text: 'Command Generator', link: '/en/guide/cli-generator'},
              ]
            },
            {
              text: 'Advanced',
              items: [],
            }
          ]
        }
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh', // optional, will be added  as `lang` attribute on `html` tag
      themeConfig: {
        nav: [
          {text: '指南', link: '/zh/guide/',},
          {text: '贡献指南', link: '/zh/contributing/'},
          {text: 'FAQ', link: '/zh/faq/'},
        ],
        sidebar: {
          '/zh/guide/': [
            {
              text: '指南',
              items: [
                {text: '指南', link: '/zh/guide/'},
                {text: 'Action 构建', link: '/zh/guide/action-build'},
                {text: '本地构建', link: '/zh/guide/manual-build'},
                {text: '扩展列表', link: '/zh/guide/extensions'},
                {text: '扩展注意事项', link: '/zh/guide/extension-notes'},
                {text: '编译命令生成器', link: '/zh/guide/cli-generator'},
              ]
            },
            {
              text: '进阶',
              items: [],
            }
          ]
        }
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
