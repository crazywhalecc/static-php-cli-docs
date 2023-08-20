# 贡献指南

感谢你能够看到这里，本项目非常欢迎你的贡献！

## 贡献方法

如果你有代码或文档想要贡献，需要先了解以下内容。

1. 你要贡献什么类型的代码？（新扩展、修复 Bug、安全问题、项目框架优化、文档）
2. 如果你贡献了新文件或新片段，你的代码是否经过 `php-cs-fixer` 和 `phpstan` 的检查？
3. 你的贡献代码是否有充足的理由？
4. 你的贡献代码是否过于复杂？如果是，是否需要拆分？

如果你可以回答以上四个问题，并已经对代码做出了修改，可以及时在项目 GitHub 仓库发起 Pull Request。待代码审查完毕后，可根据建议修改代码，或直接合并到主分支。

## 贡献类型

本项目主要用途是编译静态链接的 PHP 二进制，基于 `symfony/console` 编写了命令行处理功能。在开发之前，如果你对它不够熟悉，
可以先查看 [symfony/console 文档](https://symfony.com/doc/current/components/console.html)。

### 安全问题

因为本项目基本上是属于本地运行的 PHP 项目，一般来说不会存在远程攻击行为。但如果你发现了此类问题，请**不要**在 GitHub 仓库提交 PR 或 Issue，
你需要通过 [邮件](mailto:admin@zhamao.me) 的方式联系项目维护者（crazywhalecc）。

### 修复 Bug

修复 Bug 一般不涉及项目结构和框架的修改，所以如果你可以定位到错误代码并直接修复它，请直接提交 PR。

### 新扩展

对于添加一个新扩展来说，你需要先了解一些本项目的基本结构，以及如何根据现有的逻辑添加新扩展。在本页的下一章节将会详细介绍。
总的来说，你需要：

1. 评估扩展是否可以内联编译到 PHP 中。
2. 评估扩展的依赖库（如果有）是否可以静态编译。
3. 写出扩展的依赖库在不同平台编译命令。
4. 验证扩展及其依赖库能否与现有扩展和依赖库兼容。
5. 验证扩展在 `cli`、`micro`、`fpm` 几种 SAPI 中均正常工作。
6. 编写文档，加入你的扩展。

### 项目框架优化

如果你已经熟悉 `symfony/console` 的工作原理，并同时要对项目的框架进行一些修改或优化，请先了解以下事情：

1. 加入扩展不属于项目框架优化，但如果你在加入新的扩展时发现不得不优化框架，则需先对框架本身进行修改，然后再加入扩展。
2. 对于一些大规模逻辑修改（例如涉及 LibraryBase、Extension 对象等的修改）时，建议先提交 Issue 或 Draft PR 进行讨论方案。
3. 项目早期为纯中文开发项目，代码中存在一部分中文的注释。国际化项目后你可以提交 PR 将这些注释翻译为英语。
4. 请不要在代码中提交包含较多无用的代码片段，例如大量未被使用的变量、方法、类、重复写了很多次的代码。

## 项目结构详解

项目主要分为几个文件夹：

- `bin/`: 用于存放程序入口文件，包含 `bin/spc`、`bin/spc-alpine-docker`、`bin/setup-runtime`。
- `config/`: 包含了所有项目支持的扩展、依赖库以及这些资源下载的地址、下载方式等，分为三个文件：`lib.json`、`ext.json`、`source.json`。
- `src/SPC/`: 项目的核心代码，包含了整个框架以及编译各种扩展和库的命令。
- `src/globals/`: 项目的全局方法和常量、运行时需要的测试文件（例如：扩展的可用性检查代码）。
- `vendor/`: Composer 依赖的目录，你无需对它做出任何修改。

其中运行原理就是启动一个 `symfony/console` 的 `ConsoleApplication`，然后解析用户在终端输入的命令。

### 命令行入口和命令

`bin/spc` 是一个 PHP 代码入口文件，包含了 Unix 通用的 `#!/usr/bin/env php` 用来让系统自动以系统安装好的 PHP 解释器执行。
在项目执行了 `new ConsoleApplication()` 后，框架会自动使用反射的方式，解析 `src/SPC/command` 目录下的所有类，并将其注册成为命令。

项目并没有直接使用 Symfony 推荐的 Command 注册方式和命令执行方式，这里做出了一点小变动：

1. 每个命令都使用 `#[AsCommand()]` Attribute 来注册名称和简介。
2. 将 `execute()` 抽象化，让所有命令基于 `BaseCommand`（它基于 `Symfony\Component\Console\Command\Command`），每个命令本身的执行代码写到了 `handle()` 方法中。
3. `BaseCommand` 添加了变量 `$no_motd`，用于是否在该命令执行时显示 Figlet 欢迎词。
4. `BaseCommand` 将 `InputInterface` 和 `OutputInterface` 保存为成员变量，你可以在命令的类内使用 `$this->input` 和 `$this->output`。

### Doctor 模块

Doctor 模块是一个较为独立的用于检查系统环境的模块，可使用命令 `bin/spc doctor` 进入，入口的命令类在 `DoctorCommand.php` 中。

Doctor 模块是一个检查单，里面有一系列的检查项目和自动修复项目。这些项目都存放在 `src/SPC/doctor/item/` 目录中，
并且使用了两种 Attribute 用作检查项标记和自动修复项目标记：`#[AsCheckItem]` 和 `#[AsFixItem]`。

以现有的检查项 `if necessary tools are installed`，它是用于检查编译必需的包是否安装在 macOS 系统内，下面是它的源码：

```php
use SPC\doctor\AsCheckItem;
use SPC\doctor\AsFixItem;
use SPC\doctor\CheckResult;

#[AsCheckItem('if necessary tools are installed', limit_os: 'Darwin', level: 997)]
public function checkCliTools(): ?CheckResult
{
    $missing = [];
    foreach (self::REQUIRED_COMMANDS as $cmd) {
        if ($this->findCommand($cmd) === null) {
            $missing[] = $cmd;
        }
    }
    if (!empty($missing)) {
        return CheckResult::fail('missing system commands: ' . implode(', ', $missing), 'build-tools', [$missing]);
    }
    return CheckResult::ok();
}
```

属性的第一个参数就是检查项目的名称，后面的 `limit_os` 参数是限制了该检查项仅在指定的系统下触发，`level` 是执行该检查项的优先级，数字越大，优先级越高。

里面用到的 `$this->findCommand()` 方法为 `SPC\builder\traits\UnixSystemUtilTrait` 的方法，用途是查找系统命令所在位置，找不到时返回 NULL。

每个检查项的方法都应该返回一个 `SPC\doctor\CheckResult`：

- 在返回 `CheckResult::fail()` 时，第一个参数用于输出终端的错误提示，第二个参数是在这个检查项可自动修复时的修复项目名称。
- 在返回 `CheckResult::ok()` 时，表明检查通过。你也可以传递一个参数，用于返回检查结果，例如：`CheckResult::ok('OS supported')`。
- 在返回 `CheckResult::fail()` 时，如果包含了第三个参数，第三个参数的数组将被当作 `AsFixItem` 的参数。

下面是这个检查项对应的自动修复项的方法：

```php
#[AsFixItem('build-tools')]
public function fixBuildTools(array $missing): bool
{
    foreach ($missing as $cmd) {
        try {
            shell(true)->exec('brew install ' . escapeshellarg($cmd));
        } catch (RuntimeException) {
            return false;
        }
    }
    return true;
}
```

`#[AsFixItem()]` 属性传入的参数即修复项的名称，该方法必须返回 True 或 False。当返回 False 时，表明自动修复失败，需要手动处理。

此处的代码中 `shell()->exec()` 是项目的执行命令的方法，用于替代 `exec()`、`system()`，同时提供了 debug、获取执行状态、进入目录等特性。

（正在编写，TODO）
