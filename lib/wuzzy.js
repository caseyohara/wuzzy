module.exports = wuzzy;

function wuzzy(query, items, options) {
  options = options || {};

  var characters = query.split('');
  var regex_string = ".*" + characters.join(".*") + ".*";
  var regex = new RegExp(regex_string, "ig");
  var results = items.filter(function(item) {
    regex.lastIndex = 0;
    return regex.test(item);
  }).sort(function(a,b) {
    return a.length > b.length;
  });

  if (options.html) {
    results = results.map(function(item) {
      var regex_string = "(" + characters.join("") + ")";
      var regex = new RegExp(regex_string, "ig");
      return item.replace(regex, function() {
        var args = Array.prototype.slice.apply(arguments);
        var match = args.shift();
        return "<b>" + match + "</b>";
      });
    });
  }

  return results;
};

