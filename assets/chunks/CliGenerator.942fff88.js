import{d as G,g as C,h as d,o as i,c,k as e,t as l,F as E,G as I,a2 as s,a3 as k,e as V,a4 as m,a5 as A,a as L,a6 as D,p as M,m as Z,_ as j}from"./framework.a73c7ff7.js";const x=a=>(M("data-v-ffecfdc6"),a=a(),Z(),a),H={class:"box"},R={class:"ext-item"},F=["id","value"],X=["for"],Y={class:"box"},$={class:"ext-item"},J=["id","value"],K=["for"],Q={class:"option-line"},W={class:"option-title"},ee={value:"native"},le={value:"spc"},oe={value:"docker"},ne={key:0,class:"option-line"},ae={class:"option-title"},te=x(()=>e("option",{value:"linux-x86_64"},"Linux x86_64 (amd64)",-1)),se=x(()=>e("option",{value:"linux-aarch64"},"Linux aarch64 (arm64)",-1)),de=x(()=>e("option",{value:"macos-x86_64"},"macOS x86_64 (Intel)",-1)),ie=x(()=>e("option",{value:"macos-aarch64"},"macOS arm64 (Apple)",-1)),ce=[te,se,de,ie],ue={class:"option-line"},re={class:"option-title"},me=["value"],ve={class:"option-line"},pe={class:"option-title"},he={for:"debug-yes"},be={for:"debug-no"},ge={class:"option-line"},xe={class:"option-title"},ye={for:"zts-yes"},we={for:"zts-no"},fe={class:"option-line"},_e={class:"option-title"},Se={for:"show-download-yes"},Ce={for:"show-download-no"},Ee=["placeholder"],Ie={key:1,class:"command-container"},ke={class:"command-preview"},Ne=x(()=>e("br",null,null,-1)),ze={key:2,class:"command-container"},Ve={class:"command-preview"},De={key:3,class:"command-container"},Oe={class:"command-preview"},Pe={class:"command-container"},Te={class:"command-preview"},qe={name:"CliGenerator"},Ue=G({...qe,props:{lang:{type:String,default:"zh"}},setup(a){const O=["7.4","8.0","8.1","8.2","8.3"],t={zh:{selectExt:"选择扩展",buildTarget:"选择编译目标",buildOptions:"编译选项",buildEnvironment:"编译环境",buildEnvNative:"本地构建（Git 源码）",buildEnvSpc:"本地构建（独立 spc 二进制）",buildEnvDocker:"Alpine Docker 构建",useDebug:"是否开启调试输出",yes:"是",no:"否",resultShow:"结果展示",selectCommon:"选择常用扩展",selectNone:"全部取消选择",useZTS:"是否编译线程安全版",hardcodedINI:"硬编码 INI 选项",hardcodedINIPlacehoder:"如需要硬编码 ini，每行写一个，例如：memory_limit=2G",resultShowDownload:"是否展示仅下载对应扩展依赖的命令",downloadExtOnlyCommand:"只下载对应扩展的依赖包命令",downloadAllCommand:"下载所有依赖包命令",compileCommand:"编译命令",downloadPhpVersion:"下载 PHP 版本",downloadSPCBinaryCommand:"下载 spc 二进制命令",selectedOS:"选择操作系统"},en:{selectExt:"Select Extensions",buildTarget:"Build Target",buildOptions:"Build Options",buildEnvironment:"Build Environment",buildEnvNative:"Native build (Git source code)",buildEnvSpc:"Native build (standalone spc binary)",buildEnvDocker:"Alpine docker build",useDebug:"Enable debug message",yes:"Yes",no:"No",resultShow:"Result",selectCommon:"Select common extensions",selectNone:"Unselect all",useZTS:"Enable ZTS",hardcodedINI:"Hardcoded INI options",hardcodedINIPlacehoder:"If you need to hardcode ini, write one per line, for example: memory_limit=2G",resultShowDownload:"Download with corresponding extension dependencies",downloadExtOnlyCommand:"Download sources by extensions command",downloadAllCommand:"Download all sources command",compileCommand:"Compile command",downloadPhpVersion:"Download PHP version",downloadSPCBinaryCommand:"Download spc binary command",selectedOS:"Select Build OS"}},P=["apcu","bcmath","bz2","calendar","ctype","curl","dba","dom","event","exif","ffi","filter","fileinfo","gd","glfw","gmp","iconv","imagick","imap","inotify","intl","ldap","mbstring","mbregex","memcache","mongodb","mysqli","mysqlnd","opcache","openssl","password-argon2","pcntl","pdo","pdo_mysql","pdo_sqlite","pdo_pgsql","pgsql","phar","posix","protobuf","rar","readline","redis","session","shmop","simplexml","snappy","soap","sockets","sodium","sqlite3","ssh2","swow","swoole","sysvmsg","sysvsem","sysvshm","tidy","tokenizer","xlswriter","xml","xmlreader","xmlwriter","xsl","zip","zlib","zstd"],T=["cli","fpm","micro","embed","all"],q=()=>{v.value=["apcu","bcmath","calendar","ctype","curl","dba","dom","exif","filter","fileinfo","gd","iconv","intl","mbstring","mbregex","mysqli","mysqlnd","openssl","opcache","pcntl","pdo","pdo_mysql","pdo_sqlite","pdo_pgsql","pgsql","phar","posix","readline","redis","session","simplexml","sockets","sodium","sqlite3","tokenizer","xml","xmlreader","xmlwriter","xsl","zip","zlib"]},N=C(()=>v.value.join(",")),v=d([]),u=d(["cli"]),p=d("native"),y=d("8.2"),r=d(0),h=d(0),b=d(0),w=d(""),f=d("linux-x86_64"),_=C(()=>{switch(p.value){case"native":return"bin/spc";case"spc":return"./spc";case"docker":return"bin/spc-alpine-docker";default:return""}}),z=d("--build-cli"),U=C(()=>{const g=w.value.split(`
`);let n=[];return g.forEach(o=>{o.indexOf("=")>=1&&n.push(o)})," "+n.map(o=>'-I "'+o+'"').join(" ")}),B=g=>{let n;u.value.indexOf("all")!==-1&&g.target.value==="all"?u.value=["all"]:(n=u.value.indexOf("all"))!==-1&&g.target.value!=="all"&&u.value.splice(n,1),z.value=u.value.map(o=>"--build-"+o).join(" ")};return(g,n)=>(i(),c("div",null,[e("h2",null,l(t[a.lang].selectExt),1),e("div",H,[(i(),c(E,null,I(P,o=>e("div",R,[s(e("input",{type:"checkbox",id:o,value:o,"onUpdate:modelValue":n[0]||(n[0]=S=>v.value=S)},null,8,F),[[D,v.value]]),e("label",{for:o},l(o),9,X)])),64))]),e("div",{class:"my-btn",onClick:q},l(t[a.lang].selectCommon),1),e("div",{class:"my-btn",onClick:n[1]||(n[1]=o=>v.value=[])},l(t[a.lang].selectNone),1),e("h2",null,l(t[a.lang].buildTarget),1),e("div",Y,[(i(),c(E,null,I(T,o=>e("div",$,[s(e("input",{type:"checkbox",id:"build_"+o,value:o,"onUpdate:modelValue":n[2]||(n[2]=S=>u.value=S),onChange:B},null,40,J),[[D,u.value]]),e("label",{for:"build_"+o},l(o),9,K)])),64))]),e("h2",null,l(t[a.lang].buildOptions),1),e("div",Q,[e("span",W,l(t[a.lang].buildEnvironment),1),s(e("select",{"onUpdate:modelValue":n[3]||(n[3]=o=>p.value=o)},[e("option",ee,l(t[a.lang].buildEnvNative),1),e("option",le,l(t[a.lang].buildEnvSpc),1),e("option",oe,l(t[a.lang].buildEnvDocker),1)],512),[[k,p.value]])]),p.value==="spc"?(i(),c("div",ne,[e("span",ae,l(t[a.lang].selectedOS),1),s(e("select",{"onUpdate:modelValue":n[4]||(n[4]=o=>f.value=o)},ce,512),[[k,f.value]])])):V("",!0),e("div",ue,[e("span",re,l(t[a.lang].downloadPhpVersion),1),s(e("select",{"onUpdate:modelValue":n[5]||(n[5]=o=>y.value=o)},[(i(),c(E,null,I(O,o=>e("option",{value:o},l(o),9,me)),64))],512),[[k,y.value]])]),e("div",ve,[e("span",pe,l(t[a.lang].useDebug),1),s(e("input",{type:"radio",id:"debug-yes",value:1,"onUpdate:modelValue":n[6]||(n[6]=o=>r.value=o)},null,512),[[m,r.value]]),e("label",he,l(t[a.lang].yes),1),s(e("input",{type:"radio",id:"debug-no",value:0,"onUpdate:modelValue":n[7]||(n[7]=o=>r.value=o)},null,512),[[m,r.value]]),e("label",be,l(t[a.lang].no),1)]),e("div",ge,[e("span",xe,l(t[a.lang].useZTS),1),s(e("input",{type:"radio",id:"zts-yes",value:1,"onUpdate:modelValue":n[8]||(n[8]=o=>h.value=o)},null,512),[[m,h.value]]),e("label",ye,l(t[a.lang].yes),1),s(e("input",{type:"radio",id:"zts-no",value:0,"onUpdate:modelValue":n[9]||(n[9]=o=>h.value=o)},null,512),[[m,h.value]]),e("label",we,l(t[a.lang].no),1)]),e("div",fe,[e("span",_e,l(t[a.lang].resultShowDownload),1),s(e("input",{type:"radio",id:"show-download-yes",value:1,"onUpdate:modelValue":n[10]||(n[10]=o=>b.value=o)},null,512),[[m,b.value]]),e("label",Se,l(t[a.lang].yes),1),s(e("input",{type:"radio",id:"show-download-no",value:0,"onUpdate:modelValue":n[11]||(n[11]=o=>b.value=o)},null,512),[[m,b.value]]),e("label",Ce,l(t[a.lang].no),1)]),e("h2",null,l(t[a.lang].hardcodedINI),1),s(e("textarea",{class:"textarea",placeholder:t[a.lang].hardcodedINIPlacehoder,"onUpdate:modelValue":n[12]||(n[12]=o=>w.value=o),rows:"5"},null,8,Ee),[[A,w.value]]),e("h2",null,l(t[a.lang].resultShow),1),p.value==="spc"?(i(),c("div",Ie,[e("b",null,l(t[a.lang].downloadSPCBinaryCommand),1),e("div",ke,[L(" curl -o spc.tgz https://dl.static-php.dev/static-php-cli/spc-bin/nightly/spc-"+l(f.value)+".tar.gz && tar -zxvf spc.tgz && rm spc.tgz",1),Ne])])):V("",!0),b.value?(i(),c("div",ze,[e("b",null,l(t[a.lang].downloadExtOnlyCommand),1),e("div",Ve,l(_.value)+" download --with-php="+l(y.value)+' --for-extensions "'+l(N.value)+'"'+l(r.value?" --debug":""),1)])):(i(),c("div",De,[e("b",null,l(t[a.lang].downloadAllCommand),1),e("div",Oe,l(_.value)+" download --all --with-php="+l(y.value)+l(r.value?" --debug":""),1)])),e("div",Pe,[e("b",null,l(t[a.lang].compileCommand),1),e("div",Te,l(_.value)+" build "+l(z.value)+' "'+l(N.value)+'"'+l(r.value?" --debug":"")+l(h.value?" --enable-zts":"")+l(U.value),1)])]))}});const Ge=j(Ue,[["__scopeId","data-v-ffecfdc6"]]);export{Ge as C};
