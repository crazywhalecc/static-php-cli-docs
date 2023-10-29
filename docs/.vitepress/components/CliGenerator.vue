<template>
  <div>
    <h2>{{ I18N[lang].selectExt }}</h2>
    <div class="box">
      <div v-for="(item) in EXTENSIONS" class="ext-item">
        <input type="checkbox" :id="item" :value="item" v-model="checkedNames">
        <label :for="item">{{ item }}</label>
      </div>
    </div>
    <div class="my-btn" @click="selectCommon">{{ I18N[lang].selectCommon }}</div>
    <div class="my-btn" @click="checkedNames = []">{{ I18N[lang].selectNone }}</div>
    <h2>{{ I18N[lang].buildTarget }}</h2>
    <div class="box">
      <div v-for="(item) in TARGET" class="ext-item">
        <input type="checkbox" :id="'build_' + item" :value="item" v-model="checkedTargets" @change="onTargetChange">
        <label :for="'build_' + item">{{ item }}</label>
      </div>
    </div>
    <h2>{{ I18N[lang].buildOptions }}</h2>
    <div class="option-line">
      <span class="option-title">{{ I18N[lang].buildEnvironment }}</span>
      <select v-model="selectedEnv">
        <option value="native">{{ I18N[lang].buildEnvNative }}</option>
        <option value="spc">{{ I18N[lang].buildEnvSpc }}</option>
        <option value="docker">{{ I18N[lang].buildEnvDocker }}</option>
      </select>
    </div>
    <div class="option-line">
      <span class="option-title">{{ I18N[lang].downloadPhpVersion }}</span>
      <select v-model="selectedPhpVersion">
        <option v-for="item in availablePhpVersions" :value="item">{{ item }}</option>
      </select>
    </div>
    <div class="option-line">
      <span class="option-title">{{ I18N[lang].useDebug }}</span>
      <input type="radio" id="debug-yes" :value="1" v-model="debug" />
      <label for="debug-yes">{{ I18N[lang].yes }}</label>

      <input type="radio" id="debug-no" :value="0" v-model="debug" />
      <label for="debug-no">{{ I18N[lang].no }}</label>
    </div>
    <div class="option-line">
      <span class="option-title">{{ I18N[lang].useZTS }}</span>
      <input type="radio" id="zts-yes" :value="1" v-model="zts" />
      <label for="zts-yes">{{ I18N[lang].yes }}</label>

      <input type="radio" id="zts-no" :value="0" v-model="zts" />
      <label for="zts-no">{{ I18N[lang].no }}</label>
    </div>
    <div class="option-line">
      <span class="option-title">{{ I18N[lang].resultShowDownload }}</span>
      <input type="radio" id="show-download-yes" :value="1" v-model="downloadByExt" />
      <label for="show-download-yes">{{ I18N[lang].yes }}</label>

      <input type="radio" id="show-download-no" :value="0" v-model="downloadByExt" />
      <label for="show-download-no">{{ I18N[lang].no }}</label>
    </div>
    <h2>{{ I18N[lang].hardcodedINI }}</h2>
    <textarea class="textarea" :placeholder="I18N[lang].hardcodedINIPlacehoder" v-model="hardcodedINIData" rows="5" />
    <h2>{{ I18N[lang].resultShow }}</h2>
    <div v-if="downloadByExt" class="command-container">
      <b>{{ I18N[lang].downloadExtOnlyCommand }}</b>
      <div class="command-preview">{{ spcCommand }} download --with-php={{ selectedPhpVersion }} --for-extensions "{{ extList }}"{{ debug ? ' --debug' : '' }}</div>
    </div>
    <div v-else class="command-container">
      <b>{{ I18N[lang].downloadAllCommand }}</b>
      <div class="command-preview">{{ spcCommand }} download --all --with-php={{ selectedPhpVersion }}{{ debug ? ' --debug' : '' }}</div>
    </div>
    <div class="command-container">
      <b>{{ I18N[lang].compileCommand }}</b>
      <div class="command-preview">{{ spcCommand }} build {{ buildCommand }} "{{ extList }}"{{ debug ? ' --debug' : '' }}{{ zts ? ' --enable-zts' : '' }}{{ displayINI }}</div>
    </div>

  </div>
</template>

<script lang="ts">
export default {
  name: "CliGenerator"
}
</script>

<script setup lang="ts">
import {computed, ref} from "vue";

defineProps({
  lang: {
    type: String,
    default: 'zh',
  }
});

const availablePhpVersions = [
  '7.4',
  '8.0',
  '8.1',
  '8.2',
];

const I18N = {
  zh: {
    selectExt: '选择扩展',
    buildTarget: '选择编译目标',
    buildOptions: '编译选项',
    buildEnvironment: '编译环境',
    buildEnvNative: '本地构建（Git 源码）',
    buildEnvSpc: '本地构建（独立 spc 二进制）',
    buildEnvDocker: 'Alpine Docker 构建',
    useDebug: '是否开启调试输出',
    yes: '是',
    no: '否',
    resultShow: '结果展示',
    selectCommon: '选择常用扩展',
    selectNone: '全部取消选择',
    useZTS: '是否编译线程安全版',
    hardcodedINI: '硬编码 INI 选项',
    hardcodedINIPlacehoder: '如需要硬编码 ini，每行写一个，例如：memory_limit=2G',
    resultShowDownload: '是否展示仅下载对应扩展依赖的命令',
    downloadExtOnlyCommand: '只下载对应扩展的依赖包命令',
    downloadAllCommand: '下载所有依赖包命令',
    compileCommand: '编译命令',
    downloadPhpVersion: '下载 PHP 版本',
  },
  en: {
    selectExt: 'Select Extensions',
    buildTarget: 'Build Target',
    buildOptions: 'Build Options',
    buildEnvironment: 'Build Environment',
    buildEnvNative: 'Native build (Git source code)',
    buildEnvSpc: 'Native build (standalone spc binary)',
    buildEnvDocker: 'Alpine docker build',
    useDebug: 'Enable debug message',
    yes: 'Yes',
    no: 'No',
    resultShow: 'Result',
    selectCommon: 'Select common extensions',
    selectNone: 'Unselect all',
    useZTS: 'Enable ZTS',
    hardcodedINI: 'Hardcoded INI options',
    hardcodedINIPlacehoder: 'If you need to hardcode ini, write one per line, for example: memory_limit=2G',
    resultShowDownload: 'Download with corresponding extension dependencies',
    downloadExtOnlyCommand: 'Download sources by extensions command',
    downloadAllCommand: 'Download all sources command',
    compileCommand: 'Compile command',
    downloadPhpVersion: 'Download PHP version',
  }
};

