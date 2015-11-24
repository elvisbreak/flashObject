# flashObject

Lightweight flash/image embed solution!

## Flash Plugin Detection

##### Method

| Argument Name     | Argument Type     | Argument Description  |
| :---------------: | :---------------: | :-------------------: |
| n/a               | n/a               | n/a                   |

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

##### Method

| Argument Name     | Argument Type     | Argument Description  |
| :---------------: | :---------------: | :-------------------: |
| elementId         | string            | Appending Element ID  |
| flashSource       | string            | Flash Source URL      |
| flashWidth        | integer           | Flash Width           |
| flashHeight       | integer           | Flash Height          |
| flashVariables    | object            | Flash Variables       |

```javascript
flashObject.embed(elementId, flashSource, flashWidth, flashHeight, flashVariables);
```

##### Example

```javascript
if (flashObject.detected()) {
    flashObject.embed('myElementId', 'myFlashFile.swf', 930, 180, {clickTAG: 'http://domain.com'});
} else {
    // Flash Plugin Missing!
}
```

## Image Embedding

##### Method

| Argument Name     | Argument Type     | Argument Description  |
| :---------------: | :---------------: | :-------------------: |
| elementId         | string            | Appending Element ID  |
| imageSource       | string            | Image Source URL      |
| imageWidth        | integer           | Image Width           |
| imageHeight       | integer           | Image Height          |
| linkHref          | string            | Hypertext Link URL    |
| linkTarget        | string            | Hypertext Link Target |

```javascript
flashObject.image(elementId, imageSource, imageWidth, imageHeight, linkHref, linkTarget);
```

##### Example
```javascript
flashObject.image('myElementId', 'myImageFile.png', 930, 180, 'http://domain.com', '_blank');
```

## Complete Example

```javascript
if (flashObject.detected()) {
    flashObject.embed('myElementId', 'myFlashFile.swf', 930, 180, {clickTAG: 'http://domain.com'});
} else {
    flashObject.image('myElementId', 'myImageFile.png', 930, 180, 'http://domain.com', '_blank');
}
```

## Requirements

No known dependencies known so far. Found one? Let me know!

## License

Copyright (c) 2015 Fredrik Borggren

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
