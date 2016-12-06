//TODO write framework agnostic docs - if  react native exist in the project, csjs return 

return require('react-native').StyleSheet.create(styleObject)

if react native doesn't exist. it returns

return styleObject

to force csjs to return style object even if react native is present

var csjs = require(csjs-native).noReactNative
