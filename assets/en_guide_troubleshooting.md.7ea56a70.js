import{_ as e,c as o,o as t,U as a}from"./chunks/framework.a73c7ff7.js";const f=JSON.parse('{"title":"Troubleshooting","description":"","frontmatter":{},"headers":[],"relativePath":"en/guide/troubleshooting.md","filePath":"en/guide/troubleshooting.md"}'),r={name:"en/guide/troubleshooting.md"},n=a('<h1 id="troubleshooting" tabindex="-1">Troubleshooting <a class="header-anchor" href="#troubleshooting" aria-label="Permalink to &quot;Troubleshooting&quot;">​</a></h1><p>Various failures may be encountered in the process of using static-php-cli, here will describe how to check the errors by yourself and report Issue.</p><h2 id="download-failure" tabindex="-1">Download Failure <a class="header-anchor" href="#download-failure" aria-label="Permalink to &quot;Download Failure&quot;">​</a></h2><p>Problems with downloading resources are one of the most common problems with spc. The main reason is that the addresses used for SPC download resources are generally the official website of the corresponding project or GitHub, etc., and these websites may occasionally go down and block IP addresses. Currently, version 2.0.0 has not added an automatic retry mechanism, so after encountering a download failure, you can try to call the download command multiple times. If you confirm that the address is indeed inaccessible, you can submit an Issue or PR to update the url or download type.</p><h2 id="doctor-can-t-fix-something" tabindex="-1">Doctor Can&#39;t Fix Something <a class="header-anchor" href="#doctor-can-t-fix-something" aria-label="Permalink to &quot;Doctor Can&#39;t Fix Something&quot;">​</a></h2><p>In most cases, the doctor module can automatically repair and install missing system environments, but there are also special circumstances where the automatic repair function cannot be used normally.</p><p>Due to system limitations (for example, software such as Visual Studio cannot be automatically installed under Windows), the automatic repair function cannot be used for some projects. When encountering a function that cannot be automatically repaired, if you encounter the words <code>Some check items can not be fixed</code>, it means that it cannot be automatically repaired. Please submit an issue according to the method displayed on the terminal or repair the environment yourself.</p><h2 id="compile-error" tabindex="-1">Compile Error <a class="header-anchor" href="#compile-error" aria-label="Permalink to &quot;Compile Error&quot;">​</a></h2><p>When you encounter a compilation error, if the <code>--debug</code> log is not enabled, please enable the debug log first, and then determine the command that reported the error. The error terminal output is very important for fixing compilation errors. When submitting an issue, please upload the last error fragment of the terminal log (or the entire terminal log output), and include the <code>spc</code> command and parameters used.</p>',9),i=[n];function s(l,c,d,u,h,m){return t(),o("div",null,i)}const b=e(r,[["render",s]]);export{f as __pageData,b as default};
