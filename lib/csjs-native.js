
var parse = require('./parser');
var create
try {
  //create = require('react-native').StyleSheet.create
} catch (e){}

/*
  Most Transform code is taken from https://github.com/raphamorim/native-css
  Much apperiated ...
*/
function transform(rules, result) {
    rules.forEach(function (rule) {
        var obj = {};
        if (rule.type === 'media') {
            var name = '@media ' +rule.media;
            var media = result[name] = result[name] || {
                "__expression__": rule.media
            };
            transform( rule.rules, media)
        } else if (rule.type === 'rule') {
            rule.declarations.forEach(function (declaration) {
                if (declaration.type === 'declaration') {
                  declaration.property = toCamelCase(declaration.property)

                  var is_nan = isNaN(Number(declaration.value))
                  obj[declaration.property] = is_nan? declaration.value : Number(declaration.value);
                }
            });
            rule.selectors.forEach(function (selector) {
                var name = nameGenerator(selector.trim());
                result[name] = obj;
            });
        }
    });
}
var nameGenerator = function (name) {
    name = name.replace(/\s\s+/g, ' ');
    name = name.replace(/[^a-zA-Z0-9]/g, '_');
    name = name.replace(/^_+/g, '');
    name = name.replace(/_+$/g, '');
    return name;
}
var toCamelCase = function(name) {
    return name.replace(/(-.)/g, function(v) { return v[1].toUpperCase(); })
}

module.exports.csjs = (...data) =>{
  var css = String.raw(...data)
  css = parse(css);
  var result = {};
  transform(css.stylesheet.rules, result);
  result = create? create(result) : result;
  return result;
}
