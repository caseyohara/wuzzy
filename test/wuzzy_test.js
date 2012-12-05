require('should');
var Wuzzy = require('../lib/wuzzy').Wuzzy;

var phrases = [
  "Optional multimedia contingency",
  "Balanced radical help-desk",
  "Polarised motivating throughput",
  "Multi-channelled methodical projection",
  "Virtual holistic intranet",
  "Persistent dynamic data-warehouse",
  "Customizable eco-centric intranet",
  "Profound didactic ability",
  "Adaptive maximized solution",
  "Customer-focused mobile benchmark",
  "Enhanced national interface",
  "Multi-layered composite website",
  "Devolved tangible monitoring",
  "Reactive directional matrix",
  "Secured object-oriented productivity",
  "Triple-buffered mission-critical middleware",
  "Versatile bifurcated toolset",
  "Function-based solution-oriented toolset",
  "Polarised interactive intranet",
  "Multi-tiered client-server complexity",
  "AReallyLongishPhraseWithoutAnySpaces"
];



describe("wuzzy", function() {
  var wuzzy = new Wuzzy(phrases);

  it("finds exact matches", function() {
    wuzzy.search('tangible').should.eql(["Devolved tangible monitoring"]);
  });

  it("isn't case sensitive", function() {
    wuzzy.search('MATRIX').should.eql(["Reactive directional matrix"]);
  });

  it("isn't whitespace sensitive", function() {
    wuzzy.search('bench mark').should.eql(["Customer-focused mobile benchmark"])
  });

  it("returns all results for an empty query", function() {
    wuzzy.search(" ").should.eql([
      'Virtual holistic intranet',
      'Profound didactic ability',
      'Balanced radical help-desk',
      'Enhanced national interface',
      'Reactive directional matrix',
      'Adaptive maximized solution',
      'Versatile bifurcated toolset',
      'Devolved tangible monitoring',
      'Polarised interactive intranet',
      'Optional multimedia contingency',
      'Polarised motivating throughput',
      'Multi-layered composite website',
      'Customer-focused mobile benchmark',
      'Customizable eco-centric intranet',
      'Persistent dynamic data-warehouse',
      'Secured object-oriented productivity',
      'AReallyLongishPhraseWithoutAnySpaces',
      'Multi-tiered client-server complexity',
      'Multi-channelled methodical projection',
      'Function-based solution-oriented toolset',
      'Triple-buffered mission-critical middleware'
    ]);
  });

  it("sorts the results by length", function() {
    wuzzy.search("multi").should.eql([
      "Optional multimedia contingency",
      "Multi-layered composite website",
      "Multi-tiered client-server complexity",
      "Multi-channelled methodical projection"
    ]);
  });

  it("finds sequential matches", function() {
    wuzzy.search("funbas").should.eql(["Function-based solution-oriented toolset"]);
  });

  it("can drill down to an exact match", function() {
    wuzzy.search("mti").should.eql([
      "Adaptive maximized solution",
      "Reactive directional matrix",
      "Devolved tangible monitoring",
      "Optional multimedia contingency",
      "Polarised motivating throughput",
      "Multi-layered composite website",
      "Customizable eco-centric intranet",
      "Multi-tiered client-server complexity",
      "Multi-channelled methodical projection",
      "Triple-buffered mission-critical middleware"
    ]);

    wuzzy.search("mtic").should.eql([
      "Optional multimedia contingency",
      "Multi-layered composite website",
      "Customizable eco-centric intranet",
      "Multi-tiered client-server complexity",
      "Multi-channelled methodical projection",
      "Triple-buffered mission-critical middleware"
    ]);

    wuzzy.search("mtict").should.eql([
      "Optional multimedia contingency",
      "Multi-layered composite website",
      "Customizable eco-centric intranet",
      "Multi-tiered client-server complexity",
      "Multi-channelled methodical projection"
    ]);

    wuzzy.search("mtictn").should.eql([
      "Optional multimedia contingency",
      "Customizable eco-centric intranet",
      "Multi-channelled methodical projection"
    ]);

    wuzzy.search("mtictny").should.eql([
      "Optional multimedia contingency"
    ]);

    wuzzy.search("mtictnyz").should.eql([]);
  });

});

describe("cache", function() {
  it("caches queries", function() {
    var wuzzy = new Wuzzy(phrases, {html: true});
    wuzzy.search("asdf");
    wuzzy.cache.should.have.keys("asdf");
  });

  it("collapses similar queries", function() {
    var wuzzy = new Wuzzy(phrases, {html: true});
    wuzzy.search("qwerty");
    wuzzy.search("qw  er ty");
    wuzzy.search("qw ErTy");
    wuzzy.cache.should.have.keys("qwerty");
    wuzzy.cache.should.not.have.keys("qw  er ty");
  });
});

describe("options", function() {
  describe("html", function() {
    var wuzzy = new Wuzzy(phrases, {html: true});

    it("wraps exact matches", function() {
        var results = wuzzy.search("multi");

        [ "Optional <b>multi</b>media contingency",
          "<b>Multi</b>-layered composite website",
          "<b>Multi</b>-tiered client-server complexity",
          "<b>Multi</b>-channelled methodical projection"
        ].forEach(function(result, index) {
          results[index].should.eql(result);
        });
    });

    it("wraps fuzzy matches", function() {
      wuzzy.search("mtictny").should.eql([
        "Optional <b>m</b>ul<b>ti</b>media <b>c</b>on<b>t</b>i<b>n</b>genc<b>y</b>"
      ]);
    });
  });
});


