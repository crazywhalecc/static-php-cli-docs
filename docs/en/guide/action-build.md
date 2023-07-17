# GitHub Action Build

Action Build refers to compiling directly using GitHub Action.

If you don't want to compile it yourself, you can download the artifact from the existing Action in this project, 
or you can download it from a self-hosted server：[Enter](https://dl.zhamao.xin/static-php-cli/).

> Self-hosted binaries are also built from Actions: [repo](https://github.com/zhamao-robot/static-php-cli).

## Build Guide

Using GitHub Action makes it easy to build a statically compiled PHP and phpmicro, 
while also defining the extensions to compile.

1. Fork project.
2. Go to the Actions of the project and select `CI`.
3. Select `Run workflow`, fill in the PHP version you want to compile, the target type, and the list of extensions. (extensions comma separated, e.g. `bcmath,curl,mbstring`)
4. After waiting for about a period of time, enter the corresponding task and get `Artifacts`.

If you enable `debug`, all logs will be output at build time, including compiled logs, for troubleshooting.

## Extensions

You can go to [extensions](/zh/guide/extensions) check here to see if all the extensions you need currently support.
and then go to [command generator](/zh/guide/cli-generator) select the extension you need to compile, copy the extensions string to `extensions` option.
