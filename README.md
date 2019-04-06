# public_suffix

[![GitHub Release](https://img.shields.io/github/release/toddsundsted/public_suffix.svg)](https://github.com/toddsundsted/public_suffix/releases)
[![Build Status](https://travis-ci.org/toddsundsted/public_suffix.svg?branch=master)](https://travis-ci.org/toddsundsted/public_suffix)
[![Documentation](https://img.shields.io/badge/docs-available-brightgreen.svg)](https://toddsundsted.github.io/public_suffix/)

The [Public Suffix List](https://publicsuffix.org/) is "a cross-vendor
initiative to provide an accurate list of domain name suffixes". Such
a list is necessary because "there was and remains no algorithmic
method of finding the highest level at which a domain may be
registered for a particular top-level domain...".

`public_suffix` is a small Crystal library designed to make the Public
Suffix List easier to use. The library will transparently download the
latest list of rules, parse the rules, and optionally cache
them. Source URL, cache directory, and cache expiry are all
configurable.

The public API is as simple as I could make it.  Instantiating the
`PublicSuffix` class creates a new instance with reasonable defaults
(downloads and caches the official list of rules for 30 days).

There are three instance methods:

* `PublicSuffix#tld` returns the top-level domain name
* `PublicSuffix#cdn` returns the canonical domain name
* `PublicSuffix#split`splits the domain name into parts

## Features

* Transparent download of the official domain rules file
* Optional caching of domain rules data, with refetch upon expiry
* Tiny API

## Installation

1. Add the dependency to your `shard.yml`:

       dependencies:
         public_suffix:
           github: toddsundsted/public_suffix

2. Run `shards install`

## Synopsis

    require "public_suffix"

    # Downloads and parses the latest data file and returns
    # the top-level domain name
    PublicSuffix.new.tld("foobar.com") # => "com"

    # Downloads and parses the latest data file and returns
    # the canonical domain name
    PublicSuffix.new.cdn("foobar.com") # => "foobar.com"

    # Downloads and parses the latest data file, caches it in /tmp,
    # and splits the domain name into parts
    PublicSuffix.new(cache_dir: "/tmp").split("abc.xyz.co.uk") # => ["abc", "xyz", "co.uk"].

    # Downloads and caches data in /tmp if it is less than
    # 100 seconds old, parses it, and splits the domain name
    # into parts
    PublicSuffix.new(cache_dir: "/tmp", cache_expiry_period: 100).split("test.parliament.uk") # => ["test", "parliament", "uk"]

    # You don't have to instantiate PublicSuffix every time you use it
    p = PublicSuffix.new
    p.split("fee.fi.fo.com") # => ["fee.fi", "fo", "com"]
    p.cdn("fee.fi.fo.com")   # => "fo.com", "cdn" means "canonical domain name"
    p.tld("fee.fi.fo.com")   # => "com", "tld" means "top-level domain"

    # You can even use other data files, both local and remote
    # (as long as they conform to the Public Suffix List file format)
    PublicSuffix.new(url: "file://./spec/test.dat")

## Contributing

1. Fork it (<https://github.com/toddsundsted/public_suffix/fork>)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Contributors

- [Todd Sundsted](https://github.com/toddsundsted) - creator and maintainer
