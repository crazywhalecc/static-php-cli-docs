# 扩展注意事项

因为是静态编译，扩展不会 100% 完美编译，而且不同扩展对 PHP、环境都有不同的要求，这里将一一列举。

## phpmicro

1. phpmicro SAPI 仅支持 PHP >= 8.0 版本。

## swoole

1. swoole >= 5.0 版本仅支持 PHP >= 8.0 版本。
2. swoole 在 Linux 环境中仅支持在 Alpine Linux 下编译。[#51](https://github.com/crazywhalecc/static-php-cli/issues/51)
3. swoole 目前不支持 curl 的 hook（后续有可能会修复）。

## swow

1. swow 仅支持 PHP >= 8.0 版本。

## intl

1. intl 扩展由于依赖 icu 扩展（icu 使用了部分 C++ 的库），在 Linux 环境中仅支持在 Alpine Linux 下编译，同 Swoole。

## gd

1. gd 扩展依赖了较多的额外图形库，默认情况下，直接使用 `bin/spc build gd` 不会引入和支持部分图形库，例如 `libjpeg`、`libavif` 等，
需要使用 `--with-libs` 参数补全。目前支持 `freetype,libjpeg,libavif,libwebp` 四个库的支持，所以这里可以使用以下命令来让 gd 库引入它们：

```bash
bin/spc build gd --with-libs=freetype,libjpeg,libavif,libwebp --build-cli
```

## mcrypt

1. 目前未支持，未来也不计划支持此扩展。[#32](https://github.com/crazywhalecc/static-php-cli/issues/32)

## oci8

1. oci8 是 Oracle 数据库的扩展，因为 Oracle 提供的扩展所依赖的库未提供静态编译版本（`.a`）或源代码，无法使用静态链接的方式将此扩展编译到 php 内，故无法支持。

## sqlsrv

1. sqlsrv 是 SQL Server 数据库的扩展，因为 SQL Server 提供的扩展所依赖的库未提供静态编译版本（`.a`）或源代码，无法使用静态链接的方式将此扩展编译到 php 内，故无法支持。

## xdebug

1. Xdebug 是一个 Zend 扩展，Xdebug 的功能依赖于 PHP 的 Zend 引擎和底层代码，如果要将其静态编译到 PHP 中，可能需要巨量的 patch 代码，这是不划算的。
2. macOS 平台可以通过在相同平台编译的 PHP 下编译一个 xdebug 扩展，并提取其中的 `xdebug.so` 文件，再在 static-php-cli 中使用 `--no-strip` 参数保留调试符号表，同时加入 `ffi` 扩展。
   编译的 `./php` 二进制可以通过指定 INI 配置并运行，例如`./php -d 'zend_extension=xdebug.so' your-code.php`。

## glfw

1. glfw 扩展依赖 OpenGL，在 Linux 平台还依赖 X11 等环境，这些库都无法被轻易地动态链接。
2. 在 macOS 系统下，我们可以动态链接系统的 OpenGL 和一些相关的库。

## snappy

1. snappy 的库采用 C++ 编写，所以你只能在 Alpine Linux 下编译纯静态链接的 PHP 二进制。