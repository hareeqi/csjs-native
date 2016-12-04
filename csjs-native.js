
var parse = require('css').parse

var sheet;
var create

/*
  Transform code is taken from https://github.com/raphamorim/native-css
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
                    obj[declaration.property] = declaration.value;
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

module.exports.csjs = (css) =>{
  css =  parse(css[0]);
  var result = {};
  transform(css.stylesheet.rules, result);
  result = create? create(result) : result;
  return result;

}
module.exports.setStyleSheet = (styleSheet) => {
  sheet = styleSheet;
}
