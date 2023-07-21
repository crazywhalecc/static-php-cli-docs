# Guide

Static php cli is a tool used to build statically compiled PHP binaries, 
currently supporting Linux and macOS systems.

In the guide section, you will learn how to use static php cli to build standalone PHP programs.

- [GitHub Action Build](./action-build)
- [Native Build](./manual-build)
- [Supported Extensions](./extensions)

::: tip
Part of the English document is written by me, and part is translated by Google, and there may be inaccurate descriptions.
If you are a native English speaker, some corrections to the documentation are welcome. ([Docs repo](https://github.com/crazywhalecc/static-php-cli-docs))
:::

## Compilation Environment

The following is the architecture support situation, where `CI` represents support for GitHub Action build, 
`Local` represents support for native build, and empty represents temporarily not supported.

|         | x86_64    | aarch64   |
|---------|-----------|-----------|
| macOS   | CI, Local | Local     |
| Linux   | CI, Local | CI, Local |
| Windows |           |           |

Among them, Linux is currently only tested on Ubuntu, Debian, and Alpine distributions, 
and other distributions have not been tested, which cannot guarantee successful compilation.
For untested distributions, local compilation can be done using methods such as Docker to avoid environmental issues.

There are two architectures for macOS: `x86_64` and `Arm`, but binaries compiled on one architecture cannot be directly used on the other architecture.
Rosetta 2 cannot guarantee that programs compiled with `Arm` architecture can fully run on `x86_64` environment.

## Supported PHP Version

Currently, static php cli supports PHP versions 8.0 to 8.2, and theoretically supports PHP 7.4 and earlier versions. 
Simply select the earlier version when downloading.
However, due to some extensions and special components that have stopped supporting earlier versions of PHP, 
static-php-cli will not explicitly support earlier versions.
