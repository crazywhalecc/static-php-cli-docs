# 资源模块

static-php-cli 的下载资源模块是一个主要的功能，它包含了所依赖的库、外部扩展、PHP 源码的下载方式和资源解压方式。
下载的配置文件主要涉及 `source.json` 文件，这个文件记录了所有可下载的资源的下载方式。

下载功能主要涉及的命令有 `bin/spc download` 和 `bin/spc extract`。其中 `download` 命令是一个下载器，它会根据配置文件下载资源；
`extract` 命令是一个解压器，它会根据配置文件解压资源。

一般来说，下载资源可能会比较慢，因为这些资源来源于各个官网、GitHub 等不同位置，同时它们也占用了较大空间，所以你可以在一次下载资源后，可重复使用。

下载器的配置文件是 `source.json`，它包含了所有资源的下载方式，你可以在其中添加你需要的资源下载方式，也可以修改已有的资源下载方式。

每个资源的下载配置结构如下，下面是 `libevent` 扩展对应的资源下载配置：

```json
{
  "libevent": {
    "type": "ghrel",
    "repo": "libevent/libevent",
    "match": "libevent.+\\.tar\\.gz",
    "license": {
      "type": "file",
      "path": "LICENSE"
    }
  }
}
```

这里最主要的字段是 `type`，目前它支持的类型有：

- `url`: 直接使用 URL 下载，例如：`https://download.libsodium.org/libsodium/releases/libsodium-1.0.18.tar.gz`。
- `ghrel`: 使用 GitHub Release API 下载，即从 GitHub 项目发布的最新版本中上传的附件下载。
- `ghtar`: 使用 GitHub Release API 下载，与 `ghrel` 不同的是，`ghtar` 是从项目的最新 Release 中找 `source code (tar.gz)` 下载的。
- `ghtagtar`: 使用 GitHub Release API 下载，与 `ghtar` 相比，`ghtagtar` 可以从 `tags` 列表找最新的，并下载 `tar.gz` 格式的源码（因为有些项目只使用了 `tag` 发布版本）。
- `bitbuckettag`: 使用 BitBucket API 下载，基本和 `ghtagtar` 相同，只是这个适用于 BitBucket。
- `git`: 直接从一个 Git 地址克隆项目来下载资源，适用于任何公开 Git 仓库。
- `filelist`: 使用爬虫爬取提供文件索引的 Web 下载站点，并获取最新版本的文件名并下载。
- `custom`: 如果以上下载方式都不能满足，你可以编写 `custom` 后，在 `src/SPC/store/source/` 下新建一个类，并继承 `CustomSourceBase`，自己编写下载脚本。

(TODO)