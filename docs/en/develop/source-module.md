# Source module

The download source module of static-php-cli is a major module.
It includes dependent libraries, external extensions, PHP source code download methods and file decompression methods.
The download configuration file mainly involves the `source.json` file, which records the download method of all downloadable resources.

The main commands involved in the download function are `bin/spc download` and `bin/spc extract`. 
The `download` command is a downloader that downloads resources according to the configuration file, 
and the `extract` command is an extractor that extract sources from downloaded files.

Generally speaking, downloading resources may be slow because these resources come from various official websites, GitHub, 
and other different locations. 
At the same time, they also occupy a large space, so you can download the resources once and reuse them.

The configuration file of the downloader is `source.json`, which contains the download methods of all resources. 
You can add the resource download methods you need, or modify the existing resource download methods.

The download configuration structure of each resource is as follows. 
The following is the resource download configuration corresponding to the `libevent` extension:

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

The most important field here is `type`. Currently, the types it supports are:

- `url`: Directly use URL to download, for example: `https://download.libsodium.org/libsodium/releases/libsodium-1.0.18.tar.gz`.
- `ghrel`: Use the GitHub Release API to download, download the artifacts uploaded from the latest version released by maintainers.
- `ghtar`: Use the GitHub Release API to download. 
    Different from `ghrel`, `ghtar` is downloaded from the `source code (tar.gz)` in the latest Release of the project.
- `ghtagtar`: Use GitHub Release API to download. 
    Compared with `ghtar`, `ghtagtar` can find the latest one from the `tags` list and download the source code in `tar.gz` format 
    (because some projects only use `tag` release version).
- `bitbuckettag`: Download using BitBucket API, basically the same as `ghtagtar`, except this one applies to BitBucket.
- `git`: Clone the project directly from a Git address to download resources, applicable to any public Git repository.
- `filelist`: Use a crawler to crawl the Web download site that provides file index,
    and get the latest version of the file name and download it.
- `custom`: If none of the above download methods are satisfactory, you can write `custom`, 
    create a new class under `src/SPC/store/source/`, inherit `CustomSourceBase`, and write the download script yourself.

(TODO)