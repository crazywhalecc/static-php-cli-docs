# 项目结构简介

static-php-cli 主要包含三种逻辑组件：资源、依赖库、扩展。这三种组件也对应了三个配置文件：`source.json`、`lib.json`、`ext.json`。

一个完整的构建静态 PHP 流程是：

1. 使用资源下载模块 `Downloader` 下载指定或所有资源，这些资源包含 PHP 源码、依赖库源码、扩展源码。
2. 使用资源解压模块 `SourceExtractor` 解压下载的资源到编译目录。
3. 使用依赖工具计算出当前加入的扩展的依赖扩展、依赖库，然后对每个需要编译的依赖库进行编译，按照依赖顺序。
4. 使用对应操作系统下的 `Builder` 构建每个依赖库后，将其安装到 `buildroot` 目录。
5. 如果包含外部扩展（源码没有包含在 PHP 内的扩展），将外部扩展拷贝到 `source/php-src/ext/` 目录。
6. 使用 `Builder` 构建 PHP 源码，将其安装到 `buildroot` 目录。

项目主要分为几个文件夹：

- `bin/`: 用于存放程序入口文件，包含 `bin/spc`、`bin/spc-alpine-docker`、`bin/setup-runtime`。
- `config/`: 包含了所有项目支持的扩展、依赖库以及这些资源下载的地址、下载方式等，分为三个文件：`lib.json`、`ext.json`、`source.json`。
- `src/SPC/`: 项目的核心代码，包含了整个框架以及编译各种扩展和库的命令。
- `src/globals/`: 项目的全局方法和常量、运行时需要的测试文件（例如：扩展的可用性检查代码）。
- `vendor/`: Composer 依赖的目录，你无需对它做出任何修改。

其中运行原理就是启动一个 `symfony/console` 的 `ConsoleApplication`，然后解析用户在终端输入的命令。

## 基本命令行结构

`bin/spc` 是一个 PHP 代码入口文件，包含了 Unix 通用的 `#!/usr/bin/env php` 用来让系统自动以系统安装好的 PHP 解释器执行。
在项目执行了 `new ConsoleApplication()` 后，框架会自动使用反射的方式，解析 `src/SPC/command` 目录下的所有类，并将其注册成为命令。

项目并没有直接使用 Symfony 推荐的 Command 注册方式和命令执行方式，这里做出了一点小变动：

1. 每个命令都使用 `#[AsCommand()]` Attribute 来注册名称和简介。
2. 将 `execute()` 抽象化，让所有命令基于 `BaseCommand`（它基于 `Symfony\Component\Console\Command\Command`），每个命令本身的执行代码写到了 `handle()` 方法中。
3. `BaseCommand` 添加了变量 `$no_motd`，用于是否在该命令执行时显示 Figlet 欢迎词。
4. `BaseCommand` 将 `InputInterface` 和 `OutputInterface` 保存为成员变量，你可以在命令的类内使用 `$this->input` 和 `$this->output`。

## 基本源码结构

项目的源码位于 `src/SPC` 目录，支持 PSR-4 标准的自动加载，包含以下子目录和类：

- `src/SPC/builder/`: 用于不同操作系统下构建依赖库、PHP 及相关扩展的核心编译命令代码，还包含了一些编译的系统工具方法。
- `src/SPC/command/`: 项目的所有命令都在这里。
- `src/SPC/doctor/`: Doctor 模块，它是一个较为独立的用于检查系统环境的模块，可使用命令 `bin/spc doctor` 进入。
- `src/SPC/exception/`: 异常类。
- `src/SPC/store/`: 有关存储、文件和资源的类都在这里。
- `src/SPC/util/`: 一些可以复用的工具方法都在这里。
- `src/SPC/ConsoleApplication.php`: 命令行程序入口文件。

如果你阅读过源码，你可能会发现还有一个 `src/globals/` 目录，它是用于存放一些全局变量、全局方法、构建过程中依赖的非 PSR-4 标准的 PHP 源码，例如测试扩展代码等。
