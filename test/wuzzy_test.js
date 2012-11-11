require('should');
var wuzzy = require('../lib/wuzzy');

describe("wuzzy", function() {

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
    "Multi-tiered client-server complexity"
  ];

  it("finds exact matches", function() {
    wuzzy('tangible', phrases).should.eql(["Devolved tangible monitoring"]);
  });

  it("isn't case sensitive", function() {
    wuzzy('MATRIX', phrases).should.eql(["Reactive directional matrix"]);
  });

  it("sorts the results by length", function() {
    wuzzy("multi", phrases).should.eql([
      "Optional multimedia contingency",
      "Multi-layered composite website",
      "Multi-tiered client-server complexity",
      "Multi-channelled methodical projection"
    ]);
  });

  it("finds sequential matches", function() {
    wuzzy("funbas", phrases).should.eql(["Function-based solution-oriented toolset"]);
  });

  it("can drill down to an exact match", function() {
    wuzzy("mti", phrases).should.eql([
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

    wuzzy("mtic", phrases).should.eql([
      "Optional multimedia contingency",
      "Multi-layered composite website",
      "Customizable eco-centric intranet",
      "Multi-tiered client-server complexity",
      "Multi-channelled methodical projection",
      "Triple-buffered mission-critical middleware"
    ]);

    wuzzy("mtict", phrases).should.eql([
      "Optional multimedia contingency",
      "Multi-layered composite website",
      "Customizable eco-centric intranet",
      "Multi-tiered client-server complexity",
      "Multi-channelled methodical projection"
    ]);

    wuzzy("mtictn", phrases).should.eql([
      "Optional multimedia contingency",
      "Customizable eco-centric intranet",
      "Multi-channelled methodical projection"
    ]);

    wuzzy("mtictny", phrases).should.eql([
      "Optional multimedia contingency"
    ]);

    wuzzy("mtictnyz", phrases).should.eql([]);
  });
});


