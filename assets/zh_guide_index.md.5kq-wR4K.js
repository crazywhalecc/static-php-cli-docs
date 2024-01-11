import{_ as t,c as a,o as e,U as d}from"./chunks/framework.GQ61FypF.js";const m=JSON.parse('{"title":"指南","description":"","frontmatter":{},"headers":[],"relativePath":"zh/guide/index.md","filePath":"zh/guide/index.md"}'),i={name:"zh/guide/index.md"},r=d('<h1 id="指南" tabindex="-1">指南 <a class="header-anchor" href="#指南" aria-label="Permalink to &quot;指南&quot;">​</a></h1><p>static-php-cli 是一个用于构建静态编译的 PHP 二进制的工具，目前支持 Linux 和 macOS 系统。</p><p>在指南章节中，你将了解到如何使用 static-php-cli 构建独立的 php 程序。</p><ul><li><a href="./action-build.html">Action 构建</a></li><li><a href="./manual-build.html">本地构建</a></li><li><a href="./extensions.html">扩展列表</a></li></ul><h2 id="编译环境" tabindex="-1">编译环境 <a class="header-anchor" href="#编译环境" aria-label="Permalink to &quot;编译环境&quot;">​</a></h2><p>下面是架构支持情况，⚙️ 代表支持 GitHub Action 构建，💻 代表支持本地构建，空 代表暂不支持。</p><table><thead><tr><th></th><th>x86_64</th><th>aarch64</th></tr></thead><tbody><tr><td>macOS</td><td>⚙️ 💻</td><td>💻</td></tr><tr><td>Linux</td><td>⚙️ 💻</td><td>⚙️ 💻</td></tr><tr><td>Windows</td><td>💻</td><td></td></tr><tr><td>FreeBSD</td><td>💻</td><td>💻</td></tr></tbody></table><p>其中，Linux 目前仅在 Ubuntu、Debian、Alpine 发行版测试通过，其他发行版未进行测试，不能保证编译成功。 对于未经过测试的发行版，可以使用 Docker 等方式本地编译，避免环境导致的问题。</p><p>macOS 下支持 x86_64 和 Arm 两种架构，但在其中一个架构上编译的二进制无法直接在另一个架构上使用。 Rosetta 2 不能保证 Arm 架构编译的程序可以完全运行在 x86_64 环境下。</p><p>Windows 目前只支持 x86_64 架构，不支持 32 位 x86、不支持 arm64 架构。</p><h2 id="php-支持版本" tabindex="-1">PHP 支持版本 <a class="header-anchor" href="#php-支持版本" aria-label="Permalink to &quot;PHP 支持版本&quot;">​</a></h2><p>目前，static-php-cli 对 PHP 7.4 ~ 8.3 版本是支持的，对于 PHP 7.4 及更早版本理论上支持，只需下载时选择早期版本即可。 但由于部分扩展和特殊组件已对早期版本的 PHP 停止了支持，所以 static-php-cli 不会明确支持早期版本。 我们推荐你编译尽可能新的 PHP 版本，以获得更好的体验。</p>',12),h=[r];function n(o,l,c,p,s,_){return e(),a("div",null,h)}const P=t(i,[["render",n]]);export{m as __pageData,P as default};
