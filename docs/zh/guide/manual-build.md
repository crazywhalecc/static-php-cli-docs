# 本地构建

## 环境准备

目前支持在 macOS、Linux 上构建，macOS 支持最新版操作系统和两种架构，Linux 支持 Debian 及衍生发行版、Alpine Linux。

因为本项目本身采用 PHP 开发，所以在编译时也需要系统安装 PHP。本项目本身也提供了适用于本项目的静态二进制 php，可以根据实际情况自行选择使用。

### 下载本项目

```bash
git clone https://github.com/crazywhalecc/static-php-cli.git --depth=1
cd static-php-cli

# 你需要先安装 PHP 环境后再运行 Composer 和本项目，安装方式可参考下面。
composer update
```

### 使用系统 PHP 环境

下面是系统安装 PHP、Composer 的一些示例命令。具体安装方式建议自行搜索或询问 AI 搜索引擎获取答案，这里不多赘述。

```bash
# [macOS], 需要先安装 Homebrew. See https://brew.sh/
# Remember change your composer executable path. For M1/M2 Chip mac, "/opt/homebrew/bin/", for Intel mac, "/usr/local/bin/". Or add it to your own path.
brew install php wget
wget https://getcomposer.org/download/latest-stable/composer.phar -O /path/to/your/bin/composer && chmod +x /path/to/your/bin/composer

# [Debian], you need to make sure your php version >= 8.0 and composer >= 2.0
sudo apt install php-cli composer php-tokenizer

# [Alpine]
apk add bash file wget xz php81 php81-common php81-pcntl php81-tokenizer php81-phar php81-posix php81-xml composer
```

::: tip
目前 Ubuntu 部分版本的 apt 安装的 php 版本较旧，故不提供安装命令。如有需要，建议先添加 ppa 等软件源后，安装最新版的 PHP 以及 tokenizer、xml、phar 扩展。

较老版本的 Debian 默认安装的可能为旧版本（<= 7.4）版本的 PHP，建议先升级 Debian。
:::

### 使用 Docker 环境

如果你不愿意在系统安装 PHP 和 Composer 运行环境，可以使用内置的 Docker 环境构建脚本。

```bash
# 直接使用，将所有使用的命令中 `bin/spc` 替换为 `bin/spc-alpine-docker` 即可
bin/spc-alpine-docker
```

首次执行命令会使用 `docker build` 构建一个 Docker 镜像，默认构建的 Docker 镜像为 `x86_64` 架构，镜像名称为 `cwcc-spc-x86_64`。

如果你想在 `x86_64` 环境下构建 `aarch64` 的 static-php-cli，可以使用 qemu 模拟 arm 镜像运行 Docker，但速度会非常慢。使用参数：`SPC_USE_ARCH=aarch64 bin/spc-alpine-docker`。

如果运行后提示需要 sudo 才能运行，执行一次以下命令可授予 static-php-cli 执行 sudo 的权限：

```bash
export SPC_USE_SUDO=yes
```

### 使用预编译静态 PHP 二进制

如果你不想使用 Docker、在系统内安装 PHP，可以直接下载本项目自身编译好的 php 二进制 cli 程序。使用流程如下：

