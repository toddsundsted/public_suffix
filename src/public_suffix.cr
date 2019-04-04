# The [Public Suffix List](https://publicsuffix.org/) library.
#
# The Public Suffix List is "a cross-vendor initiative to provide an
# accurate list of domain name suffixes". Such a list is necessary
# because "there was and remains no algorithmic method of finding the
# highest level at which a domain may be registered for a particular
# top-level domain...".
#
# `public_suffix` is a small Crystal library designed to make the
# Public Suffix List easier to use. The library will transparently
# download the latest list of rules, parse the rules, and optionally
# cache them. Source URL, cache directory, and cache expiry are all
# configurable.
#
class PublicSuffix
  VERSION = "0.1.0"

  # :nodoc:
  record Config,
         cache_dir : String = Dir.tempdir,
         cache_expiry_period : Int32 = 30 * 24 * 60 * 60,
         url : String = "https://publicsuffix.org/list/public_suffix_list.dat"

  @rules : Parser::Term?

  # Creates a new `PublicSuffix` instance. By default, it fetches and
  # caches the official list of rules. Specify the cache directory
  # with *cache_dir* (the default is the system temp directory) and
  # the cache expiry with *cache_expiry_period* in seconds (the
  # default it 30 days). An expiry of `0` means cache indefinitely; a
  # negative value means do not cache. Download rules from another
  # source by specifying the *url*.
  #     PublicSuffix.new(cache_dir: "/tmp", cache_expiry_period: 3600, url: "file:///var/data/test.dat")
  #
  def initialize(**kwargs)
    @config = Config.new(**kwargs)
  end

  private def rules
    @rules ||= CachedList.new(@config).rules
  end

  # Returns a list of possible matches for the domain name.
  private def match(domain, rules)
    set = [] of Array(String)
    return set if domain.empty? || rules.empty?
    domain = domain.dup
    first = domain.pop
    [[first.downcase, first], ["!#{first.downcase}", "!#{first}"], ["*", first]].each do |(pattern, name)|
      if rules.has_key?(pattern)
        unless (temp = rules[pattern]).is_a?(Bool)
          set << [name] if temp[:term]?
          match(domain, temp).each do |result|
            set << [first] + result
          end
        end
      end
    end
    set
  end

  # Returns the best match from the possible matches.
  private def best(results)
    return [] of String if results.empty?
    result = results.find { |r| r.last[0] == '!' } || results.sort_by(&.size).last
    result = result[0..result.size - 2] if result.last[0] == '!'
    result
  end

  # Splits the domain name into a three-element list consisting of
  # (from right to left) the top-level domain name, the canonical
  # name, and everything else:
  #     split("www.city.kawasaki.jp") # => ["www", "city", "kawasaki.jp"]
  #
  def split(domain)
    domain = domain.split(".")
    result = best(match(domain, rules))
    [domain.pop(result.size), domain.pop(1), domain].map(&.join(".")).reverse
  end

  # Returns the top-level domain name:
  #     tld("www.city.kawasaki.jp") # => "kawasaki.jp"
  #
  def tld(domain)
    domain = domain.split(".")
    result = best(match(domain, rules))
    domain.pop(result.size).join(".")
  end

  # Returns the full canonical domain name:
  #     cdn("www.city.kawasaki.jp") # => "city.kawasaki.jp"
  #
  def cdn(domain)
    domain = domain.split(".")
    result = best(match(domain, rules))
    domain.pop(result.size + 1).join(".")
  end
end

require "./public_suffix/parser"
require "./public_suffix/cached_list"
