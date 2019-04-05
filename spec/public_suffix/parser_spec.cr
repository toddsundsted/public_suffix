require "../spec_helper"

alias Term = PublicSuffix::Parser::Term

describe PublicSuffix::Parser do
  describe ".parse" do
    context "rules is empty" do
      it "returns the terminal" do
        PublicSuffix::Parser.parse([] of String).should eq(Term{:term => false})
      end
    end

    it "parses rules" do
      PublicSuffix::Parser.parse(["com"]).should eq(Term{"com" => Term{:term => true}})
      PublicSuffix::Parser.parse(["com foo"]).should eq(Term{"com" => Term{:term => true}})
      PublicSuffix::Parser.parse([".com."]).should eq(Term{"com" => Term{:term => true}})
      PublicSuffix::Parser.parse(["com", "foo.com"]).should eq(Term{"com" => Term{"foo" => Term{:term => true}, :term => true}})
      PublicSuffix::Parser.parse(["foo.com", "com"]).should eq(Term{"com" => Term{"foo" => Term{:term => true}, :term => true}})
      PublicSuffix::Parser.parse(["foo.com", "bar.com"]).should eq(Term{"com" => Term{"foo" => Term{:term => true}, "bar" => Term{:term => true}}})
      PublicSuffix::Parser.parse(["*.jp"]).should eq(Term{"jp" => Term{"*" => Term{:term => true}}})
      input = %w[
        com
        *.jp
        *.hokkaido.jp
        *.tokyo.jp
        !pref.hokkaido.jp
        !metro.tokyo.jp
      ]
      output = Term{
        "com" => Term{:term => true},
        "jp" => Term{
          "tokyo" => Term{"!metro" => Term{:term => true}, "*" => Term{:term => true}},
          "hokkaido" => Term{"!pref" => Term{:term => true}, "*" => Term{:term => true}},
          "*" => Term{:term => true}
        }
      }
      PublicSuffix::Parser.parse(input).should eq(output)
    end
  end
end
