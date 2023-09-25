# Start Developing

Developing this project requires the installation and deployment of a PHP environment, 
as well as some extensions and Composer commonly used in PHP projects.

The development environment and running environment of the project are almost exactly the same. 
You can refer to the **Manual Build** section to install system PHP or use the pre-built static PHP of this project as the environment. 
I will not go into details here.

Regardless of its purpose, this project itself is actually a `php-cli` program. You can edit and develop it as a normal PHP project. 
At the same time, you need to understand the Shell languages of different systems.

The current purpose of this project is to compile statically compiled independent PHP, 
but the main part also includes compiling static versions of many dependent libraries, 
so you can reuse this set of compilation logic to build independent binary versions of other programs, such as Nginx, etc.

## Start development

Continuing down to see the project structure documentation, you can learn how `static-php-cli` works.
