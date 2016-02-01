window.parent.flashObject = window.parent.flashObject || (function() {

    var isIE = /msie|trident|edge/g.test(navigator.userAgent.toLowerCase()),
        _atts = {},
        _pars = {},
        _flvs = {},
        debug = !1,

    isFlash = function(arg) {
        return 'swf' === arg.substr(arg.lastIndexOf('.') + 1);
    },

    isEmpty = function(domObj) {
        for (var key in domObj) {
            if (domObj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    },

    fixIE = function(arg) {
        var div = document.createElement("div");
            div.innerHTML = arg.replace(/div|DIV/g, 'object');
        return div.firstChild;
    },

    merge = function(obj1, obj2) {
        for (var key in obj1) {
            obj2[key] = obj1[key];
        }
    },

    setEvent = function(domObj, type, fn) {
        if (domObj.addEventListener) {
            domObj.addEventListener(type, fn, false);
        } else if (domObj.attachEvent)  {
            domObj.attachEvent('on' + type, fn);
        }
    },

    // Attributes
    setAttributes = function(domObj, attsObj) {
        if (attsObj) {
            for (var attObj in attsObj) {
                domObj.setAttribute(attObj, attsObj[attObj]);
            }
        } else {
            for (var _att in _atts) {
                if (domObj.tagName === 'OBJECT') {
                    !/type|pluginspage|src/i.test(_att) && domObj.setAttribute(_att, _atts[_att]);
                } else {
                    !/classid|codebase|data/i.test(_att) && domObj.setAttribute(_att, _atts[_att]);
                }
            }
        }
    },

    // Params
    setParams = function(domObj) {
        for (var _par in _pars) {
            var par = document.createElement("param");
                par.setAttribute('name', _par);
                par.setAttribute('value', _pars[_par]);
            domObj.appendChild(par);
        }
    },

    // Flashvars
    setFlashvars = function(domObj, forEmbed) {
        if (!isEmpty(_flvs)) {
            if (forEmbed) {
                var str = '';
                for (var _flv in _flvs) {
                    str = (str !== '' ? str + "&amp;" : '') + [_flv, _flvs[_flv]].join("=");
                }
                domObj.setAttribute('flashvars', str);
            } else {
                var par = document.createElement("param"), str = '';
                    par.setAttribute('name', 'flashvars');
                for (var _flv in _flvs) {
                    str = (str !== '' ? str + "&amp;" : '') + [_flv, _flvs[_flv]].join("=");
                    domObj.appendChild(par);
                }
                par.setAttribute('value', str);
                domObj.appendChild(par);
            }
        }
    },

    detect = function() {
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

    image = function(domObj, src, width, height, click) {
        try {
            var link = document.createElement('a'), img = document.createElement('img');
            domObj = 'object' === typeof domObj ? domObj : document.getElementById(domObj);
            setAttributes(link, {href: click, target: '_blank', style: 'display:block;font-size:0'});
            setAttributes(img, {src: src, width: width, height: height, border: 0});
            link.appendChild(img);
            domObj.appendChild(link);
            return img;
        } catch (e) {
            debug && console.log(e);
        }
    },

    embed = function(id, swf, atts, pars, flvs, polite) {

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
            merge(atts, _atts);
            merge(pars, _pars);
            merge(flvs, _flvs);

            setAttributes(obj, !1);
            setParams(obj);
            setFlashvars(obj, !1);

            if (isIE) {
                obj = fixIE(obj.outerHTML);
            } else {
                setFlashvars(emb, !0);
                setAttributes(emb, !1);
                obj.appendChild(emb);
            }

            if (polite) {
                el.appendChild(obj);
                el.style.visibility = 'hidden';
                image(pol, polite, atts.width, atts.height, flvs.clickTAG || '');
                setEvent(window, 'load', function() {
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

    // Exports
    return {
        debug: debug,
        detect: detect,
        image: image,
        embed: embed,
        flash: isFlash
    }

})();
