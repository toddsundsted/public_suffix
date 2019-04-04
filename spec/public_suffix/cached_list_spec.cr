require "../spec_helper"

describe PublicSuffix::CachedList do
  describe "#exists?" do
    it "returns true if the cached file exists" do
      file = File.tempfile("exists_test", ".dat")
      config = PublicSuffix::Config.new(url: "file:///nowhere/#{File.basename(file.path)}")
      cached_list = PublicSuffix::CachedList.new(config)
      cached_list.exists?.should be_true
      File.delete(file.path)
      cached_list.exists?.should be_false
    end
  end

  describe "#expired?" do
    it "returns true if the cached file has expired" do
      file = File.tempfile("expired_test", ".dat")
      config = PublicSuffix::Config.new(url: "file:///nowhere/#{File.basename(file.path)}")
      cached_list = PublicSuffix::CachedList.new(config)
      cached_list.expired?.should be_false
      File.touch(file.path, time: Time.now - 1.year)
      cached_list.expired?.should be_true
    ensure
      file.delete if file
    end

    it "always returns true if expiry is negative" do
      file = File.tempfile("expired_test", ".dat")
      config = PublicSuffix::Config.new(url: "file:///nowhere/#{File.basename(file.path)}", cache_expiry_period: -1)
      cached_list = PublicSuffix::CachedList.new(config)
      cached_list.expired?.should be_true
      File.touch(file.path, time: Time.now - 1.year)
      cached_list.expired?.should be_true
    ensure
      file.delete if file
    end

    it "always returns false if expiry is zero" do
      file = File.tempfile("expired_test", ".dat")
      config = PublicSuffix::Config.new(url: "file:///nowhere/#{File.basename(file.path)}", cache_expiry_period: 0)
      cached_list = PublicSuffix::CachedList.new(config)
      cached_list.expired?.should be_false
      File.touch(file.path, time: Time.now - 1.year)
      cached_list.expired?.should be_false
    ensure
      file.delete if file
    end
  end

  describe "#rules" do
    it "returns rules" do
      config = PublicSuffix::Config.new(url: "file://#{__DIR__}/../test.dat")
      cached_list = PublicSuffix::CachedList.new(config)
      cached_list.rules.should_not be_nil
    ensure
      File.delete(File.join(Dir.tempdir, "test.dat"))
    end
  end
end
