import{_ as o,c as e,o as c,U as d}from"./chunks/framework.a73c7ff7.js";const h=JSON.parse('{"title":"项目结构简介","description":"","frontmatter":{},"headers":[],"relativePath":"zh/develop/structure.md","filePath":"zh/develop/structure.md"}'),i={name:"zh/develop/structure.md"},l=d('<h1 id="项目结构简介" tabindex="-1">项目结构简介 <a class="header-anchor" href="#项目结构简介" aria-label="Permalink to &quot;项目结构简介&quot;">​</a></h1><p>static-php-cli 主要包含三种逻辑组件：资源、依赖库、扩展。这三种组件也对应了三个配置文件：<code>source.json</code>、<code>lib.json</code>、<code>ext.json</code>。</p><p>一个完整的构建静态 PHP 流程是：</p><ol><li>使用资源下载模块 <code>Downloader</code> 下载指定或所有资源，这些资源包含 PHP 源码、依赖库源码、扩展源码。</li><li>使用资源解压模块 <code>SourceExtractor</code> 解压下载的资源到编译目录。</li><li>使用依赖工具计算出当前加入的扩展的依赖扩展、依赖库，然后对每个需要编译的依赖库进行编译，按照依赖顺序。</li><li>使用对应操作系统下的 <code>Builder</code> 构建每个依赖库后，将其安装到 <code>buildroot</code> 目录。</li><li>如果包含外部扩展（源码没有包含在 PHP 内的扩展），将外部扩展拷贝到 <code>source/php-src/ext/</code> 目录。</li><li>使用 <code>Builder</code> 构建 PHP 源码，将其安装到 <code>buildroot</code> 目录。</li></ol><p>项目主要分为几个文件夹：</p><ul><li><code>bin/</code>: 用于存放程序入口文件，包含 <code>bin/spc</code>、<code>bin/spc-alpine-docker</code>、<code>bin/setup-runtime</code>。</li><li><code>config/</code>: 包含了所有项目支持的扩展、依赖库以及这些资源下载的地址、下载方式等，分为三个文件：<code>lib.json</code>、<code>ext.json</code>、<code>source.json</code>。</li><li><code>src/SPC/</code>: 项目的核心代码，包含了整个框架以及编译各种扩展和库的命令。</li><li><code>src/globals/</code>: 项目的全局方法和常量、运行时需要的测试文件（例如：扩展的可用性检查代码）。</li><li><code>vendor/</code>: Composer 依赖的目录，你无需对它做出任何修改。</li></ul><p>其中运行原理就是启动一个 <code>symfony/console</code> 的 <code>ConsoleApplication</code>，然后解析用户在终端输入的命令。</p><h2 id="基本命令行结构" tabindex="-1">基本命令行结构 <a class="header-anchor" href="#基本命令行结构" aria-label="Permalink to &quot;基本命令行结构&quot;">​</a></h2><p><code>bin/spc</code> 是一个 PHP 代码入口文件，包含了 Unix 通用的 <code>#!/usr/bin/env php</code> 用来让系统自动以系统安装好的 PHP 解释器执行。 在项目执行了 <code>new ConsoleApplication()</code> 后，框架会自动使用反射的方式，解析 <code>src/SPC/command</code> 目录下的所有类，并将其注册成为命令。</p><p>项目并没有直接使用 Symfony 推荐的 Command 注册方式和命令执行方式，这里做出了一点小变动：</p><ol><li>每个命令都使用 <code>#[AsCommand()]</code> Attribute 来注册名称和简介。</li><li>将 <code>execute()</code> 抽象化，让所有命令基于 <code>BaseCommand</code>（它基于 <code>Symfony\\Component\\Console\\Command\\Command</code>），每个命令本身的执行代码写到了 <code>handle()</code> 方法中。</li><li><code>BaseCommand</code> 添加了变量 <code>$no_motd</code>，用于是否在该命令执行时显示 Figlet 欢迎词。</li><li><code>BaseCommand</code> 将 <code>InputInterface</code> 和 <code>OutputInterface</code> 保存为成员变量，你可以在命令的类内使用 <code>$this-&gt;input</code> 和 <code>$this-&gt;output</code>。</li></ol><h2 id="基本源码结构" tabindex="-1">基本源码结构 <a class="header-anchor" href="#基本源码结构" aria-label="Permalink to &quot;基本源码结构&quot;">​</a></h2><p>项目的源码位于 <code>src/SPC</code> 目录，支持 PSR-4 标准的自动加载，包含以下子目录和类：</p><ul><li><code>src/SPC/builder/</code>: 用于不同操作系统下构建依赖库、PHP 及相关扩展的核心编译命令代码，还包含了一些编译的系统工具方法。</li><li><code>src/SPC/command/</code>: 项目的所有命令都在这里。</li><li><code>src/SPC/doctor/</code>: Doctor 模块，它是一个较为独立的用于检查系统环境的模块，可使用命令 <code>bin/spc doctor</code> 进入。</li><li><code>src/SPC/exception/</code>: 异常类。</li><li><code>src/SPC/store/</code>: 有关存储、文件和资源的类都在这里。</li><li><code>src/SPC/util/</code>: 一些可以复用的工具方法都在这里。</li><li><code>src/SPC/ConsoleApplication.php</code>: 命令行程序入口文件。</li></ul><p>如果你阅读过源码，你可能会发现还有一个 <code>src/globals/</code> 目录，它是用于存放一些全局变量、全局方法、构建过程中依赖的非 PSR-4 标准的 PHP 源码，例如测试扩展代码等。</p>',15),t=[l];function r(a,n,s,p,u,m){return c(),e("div",null,t)}const _=o(i,[["render",r]]);export{h as __pageData,_ as default};
