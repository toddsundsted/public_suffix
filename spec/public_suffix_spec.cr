require "./spec_helper"

describe PublicSuffix do
  it "fetches and parses the public suffix list" do
    dir = File.join(Dir.tempdir, rand(36**4).to_s(36))
    Dir.mkdir(dir)
    public_suffix = PublicSuffix.new(cache_dir: dir)
    public_suffix.split("www.heroku.com").should eq(["www", "heroku", "com"])
    public_suffix.split("www.herokuapp.com").should eq(["", "www", "herokuapp.com"])
  ensure
    if dir
      File.delete(File.join(dir, "public_suffix_list.dat"))
      Dir.delete(dir)
    end
  end

  public_suffix = PublicSuffix.new(url: "file://#{__DIR__}/test.dat", cache_expiry_period: -1)

  it "should match * if no rules match" do
    public_suffix.split("www.home.foobar").should eq(["www", "home", "foobar"])
    public_suffix.cdn("www.home.foobar").should eq("home.foobar")
    public_suffix.tld("www.home.foobar").should eq("foobar")
    public_suffix.split("foobar").should eq(["", "", "foobar"])
    public_suffix.cdn("foobar").should eq("")
    public_suffix.tld("foobar").should eq("foobar")
  end

  it "should handle domains with wildcards" do
    public_suffix.split("mm").should eq(["", "", ""])
    public_suffix.cdn("mm").should eq("")
    public_suffix.tld("mm").should eq("")
    public_suffix.split("c.mm").should eq(["", "", "c.mm"])
    public_suffix.cdn("c.mm").should eq("")
    public_suffix.tld("c.mm").should eq("c.mm")
   end

  it "should be case insensitive" do
    public_suffix.split("fee.fi.fo.com").should eq(["fee.fi", "fo", "com"])
    public_suffix.cdn("fee.fi.fo.com").should eq("fo.com")
    public_suffix.tld("fee.fi.fo.com").should eq("com")
    public_suffix.split("FEE.FI.FO.COM").should eq(["FEE.FI", "FO", "COM"])
    public_suffix.cdn("FEE.FI.FO.COM").should eq("FO.COM")
    public_suffix.tld("FEE.FI.FO.COM").should eq("COM")
    public_suffix.split("Fee.Fi.Fo.Com").should eq(["Fee.Fi", "Fo", "Com"])
    public_suffix.cdn("Fee.Fi.Fo.Com").should eq("Fo.Com")
    public_suffix.tld("Fee.Fi.Fo.Com").should eq("Com")
  end

  describe "#split" do
    it "splits domains" do
      public_suffix.split("www.test.com").should eq(["www", "test", "com"])
      public_suffix.split("abc.xyz.co.uk").should eq(["abc", "xyz", "co.uk"])
      public_suffix.split("abc.xyz.co.jp").should eq(["abc", "xyz", "co.jp"])
      public_suffix.split("abc.xyz.tokyo.jp").should eq(["", "abc", "xyz.tokyo.jp"])
      public_suffix.split("abc.metro.tokyo.jp").should eq(["abc", "metro", "tokyo.jp"])
      public_suffix.split("www.abc.xyz.zz").should eq(["", "www", "abc.xyz.zz"])
    end
  end

  describe "#tld" do
    it "returns the top-level domain name" do
      public_suffix.tld("www.test.com").should eq("com")
      public_suffix.tld("abc.xyz.co.uk").should eq("co.uk")
      public_suffix.tld("abc.xyz.co.jp").should eq("co.jp")
      public_suffix.tld("abc.xyz.tokyo.jp").should eq("xyz.tokyo.jp")
      public_suffix.tld("abc.metro.tokyo.jp").should eq("tokyo.jp")
      public_suffix.tld("www.abc.xyz.zz").should eq("abc.xyz.zz")
    end
  end

  describe "#cdn" do
    it "returns the canonical domain name" do
      public_suffix.cdn("www.test.com").should eq("test.com")
      public_suffix.cdn("abc.xyz.co.uk").should eq("xyz.co.uk")
      public_suffix.cdn("abc.xyz.co.jp").should eq("xyz.co.jp")
      public_suffix.cdn("abc.xyz.tokyo.jp").should eq("abc.xyz.tokyo.jp")
      public_suffix.cdn("abc.metro.tokyo.jp").should eq("metro.tokyo.jp")
      public_suffix.cdn("www.abc.xyz.zz").should eq("www.abc.xyz.zz")
    end
  end

  context "at top level" do
    it "handles top-level domain names correctly" do
     public_suffix.tld("com").should eq("com")
     public_suffix.tld("bar.foo").should eq("bar.foo")
     public_suffix.tld("baz.foo").should eq("baz.foo")
     public_suffix.tld("qux.foo").should eq("")
     public_suffix.tld("foo").should eq("")
    end
  end

  context "edge cases" do
    it "handles several edge cases correctly" do
     public_suffix.split("").should eq(["", "", ""])
     public_suffix.cdn("").should eq("")
     public_suffix.tld("").should eq("")
    end
  end
end