使用命令部署环境，此脚本会从 [自托管的服务器](https://dl.zhamao.xin/static-php-cli/) 下载一个当前操作系统的 php-cli 包，
并从 [getcomposer](https://getcomposer.org/download/latest-stable/composer.phar) 或 [Aliyun（镜像）](https://mirrors.aliyun.com/composer/composer.phar) 下载 Composer。

```bash
bin/setup-runtime

# 对于中国大陆地区等网络环境特殊的用户，可使用镜像站加快下载速度
bin/setup-runtime --mirror china
```

此脚本总共会下载两个文件：`bin/php` 和 `bin/composer`，下载完成后，有两种使用方式：

1. 将 `bin/` 目录添加到 PATH 路径中：`export PATH="/path/to/your/static-php-cli/bin:$PATH"`，添加路径后，相当于系统安装了 PHP，可直接使用 `composer`、`php -v` 等命令，也可以直接使用 `bin/spc`。
2. 直接调用，比如执行 static-php-cli 命令：`bin/php bin/spc --help`，执行 Composer：`bin/php bin/composer update`。

## 命令 download - 下载依赖包

使用命令 `bin/spc download` 可以下载编译需要的源代码，包括 php-src 以及依赖的各种库的源码。

```bash
# 下载所有依赖包
bin/spc download --all

# 下载所有依赖包，并指定下载的 PHP 主版本，可选：8.0，8.1，8.2
bin/spc download --all --with-php=8.2

# 下载时显示下载进度条（curl）
bin/spc download --all --debug

# 删除旧的下载数据
bin/spc download --clean
```

如果你所在地区的网络不好，或者下载依赖包速度过于缓慢，可以从 GitHub Action 下载每周定时打包的 `download.zip`，并使用命令直接使用 zip 压缩包作为依赖。
依赖包可以从 [Action](https://github.com/crazywhalecc/static-php-cli/actions/workflows/download-cache.yml) 下载到本地。
进入 Action 并选择一个最新成功运行的 Workflow，下载 `download-files-x.y` 即可。

```bash
bin/spc download --from-zip=/path/to/your/download.zip
```

如果某个 source 始终无法下载，或者你需要下载一些特定版本的包，例如下载测试版 PHP、旧版本库等，可以使用参数 `-U` 或 `--custom-url` 重写下载链接，
让下载器强制使用你指定的链接下载此 source 的包。使用方法为 `{source-name}:{url}` 即可，可同时重写多个库的下载地址。

```bash
# 例如：指定下载测试版的 PHP8.3
bin/spc download --all -U "php-src:https://downloads.php.net/~eric/php-8.3.0beta1.tar.gz"

# 指定下载旧版本的 curl 库
bin/spc download --all -U "curl:https://curl.se/download/curl-7.88.1.tar.gz"
```

## 命令 doctor - 环境检查

如果你可以正常运行 `bin/spc` 但无法正常编译静态的 PHP 或依赖库，可以先运行 `bin/spc doctor` 检查系统自身是否缺少依赖。

```bash
# 快速检查
bin/spc doctor

# 快速检查，并在可以自动修复的时候修复（使用包管理安装依赖包，仅支持上述提到的操作系统及发行版）
bin/spc doctor --auto-fix
```

## 命令 build - 编译 PHP

使用 build 命令可以开始构建静态 php 二进制，在执行 `bin/spc build` 命令前，务必先使用 `download` 命令下载资源，建议使用 `doctor` 检查环境。

### 基本用法

你需要先到 [扩展列表](./extensions) 或 [命令生成器](./cli-generator) 选择你要加入的扩展，然后使用命令 `bin/spc build` 进行编译。你需要指定一个编译目标，从如下参数中选择：

- `--build-cli`: 构建一个 cli sapi（命令行界面，可在命令行执行 PHP 代码）
- `--build-fpm`: 构建一个 fpm sapi（php-fpm，用于和其他传统的 fpm 架构的软件如 nginx 配合使用）
- `--build-micro`: 构建一个 micro sapi（用于构建一个包含 PHP 代码的独立可执行二进制）
- `--build-all`: 构建以上所有 sapi

```bash
# 编译 PHP，附带 bcmath,curl,openssl,ftp,posix,pcntl 扩展，编译目标为 cli
bin/spc build bcmath,curl,openssl,ftp,posix,pcntl --build-cli

# 编译 PHP，附带 phar,curl,posix,pcntl,tokenizer 扩展，编译目标为 micro
bin/spc build phar,curl,posix,pcntl,tokenizer --build-micro
```

### 调试

如果你在编译过程中遇到了问题，或者想查看每个执行的 shell 命令，可以使用 `--debug` 开启 debug 模式，查看所有终端日志：

```bash
bin/spc build mysqlnd,pdo_mysql --build-all --debug
```

### 编译运行选项

在编译过程中，有些特殊情况需要对编译器、编译目录的内容进行干预，可以尝试使用以下命令：

- `--cc=XXX`: 指定 C 语言编译器的执行命令（Linux 默认 `musl-gcc` 或 `gcc`，macOS 默认 `clang`）
- `--cxx=XXX`: 指定 C++ 语言编译器的执行命令（Linux 默认 `g++`，macOS 默认 `clang++`）
- `--with-clean`: 编译 PHP 前先清理旧的 make 产生的文件
- `--enable-zts`: 让编译的 PHP 为线程安全版本（默认为 NTS 版本）
- `--no-strip`: 编译 PHP 库后不运行 `strip` 裁剪二进制文件缩小体积（不裁剪的 macOS 二进制文件可使用动态链接的第三方扩展）
- `--with-libs=XXX,YYY`: 编译 PHP 前先编译指定的依赖库，激活部分扩展的可选功能（例如 gd 库的 libavif 等）
- `-I xxx=yyy`: 编译前将 INI 选项硬编译到 PHP 内（支持多个选项，别名是 `--with-hardcoded-ini`）

有关硬编码 INI 选项，下面是一个简单的例子，我们预设一个更大的 `memory_limit`，并且禁用 `system` 函数：

```bash
bin/spc build bcmath,pcntl,posix --build-all -I "memory_limit=4G" -I "disable_functions=system"
```

## 命令 micro:combine - 打包 micro 二进制

使用 `micro:combine` 命令可以将上面编译好的 `micro.sfx` 和你的代码（`.php` 或 `.phar` 文件）构建为一个可执行二进制。
你也可以使用该命令直接构建一个注入了 ini 配置的 micro 自执行二进制文件。

::: tip
注入 ini 配置指的是，在将 micro.sfx 和 PHP 源码结合前，在 micro.sfx 后追加一段特殊的结构用于保存 ini 配置项。

micro.sfx 可通过特殊的字节来标识 INI 文件头，通过 INI 文件头可以实现 micro 带 INI 启动。

此特性的原说明地址在 [phpmicro - Wiki](https://github.com/easysoft/phpmicro/wiki/INI-settings)，这个特性也有可能在未来发生变化。
:::

下面是常规用法，直接打包 php 源码到一个文件中：

```bash
# 在做打包流程前，你应该先使用 `build --build-micro` 编译好 micro.sfx
echo "<?php echo 'hello';" > a.php
bin/spc micro:combine a.php

# 使用
./my-app
```

你可以使用以下参数指定要输出的文件名，你也可以指定其他路径的 micro.sfx 进行打包。

```bash
# 指定输出文件名
bin/spc micro:combine a.php --output=custom-bin
# 使用绝对路径，也可以使用简化参数名
bin/spc micro:combine a.php -O /tmp/my-custom-app

# 指定其他位置的 micro.sfx 进行打包
bin/spc micro:combine a.app --with-micro=/path/to/your/micro.sfx
```

如果想注入 ini 配置项，可以使用下面的参数，从文件或命令行选项添加 ini 到可执行文件中。

```bash
# 使用命令行选项指定（-I 是 --with-ini-set 的简写）
bin/spc micro:combine a.php -I "a=b" -I "foo=bar"

# 使用 ini 文件指定（-N 是 --with-ini-file 的简写）
bin/spc micro:combine a.php -N /path/to/your/custom.ini
```

::: warning
注意，请不要直接使用 PHP 源码或系统安装的 PHP 中的 `php.ini` 文件，最好手动编写一个自己需要的参数配置文件，例如：

```ini
; custom.ini
curl.cainfo=/path/to/your/cafile.pem
memory_limit=1G
```
:::

## 命令 extract - 手动解压某个库

使用命令 `bin/spc extract` 可以解包和拷贝编译需要的源代码，包括 php-src 以及依赖的各种库的源码（需要自己指定要解包的库名）。

例如，我们在下载好资源后，想分布执行构建流程，手动解包和拷贝包到指定位置，可以使用命令。

```bash
# 解压 php-src 和 libxml2 的下载压缩包，解压的源码存放在 source 目录
bin/spc extract php-src,libxml2
```

## 调试命令 dev - 调试命令集合

调试命令指的是你在使用 static-php-cli 构建 PHP 或改造、增强 static-php-cli 项目本身的时候，可以辅助输出一些信息的命令集合。

- `dev:ext-all`: 输出目前所有支持的扩展名称
- `dev:ext-info`: 输出一个或多个扩展的元信息
- `dev:php-ver`: 输出当前编译的 PHP 版本（通过读取 `php_version.h` 实现）

```bash
# 输出所有扩展
bin/spc dev:ext-all

# 输出多个扩展元信息
bin/spc dev:ext-info mongodb,pgsql,pcntl

# 输出当前编译的 PHP 版本（需要先将下载好的 PHP 源码解压到 source 目录，你可以使用 `bin/spc extract php-src` 单独解压缩源码）
bin/spc dev:php-ver
```
