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
