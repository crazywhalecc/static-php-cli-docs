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

## oci8

1. oci8 is an extension of the Oracle database, because the library on which the extension provided by Oracle does not provide a statically compiled version (`.a`) or source code, 
and this extension cannot be compiled into php by static linking, so it cannot be supported.

## sqlsrv

1. sqlsrv is an extension of the SQL Server database. 
Because the library on which the extension provided by SQL Server does not provide a statically compiled version (`a`) or source code, 
the extension cannot be compiled into php by static linking, so it cannot be supported.

## xdebug

1. Xdebug is a Zend extension. The functions of Xdebug depend on PHP's Zend engine and underlying code. 
If you want to statically compile it into PHP, you may need a huge amount of patch code, which is not possible.
2. The macOS platform can compile an xdebug extension under PHP compiled on the same platform, 
extract the `xdebug.so` file, and then use the `--no-strip` parameter in static-php-cli to retain the debug symbol table and add the `ffi` extension. 
The compiled `./php` binary can be configured and run by specifying the INI, eg `./php -d 'zend_extension=/path/to/xdebug.so' your-code.php`.

## glfw

1. glfw depends on OpenGL, and linux environment also needs X11, which cannot be linked statically.
2. macOS platform, we can compile and link system builtin OpenGL and related libraries dynamically.

## snappy

1. The snappy library is written in C++, so you can only compile purely statically linked PHP binaries under Alpine Linux.
