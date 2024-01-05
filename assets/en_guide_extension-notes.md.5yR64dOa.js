import{_ as e,c as o,o as i,U as t}from"./chunks/framework.GQ61FypF.js";const m=JSON.parse('{"title":"Extension Notes","description":"","frontmatter":{},"headers":[],"relativePath":"en/guide/extension-notes.md","filePath":"en/guide/extension-notes.md"}'),a={name:"en/guide/extension-notes.md"},l=t('<h1 id="extension-notes" tabindex="-1">Extension Notes <a class="header-anchor" href="#extension-notes" aria-label="Permalink to &quot;Extension Notes&quot;">​</a></h1><p>Because it is a static compilation, extensions will not compile 100% perfectly, and different extensions have different requirements for PHP and the environment, which will be listed one by one here.</p><h2 id="phpmicro" tabindex="-1">phpmicro <a class="header-anchor" href="#phpmicro" aria-label="Permalink to &quot;phpmicro&quot;">​</a></h2><ol><li>Only PHP &gt;= 8.0 is supported.</li></ol><h2 id="swoole" tabindex="-1">swoole <a class="header-anchor" href="#swoole" aria-label="Permalink to &quot;swoole&quot;">​</a></h2><ol><li>swoole &gt;= 5.0 Only PHP &gt;= 8.0 is supported.</li><li>swoole Currently, curl hooks are not supported for PHP 8.0.x (which may be fixed in the future).</li><li>When compiling, if only <code>swoole</code> extension is included, the supported Swoole database coroutine hook will not be fully enabled. If you need to use it, please add the corresponding <code>swoole-hook-xxx</code> extension.</li></ol><h2 id="swoole-hook-pgsql" tabindex="-1">swoole-hook-pgsql <a class="header-anchor" href="#swoole-hook-pgsql" aria-label="Permalink to &quot;swoole-hook-pgsql&quot;">​</a></h2><p>swoole-hook-pgsql is not an extension, it&#39;s a Hook feature of Swoole. If you use <code>swoole,swoole-hook-pgsql</code>, you will enable Swoole&#39;s PostgreSQL client and the coroutine mode of the <code>pdo_pgsql</code> extension.</p><p>swoole-hook-pgsql conflicts with the <code>pdo_pgsql</code> extension. If you want to use Swoole and <code>pdo_pgsql</code>, please delete the pdo_pgsql extension and enable <code>swoole</code> and <code>swoole-hook-pgsql</code>. This extension contains an implementation of the coroutine environment for <code>pdo_pgsql</code>.</p><p>On macOS systems, <code>pdo_pgsql</code> may not be able to connect to the postgresql server normally, please use it with caution.</p><h2 id="swoole-hook-mysql" tabindex="-1">swoole-hook-mysql <a class="header-anchor" href="#swoole-hook-mysql" aria-label="Permalink to &quot;swoole-hook-mysql&quot;">​</a></h2><p>swoole-hook-mysql is not an extension, it&#39;s a Hook feature of Swoole. If you use <code>swoole,swoole-hook-mysql</code>, you will enable the coroutine mode of Swoole&#39;s <code>mysqlnd</code> and <code>pdo_mysql</code>.</p><h2 id="swoole-hook-sqlite" tabindex="-1">swoole-hook-sqlite <a class="header-anchor" href="#swoole-hook-sqlite" aria-label="Permalink to &quot;swoole-hook-sqlite&quot;">​</a></h2><p>swoole-hook-sqlite is not an extension, it&#39;s a Hook feature of Swoole. If you use <code>swoole,swoole-hook-sqlite</code>, you will enable the coroutine mode of Swoole&#39;s <code>pdo_sqlite</code> (Swoole must be 5.1 or above).</p><p>swoole-hook-sqlite conflicts with the <code>pdo_sqlite</code> extension. If you want to use Swoole and <code>pdo_sqlite</code>, please delete the pdo_sqlite extension and enable <code>swoole</code> and <code>swoole-hook-sqlite</code>. This extension contains an implementation of the coroutine environment for <code>pdo_sqlite</code>.</p><h2 id="swow" tabindex="-1">swow <a class="header-anchor" href="#swow" aria-label="Permalink to &quot;swow&quot;">​</a></h2><ol><li>Only PHP version &gt;= 8.0 is supported.</li></ol><h2 id="imap" tabindex="-1">imap <a class="header-anchor" href="#imap" aria-label="Permalink to &quot;imap&quot;">​</a></h2><ol><li>Kerberos is not supported</li><li>ext-imap is not thread safe due to the underlying c-client. It&#39;s not possible to use it in --enable-zts builds.</li><li>Because the extension may be dropped from php, we recommend you look for an alternative implementation, such as <a href="https://github.com/Webklex/php-imap" target="_blank" rel="noreferrer">Webklex/php-imap</a></li></ol><h2 id="gd" tabindex="-1">gd <a class="header-anchor" href="#gd" aria-label="Permalink to &quot;gd&quot;">​</a></h2><ol><li>gd Extension relies on more additional Graphics library. By default, using <code>bin/spc build gd</code> directly will not support some Graphics library, such as <code>libjpeg</code>, <code>libavif</code>, etc. Currently, it supports four libraries: <code>freetype,libjpeg,libavif,libwebp</code>. Therefore, the following command can be used to introduce them into the gd library:</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bin/spc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gd</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --with-libs=freetype,libjpeg,libavif,libwebp</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --build-cli</span></span></code></pre></div><h2 id="mcrypt" tabindex="-1">mcrypt <a class="header-anchor" href="#mcrypt" aria-label="Permalink to &quot;mcrypt&quot;">​</a></h2><ol><li>Currently not supported, and this extension will not be supported in the future. <a href="https://github.com/crazywhalecc/static-php-cli/issues/32" target="_blank" rel="noreferrer">#32</a></li></ol><h2 id="oci8" tabindex="-1">oci8 <a class="header-anchor" href="#oci8" aria-label="Permalink to &quot;oci8&quot;">​</a></h2><ol><li>oci8 is an extension of the Oracle database, because the library on which the extension provided by Oracle does not provide a statically compiled version (<code>.a</code>) or source code, and this extension cannot be compiled into php by static linking, so it cannot be supported.</li></ol><h2 id="xdebug" tabindex="-1">xdebug <a class="header-anchor" href="#xdebug" aria-label="Permalink to &quot;xdebug&quot;">​</a></h2><ol><li>Xdebug is a Zend extension. The functions of Xdebug depend on PHP&#39;s Zend engine and underlying code. If you want to statically compile it into PHP, you may need a huge amount of patch code, which is not feasible.</li><li>The macOS platform can compile an xdebug extension under PHP compiled on the same platform, extract the <code>xdebug.so</code> file, and then use the <code>--no-strip</code> parameter in static-php-cli to retain the debug symbol table and add the <code>ffi</code> extension. The compiled <code>./php</code> binary can be configured and run by specifying the INI, eg <code>./php -d &#39;zend_extension=/path/to/xdebug.so&#39; your-code.php</code>.</li></ol><h2 id="xml" tabindex="-1">xml <a class="header-anchor" href="#xml" aria-label="Permalink to &quot;xml&quot;">​</a></h2><ol><li>xml includes xml, xmlreader, xmlwriter, xsl, dom, simplexml, etc. When adding xml extensions, it is best to enable these extensions at the same time.</li><li>libxml is included in xml extension. Enabling xml is equivalent to enabling libxml.</li></ol><h2 id="glfw" tabindex="-1">glfw <a class="header-anchor" href="#glfw" aria-label="Permalink to &quot;glfw&quot;">​</a></h2><ol><li>glfw depends on OpenGL, and linux environment also needs X11, which cannot be linked statically.</li><li>macOS platform, we can compile and link system builtin OpenGL and related libraries dynamically.</li></ol><h2 id="rar" tabindex="-1">rar <a class="header-anchor" href="#rar" aria-label="Permalink to &quot;rar&quot;">​</a></h2><ol><li>The rar extension currently has a problem when compiling phpmicro with the <code>common</code> extension collection in the macOS x86_64 environment.</li></ol><h2 id="mongodb" tabindex="-1">mongodb <a class="header-anchor" href="#mongodb" aria-label="Permalink to &quot;mongodb&quot;">​</a></h2><ol><li>mongodb does not support macOS for the time being because there are some issues with the driver. Track issue <a href="https://github.com/crazywhalecc/static-php-cli/issues/281" target="_blank" rel="noreferrer">here</a>.</li></ol><h2 id="pgsql" tabindex="-1">pgsql <a class="header-anchor" href="#pgsql" aria-label="Permalink to &quot;pgsql&quot;">​</a></h2><p>pgsql ssl connection is not compatible with openssl 3.2.0. See:</p><ul><li><a href="https://github.com/Homebrew/homebrew-core/issues/155651" target="_blank" rel="noreferrer">https://github.com/Homebrew/homebrew-core/issues/155651</a></li><li><a href="https://github.com/Homebrew/homebrew-core/pull/155699" target="_blank" rel="noreferrer">https://github.com/Homebrew/homebrew-core/pull/155699</a></li><li><a href="https://github.com/postgres/postgres/commit/c82207a548db47623a2bfa2447babdaa630302b9" target="_blank" rel="noreferrer">https://github.com/postgres/postgres/commit/c82207a548db47623a2bfa2447babdaa630302b9</a></li></ul><h2 id="password-argon2" tabindex="-1">password-argon2 <a class="header-anchor" href="#password-argon2" aria-label="Permalink to &quot;password-argon2&quot;">​</a></h2><ol><li>password-argon2 is not a standard extension, it is an additional algorithm for the <code>password_hash</code> function.</li><li>On Linux systems, <code>password-argon2</code> dependency <code>libargon2</code> conflicts with the <code>libsodium</code> library.</li></ol><h2 id="ffi" tabindex="-1">ffi <a class="header-anchor" href="#ffi" aria-label="Permalink to &quot;ffi&quot;">​</a></h2><ol><li>Due to limitations of the Linux system, although the ffi extension can be compiled successfully, it cannot be used to load other <code>so</code> extensions.</li><li>The prerequisite for supporting loading of so extension is non-static compilation, but dynamic linking conflicts with the purpose of this project.</li></ol><h2 id="xhprof" tabindex="-1">xhprof <a class="header-anchor" href="#xhprof" aria-label="Permalink to &quot;xhprof&quot;">​</a></h2><p>The xhprof extension consists of three parts: <code>xhprof_extension</code>, <code>xhprof_html</code>, <code>xhprof_libs</code>. Only <code>xhprof_extension</code> is included in the compiled binary. If you need to use xhprof, please download the source code from <a href="http://pecl.php.net/package/xhprof" target="_blank" rel="noreferrer">pecl.php.net/package/xhprof</a> and specify the <code>xhprof_libs</code> and <code>xhprof_html</code> paths for use.</p>',45),s=[l];function n(r,d,h,c,p,u){return i(),o("div",null,s)}const f=e(a,[["render",n]]);export{m as __pageData,f as default};
