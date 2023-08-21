# Project Structure

The project is mainly divided into several folders:

- `bin/`: Used to store program entry files, including `bin/spc`, `bin/spc-alpine-docker`, `bin/setup-runtime`.
- `config/`: Contains all extensions supported by the project, dependent libraries, urls and download methods of these resources, and is divided into three files: `lib.json`, `ext.json`, `source.json` .
- `src/SPC/`: The core code of the project, including the entire framework and commands to compile various extensions and libraries.
- `src/globals/`: Global methods and constants of the project, test files needed at runtime (eg: extension usability check code).
- `vendor/`: The directory that Composer depends on, you don't need to make any changes to it.

The operating principle is to start a `ConsoleApplication` of `symfony/console`, and then parse the commands entered by the user in the terminal.

## Command-Line Entry and Commands

`bin/spc` is a PHP code entry file, which contains the common Unix `#!/usr/bin/env php` to let the system automatically execute with the PHP interpreter installed in the system.
After the project executes `new ConsoleApplication()`, the framework will automatically use reflection to parse all the classes in the `src/SPC/command` directory and register them as commands.

The project does not directly use the Command registration method and command execution method recommended by Symfony, here is some small changes:

1. Each command uses `#[AsCommand()]` Attribute to register name and description.
2. Abstract `execute()`, make all commands based on `BaseCommand` (it is based on `Symfony\Component\Console\Command\Command`), and the execution code of each command itself is written in the `handle()` method .
3. `BaseCommand` adds the variable `$no_motd`, which is used to display the Figlet greeting when the command is executed.
4. `BaseCommand` saves `InputInterface` and `OutputInterface` as member variables, you can use `$this->input` and `$this->output` in the command class.

## Doctor Module

The Doctor module is a relatively independent module used to check the system environment, which can be entered with the command `bin/spc doctor`, and the entry command class is in `DoctorCommand.php`.

The Doctor module is a checklist with a series of check items and automatic repair items. 
These items are stored in the `src/SPC/doctor/item/` directory,
And two Attributes are used as check item tags and auto-fix item tags: `#[AsCheckItem]` and `#[AsFixItem]`.

Take the existing check item `if necessary tools are installed`, 
which is used to check whether the packages necessary for compilation are installed in the macOS system. 
The following is its source code:

```php
use SPC\doctor\AsCheckItem;
use SPC\doctor\AsFixItem;
use SPC\doctor\CheckResult;

#[AsCheckItem('if necessary tools are installed', limit_os: 'Darwin', level: 997)]
public function checkCliTools(): ?CheckResult
{
    $missing = [];
    foreach (self::REQUIRED_COMMANDS as $cmd) {
        if ($this->findCommand($cmd) === null) {
            $missing[] = $cmd;
        }
    }
    if (!empty($missing)) {
        return CheckResult::fail('missing system commands: ' . implode(', ', $missing), 'build-tools', [$missing]);
    }
    return CheckResult::ok();
}
```

The first parameter of the attribute is the name of the check item,
and the following `limit_os` parameter restricts the check item to be triggered only under the specified system, 
and `level` is the priority of executing the check item, the larger the number, the higher the priority higher.

The `$this->findCommand()` method used in it is the method of `SPC\builder\traits\UnixSystemUtilTrait`, 
the purpose is to find the location of the system command, and return NULL if it cannot be found.

Each check item method should return a `SPC\doctor\CheckResult`:

- When returning `CheckResult::fail()`, the first parameter is used to output the error prompt of the terminal, 
and the second parameter is the name of the repair item when this check item can be automatically repaired.
- When `CheckResult::ok()` is returned, the check passed. You can also pass a parameter to return the check result, for example: `CheckResult::ok('OS supported')`.
- When returning `CheckResult::fail()`, if the third parameter is included, the array of the third parameter will be used as the parameter of `AsFixItem`.

The following is the method for automatically repairing items corresponding to this check item:

```php
#[AsFixItem('build-tools')]
public function fixBuildTools(array $missing): bool
{
    foreach ($missing as $cmd) {
        try {
            shell(true)->exec('brew install ' . escapeshellarg($cmd));
        } catch (RuntimeException) {
            return false;
        }
    }
    return true;
}
```

`#[AsFixItem()]` first parameter is the name of the fix item, and this method must return True or False. 
When False is returned, the automatic repair failed and manual handling is required.

In the code here, `shell()->exec()` is the method of executing commands of the project, 
which is used to replace `exec()` and `system()`, and also provides debugging, obtaining execution status, 
entering directories, etc. characteristic.

(I'm writing, TODO)
