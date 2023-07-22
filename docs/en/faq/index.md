# FAQ

Here will be some questions that you may encounter easily. There are currently many, but I need to take time to organize them.

## Can statically compiled PHP install extensions?

Because the principle of installing extensions in PHP under the traditional architecture is to install new extensions using `.so` type dynamic link libraries, 
and statically linked PHP compiled using this project cannot **directly** install new extensions using dynamic link libraries.

For the macOS platform, almost all binary files under macOS cannot be linked purely statically, 
and almost all binary files will link macOS system libraries: `/usr/lib/libresolv.9.dylib` and `/usr/lib/libSystem.B.dylib`.
So under macOS system, statically compiled php binary files can be used under certain compilation conditions, 
and dynamic link extensions can be used at the same time:

1. Using the `--no-strip` parameter will not strip information such as debugging symbols from the binary file for use with external Zend extensions such as `Xdebug`.
2. If you want to compile some Zend extensions, use Homebrew, MacPorts, source code compilation, and install a normal version of PHP on your operating system.
3. Use the `phpize && ./configure && make` command to compile the extensions you want to use.
4. Copy the extension file `xxxx.so` to the outside, use the statically compiled PHP binary, for example to use the Xdebug extension: `cd buildroot/bin/ && ./php -d "zend_extension=/path/to/xdebug.so"`.

```bash
# build statically linked php-cli but not stripped
bin/spc build ffi --build-cli --no-strip
```

For the Linux platform, the current compilation result is a purely statically linked binary file, 
and new extensions cannot be installed using a dynamic link library.

## Can it support Oracle, MSSQL database extension?

Some extensions that rely on closed source libraries, such as `oci8`, `sqlsrv`, `sourceguardian`, etc., 
they do not provide purely statically compiled dependent library files (`.a`), only dynamic dependent library files (`.so`).
These extensions cannot be compiled into static-php-cli from source, so this project may never support them. 
However, in theory, you can access and use such extensions under macOS according to the above questions.

If you have a need for such extensions, or most people have needs for these closed-source extensions,
see the discussion on [standalone-php-cli](https://github.com/crazywhalecc/static-php-cli/discussions/58). Welcome to leave a message.

## Will it support Windows?

The project does not currently support Windows, because Windows is a new underlying architecture, not Unix. 
This project started on Linux, and the refactored version supports macOS.

Windows support mainly has the following issues:

1. The compilation process of Windows is different from that of *nix, and the tool chain used is also different. Compiling each dependent library may encounter completely different problems.
2. PHP officially provides an independent installation package of the Windows version. Although it is not statically linked, you can easily package the entire PHP and dependent libraries in one folder, so Windows support is not a core requirement.
3. Windows supports WSL(2) environment. For developers, we recommend you to use WSL to develop PHP-related programs.
4. The demand for the Windows version will also be advanced according to the needs of all people who use this project. If there are many people who need it, I will support it as soon as possible.

## Can I protect my source code with micro?

You can't. micro.sfx is essentially combining php and php code into one file, 
there is no process of compiling or encrypting the PHP code.

First of all, php-src is the official interpreter of PHP code, and there is no PHP compiler compatible with mainstream branches on the market.
I saw on the Internet that there is a project called BPC (Binary PHP Compiler?) that can compile PHP into binary, 
but there are many restrictions.

The direction of encrypting and protecting the code is not the same as compiling. 
After compiling, the code can also be obtained through reverse engineering and other methods. 
The real protection is still carried out by means of packing and encrypting the code.

Therefore, this project (static-php-cli) and related projects (lwmbs, swoole-cli) all provide a convenient compilation tool for php-src source code.
The phpmicro referenced by this project and related projects is only a package of PHP's sapi interface, not a compilation tool for PHP code.
The compiler for PHP code is a completely different project, so the extra cases are not taken into account. 
If you are interested in encryption, you can consider using existing encryption technologies, 
such as Swoole Compiler, Source Guardian, etc.
