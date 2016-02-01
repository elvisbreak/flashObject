window.parent.flashObject = window.parent.flashObject || (function() {

    var isIE = /msie|trident|edge/g.test(navigator.userAgent.toLowerCase()),
        _atts = {},
        _pars = {},
        _flvs = {},
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

    convertToIE = function(str) {
        var div = document.createElement("div");
            div.innerHTML = str.replace(/div|DIV/g, 'object');
        return div.firstChild;
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
     * @param {object} atts Attributes
     */

    setAttributes = function(obj, atts) {
        if (atts) {
            for (var att in atts) {
                obj.setAttribute(att, atts[att]);
            }
        } else {
            for (var _att in _atts) {
                if (obj.tagName === 'OBJECT') {
                    !/type|pluginspage|src/i.test(_att) && obj.setAttribute(_att, _atts[_att]);
                } else {
                    !/classid|codebase|data/i.test(_att) && obj.setAttribute(_att, _atts[_att]);
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
        for (var _par in _pars) {
            var par = document.createElement("param");
                par.setAttribute('name', _par);
                par.setAttribute('value', _pars[_par]);
            obj.appendChild(par);
        }
    },

    /**
     * Set Object Flash Variables
     *
     * @param {object} obj HTML Object
     */

    setObjectFlashVariables = function(obj) {
        if (!hasFlashVariables(_flvs)) {
            var par = document.createElement("param"), str = '';
                par.setAttribute('name', 'flashvars');
            for (var _flv in _flvs) {
                str = (str !== '' ? str + "&amp;" : '') + [_flv, _flvs[_flv]].join("=");
                obj.appendChild(par);
            }
            par.setAttribute('value', str);
            obj.appendChild(par);
        }
    },

    /**
     * Set Embed Flash Variables
     *
     * @param {object} obj HTML Object
     */

    setEmbedFlashVariables = function(obj) {
        if (!hasFlashVariables(_flvs)) {
            var str = '';
            for (var _flv in _flvs) {
                str = (str !== '' ? str + "&amp;" : '') + [_flv, _flvs[_flv]].join("=");
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
            var link = document.createElement('a'), img = document.createElement('img');
            obj = 'object' === typeof obj ? obj : document.getElementById(obj);
            setAttributes(link, {href: click, target: '_blank', style: 'display:block;font-size:0'});
            setAttributes(img, {src: src, width: width, height: height, border: 0});
            link.appendChild(img);
            obj.appendChild(link);
            return img;
        } catch (e) {
            debug && console.log(e);
        }
    },

    /**
     * Embed Flash Object
     *
     * @param {string} id HTML Object ID
     * @param {string} swf Flash Source Path
     * @param {object} atts Flash Attributes
     * @param {object} pars Flash Parameters
     * @param {object} flvs Flash Variables
     * @param {object} polite Polite Image Source Path
     * @return {object} Flash Object
     */

    embedFlashObject = function(id, swf, atts, pars, flvs, polite) {

        try {

            var el = document.getElementById(id),
                pol = document.getElementById(id.replace('main', 'polite')),
                obj = document.createElement(isIE ? 'div' : 'object'),
                emb = document.createElement('embed');

            // Attributes
            atts = atts || {};
            atts.data = swf;
            atts.src = swf;
            atts.type = 'application/x-shockwave-flash';
            //atts.pluginspage = 'http://www.adobe.com/go/getflashplayer';
            //atts.classid = 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';
            //atts.codebase = 'http://fpdownload.macromedia.com/get/shockwave/cabs/flash/swflash.cab#version=7,0,0,0';

            // Params
            pars = pars || {};
            pars.movie = swf;
            pars.width = atts.width;
            pars.height = atts.height;
            pars.wmode = 'opaque';
            pars.menu = 'false';
            pars.allowscriptaccess = 'always';

            // Flashvars
            flvs = flvs || {};

            // Merge Objects
            mergeObjects(atts, _atts);
            mergeObjects(pars, _pars);
            mergeObjects(flvs, _flvs);

            setAttributes(obj, !1);
            setParams(obj);
            setObjectFlashVariables(obj);

            if (isIE) {
                obj = convertToIE(obj.outerHTML);
            } else {
                setEmbedFlashVariables(emb);
                setAttributes(emb, !1);
                obj.appendChild(emb);
            }

            if (polite) {
                el.appendChild(obj);
                el.style.visibility = 'hidden';
                embedHypertextImage(pol, polite, atts.width, atts.height, flvs.clickTAG || '');
                addEventListener(window, 'load', function() {
                    pol.style.display = 'none';
                    el.style.visibility = 'visible';
                });
            } else {
                el.appendChild(obj);
            }

            return obj;

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
