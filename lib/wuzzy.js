(function() {
  var root = (typeof exports == 'undefined' ? window : exports);
  root.Wuzzy = Wuzzy;

  function Wuzzy(source, options) {
    this.source = source;
    this.options = options || {};
    this.cache = {};
  }

  Wuzzy.prototype.search = function(query) {
    query = query.replace(/\s+/g, '');

    if (this.cache[query]) {
      var results = this.cache[query];
    }
    else {
      var results = new ResultSet(query, this.source);
      this.cache[query] = results;
    }

    if (this.options.html)
      return results.toHTML();

    return results.results();
  }


  function ResultSet(query, source) {
    this.query = new Query(query);
    this.source = source;
    this._results = null;
    this._htmlResults = null;
  }

  ResultSet.prototype.results = function() {
    var query = this.query;
    var source = this.source;

    this._results = this._results || source.filter(function(source) {
      query.regex.lastIndex = 0;
      return query.regex.test(source);
    }).sort(function(a,b) {
      return a.length > b.length;
    });

    return this._results;
  };

  ResultSet.prototype.toHTML = function() {
    var query = this.query;
    var openingTag = "<b>";
    var closingTag = "</b>";
    var adjacentTags = new RegExp(closingTag + openingTag, 'g');

    this._htmlResults = this._htmlResults || this.results().map(function(result) {
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

    return this._htmlResults;
  };


  function Query(query) {
    this.characters = query.split('').map(function(char) {
      return char.toLowerCase()
    }).filter(function(char) {
      return !!char.trim()
    });

    var regex_string = ".*" + this.characters.join(".*") + ".*";
    this.regex = new RegExp(regex_string, "ig");
  }

})();
