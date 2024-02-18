# Introduction to project structure

static-php-cli mainly contains three logical components: sources, dependent libraries, and extensions.
These components contains 4 configuration files: `source.json`, `pkg.json`, `lib.json`, and `ext.json`.

A complete process for building standalone static PHP is:

1. Use the source download module `Downloader` to download specified or all source codes. 
    These sources include PHP source code, dependent library source code, and extension source code.
2. Use the source decompression module `SourceExtractor` to decompress the downloaded sources to the compilation directory.
3. Use the dependency tool to calculate the dependent extensions and dependent libraries of the currently added extension, 
    and then compile each library that needs to be compiled in the order of dependencies.
4. After building each dependent library using `Builder` under the corresponding operating system, install it to the `buildroot` directory.
5. If external extensions are included (the source code does not contain extensions within PHP), 
    copy the external extensions to the `source/php-src/ext/` directory.
6. Use `Builder` to build the PHP source code and build target to the `buildroot` directory.

The project is mainly divided into several folders:

- `bin/`: used to store program entry files, including `bin/spc`, `bin/spc-alpine-docker`, `bin/setup-runtime`.
- `config/`: Contains all the extensions and dependent libraries supported by the project, 
    as well as the download link and download methods of these sources. It is divided into files: `lib.json`, `ext.json`, `source.json`, `pkg.json` .
- `src/`: The core code of the project, including the entire framework and commands for compiling various extensions and libraries.
- `vendor/`: The directory that Composer depends on, you do not need to make any modifications to it.

The operating principle is to start a `ConsoleApplication` of `symfony/console`, and then parse the commands entered by the user in the terminal.

## Basic command line structure

`bin/spc` is an entry file, including the Unix common `#!/usr/bin/env php`, 
which is used to allow the system to automatically execute with the PHP interpreter installed on the system.
After the project executes `new ConsoleApplication()`, the framework will automatically register them as commands.

The project does not directly use the Command registration method and command execution method recommended by Symfony. Here are small changes:

1. Each command uses the `#[AsCommand()]` Attribute to register the name and description.
2. Abstract `execute()` so that all commands are based on `BaseCommand` (which is based on `Symfony\Component\Console\Command\Command`), 
    and the execution code of each command itself is written in the `handle()` method .
3. Added variable `$no_motd` to `BaseCommand`, which is used to display the Figlet greeting when the command is executed.
4. `BaseCommand` saves `InputInterface` and `OutputInterface` as member variables. You can use `$this->input` and `$this->output` within the command class.

## Basic source code structure

The source code of the project is located in the `src/SPC` directory, 
supports automatic loading of the PSR-4 standard, and contains the following subdirectories and classes:

- `src/SPC/builder/`: The core compilation command code used to build libraries, 
    PHP and related extensions under different operating systems, and also includes some compilation system tool methods.
- `src/SPC/command/`: All commands of the project are here.
- `src/SPC/doctor/`: Doctor module, which is a relatively independent module used to check the system environment. 
    It can be entered using the command `bin/spc doctor`.
- `src/SPC/exception/`: exception class.
- `src/SPC/store/`: Classes related to storage, files and sources are all here.
- `src/SPC/util/`: Some reusable tool methods are here.
- `src/SPC/ConsoleApplication.php`: command line program entry file.

If you have read the source code, you may find that there is also a `src/globals/` directory, 
which is used to store some global variables, global methods, 
and non-PSR-4 standard PHP source code that is relied upon during the build process, such as extension sanity check code etc.
