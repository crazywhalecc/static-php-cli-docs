# Extension Notes

Because it is a static compilation, extensions will not compile 100% perfectly, 
and different extensions have different requirements for PHP and the environment, 
which will be listed one by one here.

## phpmicro

1. Only PHP >= 8.0 is supported.

## swoole

1. swoole >= 5.0 Only PHP >= 8.0 is supported.
2. swoole Compilation is only supported in Alpine Linux in Linux environments. [#51](https://github.com/crazywhalecc/static-php-cli/issues/51)
3. swoole Currently, curl hooks are not supported (which may be fixed in the future).

## swow

1. Only PHP version >= 8.0 is supported.

## intl

1. intl Due to its dependency: ICU extensions (ICU uses some C++libraries), compilation is only supported in Alpine Linux in Linux environments, similar to Swoole.

## gd

1. gd Extension relies on more additional Graphics library. By default, 
using `bin/spc build gd` directly will not support some Graphics library, such as `libjpeg`, `libavif`, etc.
Currently, it supports four libraries: `freetype,libjpeg,libavif,libwebp`. 
Therefore, the following command can be used to introduce them into the gd library:

```bash
bin/spc build gd --with-libs=freetype,libjpeg,libavif,libwebp --build-cli
```

## mcrypt

1. Currently not supported, and this extension will not be supported in the future. [#32](https://github.com/crazywhalecc/static-php-cli/issues/32)
