# flashObject

A lightweight flash embed solution with support for flash detection and polite loading

## Installation

Choose the *one* of the following that works best for you:

- Include flashobject.min.js into HTML
    ```html
<script type="text/javascript" src="flashobject.min.js"></script>
```

- Embed flashobject.min.js into JavaScript

## Usage

Browser plugin detection
```javascript
flashObject.detect();
```

File type detection
```javascript
flashObject.flash('file.swf');
```

Basic flash object embedding
```javascript
flashObject.embed('elementId', 'file.swf', {width: 930, height: 180});
```

Basic alternative image embedding
```javascript
flashObject.image('elementId', 'file.png', 930, 180, 'http://');
```

Advanced flash object embedding
```javascript
// Flash Attributes
var atts = {
    width: 930,
    height: 180
}
// Flash Params
var pars = {
    custom1: 'value'
}
// Flash Variables
var flvs = {
    custom1: 'value'
}
// Polite Loading
var pol = 'file.png';
// Embed Flash Object
flashObject.embed('elementId', 'file.swf', atts, pars, flvs, pol);
```

Recommended workflow
```javascript
if (flashObject.detect()) {
    flashObject.embed('elementId', 'file.swf', {width: 930, height: 180});
} else {
    flashObject.image('elementId', 'file.png', 930, 180, 'http://');
}
```

## History

* __1.0.2__ : Adding support for polite loading
* __1.0.1__ : Adding support for alterntive image
* __1.0.0__ : Initial build

## Dependencies

None

## License

Copyright (c) 2015 Fredrik Borggren

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
