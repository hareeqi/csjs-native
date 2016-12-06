# csjs-native
covert regular css, PostCss, SASS...etc into **JS object literals** to be used with react native or any framework that uses JS object literals.

csjs-native enables you to use the environment tools provided by [CSJS](https://github.com/rtsao/csjs) such as [PostCss babel plugin](https://github.com/rtsao/babel-plugin-csjs-postcss), Syntax highlighting and css auto complete.

## Features:
- Regular css (no camel casing/object literals) - see example below
- Import .css file into React Native - [Docs](./docs/cssfile.md)
- PostCss, SASS, LESS, CSSnext ...etc. - [Docs](./docs/postcss.md)
- Full power of js in css if you choose to. - see example below
- Syntax highlighting - [Docs](./docs/syntax_highlighting.md)
- Css auto-complete - [Docs](./docs/auto_complete.md)
- Framework agnostic - [Docs](./docs/framework_agnostic.md)
- Share components across platform (Web, iOS, Android) - [Docs](./docs/framework_agnostic.md)
- Single file component if you choose to (js, jsx, css)  - see example below below)
- Tiny & zero dependencies ~3KB


## Install
```javascript
npm install csjs-native --save
```

## Example

```javascript

import { AppRegistry, Text, View } from 'react-native';
import React from 'react';
import csjs from 'csjs-native';

const primary_color = 'blue';

const styles = csjs`
  .welcome {
    font-size: 30;
    color: ${primary_color};
  }
  .container {
    flex : 1;
    justify-content: center;
    align-items: center
  }
`

const Example = ()=> (
      <View style={styles.container}>
        <Text style={styles.welcome}>
            Welcome to csjs native
        </Text>
      </View>
    )

AppRegistry.registerComponent('example', () => Example);

```





.


## Screenshot
This demonstrate syntax highlighting and auto complete


![Component example](./docs/screenshot.png)
