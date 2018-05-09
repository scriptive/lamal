(function(win, doc) {
    "use strict";
    var click = "ontouchstart" in doc.documentElement ? "touchstart" : "click";
    var eMain, eMenu, eDrag, eWidthPanel = 320, eWidthOffset, lt = "left", rt = "right", requestExtend = {}, requestParam = {}, requestProperty = [ "error", "ready", "panelOpen", "panelClose", "panelDrag", "hash", "online", "offline", "resize" ], offsetNormal = "", offsetReverse = "", config = {
        main: "",
        mainActive: "",
        menu: "",
        classActive: "active",
        classOverlay: "overlay",
        widthMax: eWidthPanel,
        widthMin: 0,
        widthLeftover: 60,
        widthUnit: "px",
        dragArea: 50,
        dragMin: 200,
        dataOffset: "offset",
        dataId: "id",
        dataLeft: lt,
        dataRight: rt,
        idUnique: "app:unique"
    }, Panel = {
        button: "",
        click: function() {
            if (!eMenu) return;
            new Hammer(eMenu).on("tap", function(evt) {
                var e = evt.target;
                requestParam = {};
                if (e.dataset[config.dataId]) {
                    $.has.panelButton(e);
                    if ($.has.panelOffset(e.dataset[config.dataId])) {
                        Core.prototype.scPanelCurrent = Panel.current;
                        if ($.has.slided(offsetNormal)) {
                            Panel.toggle(config.widthMin);
                            $.on(3);
                        } else {
                            Panel.toggle(config.widthMax);
                            $.on(2);
                        }
                    }
                }
            });
        },
        drag: function() {
            if (!eMain) return;
            Core.prototype.scContent = config.mainActive ? eMain.querySelector(config.mainActive) : eMain;
            var eDrag = new Hammer(Core.prototype.scContent);
            eDrag.add(new Hammer.Pan({
                direction: Hammer.DIRECTION_HORIZONTAL,
                pointers: 0,
                threshold: 0
            }));
            eDrag.on("panstart", function(evt) {
                requestParam = {};
                if (eMain.dataset[config.dataLeft] && config.dragArea > $.has.left(evt.center.x)) {
                    $.has.panelOffset(eMain.dataset[config.dataLeft]);
                } else if (eMain.dataset[config.dataRight] && $.has.right(evt.center.x) < config.dragArea) {
                    $.has.panelOffset(eMain.dataset[config.dataRight]);
                } else {
                    offsetNormal = null;
                }
                if (offsetNormal) {
                    Core.prototype.scPanelCurrent = Panel.current;
                    $.has.panelButton(eMain.dataset[offsetNormal]);
                    if ($.has.slided(offsetNormal)) {
                        if ($.has.position(offsetReverse) < config.widthMin) {} else {
                            if ($.has.max()) {} else {}
                        }
                    } else {
                        Panel.current.style.zIndex = 2;
                        $.on(2);
                    }
                }
            }, true).on("pan", function(e) {
                if (offsetNormal) {
                    var x = offsetNormal == lt ? e.center.x : eWidthOffset - e.center.x;
                    requestParam.percentage = x / config.widthMax * 100;
                    if (requestParam.percentage > 0 && requestParam.percentage < 100) {
                        Panel.toggle(x);
                        $.on(4);
                    }
                }
            }, true).on("panend", function(e) {
                if (Panel.done()) $.on(3);
            }, true).on("pancancel", function(e) {
                if (Panel.done()) $.on(3);
            }, true);
        },
        close: function() {
            if (!config.mainActive) return;
            var abc = eMain.querySelector(config.mainActive);
            var touchstartPanel = function(e) {
                e.preventDefault();
                Panel.toggle(config.widthMin);
                $.on(3);
                abc.removeEventListener("touchstart", touchstartPanel, true);
            };
            abc.addEventListener("touchstart", touchstartPanel, true);
        },
        done: function() {
            if (offsetNormal) {
                var w = $.has.position(offsetNormal) > config.dragMin ? config.widthMax : config.widthMin;
                Panel.toggle(w);
                return w < 1;
            }
        },
        toggle: function(x) {
            if (x <= config.widthMax) {
                if (x <= config.widthMin) {
                    eMain.style[offsetNormal] = $.pixel(config.widthMin);
                    if (Panel.current) Panel.current.style.zIndex = 1;
                    if (Panel.button) Panel.button.classList.remove(config.classActive);
                    eMain.classList.remove(config.classOverlay);
                    if ($.has.position(offsetReverse) < config.widthMin) {
                        eMain.style[offsetReverse] = $.pixel(config.widthMin);
                    }
                } else {
                    if (Panel.current) Panel.current.style.zIndex = 2;
                    eMain.style[offsetNormal] = $.pixel(x);
                    if ($.has.max()) {
                        if (doc.body.offsetWidth - config.widthMax <= config.widthMax) {
                            eMain.style[offsetReverse] = $.pixel(Math.abs(x) * -1);
                            requestParam.overlay = true;
                            if (x == config.widthMax) {
                                eMain.classList.add(config.classOverlay);
                                Panel.close();
                            }
                        } else {
                            eMain.style[offsetReverse] = $.pixel(config.widthMin);
                        }
                        if (Panel.button) $.siblingClass(Panel.button, config.classActive);
                        if (Panel.current) Panel.current.style.maxWidth = $.pixel(config.widthMax);
                    } else {
                        if (Panel.button) Panel.button.classList.add(config.classActive);
                    }
                }
            }
        }
    }, $ = {
        pixel: function(x) {
            return x + config.widthUnit;
        },
        has: {
            position: function(p) {
                var x = eMain.style[p];
                return x ? parseInt(x) : 0;
            },
            left: function(x) {
                return x + eMain.offsetWidth - (eMain.offsetWidth + $.has.position(lt));
            },
            right: function(x) {
                return eMain.offsetWidth + $.has.position(lt) - x;
            },
            panelOffset: function(id) {
                Panel.current = doc.getElementById(id);
                offsetNormal = Panel.current && Panel.current.dataset[config.dataOffset] ? Panel.current.dataset[config.dataOffset] : false;
                if (offsetNormal) {
                    offsetReverse = offsetNormal == lt ? rt : lt;
                    return true;
                }
            },
            panelButton: function(e) {
                if (e instanceof Element) {
                    Panel.button = e;
                } else {
                    Panel.button = doc.querySelector('[data-0="1"]'.replace("0", config.dataId).replace("1", e));
                }
            },
            slided: function(p) {
                return $.has.position(p) == config.widthMax;
            },
            max: function() {
                return eMain.offsetWidth - config.widthMax <= config.widthMax;
            },
            min: function() {
                return eMain.offsetWidth <= config.widthMax;
            },
            main: function(e) {
                if (!eMain && config.main) {
                    eMain = typeof config.main == "string" ? doc.querySelector(config.main) : config.main;
                    $.has.menu();
                }
            },
            menu: function() {
                if (!eMenu && config.menu) {
                    eMenu = typeof config.menu == "string" ? doc.querySelector(config.menu) : config.menu;
                }
            }
        },
        siblingClass: function(e, className) {
            var h = e.parentElement.children;
            for (var i = 0; i < h.length - 0; i++) {
                if (h[i] == e) {
                    e.classList.add(className);
                } else if (h[i].classList.contains(className)) {
                    h[i].classList.remove(className);
                }
            }
        },
        hashObject: function() {
            var q, r = {}, o = location.hash.split("?");
            if (o.length) {
                var hash = o[0].split("/");
                for (var i = 0; i < hash.length; i++) {
                    if (hash[i]) {
                        if (i == 0) {
                            r["page"] = hash[i].replace(/#/, "");
                        } else {
                            r[i] = hash[i];
                        }
                    }
                }
                if (o.length > 1) {
                    var search = /([^\?#&=]+)=([^&]*)/g;
                    while (q = search.exec(o[1])) r[q[1]] = q[2];
                }
            }
            Core.prototype.hashObject = r;
        },
        hashEvent: function() {
            $.hashObject();
            win.addEventListener("hashchange", function(event) {
                $.hashObject();
                $.resizeEvent();
                $.on(5, event);
            }, false);
        },
        onlineEvent: function() {
            win.addEventListener("online", function(event) {
                $.on(6, event);
            });
        },
        offlineEvent: function() {
            win.addEventListener("offline", function(event) {
                $.on(7, event);
            });
        },
        resizeEvent: function() {
            win.addEventListener("resize", function(event) {
                $.resizeObject();
                $.on(8, event);
            }, false);
        },
        resizeObject: function() {
            $.width();
            if (eWidthOffset - config.widthMax <= config.widthMax) {
                Panel.toggle(config.widthMin);
                $.on(3);
            }
        },
        merge: function() {
            var o = {}, i = 0, il = arguments.length, k;
            for (;i < il; i++) {
                for (k in arguments[i]) {
                    if (arguments[i].hasOwnProperty(k)) o[k] = arguments[i][k];
                }
            }
            return o;
        },
        mergeConfig: function() {
            var i = 0, il = arguments.length, k;
            for (;i < il; i++) {
                for (k in arguments[i]) {
                    if (arguments[i].hasOwnProperty(k)) config[k] = arguments[i][k];
                }
            }
            return config;
        },
        width: function() {
            try {
                eWidthOffset = Math.min(eMain.parentElement.offsetWidth, doc.documentElement.clientWidth);
                if (eWidthOffset - config.widthLeftover <= config.widthMax) {
                    config.widthMax = eWidthOffset - config.widthLeftover;
                } else {
                    config.widthMax = eWidthPanel;
                }
            } catch (e) {
                if (eMain instanceof Element) $.on(0);
            } finally {}
        },
        ready: function(callback) {
            $.has.main();
            if (eMain) {
                Core.prototype.scMain = eMain;
                $.width();
                if (eMenu) {
                    Core.prototype.scMenu = eMenu;
                    Panel.click();
                }
                Panel.drag();
            }
            callback();
        },
        on: function(i, e) {
            i = requestProperty[i];
            if (requestExtend.hasOwnProperty(i) && requestExtend[i] instanceof Function) {
                requestExtend[i](e || requestParam);
            }
        }
    };
    function Core(e) {
        this.targetElement(e);
    }
    Core.prototype.ready = function(callback) {
        $.mergeConfig(this.target);
        function readyRequest() {
            if (this.isFunction(callback)) {
                if ("cordova" in win && location.protocol == "file:") {
                    doc.addEventListener("deviceready", readyResponse.bind(this), false);
                } else {
                    readyResponse.call(this);
                }
            }
        }
        function readyResponse() {
            $.hashEvent();
            $.onlineEvent();
            $.offlineEvent();
            $.resizeEvent();
            callback(this);
        }
        win.addEventListener("DOMContentLoaded", readyRequest.bind(this), false);
    };
    Core.prototype.on = function(id, callback) {
        if (this.isFunction(id)) {
            if (this.isString(this.target)) {
                Core.prototype[this.target] = id;
            }
        } else if (requestProperty.indexOf(id) > -1) {
            requestExtend[id] = callback;
        }
        return this;
    };
    Core.prototype.inArray = function() {
        return this.target.indexOf(arguments[0]) > -1;
    };
    Core.prototype.isEmpty = function(o) {
        o = arguments.length ? arguments[0] : this.target;
        if (this.isObject(o)) {
            return Object.keys(o).length === 0;
        } else if (this.isArray(o)) {
            return o.length;
        } else {
            return true;
        }
    };
    Core.prototype.isFunction = function() {
        var e = arguments.length ? arguments[0] : this.target;
        if (typeof e == "function" || e instanceof Function) return true;
    };
    Core.prototype.isObject = function(e) {
        return typeof e == "object" || e instanceof Object;
    };
    Core.prototype.isArray = function() {
        if ((arguments.length ? arguments[0] : this.target) instanceof Array) return true;
    };
    Core.prototype.isString = function(e) {
        return typeof e == "string" || e instanceof String;
    };
    Core.prototype.isNumeric = function() {};
    Core.prototype.merge = function() {
        var o = this.target, i = 0, il = arguments.length, k;
        for (;i < il; i++) {
            for (k in arguments[i]) {
                if (arguments[i].hasOwnProperty(k)) o[k] = arguments[i][k];
            }
        }
        return this.target;
    };
    Core.prototype.each = function() {
        var self = this, o = arguments.length > 1 ? arguments[0] : this.target, callback = arguments.length > 1 ? arguments[1] : arguments[0], a = {
            object: function() {
                var s = 0, l = Object.keys(o).length;
                for (var i in o) {
                    if (o.hasOwnProperty(i)) {
                        s++;
                        callback.call(self, o[i], i, o, s == l);
                    }
                }
            },
            array: function() {
                var l = o.length;
                for (var i = 0; i < l; i++) {
                    callback.call(self, o[i], i, o, i == l - 1);
                }
            }
        };
        return a[this.isObject(o) ? "object" : "array"]();
    };
    Core.prototype.click = function(callback) {
        this.createElement();
        if (this.target && callback instanceof Function) new Hammer(this.target).on("tap", callback);
        return this;
    };
    Core.prototype.submit = function(callback) {
        this.createElement();
        if (this.target && callback instanceof Function) {
            this.target.addEventListener("submit", callback, false);
        }
        return this;
    };
    Core.prototype.extension = function(o) {
        if (o instanceof Object) for (var i in o) if (o.hasOwnProperty(i)) this[i] = o[i];
        return this;
    };
    Core.prototype.panelEvent = function(callback) {
        $.ready(function() {
            eWidthPanel = config.widthMax;
            if (callback instanceof Function) callback({
                open: function(callback) {
                    requestExtend.panelOpen = callback;
                },
                close: function(callback) {
                    requestExtend.panelClose = callback;
                },
                drag: function(callback) {
                    requestExtend.panelDrag = callback;
                }
            });
            if (eMain.dataset[config.open]) {
                $.has.panelOffset(eMain.dataset[config.open]);
            }
            if (offsetNormal) {
                $.has.panelButton(eMain.dataset[offsetNormal]);
                Core.prototype.scPanelCurrent = Panel.current;
                Panel.toggle(config.widthMax);
                $.on(2);
            }
        });
    };
    Core.prototype.scrollEvent = function(callback) {
        if (this.target && callback instanceof Function) this.target.addEventListener("scroll", callback);
    };
    Core.prototype.localStorage = {
        name: {},
        db: function() {
            return win.localStorage;
        },
        select: function(key, val) {
            var val = this.db().getItem(this.ids(key));
            try {
                this.name[key] = val ? JSON.parse(val) : {};
            } catch (e) {
                this.name[key] = val;
            } finally {
                return this;
            }
        },
        insert: function(key, val) {
            var id = this.ids(key);
            if (typeof val == "object") {
                this.db().setItem(id, JSON.stringify(val));
            } else {
                this.db().setItem(id, val);
            }
            this.name[key] = val;
            return this;
        },
        update: function(key, val) {
            return this.insert(key, val || this.name[key]);
        },
        delete: function(key) {
            this.db().removeItem(this.ids(key));
            return this;
        },
        deleteAll: function() {
            this.db().clear();
            return this;
        },
        ids: function(key) {
            return config.idUnique.replace(/unique/, key);
        }
    };
    Core.prototype.targetElement = function(e) {
        if (e instanceof Object && e.hasOwnProperty("target")) {
            this.target = e.target;
        } else {
            this.target = e;
        }
        return this;
    };
    Core.prototype.joinElement = function(e) {
        if (e instanceof Element) {
            return e;
        } else if (this.isObject(e)) {
            if (e.hasOwnProperty("target")) {
                if (e.target instanceof Element) {
                    return e.target;
                } else if (this.isString(e.target)) {
                    return doc.createElement(e.target);
                }
            }
        } else if (this.isString(e)) {
            var se;
            try {
                se = doc.createElement(e);
            } catch (s) {
                se = doc.querySelector(e);
            } finally {
                return se;
            }
        } else {
            return e;
        }
    };
    Core.prototype.createElement = function(e) {
        if (e) {
            return this.joinElement(e);
        } else if (this.target) {
            this.target = this.joinElement(this.target);
        }
        return this;
    };
    Core.prototype.selectElement = function(e, i) {
        var o = this.target || doc;
        this.target = i ? o.querySelectorAll(e) : o.querySelector(e);
        return this;
    };
    Core.prototype.removeChild = function() {
        while (this.target.firstChild) {
            this.target.removeChild(this.target.firstChild);
        }
        return this;
    };
    Core.prototype.hasChild = function() {
        return this.target.hasChildNodes();
    };
    Core.prototype.appendChild = function(e) {
        this.createElement();
        if (arguments.length > 1) {
            e = arguments;
            for (var i = 0, j = e.length; i < j; i++) {
                var eTag = this.joinElement(e[i]);
                if (eTag) this.target.appendChild(eTag);
            }
        } else {
            var inheritance = this.isObject(e) ? e.hasOwnProperty("target") && e.target instanceof Element : false;
            e = this.target.appendChild(this.joinElement(e));
            if (inheritance == false) {
                this.target = e;
            }
        }
        return this;
    };
    Core.prototype.prependChild = function(e) {
        this.createElement();
        if (arguments.length > 1) {
            e = arguments;
            for (var i = 0, j = e.length; i < j; i++) {
                this.target.insertBefore(this.joinElement(e[i]), this.target.firstChild);
            }
        } else {
            var inheritance = this.isObject(e) ? e.hasOwnProperty("target") && e.target instanceof Element : false;
            e = this.target.insertBefore(this.joinElement(e), this.target.firstChild);
            if (inheritance == false) {
                this.target = e;
            }
        }
        return this;
    };
    Core.prototype.appendTo = function(e) {
        this.createElement();
        this.joinElement(e).appendChild(this.target);
        return this;
    };
    Core.prototype.addClass = function(name) {
        name = Array.prototype.slice.call(arguments);
        try {
            this.target.classList.add(name.join(" "));
        } catch (e) {
            this.attr("class", name.join(" "));
        } finally {
            return this;
        }
    };
    Core.prototype.removeClass = function(name) {
        try {
            this.target.classList.remove(name);
        } catch (e) {} finally {
            return this;
        }
    };
    Core.prototype.hasClass = function(name) {
        return this.target.classList.contains(name);
    };
    Core.prototype.toggleClass = function(name, idea) {
        this.target.classList.toggle(name, idea);
        return this;
    };
    Core.prototype.siblingClass = function(name) {
        this.each(this.target.parentNode.childNodes, function(e) {
            if (e == this.target) {
                e.classList.add(name);
            } else if (e.classList.contains(name)) {
                e.classList.remove(name);
            }
        });
        return this;
    };
    Core.prototype.html = function() {
        this.createElement();
        this.removeChild();
        var e = arguments;
        for (var i = 0, j = e.length; i < j; i++) {
            if (this.isString(e[i])) {
                this.target.insertAdjacentHTML("beforeend", e[i]);
            } else {
                var eTag = this.createElement(e[i]);
                if (eTag) {
                    this.target.appendChild(eTag);
                }
            }
        }
        return this;
    };
    Core.prototype.attr = function(id, name) {
        this.createElement();
        if (arguments.length >= 2) {
            this.target.setAttribute(id, name);
        } else {
            return this.target.getAttribute(id);
        }
        return this;
    };
    win.scriptive = function(e) {
        return new Core(e);
    };
})(window, document);