const EXTENSIONS = [
  'apcu',
  'bcmath',
  'bz2',
  'calendar',
  'ctype',
  'curl',
  'dba',
  'dom',
  'event',
  'exif',
  'ffi',
  'filter',
  'fileinfo',
  'gd',
  'glfw',
  'gmp',
  'iconv',
  'imagick',
  'inotify',
  'intl',
  'ldap',
  'mbstring',
  'mbregex',
  'memcache',
  'mongodb',
  'mysqli',
  'mysqlnd',
  'opcache',
  'openssl',
  'pcntl',
  'pdo',
  'pdo_mysql',
  'pdo_sqlite',
  'pdo_pgsql',
  'pgsql',
  'phar',
  'posix',
  'protobuf',
  'readline',
  'redis',
  'session',
  'shmop',
  'simplexml',
  'snappy',
  'soap',
  'sockets',
  'sodium',
  'sqlite3',
  'ssh2',
  'swow',
  'swoole',
  'tokenizer',
  'xlswriter',
  'xml',
  'xmlreader',
  'xmlwriter',
  'xsl',
  'zip',
  'zlib',
  'zstd',
];

const TARGET = [
  'cli',
  'fpm',
  'micro',
  'embed',
  'all',
];

const selectCommon = () => {
  checkedNames.value = [
      'bcmath', 'calendar', 'ctype',
      'curl', 'dba', 'dom',
      'exif', 'filter', 'fileinfo',
      'gd', 'iconv', 'mbstring',
      'mbregex', 'mysqli', 'mysqlnd',
      'openssl', 'pcntl', 'pdo', 'intl',
      'pdo_mysql', 'pdo_sqlite', 'pgsql', 'pdo_pgsql', 'phar',
      'posix', 'readline', 'redis',
      'session', 'simplexml', 'sockets',
      'sodium',
      'sqlite3', 'tokenizer', 'xml',
      'xmlreader', 'xmlwriter', 'xsl', 'zip',
      'zlib',
  ];
};

const extList = computed(() => {
  return checkedNames.value.join(',');
});

// chosen extensions
const checkedNames = ref([]);

// chose targets
const checkedTargets = ref(['cli']);

// chosen env
const selectedEnv = ref('native');

// chosen php version
const selectedPhpVersion = ref('8.2');

// chosen debug
const debug = ref(0);

// chosen zts
const zts = ref(0);

// chosen download by extensions
const downloadByExt = ref(0);

const hardcodedINIData = ref('');

// spc command string, alt: spc-alpine-docker, spc
const spcCommand = computed(() => {
  switch (selectedEnv.value) {
    case 'native':
      return 'bin/spc';
    case 'spc':
      return './spc';
    case 'docker':
      return 'bin/spc-alpine-docker';
    default:
      return '';
  }
});
// build target string
const buildCommand = ref('--build-cli');

const displayINI = computed(() => {
  const split = hardcodedINIData.value.split('\n');
  let str = [];
  split.forEach((x) => {
    if (x.indexOf('=') >= 1) {
      str.push(x);
    }
  });
  return ' ' + str.map((x) => '-I "' + x + '"').join(' ');
});

const onTargetChange = (event) => {
  let id;
  if (checkedTargets.value.indexOf('all') !== -1 && event.target.value === 'all') {
    checkedTargets.value = ['all'];
  } else if ((id = checkedTargets.value.indexOf('all')) !== -1 && event.target.value !== 'all') {
    checkedTargets.value.splice(id, 1);
  }
  buildCommand.value = checkedTargets.value.map((x) => '--build-' + x).join(' ');
};


</script>

<style scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
}
.ext-item {
  margin: 4px 8px;
}
h2 {
  margin-bottom: 8px;
}
.command-preview {
  padding: 1.2rem;
  background: var(--vp-c-divider);
  font-family: monospace;
  overflow-wrap: break-word;
}
.option-line {
  padding: 4px 8px;
}
.option-title {
  margin: 4px 8px 4px 4px;
  font-weight: bold;
}
select {
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  padding: 0 4px;
  width: 300px;
}
.my-btn {
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
  border-radius: 8px;
  padding: 0 16px;
  line-height: 32px;
  font-size: 14px;
  display: inline-block;
  text-align: center;
  font-weight: 600;
  margin-right: 8px;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  cursor: pointer;
  border: 1px solid var(--vp-button-alt-border);
}
.my-btn:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}
.my-btn:active {
  border-color: var(--vp-button-alt-active-border);
  color: var(--vp-button-alt-active-text);
  background-color: var(--vp-button-alt-active-bg);
}
.textarea {
  border: 1px solid var(--vp-button-alt-border);
  padding: 0 4px;
  min-width: 300px;
}

.command-container {
  margin-bottom: 24px;
}
</style>