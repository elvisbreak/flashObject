window.flashObject = window.flashObject || (function() {

    var ie = /msie/ig.test(navigator.userAgent);

    /**
     * @param {string} innerHTML
     */

    function resolve(innerHTML) {
        var div = document.createElement("div");
            div.innerHTML = innerHTML.replace(/DIV/g, 'OBJECT');
        return div.firstChild;
    }

    /**
     * @param {object} objectElement
     * @param {object} objectParams
     */

    function createParams(objectElement, objectParams) {
        for (var objectParam in objectParams) {
            var paramElement = document.createElement("param");
                paramElement.setAttribute('name', objectParam);
            if (objectParam !== 'flashvars') {
                paramElement.setAttribute('value', objectParams[objectParam]);
            } else {
                var temporaryString = '';
                for (var objectParamParam in objectParams[objectParam]) {
                    temporaryString = (temporaryString !== '' ? temporaryString + "&amp;" : '') + [objectParamParam, objectParams[objectParam][objectParamParam]].join("=");
                }
                paramElement.setAttribute('value', temporaryString);
            }
            objectElement.appendChild(paramElement);
        }
        return objectElement;
    }

    /**
     * @param {object} objectElement
     * @param {object} objectAttributes
     */

    function createAttributes(objectElement, objectAttributes) {
        for (var objectAttribute in objectAttributes) {
            if (objectElement.tagName === 'EMBED') {
                if (objectAttribute !== 'codebase' && objectAttribute !== 'classid') {
                   objectElement.setAttribute((objectAttribute === 'data'? 'src' : objectAttribute), objectAttributes[objectAttribute]);
                }
            } else {
                if (objectAttribute !== 'type' && objectAttribute !== 'pluginspage') {
                    objectElement.setAttribute(objectAttribute, objectAttributes[objectAttribute]);
                }
            }
        }
    }

    /**
     * @param {object} objectElement
     * @param {object} flashVariables
     */

    function createVariables(objectElement, flashVariables) {
        var temporaryString = '';
        for (var flashVariable in flashVariables) {
            temporaryString = (temporaryString !== '' ? temporaryString + "&amp;" : '') + [flashVariable, flashVariables[flashVariable]].join("=");
        }
        objectElement.setAttribute('flashvars', temporaryString);
    }

    return {

        /**
         * Detect Flash Plugin
         */

        detected: function() {
            if (navigator.plugins && navigator.plugins["Shockwave Flash"]) {
                return true;
            } else {
                try {
                    return new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                } catch (e) {
                    return false;
                }
            }
        },

        /**
         * @param {string} elementId
         * @param {string} imageSource
         * @param {integer} imageWidth
         * @param {integer} imageHeight
         * @param {string} linkHref
         * @param {string} linkTarget
         */

        image: function(elementId, imageSource, imageWidth, imageHeight, linkHref, linkTarget) {
            var appendElement = document.getElementById(elementId);
            var linkElement = document.createElement('a');
            var imageElement = document.createElement('img');
            createAttributes(linkElement, {href: linkHref, target: linkTarget || '_blank'});
            createAttributes(imageElement, {src: imageSource, width: imageWidth, height: imageHeight, target: '_blank', border: 0});
            linkElement.appendChild(imageElement);
            appendElement.appendChild(linkElement);
        },

        /**
         * @param {string} elementId
         * @param {string} flashSource
         * @param {integer} flashWidth
         * @param {integer} flashHeight
         * @param {string} flashVariables
         */

        embed: function(elementId, flashSource, flashWidth, flashHeight, flashVariables) {

            var appendElement = document.getElementById(elementId);
            var objectElement = document.createElement(ie ? 'div' : 'object');
            var embedElement = document.createElement('embed');

            var flashAttributes = {
                data: flashSource, 
                width: flashWidth, 
                height: flashHeight,
                type: 'application/x-shockwave-flash',
                pluginspage: 'http://www.adobe.com/go/getflashplayer',
                classid: 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000', 
                codebase: 'http://fpdownload.macromedia.com/get/shockwave/cabs/flash/swflash.cab#version=7,0,0,0'
            };

            var flashParameters = {
                movie: flashSource, 
                wmode: 'opaque', 
                allowscriptaccess: 'always', 
                flashvars: flashVariables
            };

            createAttributes(objectElement, flashAttributes);
            createAttributes(embedElement, flashAttributes);
            createParams(objectElement, flashParameters);

            if (ie) {
                objectElement = resolve(objectElement.outerHTML);
            } else {
                createVariables(embedElement, flashVariables);
                objectElement.appendChild(embedElement);
            }

            appendElement.appendChild(objectElement);

        }
    }

})();
