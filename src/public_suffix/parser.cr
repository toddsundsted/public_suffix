class PublicSuffix
  # Defines the `.parse` method for parsing rules.
  #
  module Parser
    # A collection of rules.
    #
    struct Term
      # The type of `Term` items.
      #
      alias Type = Hash(String | Symbol, Term | Bool)

      delegate :empty?, :has_key?, :[]=, :[], :[]?, to: @term

      @term = Type.new
    end

    # Parses rules into internal representation.
    #
    # Parsing the following:
    #     com
    #     *.jp
    #     *.hokkaido.jp
    #     *.tokyo.jp
    #     !pref.hokkaido.jp
    #     !metro.tokyo.jp
    #
    # Yields:
    #     Term{
    #       "com" => Term{:term => true},
    #       "jp" => Term{
    #         "tokyo" => Term{"!metro" => Term{:term => true}, "*" => Term{:term => true}},
    #         "hokkaido" => Term{"!pref" => Term{:term => true}, "*" => Term{:term => true}},
    #         "*" => Term{:term => true}
    #       }
    #     }
    #
    def self.parse(rules : Enumerable(String))
      return Term{:term => false} if rules.empty?
      rules.reduce(Term.new) do |acc, rule|
        rule.strip
        unless rule.starts_with?("//") || rule.empty?
          tmp = acc
          rule.split(".").reverse.each do |p|
            if tmp.is_a?(Term)
              tmp[p] = Term.new unless tmp.has_key?(p)
              tmp = tmp[p]
            end
          end
          if tmp.is_a?(Term)
            tmp[:term] = true
          end
        end
        acc
      end
    end
  end
end
