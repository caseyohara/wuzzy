(function() {
  var root = (typeof exports == 'undefined' ? window : exports);
  root.Wuzzy = Wuzzy;

  function Wuzzy(query, sources, options) {
    var options = options || {};
    var results = new ResultSet(query, sources);
    if (options.html)
      return results.toHTML();

    return results.results();
  }

  function Query(query) {
    this.characters = query.split('').map(function(char) {
      return char.toLowerCase()
    }).filter(function(char) {
      return !!char.trim()
    });

    var regex_string = ".*" + this.characters.join(".*") + ".*";
    this.regex = new RegExp(regex_string, "ig");
  }

  function ResultSet(query, sources) {
    this.query = new Query(query);
    this.sources = sources;
    this._results = null;
    this._htmlResults = null;
  }

  ResultSet.prototype.results = function() {
    if (this._results)
      return this._results;

    var query = this.query;
    var sources = this.sources;

    return this._results = sources.filter(function(source) {
      query.regex.lastIndex = 0;
      return query.regex.test(source);
    }).sort(function(a,b) {
      return a.length > b.length;
    });
  };

  ResultSet.prototype.toHTML = function() {
    if (this._htmlResults)
      return this._htmlResults;

    var query = this.query;
    var openingTag = "<b>";
    var closingTag = "</b>";
    var adjacentTags = new RegExp(closingTag + openingTag, 'g');

    return this._htmlResults = this.results().map(function(result) {
      return query.characters.map(function(char) {
        var index = result.toLowerCase().indexOf(char);
        var wrapped = result.slice(0, index) + openingTag + result.slice(index, index + 1) + closingTag;
        result = result.slice(index + 1, result.length);
        return wrapped
      }).reduce(function(a, b) {
        return a + b
      }).replace(
        adjacentTags, ''
      ) + result;
    });
  };

})();
