require "http/client"
require "uri"

class PublicSuffix
  # Fetches/manages/caches the list of rules.
  #
  class CachedList
    @rules : Parser::Term?

    def initialize(@config : PublicSuffix::Config)
    end

    # :nodoc:
    private record ValidURI, scheme : String, host : String, path : String do
      def to_s
        "#{scheme}://#{host}#{path}"
      end
    end

    private def uri
      @uri ||= begin
        uri = URI.parse(@config.url)
        scheme, host, path = uri.scheme, uri.host, uri.path
        scheme && path || raise "invalid url: #{@config.url}"
        ValidURI.new(scheme, host || "", path)
      end
    end

    private def file
      @file ||= File.join(@config.cache_dir, uri.path.split("/").last)
    end

    # Returns true if the cached file exists.
    def exists?
      File.exists?(file)
    end

    # Returns true if the cached file has expired.
    def expired?(now = Time.now)
      if @config.cache_expiry_period > 0
        File.info(file).modification_time + @config.cache_expiry_period.seconds < now
      elsif @config.cache_expiry_period < 0
        true
      else
        false
      end
    end

    # Returns public suffix list rules. Fetches the rules from the
    # source, and caches them if instructed to do so. The cached
    # version will be used until the expiry period is past.
    def rules
      @rules ||= begin
        if exists? && !expired?
          File.open(file, "r") do |f|
            Parser.parse(f.each_line.to_a)
          end
        else
          File.open(file, "w") do |f|
            case uri.scheme
            when "file"
              File.open(uri.path, "r") do |s|
                IO.copy(s, f)
              end
            when "http", "https"
              HTTP::Client.get(uri.to_s) do |response|
                IO.copy(response.body_io, f)
              end
            else
              raise raise "invalid url: #{@config.url}"
            end
          rescue ex
            f.delete
            raise ex
          end
          File.open(file, "r") do |f|
            Parser.parse(f.each_line.to_a)
          end
        end
      end
    end
  end
end
