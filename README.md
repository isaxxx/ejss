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
  --src source directory path. [string] [default: './src/ejs/**/*.ejs']
  --dest destination directory path. [string] [default: './dest/']
  --data data json file path. [string] [default: './src/ejs/data.json']
  --compression whether to compression. [bool] [default: false]
  --lint htmlhint config file path. [string] [default: '']
  --log whether to log. [bool] [default: true]
  --version, -v show this version. [boolean]
  --help, -h show this help. [boolean]
```

## Example

```bash
$ ejss --src ./src/ejs/**/*.ejs --dest ./dest/ --data ./src/ejs/data.json --compression false --log true
```

### ./src/ejs/data.json

```json
{
  "common": {
    "description": "dummy text."
  },
  "page": {
    "/index.ejs": {
      "title": "Index"
    },
    "/about.ejs": {
      "title": "About"
    }
  }
}
```

### ./src/ejs/index.ejs

```html
<html>
  <h1><%= page.title %></h1>
  <p><%= common.description %></p>
</html>
<!--
<html>
  <h1>Index</h1>
  <p>dummy text.</p>
</html>
-->
```

### ./src/ejs/about.ejs

```html
<html>
  <h1><%= page.title %></h1>
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
