crystal_doc_search_index_callback({"repository_name":"public_suffix","body":"# public_suffix\n\n[![GitHub Release](https://img.shields.io/github/release/toddsundsted/public_suffix.svg)](https://github.com/toddsundsted/public_suffix/releases)\n[![Build Status](https://travis-ci.org/toddsundsted/public_suffix.svg?branch=master)](https://travis-ci.org/toddsundsted/public_suffix)\n[![Documentation](https://img.shields.io/badge/docs-available-brightgreen.svg)](https://toddsundsted.github.io/public_suffix/)\n\nThe [Public Suffix List](https://publicsuffix.org/) is \"a cross-vendor\ninitiative to provide an accurate list of domain name suffixes\". Such\na list is necessary because \"there was and remains no algorithmic\nmethod of finding the highest level at which a domain may be\nregistered for a particular top-level domain...\".\n\n`public_suffix` is a small Crystal library designed to make the Public\nSuffix List easier to use. The library will transparently download the\nlatest list of rules, parse the rules, and optionally cache\nthem. Source URL, cache directory, and cache expiry are all\nconfigurable.\n\nThe public API is as simple as I could make it.  Instantiating the\n`PublicSuffix` class creates a new instance with reasonable defaults\n(downloads and caches the official list of rules for 30 days).\n\nThere are three instance methods:\n\n* `PublicSuffix#tld` returns the top-level domain name\n* `PublicSuffix#cdn` returns the canonical domain name\n* `PublicSuffix#split`splits the domain name into parts\n\n## Features\n\n* Transparent download of the official domain rules file\n* Optional caching of domain rules data, with refetch upon expiry\n* Tiny API\n\n## Installation\n\n1. Add the dependency to your `shard.yml`:\n\n       dependencies:\n         public_suffix:\n           github: toddsundsted/public_suffix\n\n2. Run `shards install`\n\n## Synopsis\n\n    require \"public_suffix\"\n\n    # Downloads and parses the latest data file and returns\n    # the top-level domain name\n    PublicSuffix.new.tld(\"foobar.com\") # => \"com\"\n\n    # Downloads and parses the latest data file and returns\n    # the canonical domain name\n    PublicSuffix.new.cdn(\"foobar.com\") # => \"foobar.com\"\n\n    # Downloads and parses the latest data file, caches it in /tmp,\n    # and splits the domain name into parts\n    PublicSuffix.new(cache_dir: \"/tmp\").split(\"abc.xyz.co.uk\") # => [\"abc\", \"xyz\", \"co.uk\"].\n\n    # Downloads and caches data in /tmp if it is less than\n    # 100 seconds old, parses it, and splits the domain name\n    # into parts\n    PublicSuffix.new(cache_dir: \"/tmp\", cache_expiry_period: 100).split(\"test.parliament.uk\") # => [\"test\", \"parliament\", \"uk\"]\n\n    # You don't have to instantiate PublicSuffix every time you use it\n    p = PublicSuffix.new\n    p.split(\"fee.fi.fo.com\") # => [\"fee.fi\", \"fo\", \"com\"]\n    p.cdn(\"fee.fi.fo.com\")   # => \"fo.com\", \"cdn\" means \"canonical domain name\"\n    p.tld(\"fee.fi.fo.com\")   # => \"com\", \"tld\" means \"top-level domain\"\n\n    # You can even use other data files, both local and remote\n    # (as long as they conform to the Public Suffix List file format)\n    PublicSuffix.new(url: \"file://./spec/test.dat\")\n\n## Contributing\n\n1. Fork it (<https://github.com/toddsundsted/public_suffix/fork>)\n2. Create your feature branch (`git checkout -b my-new-feature`)\n3. Commit your changes (`git commit -am 'Add some feature'`)\n4. Push to the branch (`git push origin my-new-feature`)\n5. Create a new Pull Request\n\n## Contributors\n\n- [Todd Sundsted](https://github.com/toddsundsted) - creator and maintainer\n","program":{"html_id":"public_suffix/toplevel","path":"toplevel.html","kind":"module","full_name":"Top Level Namespace","name":"Top Level Namespace","abstract":false,"superclass":null,"ancestors":[],"locations":[],"repository_name":"public_suffix","program":true,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[{"html_id":"public_suffix/PublicSuffix","path":"PublicSuffix.html","kind":"class","full_name":"PublicSuffix","name":"PublicSuffix","abstract":false,"superclass":{"html_id":"public_suffix/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"public_suffix/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"public_suffix/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/public_suffix.cr","line_number":15,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix.cr#L15"},{"filename":"src/public_suffix/cached_list.cr","line_number":4,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/cached_list.cr#L4"},{"filename":"src/public_suffix/parser.cr","line_number":1,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/parser.cr#L1"}],"repository_name":"public_suffix","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[{"id":"VERSION","name":"VERSION","value":"\"0.1.1\"","doc":null,"summary":null}],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":"The [Public Suffix List](https://publicsuffix.org/) library.\n\nThe Public Suffix List is \"a cross-vendor initiative to provide an\naccurate list of domain name suffixes\". Such a list is necessary\nbecause \"there was and remains no algorithmic method of finding the\nhighest level at which a domain may be registered for a particular\ntop-level domain...\".\n\n`public_suffix` is a small Crystal library designed to make the\nPublic Suffix List easier to use. The library will transparently\ndownload the latest list of rules, parse the rules, and optionally\ncache them. Source URL, cache directory, and cache expiry are all\nconfigurable.\n","summary":"<p>The <a href=\"https://publicsuffix.org/\">Public Suffix List</a> library.</p>","class_methods":[],"constructors":[{"id":"new(**kwargs)-class-method","html_id":"new(**kwargs)-class-method","name":"new","doc":"Creates a new `PublicSuffix` instance. By default, it fetches and\ncaches the official list of rules. Specify the cache directory\nwith *cache_dir* (the default is the system temp directory) and\nthe cache expiry with *cache_expiry_period* in seconds (the\ndefault it 30 days). An expiry of `0` means cache indefinitely; a\nnegative value means do not cache. Download rules from another\nsource by specifying the *url*.\n    PublicSuffix.new(cache_dir: \"/tmp\", cache_expiry_period: 3600, url: \"file:///var/data/test.dat\")\n","summary":"<p>Creates a new <code><a href=\"PublicSuffix.html\">PublicSuffix</a></code> instance.</p>","abstract":false,"args":[],"args_string":"(**kwargs)","args_html":"(**kwargs)","location":{"filename":"src/public_suffix.cr","line_number":35,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix.cr#L35"},"def":{"name":"new","args":[],"double_splat":{"name":"kwargs","doc":null,"default_value":"","external_name":"kwargs","restriction":""},"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(**kwargs)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"id":"cdn(domain)-instance-method","html_id":"cdn(domain)-instance-method","name":"cdn","doc":"Returns the full canonical domain name:\n    cdn(\"www.city.kawasaki.jp\") # => \"city.kawasaki.jp\"\n","summary":"<p>Returns the full canonical domain name:     cdn(\"www.city.kawasaki.jp\") # => \"city.kawasaki.jp\" </p>","abstract":false,"args":[{"name":"domain","doc":null,"default_value":"","external_name":"domain","restriction":""}],"args_string":"(domain)","args_html":"(domain)","location":{"filename":"src/public_suffix.cr","line_number":105,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix.cr#L105"},"def":{"name":"cdn","args":[{"name":"domain","doc":null,"default_value":"","external_name":"domain","restriction":""}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"domain = domain.split(\".\")\nresult = best(match(domain, rules, true))\nif result.empty?\n  return \"\"\nend\n(take(domain, result.size + 1)).join(\".\")\n"}},{"id":"split(domain)-instance-method","html_id":"split(domain)-instance-method","name":"split","doc":"Splits the domain name into a three-element list consisting of\n(from right to left) the top-level domain name, the canonical\nname, and everything else:\n    split(\"www.city.kawasaki.jp\") # => [\"www\", \"city\", \"kawasaki.jp\"]\n","summary":"<p>Splits the domain name into a three-element list consisting of (from right to left) the top-level domain name, the canonical name, and everything else:     split(\"www.city.kawasaki.jp\") # => [\"www\", \"city\", \"kawasaki.jp\"] </p>","abstract":false,"args":[{"name":"domain","doc":null,"default_value":"","external_name":"domain","restriction":""}],"args_string":"(domain)","args_html":"(domain)","location":{"filename":"src/public_suffix.cr","line_number":85,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix.cr#L85"},"def":{"name":"split","args":[{"name":"domain","doc":null,"default_value":"","external_name":"domain","restriction":""}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"domain = domain.split(\".\")\nresult = best(match(domain, rules, true))\nif result.empty?\n  return [\"\", \"\", \"\"]\nend\n[take(domain, result.size), take(domain), domain].map(&.join(\".\")).reverse\n"}},{"id":"take(domain,n=1)-instance-method","html_id":"take(domain,n=1)-instance-method","name":"take","doc":"Takes the specified number off the list. Returns an empty list if\nthe specified number aren't available.","summary":"<p>Takes the specified number off the list.</p>","abstract":false,"args":[{"name":"domain","doc":null,"default_value":"","external_name":"domain","restriction":""},{"name":"n","doc":null,"default_value":"1","external_name":"n","restriction":""}],"args_string":"(domain, n = <span class=\"n\">1</span>)","args_html":"(domain, n = <span class=\"n\">1</span>)","location":{"filename":"src/public_suffix.cr","line_number":76,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix.cr#L76"},"def":{"name":"take","args":[{"name":"domain","doc":null,"default_value":"","external_name":"domain","restriction":""},{"name":"n","doc":null,"default_value":"1","external_name":"n","restriction":""}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"domain.size >= n ? domain.pop(n) : [] of String"}},{"id":"tld(domain)-instance-method","html_id":"tld(domain)-instance-method","name":"tld","doc":"Returns the top-level domain name:\n    tld(\"www.city.kawasaki.jp\") # => \"kawasaki.jp\"\n","summary":"<p>Returns the top-level domain name:     tld(\"www.city.kawasaki.jp\") # => \"kawasaki.jp\" </p>","abstract":false,"args":[{"name":"domain","doc":null,"default_value":"","external_name":"domain","restriction":""}],"args_string":"(domain)","args_html":"(domain)","location":{"filename":"src/public_suffix.cr","line_number":95,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix.cr#L95"},"def":{"name":"tld","args":[{"name":"domain","doc":null,"default_value":"","external_name":"domain","restriction":""}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"domain = domain.split(\".\")\nresult = best(match(domain, rules, true))\nif result.empty?\n  return \"\"\nend\n(take(domain, result.size)).join(\".\")\n"}}],"macros":[],"types":[{"html_id":"public_suffix/PublicSuffix/CachedList","path":"PublicSuffix/CachedList.html","kind":"class","full_name":"PublicSuffix::CachedList","name":"CachedList","abstract":false,"superclass":{"html_id":"public_suffix/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"public_suffix/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"public_suffix/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/public_suffix/cached_list.cr","line_number":7,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/cached_list.cr#L7"}],"repository_name":"public_suffix","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"public_suffix/PublicSuffix","kind":"class","full_name":"PublicSuffix","name":"PublicSuffix"},"doc":"Fetches/manages/caches the list of rules.\n","summary":"<p>Fetches/manages/caches the list of rules.</p>","class_methods":[],"constructors":[{"id":"new(config:PublicSuffix::Config)-class-method","html_id":"new(config:PublicSuffix::Config)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"config","doc":null,"default_value":"","external_name":"config","restriction":"PublicSuffix::Config"}],"args_string":"(config : PublicSuffix::Config)","args_html":"(config : PublicSuffix::Config)","location":{"filename":"src/public_suffix/cached_list.cr","line_number":10,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/cached_list.cr#L10"},"def":{"name":"new","args":[{"name":"config","doc":null,"default_value":"","external_name":"config","restriction":"PublicSuffix::Config"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(config)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"id":"exists?-instance-method","html_id":"exists?-instance-method","name":"exists?","doc":"Returns true if the cached file exists.","summary":"<p>Returns true if the cached file exists.</p>","abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/public_suffix/cached_list.cr","line_number":34,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/cached_list.cr#L34"},"def":{"name":"exists?","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"File.exists?(file)"}},{"id":"expired?(now=Time.local)-instance-method","html_id":"expired?(now=Time.local)-instance-method","name":"expired?","doc":"Returns true if the cached file has expired.","summary":"<p>Returns true if the cached file has expired.</p>","abstract":false,"args":[{"name":"now","doc":null,"default_value":"Time.local","external_name":"now","restriction":""}],"args_string":"(now = <span class=\"t\">Time</span>.local)","args_html":"(now = <span class=\"t\">Time</span>.local)","location":{"filename":"src/public_suffix/cached_list.cr","line_number":39,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/cached_list.cr#L39"},"def":{"name":"expired?","args":[{"name":"now","doc":null,"default_value":"Time.local","external_name":"now","restriction":""}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"if @config.cache_expiry_period > 0\n  ((File.info(file)).modification_time + @config.cache_expiry_period.seconds) < now\nelse\n  if @config.cache_expiry_period < 0\n    true\n  else\n    false\n  end\nend"}},{"id":"rules-instance-method","html_id":"rules-instance-method","name":"rules","doc":"Returns public suffix list rules. Fetches the rules from the\nsource, and caches them if instructed to do so. The cached\nversion will be used until the expiry period is past.","summary":"<p>Returns public suffix list rules.</p>","abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/public_suffix/cached_list.cr","line_number":52,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/cached_list.cr#L52"},"def":{"name":"rules","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@rules || (@rules = (if exists? && (!expired?)\n  File.open(file, \"r\") do |f|\n    Parser.parse(f.each_line.to_a)\n  end\nelse\n  File.open(file, \"w\") do |f|\n    begin\n      case uri.scheme\n      when \"file\"\n        File.open(uri.path, \"r\") do |s|\n          IO.copy(s, f)\n        end\n      when \"http\", \"https\"\n        HTTP::Client.get(uri.to_s) do |response|\n          IO.copy(response.body_io, f)\n        end\n      else\n        raise(raise(\"invalid url: #{@config.url}\"))\n      end\n    rescue ex\n      f.delete\n      raise(ex)\n    end\n  end\n  File.open(file, \"r\") do |f|\n    Parser.parse(f.each_line.to_a)\n  end\nend))"}}],"macros":[],"types":[]},{"html_id":"public_suffix/PublicSuffix/Parser","path":"PublicSuffix/Parser.html","kind":"module","full_name":"PublicSuffix::Parser","name":"Parser","abstract":false,"superclass":null,"ancestors":[],"locations":[{"filename":"src/public_suffix/parser.cr","line_number":4,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/parser.cr#L4"}],"repository_name":"public_suffix","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"public_suffix/PublicSuffix","kind":"class","full_name":"PublicSuffix","name":"PublicSuffix"},"doc":"Defines the `.parse` method for parsing rules.\n","summary":"<p>Defines the <code><a href=\"../PublicSuffix/Parser.html#parse(rules:Enumerable(String))-class-method\">.parse</a></code> method for parsing rules.</p>","class_methods":[{"id":"parse(rules:Enumerable(String))-class-method","html_id":"parse(rules:Enumerable(String))-class-method","name":"parse","doc":"Parses rules into internal representation.\n\nParsing the following:\n    com\n    *.jp\n    *.hokkaido.jp\n    *.tokyo.jp\n    !pref.hokkaido.jp\n    !metro.tokyo.jp\n\nYields:\n    Term{\n      \"com\" => Term{:term => true},\n      \"jp\" => Term{\n        \"tokyo\" => Term{\"!metro\" => Term{:term => true}, \"*\" => Term{:term => true}},\n        \"hokkaido\" => Term{\"!pref\" => Term{:term => true}, \"*\" => Term{:term => true}},\n        \"*\" => Term{:term => true}\n      }\n    }\n","summary":"<p>Parses rules into internal representation.</p>","abstract":false,"args":[{"name":"rules","doc":null,"default_value":"","external_name":"rules","restriction":"Enumerable(String)"}],"args_string":"(rules : Enumerable(String))","args_html":"(rules : Enumerable(String))","location":{"filename":"src/public_suffix/parser.cr","line_number":37,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/parser.cr#L37"},"def":{"name":"parse","args":[{"name":"rules","doc":null,"default_value":"","external_name":"rules","restriction":"Enumerable(String)"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"if rules.empty?\n  return Term {:term => false}\nend\nrules.reduce(Term.new) do |acc, rule|\n  rule = rule.gsub(/\\s.*/, \"\")\n  if (rule.starts_with?(\"//\")) || rule.empty?\n  else\n    tmp = acc\n    (rule.split(\".\")).reject(&.empty?).reverse.each do |p|\n      if tmp.is_a?(Term)\n        if tmp.has_key?(p)\n        else\n          tmp[p] = Term.new\n        end\n        tmp = tmp[p]\n      end\n    end\n    if tmp.is_a?(Term)\n      tmp[:term] = true\n    end\n  end\n  acc\nend\n"}}],"constructors":[],"instance_methods":[],"macros":[],"types":[{"html_id":"public_suffix/PublicSuffix/Parser/Term","path":"PublicSuffix/Parser/Term.html","kind":"struct","full_name":"PublicSuffix::Parser::Term","name":"Term","abstract":false,"superclass":{"html_id":"public_suffix/Struct","kind":"struct","full_name":"Struct","name":"Struct"},"ancestors":[{"html_id":"public_suffix/Struct","kind":"struct","full_name":"Struct","name":"Struct"},{"html_id":"public_suffix/Value","kind":"struct","full_name":"Value","name":"Value"},{"html_id":"public_suffix/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/public_suffix/parser.cr","line_number":7,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/parser.cr#L7"}],"repository_name":"public_suffix","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"public_suffix/PublicSuffix/Parser","kind":"module","full_name":"PublicSuffix::Parser","name":"Parser"},"doc":"A collection of rules.\n","summary":"<p>A collection of rules.</p>","class_methods":[],"constructors":[{"id":"new-class-method","html_id":"new-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/public_suffix/parser.cr","line_number":7,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/parser.cr#L7"},"def":{"name":"new","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"x = allocate\nif x.responds_to?(:finalize)\n  ::GC.add_finalizer(x)\nend\nx\n"}}],"instance_methods":[{"id":"[](*args,**options)-instance-method","html_id":"[](*args,**options)-instance-method","name":"[]","doc":null,"summary":null,"abstract":false,"args":[{"name":"args","doc":null,"default_value":"","external_name":"args","restriction":""}],"args_string":"(*args, **options)","args_html":"(*args, **options)","location":{"filename":"src/public_suffix/parser.cr","line_number":12,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/parser.cr#L12"},"def":{"name":"[]","args":[{"name":"args","doc":null,"default_value":"","external_name":"args","restriction":""}],"double_splat":{"name":"options","doc":null,"default_value":"","external_name":"options","restriction":""},"splat_index":0,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@term[*args, **options]"}},{"id":"[](*args,**options,&)-instance-method","html_id":"[](*args,**options,&)-instance-method","name":"[]","doc":null,"summary":null,"abstract":false,"args":[{"name":"args","doc":null,"default_value":"","external_name":"args","restriction":""}],"args_string":"(*args, **options, &)","args_html":"(*args, **options, &)","location":{"filename":"src/public_suffix/parser.cr","line_number":12,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/parser.cr#L12"},"def":{"name":"[]","args":[{"name":"args","doc":null,"default_value":"","external_name":"args","restriction":""}],"double_splat":{"name":"options","doc":null,"default_value":"","external_name":"options","restriction":""},"splat_index":0,"yields":1,"block_arg":null,"return_type":"","visibility":"Public","body":"@term[*args, **options] do |*yield_args|\n  yield *yield_args\nend"}},{"id":"[]=(*args,**options)-instance-method","html_id":"[]=(*args,**options)-instance-method","name":"[]=","doc":null,"summary":null,"abstract":false,"args":[{"name":"args","doc":null,"default_value":"","external_name":"args","restriction":""}],"args_string":"(*args, **options)","args_html":"(*args, **options)","location":{"filename":"src/public_suffix/parser.cr","line_number":12,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/parser.cr#L12"},"def":{"name":"[]=","args":[{"name":"args","doc":null,"default_value":"","external_name":"args","restriction":""}],"double_splat":{"name":"options","doc":null,"default_value":"","external_name":"options","restriction":""},"splat_index":0,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@term[*args] = **options"}},{"id":"[]?(*args,**options)-instance-method","html_id":"[]?(*args,**options)-instance-method","name":"[]?","doc":null,"summary":null,"abstract":false,"args":[{"name":"args","doc":null,"default_value":"","external_name":"args","restriction":""}],"args_string":"(*args, **options)","args_html":"(*args, **options)","location":{"filename":"src/public_suffix/parser.cr","line_number":12,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/parser.cr#L12"},"def":{"name":"[]?","args":[{"name":"args","doc":null,"default_value":"","external_name":"args","restriction":""}],"double_splat":{"name":"options","doc":null,"default_value":"","external_name":"options","restriction":""},"splat_index":0,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@term[*args, **options]?"}},{"id":"[]?(*args,**options,&)-instance-method","html_id":"[]?(*args,**options,&)-instance-method","name":"[]?","doc":null,"summary":null,"abstract":false,"args":[{"name":"args","doc":null,"default_value":"","external_name":"args","restriction":""}],"args_string":"(*args, **options, &)","args_html":"(*args, **options, &)","location":{"filename":"src/public_suffix/parser.cr","line_number":12,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/parser.cr#L12"},"def":{"name":"[]?","args":[{"name":"args","doc":null,"default_value":"","external_name":"args","restriction":""}],"double_splat":{"name":"options","doc":null,"default_value":"","external_name":"options","restriction":""},"splat_index":0,"yields":1,"block_arg":null,"return_type":"","visibility":"Public","body":"@term[*args, **options]? do |*yield_args|\n  yield *yield_args\nend"}},{"id":"empty?(*args,**options)-instance-method","html_id":"empty?(*args,**options)-instance-method","name":"empty?","doc":null,"summary":null,"abstract":false,"args":[{"name":"args","doc":null,"default_value":"","external_name":"args","restriction":""}],"args_string":"(*args, **options)","args_html":"(*args, **options)","location":{"filename":"src/public_suffix/parser.cr","line_number":12,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/parser.cr#L12"},"def":{"name":"empty?","args":[{"name":"args","doc":null,"default_value":"","external_name":"args","restriction":""}],"double_splat":{"name":"options","doc":null,"default_value":"","external_name":"options","restriction":""},"splat_index":0,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@term.empty?(*args, **options)"}},{"id":"empty?(*args,**options,&)-instance-method","html_id":"empty?(*args,**options,&)-instance-method","name":"empty?","doc":null,"summary":null,"abstract":false,"args":[{"name":"args","doc":null,"default_value":"","external_name":"args","restriction":""}],"args_string":"(*args, **options, &)","args_html":"(*args, **options, &)","location":{"filename":"src/public_suffix/parser.cr","line_number":12,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/parser.cr#L12"},"def":{"name":"empty?","args":[{"name":"args","doc":null,"default_value":"","external_name":"args","restriction":""}],"double_splat":{"name":"options","doc":null,"default_value":"","external_name":"options","restriction":""},"splat_index":0,"yields":1,"block_arg":null,"return_type":"","visibility":"Public","body":"@term.empty?(*args, **options) do |*yield_args|\n  yield *yield_args\nend"}},{"id":"has_key?(*args,**options)-instance-method","html_id":"has_key?(*args,**options)-instance-method","name":"has_key?","doc":null,"summary":null,"abstract":false,"args":[{"name":"args","doc":null,"default_value":"","external_name":"args","restriction":""}],"args_string":"(*args, **options)","args_html":"(*args, **options)","location":{"filename":"src/public_suffix/parser.cr","line_number":12,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/parser.cr#L12"},"def":{"name":"has_key?","args":[{"name":"args","doc":null,"default_value":"","external_name":"args","restriction":""}],"double_splat":{"name":"options","doc":null,"default_value":"","external_name":"options","restriction":""},"splat_index":0,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@term.has_key?(*args, **options)"}},{"id":"has_key?(*args,**options,&)-instance-method","html_id":"has_key?(*args,**options,&)-instance-method","name":"has_key?","doc":null,"summary":null,"abstract":false,"args":[{"name":"args","doc":null,"default_value":"","external_name":"args","restriction":""}],"args_string":"(*args, **options, &)","args_html":"(*args, **options, &)","location":{"filename":"src/public_suffix/parser.cr","line_number":12,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/parser.cr#L12"},"def":{"name":"has_key?","args":[{"name":"args","doc":null,"default_value":"","external_name":"args","restriction":""}],"double_splat":{"name":"options","doc":null,"default_value":"","external_name":"options","restriction":""},"splat_index":0,"yields":1,"block_arg":null,"return_type":"","visibility":"Public","body":"@term.has_key?(*args, **options) do |*yield_args|\n  yield *yield_args\nend"}}],"macros":[],"types":[{"html_id":"public_suffix/PublicSuffix/Parser/Term/Type","path":"PublicSuffix/Parser/Term/Type.html","kind":"alias","full_name":"PublicSuffix::Parser::Term::Type","name":"Type","abstract":false,"superclass":null,"ancestors":[],"locations":[{"filename":"src/public_suffix/parser.cr","line_number":10,"url":"https://github.com/toddsundsted/public_suffix/blob/v0.1.3/src/public_suffix/parser.cr#L10"}],"repository_name":"public_suffix","program":false,"enum":false,"alias":true,"aliased":"Hash(String | Symbol, Bool | PublicSuffix::Parser::Term)","aliased_html":"Hash(String | Symbol, Bool | <a href=\"../../../PublicSuffix/Parser/Term.html\">PublicSuffix::Parser::Term</a>)","const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"public_suffix/PublicSuffix/Parser/Term","kind":"struct","full_name":"PublicSuffix::Parser::Term","name":"Term"},"doc":"The type of `Term` items.\n","summary":"<p>The type of <code>Term</code> items.</p>","class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[]}]}]}]}]}})