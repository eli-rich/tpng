# Tinypng CLI

This is a simple CLI tool to upload images to the tinify/tinypng API.

I was using another tool like this one that I found incredibly useful, but unfortunately the project seems dead. So I rewrote my own!
The CLI stores your key in `~/.config/tpng/config.json`.

To use, just run `tpng key {KEY}` once!

Then, `tpng <image>`.

This CLI tool also supports globbing, but it does not validate that the files you select are images! You will get an error if that is the case.

**[WARNING]: THIS PROGRAM OVERWRITES THE SELECTED FILE.**

- [Tinypng CLI](#tinypng-cli)
  - [Installation](#installation)
  - [Usage](#usage)

## Installation

```sh
npm i -g tpng-cli
```

## Usage

```sh
tpng key {YOUR API KEY}
```

```sh
tpng <image>
```
