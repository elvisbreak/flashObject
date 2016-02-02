window.parent.flashObject = window.parent.flashObject || (function() {

    var internetExplorer = /msie|trident|edge/g.test(navigator.userAgent.toLowerCase()),
        flashAttributes = {},
        flashParameters = {},
        flashVariables = {},
        debug = !1,

    /**
     * Has Flash Extension
     *
     * @param {string} str Filename
     * @return {boolean}
     */

    hasFlashExtension = function(str) {
        return 'swf' === str.substr(str.lastIndexOf('.') + 1);
    },

    /**
     * Has Flash Variables
     *
     * @param {object} obj Flash Variables
     * @return {boolean}
     */

    hasFlashVariables = function(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    },

    /**
     * Convert To Internet Explorer
     *
     * @param {string} str Outer HTML
     * @return {object}
     */

    convertToInternetExplorer = function(str) {
        var htmlElement = document.createElement("div");
            htmlElement.innerHTML = str.replace(/div|DIV/g, 'object');
        return htmlElement.firstChild;
    },

    /**
     * Merge Objects
     *
     * @param {object} obj1 First Object
     * @param {object} obj2 Second Object
     */

    mergeObjects = function(obj1, obj2) {
        for (var key in obj1) {
            obj2[key] = obj1[key];
        }
    },

    /**
     * Add Event Listener
     *
     * @param {object} obj HTML Object
     * @param {string} type Event Type
     * @param {object} fn Callback
     */

    addEventListener = function(obj, type, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(type, fn, false);
        } else if (obj.attachEvent)  {
            obj.attachEvent('on' + type, fn);
        }
    },

    /**
     * Set Attributes
     *
     * @param {object} obj HTML Object
     * @param {object} attributes Attributes
     */

    setAttributes = function(obj, attributes) {
        if (attributes) {
            for (var attribute in attributes) {
                obj.setAttribute(attribute, attributes[attribute]);
            }
        } else {
            for (var attribute in flashAttributes) {
                if (obj.tagName === 'OBJECT') {
                    !/type|pluginspage|src/i.test(attribute) && obj.setAttribute(attribute, flashAttributes[attribute]);
                } else {
                    !/classid|codebase|data/i.test(attribute) && obj.setAttribute(attribute, flashAttributes[attribute]);
                }
            }
        }
    },

    /**
     * Set Params
     *
     * @param {object} obj HTML Object
     */

    setParams = function(obj) {
        for (var parameter in flashParameters) {
            var htmlElement = document.createElement("param");
                htmlElement.setAttribute('name', parameter);
                htmlElement.setAttribute('value', flashParameters[parameter]);
            obj.appendChild(htmlElement);
        }
    },

    /**
     * Set Object Flash Variables
     *
     * @param {object} obj HTML Object
     */

    setObjectFlashVariables = function(obj) {
        if (!hasFlashVariables(flashVariables)) {
            var htmlElement = document.createElement("param"), str = '';
                htmlElement.setAttribute('name', 'flashvars');
            for (var _flv in flashVariables) {
                str = (str !== '' ? str + "&amp;" : '') + [_flv, flashVariables[_flv]].join("=");
                obj.appendChild(htmlElement);
            }
            htmlElement.setAttribute('value', str);
            obj.appendChild(htmlElement);
        }
    },

    /**
     * Set Embed Flash Variables
     *
     * @param {object} obj HTML Object
     */

    setEmbedFlashVariables = function(obj) {
        if (!hasFlashVariables(flashVariables)) {
            var str = '';
            for (var _flv in flashVariables) {
                str = (str !== '' ? str + "&amp;" : '') + [_flv, flashVariables[_flv]].join("=");
            }
            obj.setAttribute('flashvars', str);
        }
    },

    /**
     * Has Flash Plugin
     *
     * @return {boolean}
     */

    hasFlashPlugin = function() {
        try {
            if (navigator.plugins && navigator.plugins["Shockwave Flash"]) {
                return !0;
            } else {
                return new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            }
        } catch (e) {
            return !1;
        }
    },

    /**
     * Embed Hypertext Image
     *
     * @param {object} obj HTML Object
     * @param {string} src Image Source Path
     * @param {number} width Image Width
     * @param {number} height Image Height
     * @param {string} click Image Click Through URL
     * @return {object} Image Object
     */

    embedHypertextImage = function(obj, src, width, height, click) {
        try {
            var hypertextElement = document.createElement('a'),
                imageElement = document.createElement('img');
            obj = 'object' === typeof obj ? obj : document.getElementById(obj);
            setAttributes(hypertextElement, {href: click, target: '_blank', style: 'display:block;font-size:0'});
            setAttributes(imageElement, {src: src, width: width, height: height, border: 0});
            hypertextElement.appendChild(imageElement);
            obj.appendChild(hypertextElement);
            return imageElement;
        } catch (e) {
            debug && console.log(e);
        }
    },

    /**
     * Embed Flash Object
     *
     * @param {string} id HTML Object ID
     * @param {string} swf Flash Source Path
     * @param {object} attributes Flash Attributes
     * @param {object} parameters Flash Parameters
     * @param {object} flashvars Flash Variables
     * @param {object} politeImage Polite Image Source Path
     * @return {object} Flash Object
     */

    embedFlashObject = function(id, swf, attributes, parameters, flashvars, politeImage) {

        try {

            var mainElement = document.getElementById(id),
                politeElement = document.getElementById(id.replace('main', 'polite')),
                objectElement = document.createElement(internetExplorer ? 'div' : 'object'),
                embedElement = document.createElement('embed');

            // Attributes
            attributes = attributes || {};
            attributes.data = swf;
            attributes.src = swf;
            attributes.type = 'application/x-shockwave-flash';
            //attributes.pluginspage = 'http://www.adobe.com/go/getflashplayer';
            //attributes.classid = 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';
            //attributes.codebase = 'http://fpdownload.macromedia.com/get/shockwave/cabs/flash/swflash.cab#version=7,0,0,0';

            // Params
            parameters = parameters || {};
            parameters.movie = swf;
            parameters.width = attributes.width;
            parameters.height = attributes.height;
            parameters.wmode = 'opaque';
            parameters.menu = 'false';
            parameters.allowscriptaccess = 'always';

            // Flashvars
            flashvars = flashvars || {};

            // Merge Objects
            mergeObjects(attributes, flashAttributes);
            mergeObjects(parameters, flashParameters);
            mergeObjects(flashvars, flashVariables);

            setAttributes(objectElement);
            setParams(objectElement);
            setObjectFlashVariables(objectElement);

            if (internetExplorer) {
                objectElement = convertToInternetExplorer(objectElement.outerHTML);
            } else {
                setEmbedFlashVariables(embedElement);
                setAttributes(embedElement);
                objectElement.appendChild(embedElement);
            }

            if (politeImage) {
                mainElement.appendChild(objectElement);
                mainElement.style.visibility = 'hidden';
                embedHypertextImage(politeElement, politeImage, attributes.width, attributes.height, flashvars.clickTAG || '');
                addEventListener(window, 'load', function() {
                    politeElement.style.display = 'none';
                    mainElement.style.visibility = 'visible';
                });
            } else {
                mainElement.appendChild(objectElement);
            }

            return objectElement;

        } catch (e) {
            debug && console.log(e);
        }
    };

    /**
     * Exports
     *
     * @return {object}
     */

    return {
        debug: debug,
        embed: embedFlashObject,
        image: embedHypertextImage,
        enabled: hasFlashPlugin,
        extension: hasFlashExtension
    }

})();
