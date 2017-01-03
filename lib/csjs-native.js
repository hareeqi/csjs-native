
var parse = require('./parser');
var create
try {
  create = require('react-native').StyleSheet.create
} catch (e){}

/*
  Most Transform code is taken from https://github.com/raphamorim/native-css
  Much apperiated ...
*/
function transform(rules) {
    var result = {}
    rules.forEach(function (rule) {
        var obj = {};
        if (rule.type === 'rule') {
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
   return result
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

var css = function (txt, ...args) {
  if(String.raw){
    return transform(parse(String.raw(txt, ...args)).stylesheet.rules);
  }
  var result = ''
  values = {...args}
  txt.forEach(function(item,index) {
    result += (values[index] && item+values[index]) || item;
  })
  return  transform(parse(result).stylesheet.rules);
}

module.exports.csjs = ( ...args) =>{
  var result = css(...args)
  return create? create(result) : result;
}

module.exports.noReactNative = (...args) =>{
  return css(...args)
}
