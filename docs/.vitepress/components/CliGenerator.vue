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
        <option value="docker">{{ I18N[lang].buildEnvDocker }}</option>
      </select>
    </div>
    <div class="option-line">
      <span class="option-title">{{ I18N[lang].useDebug }}</span>
      <input type="radio" id="debug-yes" :value="1" v-model="debug" />
      <label for="debug-yes">{{ I18N[lang].yes }}</label>

      <input type="radio" id="debug-no" :value="0" v-model="debug" />
      <label for="debug-no">{{ I18N[lang].no }}</label>
    </div>
    <h2>{{ I18N[lang].resultShow }}</h2>
    <div class="command-preview">bin/{{ spcCommand }} build {{ buildCommand }} "{{ extList }}"{{ debug ? ' --debug' : '' }}</div>
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

const I18N = {
  zh: {
    selectExt: '选择扩展',
    buildTarget: '选择编译目标',
    buildOptions: '编译选项',
    buildEnvironment: '编译环境',
    buildEnvNative: '本地构建',
    buildEnvDocker: 'Alpine Docker 构建',
    useDebug: '是否开启调试输出',
    yes: '是',
    no: '否',
    resultShow: '结果展示',
    selectCommon: '选择常用扩展',
    selectNone: '全部取消选择',
  },
  en: {
    selectExt: 'Select Extensions',
    buildTarget: 'Build Target',
    buildOptions: 'Build Options',
    buildEnvironment: 'Build Environment',
    buildEnvNative: 'Native build',
    buildEnvDocker: 'Alpine docker build',
    useDebug: 'Enable debug message',
    yes: 'Yes',
    no: 'No',
    resultShow: 'Result',
    selectCommon: 'Select common extensions',
    selectNone: 'Unselect all',
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
  'gmp',
  'iconv',
  'imagick',
  'inotify',
  'intl',
  'mbstring',
  'mbregex',
  'mongodb',
  'mysqli',
  'mysqlnd',
  'opcache',
  'openssl',
  'pcntl',
  'pdo',
  'pdo_mysql',
  'pdo_sqlite',
  'phar',
  'posix',
  'protobuf',
  'readline',
  'redis',
  'session',
  'shmop',
  'simplexml',
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
  'zip',
  'zlib',
  'zstd',
];

const TARGET = [
  'cli',
  'fpm',
  'micro',
  'all',
];

const selectCommon = () => {
  checkedNames.value = [
      'bcmath', 'calendar', 'ctype',
      'curl', 'dba', 'dom',
      'exif', 'filter', 'fileinfo',
      'gd', 'iconv', 'mbstring',
      'mbregex', 'mysqli', 'mysqlnd',
      'openssl', 'pcntl', 'pdo',
      'pdo_mysql', 'pdo_sqlite', 'phar',
      'posix', 'readline', 'redis',
      'session', 'simplexml', 'sockets',
      'sqlite3', 'tokenizer', 'xml',
      'xmlreader', 'xmlwriter', 'zip',
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

// chosen debug
const debug = ref(0);

// spc command string, alt: spc-alpine-docker, spc
const spcCommand = computed(() => {
  return selectedEnv.value === 'native' ? 'spc' : 'spc-alpine-docker';
});
// build target string
const buildCommand = ref('--build-cli');

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
</style>