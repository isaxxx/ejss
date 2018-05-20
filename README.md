# ejss

Tools to convert EJS to HTML with detailed options.

[![NPM](https://nodei.co/npm/ejss.png)](https://nodei.co/npm/ejss/)
[![Build Status](https://travis-ci.org/isaxxx/ejss.svg?branch=master)](https://travis-ci.org/isaxxx/ejss)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

## Installation

### npm

```bash
$ npm install ejss --save
```

## Usage

```
Options:
  --src           source directory path. [string] [default: "src/ejs/**/*.ejs"]
  --dest          destination directory path. [string] [default: "dest"]
  --options       options json file path. (need setting root directory) [string] [default: "src/ejs/options.json"]
  --personal      personal key in options file. [string] [default: "personal"]
  --version, -v   show this version. [boolean]
  --help, -h      show this help. [boolean]
```

## Example

```bash
$ ejss --src src/ --dest dest/ --options src/options.json --personal personal
```

##### src/options.json

```json
{
  "common": {
    "description": "dummy text."
  },
  "personal": {
    "/index.ejs": {
      "title": "Index"
    },
    "/about.ejs": {
      "title": "About"
    }
  }
}
```

##### src/index.ejs

```html
<html>
  <h1><%= personal.title %></h1>
  <p><%= common.description %></p>
</html>
<!--
<html>
  <h1>Index</h1>
  <p>dummy text.</p>
</html>
-->
```

##### src/about.ejs

```html
<html>
  <h1><%= personal.title %></h1>
  <p><%= common.description %></p>
</html>
<!--
<html>
  <h1>About</h1>
  <p>dummy text.</p>
</html>
-->
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
