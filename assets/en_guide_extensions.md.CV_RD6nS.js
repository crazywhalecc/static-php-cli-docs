import{_ as t,c as d,o as e,a2 as s}from"./chunks/framework._YPf4yo5.js";const u=JSON.parse('{"title":"Extensions","description":"","frontmatter":{},"headers":[],"relativePath":"en/guide/extensions.md","filePath":"en/guide/extensions.md"}'),r={name:"en/guide/extensions.md"},y=s('<h1 id="extensions" tabindex="-1">Extensions <a class="header-anchor" href="#extensions" aria-label="Permalink to &quot;Extensions&quot;">​</a></h1><blockquote><ul><li><code>yes</code>: supported</li><li><em>blank</em>: not supported yet, or WIP</li><li><code>no</code> with issue link: confirmed to be unavailable due to issue</li><li><code>partial</code> with issue link: supported but not perfect due to issue</li></ul></blockquote><table><thead><tr><th>Extension Name</th><th>Linux</th><th>macOS</th><th>FreeBSD</th><th>Windows</th></tr></thead><tbody><tr><td>amqp</td><td>yes</td><td>yes</td><td></td><td>yes</td></tr><tr><td>apcu</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td>bcmath</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td>bz2</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td>calendar</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td>ctype</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td><a href="./extension-notes.html#curl">curl</a></td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td>dba</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td>dom</td><td>yes</td><td>yes</td><td></td><td>yes</td></tr><tr><td>ds</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td>enchant</td><td></td><td></td><td></td><td></td></tr><tr><td><a href="./extension-notes.html#event">event</a></td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td>exif</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td><a href="./extension-notes.html#ffi">ffi</a></td><td>no</td><td>yes</td><td></td><td>yes</td></tr><tr><td>fileinfo</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td>filter</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td>ftp</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td><a href="./extension-notes.html#gd">gd</a></td><td>yes</td><td>yes</td><td></td><td>yes</td></tr><tr><td>gettext</td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td><a href="./extension-notes.html#glfw">glfw</a></td><td>no</td><td>yes</td><td>no</td><td></td></tr><tr><td>gmp</td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td>iconv</td><td>yes</td><td>yes</td><td></td><td>yes</td></tr><tr><td>igbinary</td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td>imagick</td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td><a href="./extension-notes.html#imap">imap</a></td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td>inotify</td><td>yes</td><td>no</td><td></td><td>no</td></tr><tr><td>intl</td><td>yes</td><td>yes</td><td></td><td>no</td></tr><tr><td>ldap</td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td>libxml</td><td>yes</td><td>yes</td><td></td><td>yes</td></tr><tr><td>mbregex</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td>mbstring</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td><a href="./extension-notes.html#mcrypt">mcrypt</a></td><td>no</td><td>no</td><td>no</td><td>no</td></tr><tr><td>memcache</td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td>memcached</td><td>no</td><td>yes</td><td></td><td></td></tr><tr><td>mongodb</td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td>mysqli</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td>mysqlnd</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td><a href="./extension-notes.html#oci8">oci8</a></td><td>no</td><td>no</td><td>no</td><td></td></tr><tr><td>opcache</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td><a href="./extension-notes.html#openssl">openssl</a></td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td><a href="./extension-notes.html#parallel">parallel</a></td><td>yes</td><td>yes</td><td></td><td>yes</td></tr><tr><td><a href="./extension-notes.html#password-argon2">password-argon2</a></td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td>pcntl</td><td>yes</td><td>yes</td><td>yes</td><td>no</td></tr><tr><td>pdo</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td>pdo_mysql</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td>pdo_pgsql</td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td>pdo_sqlite</td><td>yes</td><td>yes</td><td></td><td>yes</td></tr><tr><td>pdo_sqlsrv</td><td>yes</td><td>yes</td><td></td><td>yes</td></tr><tr><td><a href="./extension-notes.html#pgsql">pgsql</a></td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td>phar</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td>posix</td><td>yes</td><td>yes</td><td>yes</td><td>no</td></tr><tr><td>protobuf</td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td><a href="./extension-notes.html#rar">rar</a></td><td>yes</td><td>partial</td><td></td><td>yes</td></tr><tr><td>readline</td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td>redis</td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td>session</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td>shmop</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td>simdjson</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td>simplexml</td><td>yes</td><td>yes</td><td></td><td>yes</td></tr><tr><td>snappy</td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td>soap</td><td>yes</td><td>yes</td><td></td><td>yes</td></tr><tr><td>sockets</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td>sodium</td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td>sqlite3</td><td>yes</td><td>yes</td><td></td><td>yes</td></tr><tr><td>sqlsrv</td><td>yes</td><td>yes</td><td></td><td>yes</td></tr><tr><td>ssh2</td><td>yes</td><td>yes</td><td></td><td>yes</td></tr><tr><td><a href="./extension-notes.html#swoole">swoole</a></td><td>yes</td><td>yes</td><td></td><td>no</td></tr><tr><td><a href="./extension-notes.html#swoole-hook-mysql">swoole-hook-mysql</a></td><td>yes</td><td>yes</td><td></td><td>no</td></tr><tr><td><a href="./extension-notes.html#swoole-hook-pgsql">swoole-hook-pgsql</a></td><td>yes</td><td>partial</td><td></td><td>no</td></tr><tr><td><a href="./extension-notes.html#swoole-hook-sqlite">swoole-hook-sqlite</a></td><td>yes</td><td>yes</td><td></td><td>no</td></tr><tr><td><a href="./extension-notes.html#swow">swow</a></td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td>sysvmsg</td><td>yes</td><td>yes</td><td></td><td>no</td></tr><tr><td>sysvsem</td><td>yes</td><td>yes</td><td></td><td>no</td></tr><tr><td>sysvshm</td><td>yes</td><td>yes</td><td></td><td>yes</td></tr><tr><td>tidy</td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td>tokenizer</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td>uuid</td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td>uv</td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td><a href="./extension-notes.html#xdebug">xdebug</a></td><td>no</td><td>no</td><td>no</td><td></td></tr><tr><td><a href="./extension-notes.html#xhprof">xhprof</a></td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td>xlswriter</td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td><a href="./extension-notes.html#xml">xml</a></td><td>yes</td><td>yes</td><td></td><td>yes</td></tr><tr><td>xmlreader</td><td>yes</td><td>yes</td><td></td><td>yes</td></tr><tr><td>xmlwriter</td><td>yes</td><td>yes</td><td></td><td>yes</td></tr><tr><td>xsl</td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td>yac</td><td>yes</td><td>yes</td><td></td><td>yes</td></tr><tr><td>yaml</td><td>yes</td><td>yes</td><td></td><td>yes</td></tr><tr><td>zip</td><td>yes</td><td>yes</td><td></td><td></td></tr><tr><td>zlib</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td>zstd</td><td>yes</td><td>yes</td><td></td><td></td></tr></tbody></table><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>If an extension you need is missing, you can create a <a href="https://github.com/crazywhalecc/static-php-cli/issues" target="_blank" rel="noreferrer">Feature Request</a>.</p><p>Some extensions or libraries that the extension depends on will have some optional features. For example, the gd library optionally supports libwebp, freetype, etc. If you only use <code>bin/spc build gd --build-cli</code> they will not be included (static-php-cli defaults to the minimum dependency principle).</p><p>You can use <code>--with-libs=</code> to add these libraries when compiling. When the dependent libraries of this compilation include them, gd will automatically use them to enable these features. (For example: <code>bin/spc build gd --with-libs=libwebp,freetype --build-cli</code>)</p><p>Alternatively you can use <code>--with-suggested-exts</code> and <code>--with-suggested-libs</code> to enable all optional dependencies of these extensions and libraries. (For example: <code>bin/spc build gd --with-suggested-libs --build-cli</code>)</p><p>If you don&#39;t know whether an extension has optional features, you can check the <a href="https://github.com/crazywhalecc/static-php-cli/tree/main/config" target="_blank" rel="noreferrer">spc configuration file</a> or use the command <code>bin/spc dev:extensions</code> (library dependency is <code>lib-suggests</code>, extension dependency is <code>ext-suggests</code>).</p></div>',4),o=[y];function n(i,a,l,c,h,p){return e(),d("div",null,o)}const f=t(r,[["render",n]]);export{u as __pageData,f as default};
