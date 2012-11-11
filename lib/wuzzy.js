module.exports = wuzzy;

function wuzzy(query, items) {
  var characters = query.split('');
  var regex_string = ".*" + characters.join(".*") + ".*";
  var regex = new RegExp(regex_string, "i");
  return items.filter(function(item) {
    regex.lastIndex = 0;
    return regex.test(item);
  }).sort(function(a,b) {
    return a.length > b.length;
  });
};

