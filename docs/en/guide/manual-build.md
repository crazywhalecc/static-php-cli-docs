# Manual Build

## Environment Preparation

Currently, it supports building on macOS and Linux. 
macOS supports the latest version of the operating system and two architectures, 
while Linux supports Debian and derivative distributions, as well as Alpine Linux.

Because this project itself is developed using PHP, 
it is also necessary to install PHP on the system during compilation. 
This project also provides static binary PHP suitable for this project, 
which can be selected and used according to actual situations.

### Download

```bash
git clone https://github.com/crazywhalecc/static-php-cli.git --depth=1
cd static-php-cli

# You need to install the PHP environment first before running Composer and this project. The installation method can be referred to below.
composer update
```

### Use System PHP

Below are some example commands for installing PHP and Composer in the system. 
It is recommended to search for the specific installation method yourself or ask the AI search engine to obtain the answer, 
which will not be elaborated here.

```bash
# [macOS], need install Homebrew first. See https://brew.sh/
# Remember change your composer executable path. For M1/M2 Chip mac, "/opt/homebrew/bin/", for Intel mac, "/usr/local/bin/". Or add it to your own path.
brew install php wget
wget https://getcomposer.org/download/latest-stable/composer.phar -O /path/to/your/bin/composer && chmod +x /path/to/your/bin/composer

# [Debian], you need to make sure your php version >= 8.0 and composer >= 2.0
sudo apt install php-cli composer php-tokenizer

# [Alpine]
apk add bash file wget xz php81 php81-common php81-pcntl php81-tokenizer php81-phar php81-posix php81-xml composer
```

::: tip
Currently, some versions of Ubuntu install older PHP versions, 
so no installation commands are provided. If necessary, it is recommended to add software sources such as ppa first, 
and then install the latest version of PHP and tokenizer, XML, and phar extensions.

Older versions of Debian may have an older (<= 7.4) version of PHP installed by default, it is recommended to upgrade Debian first.
:::

### Use Docker

If you don't want to install PHP and Composer runtime environment on your system, you can use the built-in Docker environment build script.

```bash
# To use directly, replace `bin/spc` with `bin/spc-alpine-docker` in all used commands
bin/spc-alpine-docker
```

The first time the command is executed, `docker build` will be used to build a Docker image. 
The default built Docker image is the `x86_64` architecture, and the image name is `cwcc-spc-x86_64`.

If you want to build `aarch64` static-php-cli in `x86_64` environment, 
you can use qemu to emulate the arm image to run Docker, but the speed will be very slow.
Use command: `SPC_USE_ARCH=aarch64 bin/spc-alpine-docker`.

If it prompts that sudo is required to run after running, 
execute the following command once to grant static-php-cli permission to execute sudo:

```bash
export SPC_USE_SUDO=yes
```

### Use Precompiled Static PHP Binaries

If you don't want to use Docker and install PHP in the system, 
you can directly download the php binary cli program compiled by this project itself. The usage process is as follows:

Deploy the environment using the command, the command will download a static php-cli binary from [self-hosted server](https://dl.zhamao.xin/static-php-cli/).
Next, it will automatically download Composer from [getcomposer](https://getcomposer.org/download/latest-stable/composer.phar) or [Aliyun mirror](https://mirrors.aliyun.com/composer/composer.phar).

```bash
bin/setup-runtime

# For users with special network environments such as mainland China, you can use mirror sites (aliyun) to speed up the download speed
bin/setup-runtime --mirror china
```

This script will download two files in total: `bin/php` and `bin/composer`. After the download is complete, there are two ways to use it:

1. Add the `bin/` directory to the PATH: `export PATH="/path/to/your/static-php-cli/bin:$PATH"`, after adding the path, 
it is equivalent to installing PHP in the system, you can directly Use commands such as `composer`, `php -v`, or directly use `bin/spc`.
2. Direct call, such as executing static-php-cli command: `bin/php bin/spc --help`, executing Composer: `bin/php bin/composer update`.

## Command - download

Use the command `bin/spc download` to download the source code required for compilation, 
including php-src and the source code of various dependent libraries.

```bash
# Download all dependencies
bin/spc download --all

# Download all dependent packages, and specify the main version of PHP to download, optional: 8.0, 8.1, 8.2
bin/spc download --all --with-php=8.2

# Show download progress bar while downloading (curl)
bin/spc download --all --debug

# Delete old download data
bin/spc download --clean
```

If the network in your area is not good, or the speed of downloading the dependency package is too slow, 
you can download `download.zip` which is packaged regularly every week from GitHub Action, 
and use the command to directly use the zip archive as a dependency.


Dependent packages can be downloaded locally from [Action](https://github.com/crazywhalecc/static-php-cli/actions/workflows/download-cache.yml).
Enter Action and select a latest Workflow that has been successfully run, and download `download-files-x.y`.

```bash
bin/spc download --from-zip=/path/to/your/download.zip
```

## Command - doctor

If you can run `bin/spc` normally but cannot compile static PHP or dependent libraries normally, 
you can run `bin/spc doctor` first to check whether the system itself lacks dependencies.

```bash
# Quick check
bin/spc doctor

# Quickly check and fix when it can be automatically repaired (use package management to install dependent packages, only support the above-mentioned operating systems and distributions)
bin/spc doctor --auto-fix
```

## Command - build

Use the build command to start building the static php binary. 
Before executing the `bin/spc build` command, be sure to use the `download` command to download resources. 
It is recommended to use `doctor` to check the environment.

### Basic build

You need to go to [Extension List](./extensions) or [Command Generator](./cli-generator) to select the extension you want to add, 
and then use the command `bin/spc build` to compile. 
You need to specify a compilation target, choose from the following parameters:

- `--build-cli`: Build a cli sapi (command line interface, which can execute PHP code on the command line)
- `--build-fpm`: Build a fpm sapi (php-fpm, used in conjunction with other traditional fpm architecture software such as nginx)
- `--build-micro`: Build a micro sapi (used to build a standalone executable binary containing PHP code)
- `--build-all`: build all above sapi

```bash
# Compile PHP with bcmath,curl,openssl,ftp,posix,pcntl extensions, the compilation target is cli
bin/spc build bcmath,curl,openssl,ftp,posix,pcntl --build-cli

# Compile PHP with phar,curl,posix,pcntl,tokenizer extensions, compile target is micro
bin/spc build phar,curl,posix,pcntl,tokenizer --build-micro
```

### Debug

If you encounter problems during the compilation process, or want to view each executing shell command, 
you can use `--debug` to enable debug mode and view all terminal logs:

```bash
bin/spc build mysqlnd,pdo_mysql --build-all --debug
```

### Build Options

During the compilation process, in some special cases, 
the compiler and the content of the compilation directory need to be intervened. 
You can try to use the following commands:

- `--cc=XXX`: Specifies the execution command of the C language compiler (Linux default `musl-gcc` or `gcc`, macOS default `clang`)
- `--cxx=XXX`: Specifies the execution command of the C++ language compiler (Linux defaults to `g++`, macOS defaults to `clang++`)
- `--with-clean`: clean up old make files before compiling PHP
- `--enable-zts`: Make compiled PHP thread-safe version (default is NTS version)
- `--no-strip`: Do not run `strip` after compiling the PHP library to trim the binary file to reduce its size (the macOS binary file without trim can use dynamically linked third-party extensions)
- `--with-libs=XXX,YYY`: Compile the specified dependent library before compiling PHP, and activate some extended optional functions (such as libavif of the gd library, etc.)
