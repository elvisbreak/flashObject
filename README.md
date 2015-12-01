# flashObject

Lightweight flash/image embed solution!

## Flash Plugin Detection

| Argument Name     | Argument Type     | Argument Description  |
| ----------------- | ----------------- | --------------------- |
| n/a               | n/a               | n/a                   |

##### Method
```javascript
flashObject.detected();
```

##### Example

```javascript
if (flashObject.detected()) {
    // Flash Plugin Detected!
} else {
    // Flash Plugin Missing!
}
```

## Flash Embedding

| Argument Name     | Argument Type     | Argument Description  |
| ----------------- | ----------------- | --------------------- |
| id                | string            | Element ID            |
| swf               | string            | Flash Source          |
| atts              | object            | Flash Attributes      |
| pars              | object            | Flash Params          |
| flvs              | object            | Flash Variables       |
| polite            | string            | Polite Image Source   |

##### Method
```javascript
flashObject.embed(id, swf, atts, pars, flvs, polite);
```

##### Example

```javascript
if (flashObject.detected()) {
    flashObject.embed('myElementId', 'myFlashFile.swf', {width: 930, height: 180}, {}, {clickTAG: 'http://domain.com'}, 'myPoliteImage.png');
} else {
    // Flash Plugin Missing!
}
```

## Image Embedding

| Argument Name     | Argument Type     | Argument Description  |
| ----------------- | ----------------- | --------------------- |
| domObj            | object OR string  | Element ID OR Object  |
| src               | string            | Image Source          |
| width             | integer           | Image Width           |
| height            | integer           | Image Height          |
| click             | string            | Link Source           |

##### Method
```javascript
flashObject.image(domObj, src, width, height, click));
```

##### Example
```javascript
flashObject.image('myElementId', 'myImageFile.png', 930, 180, 'http://domain.com');
```
OR
```javascript
flashObject.image(domObj, 'myImageFile.png', 930, 180, 'http://domain.com');
```

## Flash Plugin Debugging

| Argument Name     | Argument Type     | Argument Description  |
| ----------------- | ----------------- | --------------------- |
| n/a               | boolean           | Activate Debugging    |

##### Method
```javascript
flashObject.debug;
```

##### Example
```javascript
flashObject.debug = !0;
```

## Complete Example
```javascript
flashObject.debug = !0;
if (flashObject.detected()) {
    flashObject.embed('myElementId', 'myFlashFile.swf', {width: 930, height: 180}, {}, {clickTAG: 'http://domain.com'}, 'myPoliteImage.png');
} else {
    flashObject.image('myElementId', 'myImageFile.png', 930, 180, 'http://domain.com');
}
```

## Requirements
No known dependencies known so far. Found one? Let me know!

## License
Copyright (c) 2015 Fredrik Borggren

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
