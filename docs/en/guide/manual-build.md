# Manual Build (Linux, macOS, FreeBSD)

This chapter covers the build process for Linux, macOS, and FreeBSD. If you want to build on Windows, 
please go to [Build on Windows](./build-on-windows).

### Manual build (using SPC binary)

This project provides a binary file of static-php-cli.
You can directly download the binary file of the corresponding platform and then use it to build static PHP.
Currently, the platforms supported by `spc` binary are Linux and macOS.

Here's how to download from GitHub Actions:

1. Enter [GitHub Actions](https://github.com/crazywhalecc/static-php-cli/actions/workflows/release-build.yml).
2. Select the latest build task, select `Artifacts`, and download the binary file of the corresponding platform.
3. Unzip the `.zip` file. After decompressing, add execution permissions to it: `chmod +x ./spc`.

You can also download binaries from a self-hosted server: [enter](https://dl.static-php.dev/static-php-cli/spc-bin/nightly/).

### Manual build (using source code)

Currently, it supports building on macOS and Linux. 
macOS supports the latest version of the operating system and two architectures, 
while Linux supports Debian and derivative distributions, as well as Alpine Linux.

Because this project itself is developed using PHP, 
it is also necessary to install PHP on the system during compilation. 
This project also provides static binary PHP suitable for this project, 
which can be selected and used according to actual situations.

```bash
# clone repo
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

# [Debian], you need to make sure your php version >= 8.1 and composer >= 2.0
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

::: tip
Using precompiled static PHP binaries is currently only supported on Linux and macOS.
The FreeBSD environment is currently not supported due to the lack of an automated build environment.
:::

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

# Download all dependent packages, and specify the main version of PHP to download, optional: 7.3, 7.4, 8.0, 8.1, 8.2, 8.3
bin/spc download --all --with-php=8.2

# Show download progress bar while downloading (curl)
bin/spc download --all --debug

# Delete old download data
bin/spc download --clean

# Download specified dependencies
bin/spc download php-src,micro,zstd,ext-zstd

# Download only extensions and libraries to be compiled (use extensions, including suggested libraries)
bin/spc download --for-extensions=openssl,swoole,zip,pcntl,zstd

# Download only the extensions and dependent libraries to be compiled (use extensions, excluding suggested libraries)
bin/spc download --for-extensions=openssl,swoole,zip,pcntl --without-suggestions
```

If the network in your area is not good, or the speed of downloading the dependency package is too slow, 
you can download `download.zip` which is packaged regularly every week from GitHub Action, 
and use the command to directly use the zip archive as a dependency.

Dependent packages can be downloaded locally from [Action](https://github.com/crazywhalecc/static-php-cli/actions/workflows/download-cache.yml).
Enter Action and select a latest Workflow that has been successfully run, and download `download-files-x.y`.

```bash
bin/spc download --from-zip=/path/to/your/download.zip
```

If a source cannot be downloaded all the time, or you need to download some specific version of the package, 
such as downloading the beta version of PHP, the old version of the library, etc., 
you can use the parameter `-U` or `--custom-url` to rewrite the download link,
Make the downloader force the link you specify to download packages from this source. 
The method of use is `{source-name}:{url}`, which can rewrite the download URLs of multiple libraries at the same time.
Also, it is available when downloading with the `--for-extensions` option.


```bash
# Specifying to download a beta version of PHP8.3
bin/spc download --all -U "php-src:https://downloads.php.net/~eric/php-8.3.0beta1.tar.gz"

# Specifying to download an older version of the curl library
bin/spc download --all -U "curl:https://curl.se/download/curl-7.88.1.tar.gz"
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
Before executing the `bin/spc build` command, be sure to use the `download` command to download sources. 
It is recommended to use `doctor` to check the environment.

### Basic build

You need to go to [Extension List](./extensions) or [Command Generator](./cli-generator) to select the extension you want to add, 
and then use the command `bin/spc build` to compile. 
You need to specify a compilation target, choose from the following parameters:

- `--build-cli`: Build a cli sapi (command line interface, which can execute PHP code on the command line)
- `--build-fpm`: Build a fpm sapi (php-fpm, used in conjunction with other traditional fpm architecture software such as nginx)
- `--build-micro`: Build a micro sapi (used to build a standalone executable binary containing PHP code)
- `--build-embed`: Build an embed sapi (used to embed into other C language programs)
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
- `-I xxx=yyy`: Hard compile INI options into PHP before compiling (support multiple options, alias is `--with-hardcoded-ini`)
- `--with-micro-fake-cli`: When compiling micro, let micro's `PHP_SAPI` pretend to be `cli` (for compatibility with some programs that check `PHP_SAPI`)
- `--disable-opcache-jit`: Disable opcache jit (enabled by default)

For hardcoding INI options, it works for cli, micro, embed sapi. Here is a simple example where we preset a larger `memory_limit` and disable the `system` function:

```bash
bin/spc build bcmath,pcntl,posix --build-all -I "memory_limit=4G" -I "disable_functions=system"
```

## Command - micro:combine

Use the `micro:combine` command to build the compiled `micro.sfx` and your code (`.php` or `.phar` file) into an executable binary.
You can also use this command to directly build a micro binary injected with ini configuration.

::: tip
Injecting ini configuration refers to adding a special structure after micro.sfx to save ini configuration items before combining micro.sfx with PHP source code.

micro.sfx can identify the INI file header through a special byte, and the micro can be started with INI through the INI file header.

The original wiki of this feature is in [phpmicro - Wiki](https://github.com/easysoft/phpmicro/wiki/INI-settings), and this feature may change in the future.
:::

The following is the general usage, directly packaging the php source code into a file:

```bash
# Before doing the packaging process, you should use `build --build-micro` to compile micro.sfx
echo "<?php echo 'hello';" > a.php
bin/spc micro:combine a.php

# Just use it
./my-app
```

You can use the following options to specify the file name to be output, and you can also specify micro.sfx in other paths for packaging.

```bash
# specify the output filename
bin/spc micro:combine a.php --output=custom-bin
# Use absolute path
bin/spc micro:combine a.php -O /tmp/my-custom-app

# Specify micro.sfx in other locations for packaging
bin/spc micro:combine a.app --with-micro=/path/to/your/micro.sfx
```

If you want to inject ini configuration items, you can use the following parameters to add ini to the executable file from a file or command line option.

```bash
# Specified using command-line options (-I is shorthand for --with-ini-set)
bin/spc micro:combine a.php -I "a=b" -I "foo=bar"

# Use ini file specification (-N is shorthand for --with-ini-file)
bin/spc micro:combine a.php -N /path/to/your/custom.ini
```

::: warning
Note, please do not directly use the PHP source code or the `php.ini` file in the system-installed PHP, 
it is best to manually write an ini configuration file that you need, for example:

```ini
; custom.ini
curl.cainfo=/path/to/your/cafile.pem
memory_limit=1G
```

The ini injection of this command is achieved by appending a special structure after micro.sfx, 
which is different from the function of inserting hard-coded INI during compilation.
:::

## Command - extract

Use the command `bin/spc extract` to unpack and copy the source code required for compilation, 
including php-src and the source code of various dependent libraries (you need to specify the name of the library to be unpacked).

For example, after we have downloaded sources, we want to distribute and execute the build process, 
manually unpack and copy the package to a specified location, and we can use commands.

```bash
# Unzip the downloaded compressed package of php-src and libxml2, and store the decompressed source code in the source directory
bin/spc extract php-src,libxml2
```

## Dev Command - dev

Debug commands refer to a collection of commands that can assist in outputting some information 
when you use static-php-cli to build PHP or modify and enhance the static-php-cli project itself.

- `dev:extensions`: output all currently supported extension names, or output the specified extension information
- `dev:php-version`: output the currently compiled PHP version (by reading `php_version.h`)
- `dev:sort-config`: Sort the list of configuration files in the `config/` directory in alphabetical order

```bash
# output all extensions information
bin/spc dev:extensions

# Output the meta information of the specified extension
bin/spc dev:extensions mongodb,curl,openssl

# Output the specified columns
# Available column name: lib-depends, lib-suggests, ext-depends, ext-suggests, unix-only, type
bin/spc dev:extensions --columns=lib-depends,type,ext-depends

# Output the currently compiled PHP version
# You need to decompress the downloaded PHP source code to the source directory first
# You can use `bin/spc extract php-src` to decompress the source code separately
bin/spc dev:php-version

# Sort the configuration files in the config/ directory in alphabetical order (e.g. ext.json)
bin/spc dev:sort-config ext
```
