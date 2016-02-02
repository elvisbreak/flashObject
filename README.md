# flashObject

Lightweight JS library for embedding Adobe Flash and/or image adverts

## Installation

```html
<script src="flashobject.min.js"></script>
```

## Getting Started

Create HTML element for embedding

```html
<div id="foo"></div>
```

## Usage

Flash

```javascript
flashObject.embed('foo', 'file.swf', {width: 930, height: 180});
```

Flash with custom configuration

```javascript

var att = {width: 930, height: 180},
    par = {},
    flv = {};

flashObject.embed('foo', 'file.swf', att, par, flv);
```

Image

```javascript
flashObject.image('foo', 'file.png', 930, 180);
```

Image with hypertext link

```javascript
flashObject.image('foo', 'file.png', 930, 180, 'http://');
```

## Utilities

Browser plugin detection
```javascript
if (flashObject.enabled()) {
    // supported
}
```

File extension detection
```javascript
if (flashObject.extension('/path/to/file.swf')) {
    // flash extension
}
```


## History

* __1.3__ : Adding support for extension control
* __1.2__ : Adding support for polite loading
* __1.1__ : Adding support for alterntive image
* __1.0__ : Initial build

## Dependencies

None

## License

Copyright (c) Fredrik Borggren

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
