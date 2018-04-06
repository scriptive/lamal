(function($) {
    "use strict";
    var configPanel = {}, configMain = {
        main: "#lCm",
        mainActive: ".scSB",
        menu: "#lMn",
        idUnique: "lamal:unique"
    }, configuration = {
        firebase: {
            apiKey: "AIzaSyBOawkIaNOR0oc9gDjAwYnnmVSnp-Bcvog",
            authDomain: "zomi-server.firebaseapp.com",
            databaseURL: "https://zomi-server.firebaseio.com",
            projectId: "zomi-server",
            storageBucket: "zomi-server.appspot.com",
            messagingSenderId: "561736444893"
        },
        page: {
            home: {
                id: 1,
                name: "Home",
                class: "icon-home",
                title: "Lamal"
            },
            category: {
                id: 2,
                name: "Category",
                class: "category",
                home: true
            },
            song: {
                id: 3,
                name: "Song",
                class: "song",
                home: true
            },
            lyric: {
                id: 4,
                name: "Lyric",
                class: "lyric"
            },
            editor: {
                id: 4,
                name: "editor",
                class: "editor"
            },
            search: {
                id: 5,
                name: "Search",
                class: "icon-lookup",
                title: "Search"
            },
            result: {
                id: 6,
                title: "Result"
            },
            user: {
                id: 7,
                class: "user",
                title: "user",
                auth: "user"
            },
            signin: {
                id: 8,
                class: "signin",
                title: "signin",
                auth: "guest"
            },
            signup: {
                id: 9,
                class: "signup",
                title: "signup",
                auth: "guest"
            },
            fgpwd: {
                id: 10,
                class: "fgpwd",
                title: "fgpwd",
                auth: "guest"
            },
            setting: {
                id: 11,
                class: "icon-settubg",
                title: "Setting"
            },
            about: {
                id: 12,
                name: "About",
                class: "icon-about",
                title: "About"
            },
            contact: {
                id: 13,
                name: "Contact",
                class: "icon-contact",
                title: "Contact"
            }
        },
        file: {
            template: "z.html"
        },
        fileStorage: {
            RequestQuota: 1073741824,
            Permission: 0,
            objectStore: {
                name: "lamal",
                version: 1
            }
        },
        lang: {
            isLocalRemove: 'Would you like to remove "{is}" from local?',
            tryAWord: "Try a word or two!",
            noMatchFor: "No match for {for}!",
            noCategoryContent: "This category has no content...",
            noCategoryData: "This category has no data...",
            noBookmark: "None",
            noLanguage: "...",
            isNotFound: 'Not found: "{is}"',
            Loading: "Loading",
            OneMoment: "one moment please!",
            Error: "Error",
            Add: "Add",
            Adding: "Adding",
            Remove: "Remove",
            Removing: "Removing",
            Update: "Update",
            Updating: "Updating"
        },
        classname: {
            active: "active",
            inactive: "inactive",
            filter: "filter",
            available: "available"
        },
        name: "Lamal",
        version: "1.0.0",
        build: "1.0.1"
    };
    $("error").on(function(e) {
        console.log("error", e);
    });
    $("notification").on(function(e) {
        console.log(e);
        $("#msg").addClass("ready").html("...ready...");
    });
    $("notify").on(function(callback) {
        var i = this.target;
        return new Promise(function(resolve, reject) {
            $().selectElement(".scNotify").addClass("active");
            if (typeof i == "string") {
                $().selectElement(".scNotify .msg").html(i);
                if (typeof callback == "function") callback(resolve, reject).then(function() {
                    $().selectElement(".scNotify").removeClass("active");
                });
            } else {
                $().selectElement(".scNotify .msg").html(i.message);
                var actionOk = $().selectElement(".scNotify .action .ok").toggleClass("active", i.ok);
                if (actionOk.hasClass("active")) {
                    actionOk.html(typeof i.ok == "string" ? i.ok : "").click(function() {
                        $().selectElement(".scNotify").removeClass("active");
                        resolve();
                    });
                }
                var actionCancel = $().selectElement(".scNotify .action .cancel").toggleClass("active", i.cancel);
                if (actionCancel.hasClass("active")) {
                    actionCancel.html(typeof i.cancel == "string" ? i.cancel : "").click(function() {
                        $().selectElement(".scNotify").removeClass("active");
                        reject();
                    });
                }
                if (typeof callback == "function") callback();
            }
        });
    });
    $(configMain).ready(function(app) {
        var file, doc = document, local = app.localStorage;
        if (!firebase.apps.length) {
            firebase.initializeApp(configuration.firebase);
        }
        app.extension({
            fire: firebase,
            initiate: function() {
                configuration.pageHome = Object.keys(configuration.page)[0];
                var process = function() {
                    if (local.name.setting.hasOwnProperty("build")) {
                        if (local.name.setting.build == configuration.build) {
                            configuration.requireUpdate = 0;
                        } else {
                            configuration.requireUpdate = 2;
                        }
                    } else {
                        configuration.requireUpdate = 1;
                    }
                    if (configuration.requireUpdate) {
                        local.name.setting.version = configuration.version;
                        local.name.setting.build = configuration.build;
                        local.update("setting");
                    }
                    return new Promise(function(resolve, reject) {
                        file = fileStorage(configuration.fileStorage, {
                            success: function() {
                                resolve();
                            },
                            fail: function(e) {
                                reject(e);
                            }
                        });
                    });
                };
                var template = function(e) {
                    return file.download({
                        url: configuration.file.template.replace(/z/, [ "layout", "default" ].join(".")),
                        before: function(e) {
                            e.overrideMimeType("text/html; charset=utf-8");
                            e.responseType = "document";
                        }
                    }).then(function(html) {
                        return new Promise(function(resolve, reject) {
                            try {
                                var bOD = html.data.body;
                                while (bOD.firstChild) doc.body.appendChild(bOD.firstChild);
                                app.panelEvent(function(panel) {
                                    panel.open(function(o) {
                                        var ul = $(app.scPanelCurrent).selectElement("ul.lmList").removeChild();
                                        $(configuration.page).each(function(v, i) {
                                            if (v.name) {
                                                ul.appendChild($("li").appendChild($("a").html(v.name).attr("href", "#" + i)).addClass(i).toggleClass("active", local.name.query.page == i));
                                            }
                                        });
                                        if (o.overlay === true) {
                                            app.scContent.style.opacity = .2;
                                        }
                                    });
                                    panel.close(function() {
                                        app.scContent.style.opacity = 1;
                                    });
                                    panel.drag(function(o) {
                                        if (o.overlay === true) {
                                            app.scContent.style.opacity = parseFloat(1 - o.percentage / 170).toFixed(2);
                                        }
                                    });
                                    resolve();
                                });
                            } catch (e) {
                                reject(e);
                            }
                        }).then(function() {
                            return terminal().then(function(e) {
                                var splashScreen = doc.querySelector("div#screen");
                                if (e) {
                                    return e;
                                } else if (splashScreen) {
                                    splashScreen.remove();
                                }
                            });
                        }, function(e) {
                            return e;
                        });
                    }, function(e) {
                        return e;
                    }).then(function(e) {
                        return e;
                    });
                };
                var terminal = function() {
                    return route().then(function() {
                        local.update("query");
                        var pageCurrent = local.name.query.page;
                        return new Promise(function(resolve, reject) {
                            app.page[pageCurrent](resolve, reject);
                        }).then(function() {
                            doc.body.setAttribute("id", pageCurrent);
                            app.header.content();
                        }, function(e) {
                            return e;
                        });
                    }, function(e) {
                        return e;
                    });
                };
                var route = function() {
                    var availableLanguage = Object.keys(local.name.setting.available), fO = {
                        page: configuration.pageHome,
                        language: 1,
                        category: 1,
                        q: "",
                        pagePrevious: configuration.pageHome,
                        result: ""
                    }, fM = {
                        page: function(i, n, d, o) {
                            o[i] = configuration.page.hasOwnProperty(n.toLowerCase()) ? n.toLowerCase() : d;
                        },
                        pagePrevious: function(i, n, d, o) {
                            if (o[i] && configuration.page.hasOwnProperty(o[i])) {
                                if (d != o.page) {
                                    o[i] = configuration.page[d].id <= configuration.page[o.page].id ? d : configuration.pageHome;
                                }
                            } else {
                                o[i] = d;
                            }
                            configuration[i] = o[i];
                        },
                        q: function(i, n, d, o) {
                            o[i] = decodeURIComponent(n);
                        }
                    };
                    return new Promise(function(resolve, reject) {
                        try {
                            if ($(local.name.query).isEmpty()) {
                                $(local.name.query).merge(fO, app.hashObject);
                            } else {
                                fO.pagePrevious = local.name.query.page;
                                $(local.name.query).merge(app.hashObject);
                            }
                            $(local.name.query).each(function(v, i, o) {
                                if (fM[i] instanceof Function) fM[i](i, v, fO[i], o);
                            });
                            resolve();
                        } catch (e) {
                            reject(e);
                        }
                    });
                };
                var user = function() {
                    return new Promise(function(resolve, reject) {
                        app.fire.auth().onAuthStateChanged(function(user) {
                            var pageId = local.name.query.page;
                            var pageAuth = "";
                            if (configuration.page.hasOwnProperty(pageId)) {
                                if (configuration.page[pageId].hasOwnProperty("auth")) {
                                    pageAuth = configuration.page[pageId].auth;
                                }
                            }
                            if (user) {
                                user.getIdToken().then(function(accessToken) {
                                    if (pageAuth == "guest") location.hash = "user?now";
                                }).then(function() {
                                    resolve();
                                });
                            } else {
                                if (pageAuth == "user") location.hash = "signin?now";
                                reject();
                            }
                        }, function() {
                            reject();
                        });
                    });
                };
                new Promise(function(resolve, reject) {
                    local.select("setting").select("book").select("query").select("language").select("randomverse").select("todo").select("bookmark").select("suggestion");
                    user().then(function() {}, function() {}).then(function() {
                        var firestore = app.fire.firestore(), sourceCollection = firestore.collection("source");
                        sourceCollection.get().then(function(raw) {
                            raw.forEach(function(row) {
                                app.Data.source[row.id] = row.data();
                                sourceCollection.doc(row.id).onSnapshot(function(row) {
                                    app.Data.source[row.id] = row.data();
                                });
                            });
                        }).then(function() {
                            var kindCollection = firestore.collection("kind");
                            kindCollection.get().then(function(raw) {
                                raw.forEach(function(row) {
                                    app.Data.kind[row.id] = row.data();
                                    kindCollection.doc(row.id).onSnapshot(function(row) {
                                        app.Data.kind[row.id] = row.data();
                                    });
                                });
                            }).then(function() {
                                var langCollection = firestore.collection("lang");
                                langCollection.get().then(function(raw) {
                                    raw.forEach(function(row) {
                                        app.Data.lang[row.id] = row.data();
                                        langCollection.doc(row.id).onSnapshot(function(row) {
                                            app.Data.lang[row.id] = row.data();
                                        });
                                    });
                                }).then(function() {
                                    process().then(function() {
                                        doc.body.classList.add("lamal");
                                        if (local.name.setting.hasOwnProperty("class")) {
                                            $(local.name.setting.class).each(function(v, i) {
                                                doc.body.classList.add(v);
                                            });
                                        } else {
                                            local.name.setting.class = {};
                                        }
                                        if (local.name.setting.hasOwnProperty("available")) {} else {
                                            local.name.setting.available = {};
                                        }
                                        return template();
                                    }, function(e) {
                                        return e;
                                    }).then(function(e) {
                                        if (e) {
                                            reject(e);
                                        } else {
                                            resolve();
                                        }
                                    });
                                });
                            });
                        });
                    });
                }).then(function() {
                    app.on("hash", function(e) {
                        terminal().then(function(e) {
                            if (e) console.log("page error", e);
                        });
                    });
                }, function(e) {
                    new Promise(function(resolve, reject) {
                        if (configuration.requireUpdate) {
                            local.deleteAll();
                            reject();
                        } else {
                            resolve();
                        }
                    }).then(function() {
                        if (typeof e === "object" && e.hasOwnProperty("message")) {
                            app.notification(e.message);
                        } else if (typeof e === "string") {
                            app.notification(e);
                        }
                    }, function() {});
                });
            },
            Data: {
                editor: {},
                source: {},
                kind: {},
                lang: {}
            },
            Content: function(bId) {},
            Lyric: function(raw) {
                var rawObject = {
                    title: "",
                    chord: {},
                    lyric: []
                };
                var rawBlock = raw.split(/\n\s/).filter(function(e) {
                    return e === 0 || e;
                });
                $(rawBlock).each(function(v, k) {
                    var isChorus = v.match(/\{([^}]+)\}/);
                    try {
                        rawObject.chord = JSON.parse(v);
                    } catch (e) {
                        var verse = v.split(/\n/).filter(function(e) {
                            return e === 0 || e;
                        });
                        if (k == 0 && verse.length == 1) {
                            rawObject.title = verse[0];
                        } else {
                            verse = (isChorus ? isChorus[1] : v).split(/\n/).filter(function(e) {
                                return e === 0 || e;
                            });
                            var rawContext = {
                                isChorus: isChorus ? true : false,
                                hasChord: "",
                                context: []
                            };
                            rawContext.context = verse;
                            rawContext.hasChord = verse.join(" ").match(/\[(.*?)\]/g);
                            rawObject.lyric.push(rawContext);
                        }
                    } finally {}
                });
                return rawObject;
            },
            Notifyss: function() {},
            book: {},
            page: {
                home: function(resolve, reject) {
                    var auth = app.fire.auth(), user = auth.currentUser;
                    var firestore = app.fire.firestore();
                    var ul = $("ul").addClass("home");
                    $(app.scContent).html(ul);
                    var bannerContext = function() {
                        var messageCollection = [ "Good!", "Great!", "Awesome!", "Hi there!", "Hi dammaw?", configuration.name ];
                        if (user) {
                            var messageActive = messageCollection[Math.floor(Math.random() * messageCollection.length)];
                            if (user.displayName) {
                                return $("p").appendChild($("span").addClass("logo").html(messageActive), $("a").html("Khen Solomon Lethil").attr("href", "#user?"));
                            } else {
                                return $("p").appendChild($("span").addClass("logo").html(messageActive), $("a").html("khensolomon@gmail.coms").attr("href", "#user?"), $("span").addClass("other").html("...update profile?"));
                            }
                        } else {
                            return $("p").appendChild($("span").addClass("logo").html("Are you"), $("a").html("signing in...").attr("href", "#signin?"), $("span").addClass("other").html("or"), $("a").html("...ready to signup?").attr("href", "#signup?"));
                        }
                    };
                    ul.appendChild($("li").appendChild($("div").appendChild(bannerContext()).addClass("banner")));
                    $(configuration.page).each(function(v, i) {
                        if (v.name && v.hasOwnProperty("home")) {
                            ul.appendChild($("li").appendChild($("div").appendChild($("a").html(v.name).attr("href", "#" + i)).addClass("page", i).toggleClass("active", local.name.query.page == i)));
                        }
                    });
                    resolve();
                },
                category: function(resolve, reject) {
                    var ul = $("ul").addClass("category");
                    var o = app.Data.source;
                    $(app.scContent).html(ul);
                    for (var id in o) {
                        if (o.hasOwnProperty(id)) {
                            var i = o[id], dataTotal = i.total ? i.total : "0";
                            $("li").appendChild($("div").appendChild($("a").html(i.name).attr("data-total", dataTotal).attr("href", "#song?category=" + id)).toggleClass("active", id == local.name.query.category)).appendTo(ul);
                        }
                    }
                    resolve();
                },
                song: function(resolve, reject) {
                    var auth = app.fire.auth(), user = auth.currentUser;
                    var firestore = app.fire.firestore();
                    var ul = $("ul").addClass("song");
                    $(app.scContent).html(ul);
                    var idName = "src123".replace(/123/, app.Data.source[local.name.query.category].unique.toUpperCase());
                    firestore.collection("lyric").where(idName, ">", "").limit(20).get().then(function(raw) {
                        raw.forEach(function(raw) {
                            var i = raw.data();
                            var row = app.Lyric(i.metaLyric);
                            var lyricTmp = row.lyric[0].context.join(" ");
                            $("li").appendChild($("div").appendChild(filterOption(raw.id, i), formatTitle(row, raw.id), filterMeta(i), $("p").addClass("lyric").html(lyricTmp.replace(/\[(.*?)\]/g, ""))).attr("id", raw.id)).appendTo(ul);
                        });
                    }).catch(function(error) {
                        console.log("Error getting documents: ", error);
                    }).then(function() {
                        if (!ul.hasChild()) {
                            ulEmpty(ul);
                        }
                        resolve();
                    });
                    var formatTitle = function(row, id) {
                        var a = $("a").html(row.title).attr("href", "#lyric?song=" + id);
                        var chord = Object.keys(row.chord);
                        if (chord.length) {
                            a.attr("data-chord", chord.join(","));
                            if (row.lyric[0].hasChord) {
                                a.addClass("hasChord");
                            }
                        }
                        return a;
                    };
                    var filterOption = function(id, o) {
                        var container = $("p").appendChild($("span").addClass("userName").html(o.userName), $("span").addClass("userDate").html(o.userDate), $("span").addClass("userEdition").html(o.userEdition.toString())).addClass("posts");
                        if (user) {
                            if (user.uid == o.userId || user.email == "khensolomon@gmail.com") {
                                container.appendChild($("span").addClass("edit").html("Edit").click(function(e) {
                                    app.Data.editor[id] = o;
                                    window.location.hash = "editor?song=123".replace(/123/, id);
                                }), $("span").addClass("delete").html("Delete").click(function(e) {
                                    var div = e.target.parentNode.parentNode;
                                    firestore.collection("lyric").doc(id).delete().then(function() {
                                        var ul = $(div.parentNode.parentNode);
                                        div.parentNode.remove();
                                        if (!ul.hasChild()) {
                                            ulEmpty(ul);
                                        }
                                    }).catch(function(error) {
                                        console.error("Error removing document: ", error);
                                    });
                                }));
                            }
                        }
                        return container;
                    };
                    var filterMeta = function(l) {
                        var container = $("p").addClass("meta");
                        var o = {
                            metaArtist: {
                                className: "artist icon-artist"
                            },
                            metaWriter: {
                                className: "writer icon-writer"
                            },
                            metaAlbum: {
                                className: "album icon-cd"
                            },
                            metaYear: {
                                className: "year icon-year"
                            }
                        };
                        for (var i in o) {
                            if (o.hasOwnProperty(i) && l.hasOwnProperty(i) && l[i]) {
                                $("span").html(l[i]).addClass(o[i].className).appendTo(container);
                            }
                        }
                        if (container.hasChild()) {
                            return container;
                        }
                    };
                    var ulEmpty = function(ul) {
                        ul.appendChild($("li").appendChild($("div").appendChild($("p").addClass("icon-info").html("NULL")))).attr("class", "empty");
                    };
                },
                lyric: function(resolve, reject) {
                    var firestore = app.fire.firestore();
                    var ul = $("ul").addClass("lyric");
                    $(app.scContent).html(ul);
                    $(configuration.lang.OneMoment).notify(function(res, rej) {
                        return firestore.collection("lyric").doc(local.name.query.song).get().then(function(raw) {
                            var row = raw.data();
                            $("li").appendChild(viewLyric(row.metaLyric)).appendTo(ul);
                        }).catch(function(error) {}).then(function() {
                            resolve();
                        });
                    });
                    var viewLyric = function(raw) {
                        var container = $("div").addClass("lamal");
                        var row = app.Lyric(raw);
                        configuration.page[local.name.query.page].title = row.title;
                        $("h1").html(row.title).appendTo(container);
                        var isChord = row.chord;
                        var verseContainer = $("div").addClass("chord").appendTo(container);
                        for (var chord in isChord) {
                            $("p").addClass("chordBase").html(chord).appendTo(verseContainer);
                            if (isChord[chord]) {
                                verseContainer = $("div").addClass("testing").appendTo(verseContainer);
                                if (typeof isChord[chord] == "string") {
                                    $("span").attr("data-chord", isChord[chord]).html(isChord[chord]).appendTo(verseContainer);
                                } else {
                                    isChord[chord].map(function(k) {
                                        $("span").attr("data-chord", k).html(k).appendTo(verseContainer);
                                    });
                                }
                            }
                        }
                        $(row.lyric).each(function(v, k) {
                            var verseContainer = $("div").addClass(v.isChorus ? "chorus" : "verse").appendTo(container);
                            for (var i in v.context) {
                                $("p").html(v.context[i].replace(/\[(.*?)\]/g, '<span data-chord="$1"></span>')).appendTo(verseContainer);
                            }
                        });
                        return container;
                    };
                },
                editor: function(resolve, reject) {
                    var auth = app.fire.auth(), user = auth.currentUser;
                    var firestore = app.fire.firestore();
                    var lyricTemplate = {
                        kind: 1,
                        lang: local.name.query.language,
                        metaTitle: "",
                        metaLyric: "",
                        metaArtist: "",
                        metaWriter: "",
                        metaAlbum: "",
                        metaYear: "",
                        srcOTH: "1",
                        srcZBC: "",
                        srcGLH: "",
                        userId: user.uid,
                        userName: user.displayName,
                        userDate: new Date(),
                        userEdition: 0,
                        userVote: 0
                    };
                    var songId = "";
                    if (app.hashObject.hasOwnProperty("song")) {
                        songId = app.hashObject.song;
                        if (app.Data.editor.hasOwnProperty(songId)) {
                            $(lyricTemplate).merge(app.Data.editor[songId]);
                        } else {
                            songId = "";
                            var dataSource = app.Data.source;
                            for (var id in dataSource) {
                                if (dataSource.hasOwnProperty(id)) {
                                    var idName = "src123".replace(/123/, dataSource[id].unique.toUpperCase());
                                    if (id == local.name.query.category) {
                                        lyricTemplate[idName] = local.name.query.category;
                                    } else {
                                        lyricTemplate[idName] = "";
                                    }
                                }
                            }
                        }
                    } else {
                        var dataSource = app.Data.source;
                        for (var id in dataSource) {
                            if (dataSource.hasOwnProperty(id)) {
                                var idName = "src123".replace(/123/, dataSource[id].unique.toUpperCase());
                                if (id == local.name.query.category) {
                                    lyricTemplate[idName] = local.name.query.category;
                                } else {
                                    lyricTemplate[idName] = "";
                                }
                            }
                        }
                    }
                    var kindInput = function() {
                        var data = app.Data.kind;
                        var div = $("div").addClass("choose");
                        for (var id in data) {
                            if (data.hasOwnProperty(id)) {
                                var o = data[id];
                                var idName = "kind123".replace(/123/, o.name.replace(/\W/g, ""));
                                var inputRadio = $("input").attr("type", "radio").attr("name", "kind").attr("id", idName).attr("value", id);
                                if (id == lyricTemplate.kind) {
                                    inputRadio.attr("checked", "checked");
                                }
                                $("p").appendChild($("label").html(o.name).attr("for", idName), inputRadio).appendTo(div);
                            }
                        }
                        return div;
                    };
                    var langInput = function() {
                        var data = app.Data.lang;
                        var div = $("div").addClass("choose");
                        for (var id in data) {
                            if (data.hasOwnProperty(id)) {
                                var o = data[id];
                                var idName = "lang123".replace(/123/, o.name.replace(/\W/g, ""));
                                var inputRadio = $("input").attr("type", "radio").attr("name", "lang").attr("id", idName).attr("value", id);
                                if (id == lyricTemplate.lang) {
                                    inputRadio.attr("checked", "checked");
                                }
                                $("p").appendChild($("label").html(o.name).attr("for", idName), inputRadio).appendTo(div);
                            }
                        }
                        return div;
                    };
                    var sourceInput = function() {
                        var data = app.Data.source;
                        var div = $("div").addClass("provide");
                        for (var id in data) {
                            if (data.hasOwnProperty(id)) {
                                var o = data[id];
                                var idName = "src123".replace(/123/, o.unique.toUpperCase());
                                $("p").appendChild($("span").html(o.name), $("input").attr("type", "text").attr("value", lyricTemplate[idName]).attr("name", idName)).appendTo(div);
                            }
                        }
                        return div;
                    };
                    var form = $("form").addClass("editor").attr("method", "POST").attr("name", "editor");
                    $(app.scContent).html(form);
                    form.appendChild($("div").appendChild($("textarea").attr("name", "lyric").html(lyricTemplate.metaLyric)).addClass("lyric"), $("div").appendChild($("p").appendChild($("span").html("Meta").click(function(e) {
                        var p = e.target, div = p.parentNode.parentNode;
                        $(p).toggleClass("active");
                        $(div).selectElement(".provide").toggleClass("active");
                    })), $("div").appendChild($("p").appendChild($("span").html("Artist"), $("input").attr("type", "text").attr("value", lyricTemplate.metaArtist).attr("name", "metaArtist")), $("p").appendChild($("span").html("Writer"), $("input").attr("type", "text").attr("value", lyricTemplate.metaWriter).attr("name", "metaWriter")), $("p").appendChild($("span").html("Album"), $("input").attr("type", "text").attr("value", lyricTemplate.metaAlbum).attr("name", "metaAlbum")), $("p").appendChild($("span").html("Year"), $("input").attr("type", "text").attr("value", lyricTemplate.metaYear).attr("name", "metaYear"))).addClass("provide")).addClass("info"), $("div").appendChild($("p").appendChild($("span").html("Kind").click(function(e) {
                        var p = e.target, div = p.parentNode.parentNode;
                        $(p).toggleClass("active");
                        $(div).selectElement(".choose").toggleClass("active");
                    })), kindInput()).addClass("info"), $("div").appendChild($("p").appendChild($("span").html("Language").click(function(e) {
                        var p = e.target, div = p.parentNode.parentNode;
                        $(p).toggleClass("active");
                        $(div).selectElement(".choose").toggleClass("active");
                    })), langInput()).addClass("info"), $("div").appendChild($("p").appendChild($("span").html("Source").click(function(e) {
                        var p = e.target, div = p.parentNode.parentNode;
                        $(p).toggleClass("active");
                        $(div).selectElement(".provide").toggleClass("active");
                    })), sourceInput()).addClass("info"), $("div").appendChild($("input").attr("value", "Post").attr("type", "submit")), $("div").appendChild($("p").attr("id", "messageContainer"))).submit(function(evt) {
                        evt.preventDefault();
                        var data = evt.target.elements;
                        var messageContainer = $(this).selectElement("#messageContainer");
                        var textarea = evt.target.previousSibling;
                        var rawlyric = data.lyric.value;
                        var metaTitle = rawlyric.split("\n")[0];
                        var metaLyric = rawlyric;
                        if (metaTitle == metaLyric) {
                            return messageContainer.html("Please provide your lyric!");
                        }
                        messageContainer.html($("span").addClass("animate-spin icon-loading"));
                        var dataSource = app.Data.source;
                        lyricTemplate.userEdition++;
                        for (var id in dataSource) {
                            if (dataSource.hasOwnProperty(id)) {
                                var idName = "src123".replace(/123/, dataSource[id].unique.toUpperCase());
                                lyricTemplate[idName] = data[idName].value;
                            }
                        }
                        $(lyricTemplate).merge({
                            kind: data.kind.value,
                            lang: data.lang.value,
                            metaTitle: metaTitle,
                            metaLyric: metaLyric,
                            metaArtist: data.metaArtist.value,
                            metaWriter: data.metaWriter.value,
                            metaAlbum: data.metaAlbum.value,
                            metaYear: data.metaYear.value
                        });
                        if (songId) {
                            firestore.collection("lyric").doc(songId).set(lyricTemplate).then(function() {
                                messageContainer.html("Done");
                            }).catch(function(error) {
                                messageContainer.html(error.message);
                            });
                        } else {
                            firestore.collection("lyric").add(lyricTemplate).then(function(doc) {
                                songId = doc.id;
                                messageContainer.html("Posted");
                            }).catch(function(error) {
                                messageContainer.html(error.message);
                            });
                        }
                    });
                    resolve();
                },
                search: function(resolve, reject) {},
                result: function(resolve, reject) {},
                user: function(resolve, reject) {
                    var auth = app.fire.auth(), user = auth.currentUser;
                    if (user == null) {
                        location.hash = "signin?now";
                        return;
                    }
                    var ul = $("ul").addClass("user");
                    $(app.scContent).html(ul);
                    var userPhoto = $("img").addClass("profile").attr("alt", user.displayName);
                    if (user.photoURL) {
                        userPhoto.addClass("available").attr("src", user.photoURL);
                    }
                    ul.appendChild($("li").appendChild(userPhoto), $("li").appendChild($("p").html(user.email ? user.email : "No e-mail! why??? -> click to link with facebook").click(function() {}).addClass("userEmail")), $("li").appendChild($("a").html("Signout").click(function() {
                        auth.signOut().then(function() {}).catch(function(error) {});
                    }).addClass("signOut")), $("li").appendChild($("a").html("E-mail verification").click(function() {
                        if (!user.emailVerified) {
                            user.sendEmailVerification().then(function() {
                                $({
                                    message: "...verification has been sent!",
                                    ok: true,
                                    cancel: false
                                }).notify();
                            }).catch(function(error) {
                                $({
                                    message: error.message,
                                    ok: true,
                                    cancel: false
                                }).notify();
                            });
                        } else {
                            $({
                                message: "...already Verified!",
                                ok: true,
                                cancel: false
                            }).notify();
                        }
                    }).toggleClass("emailVerified").toggleClass("active", user.emailVerified)), $("li").appendChild($("a").html("update E-mail").click(function(evt) {
                        var a = evt.target, li = a.parentNode;
                        a.style.display = "none";
                        $(li).appendChild($("div").appendChild($("input").attr("type", "text").attr("id", "tmp").attr("placeholder", "E-mail"), $("button").addClass("icon-show-tips").click(function() {
                            var newEmail = $(li).selectElement("input#tmp").target.value;
                            var resetContainer = function() {
                                a.style.display = "";
                                li.lastChild.remove();
                            };
                            user.updateEmail(newEmail).then(function() {
                                $({
                                    message: "Email has been updated!",
                                    ok: true,
                                    cancel: false
                                }).notify().then(function() {
                                    resetContainer();
                                });
                            }).catch(function(error) {
                                $({
                                    message: error.message,
                                    ok: true,
                                    cancel: true
                                }).notify().then(function() {
                                    console.log("try again");
                                }, function() {
                                    resetContainer();
                                });
                            });
                        }).attr("type", "button")));
                    })), $("li").appendChild($("a").html("just Notify").click(function() {
                        $({
                            message: "Hello world",
                            ok: "Just ok",
                            cancel: false
                        }).notify().then(function() {
                            console.log("ok");
                        }, function() {
                            console.log("cancel");
                        });
                    })), $("li").appendChild($("a").html("confirm Notify").click(function() {
                        $({
                            message: "Hello wild",
                            ok: "Agree",
                            cancel: "Not agree"
                        }).notify().then(function() {
                            console.log("ok");
                        }, function() {
                            console.log("cancel");
                        });
                    })), $("li").appendChild($("a").html("update Password").click(function(evt) {
                        var a = evt.target, li = a.parentNode;
                        a.style.display = "none";
                        $(li).appendChild($("div").appendChild($("input").attr("type", "text").attr("id", "tmp").attr("placeholder", "Password"), $("button").addClass("icon-show-tips").click(function() {
                            var newPassword = $(li).selectElement("input#tmp").target.value;
                            var resetContainer = function() {
                                a.style.display = "";
                                li.lastChild.remove();
                            };
                            user.updatePassword(newPassword).then(function() {
                                $({
                                    message: "Password has been Updated",
                                    ok: true,
                                    cancel: false
                                }).notify().then(function() {
                                    resetContainer();
                                });
                            }).catch(function(error) {
                                $({
                                    message: error.message,
                                    ok: true,
                                    cancel: true
                                }).notify().then(function() {
                                    console.log("try again");
                                }, function() {
                                    resetContainer();
                                });
                            });
                        }).attr("type", "button")));
                    }).addClass("updatePassword")), $("li").appendChild($("a").html("update Name").click(function(evt) {
                        var a = evt.target, li = a.parentNode;
                        a.style.display = "none";
                        $(li).appendChild($("div").appendChild($("input").attr("type", "text").attr("id", "tmp").attr("placeholder", "Display Name"), $("button").addClass("icon-show-tips").click(function() {
                            var newdisplayName = $(li).selectElement("input#tmp").target.value;
                            var resetContainer = function() {
                                a.style.display = "";
                                li.lastChild.remove();
                            };
                            user.updateProfile({
                                displayName: newdisplayName
                            }).then(function() {
                                $({
                                    message: "Name has been updated!",
                                    ok: true,
                                    cancel: false
                                }).notify().then(function() {
                                    resetContainer();
                                });
                            }).catch(function(error) {
                                $({
                                    message: error.message,
                                    ok: true,
                                    cancel: true
                                }).notify().then(function() {
                                    console.log("try again");
                                }, function() {
                                    resetContainer();
                                });
                            });
                        }).attr("type", "button")));
                    }).addClass("updateName")));
                    resolve();
                },
                signin: function(resolve, reject) {
                    var auth = app.fire.auth(), user = auth.currentUser;
                    if (user != null) {
                        location.hash = "user?now";
                        return resolve();
                    }
                    var form = $("form").addClass("user").attr("method", "POST").attr("name", "signin");
                    $(app.scContent).html(form);
                    form.appendChild($("div").appendChild($("p").html("E-mail"), $("input").attr("value", "").attr("type", "text").attr("name", "email")), $("div").appendChild($("p").html("Password"), $("input").attr("value", "").attr("type", "password").attr("name", "password")), $("div").appendChild($("input").attr("value", "Signin").attr("type", "submit")), $("div").appendChild($("p").attr("id", "messageContainer")), $("div").appendChild($("p").appendChild($("a").html("Signin with google account").click(function() {
                        var messageContainer = $().selectElement("#messageContainer");
                        var provider = new firebase.auth.GoogleAuthProvider();
                        auth.signInWithPopup(provider).then(function(result) {
                            var token = result.credential.accessToken;
                            var user = result.user;
                        }).catch(function(error) {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            var email = error.email;
                            var credential = error.credential;
                            messageContainer.html(errorMessage);
                            console.log(error);
                        });
                    }).addClass("icon-gplus external")), $("p").appendChild($("a").html("Signin with facebook account").click(function() {
                        var messageContainer = $().selectElement("#messageContainer");
                        var provider = new firebase.auth.FacebookAuthProvider();
                        auth.signInWithPopup(provider).then(function(result) {
                            var token = result.credential.accessToken;
                            var user = result.user;
                        }).catch(function(error) {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            var email = error.email;
                            var credential = error.credential;
                            messageContainer.html(errorMessage);
                            console.log(error);
                        });
                    }).addClass("icon-facebook external")), $("p").appendChild($("a").addClass("external").html("Forgot password").attr("href", "#fgpwd")), $("p").appendChild($("a").addClass("external").html("Signup").attr("href", "#signup?now")))).submit(function(evt) {
                        evt.preventDefault();
                        var data = evt.target.elements;
                        var messageContainer = $(this).selectElement("#messageContainer");
                        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function() {
                            return auth.signInWithEmailAndPassword(data.email.value, data.password.value).then(function(e) {
                                location.hash = "login?success";
                            }).catch(function(error) {
                                if (error.message) {
                                    messageContainer.html(error.message);
                                }
                            });
                        }).catch(function(error) {
                            if (error.message) {
                                messageContainer.html(error.message);
                            }
                        });
                    });
                    resolve();
                },
                signout: function(resolve, reject) {},
                signup: function(resolve, reject) {
                    var form = $("form").addClass("user").attr("method", "POST").attr("name", "register");
                    $(app.scContent).html(form);
                    form.appendChild($("div").appendChild($("p").html("E-mail"), $("input").attr("value", "").attr("type", "text").attr("name", "email")), $("div").appendChild($("p").html("Password"), $("input").attr("value", "").attr("type", "password").attr("name", "password")), $("div").appendChild($("input").attr("value", "Signup").attr("type", "submit")), $("div").appendChild($("p").attr("id", "messageContainer")), $("div").appendChild($("p").appendChild($("a").addClass("external").html("Signin").attr("href", "#signin?now")))).submit(function(evt) {
                        evt.preventDefault();
                        var data = evt.target.elements;
                        var messageContainer = $(this).selectElement("#messageContainer");
                        firebase.auth().createUserWithEmailAndPassword(data.email.value, data.password.value).then(function(e) {
                            location.hash = "login";
                        }).catch(function(error) {
                            console.log(error);
                            if (error.message) {
                                messageContainer.html(error.message);
                            }
                        });
                    });
                    resolve();
                },
                fgpwd: function(resolve, reject) {
                    if (firebase.auth().currentUser != null) {
                        location.hash = "user?now";
                        return resolve();
                    }
                    var form = $("form").addClass("user").attr("method", "POST").attr("name", "fgpwd");
                    $(app.scContent).html(form);
                    form.appendChild($("div").appendChild($("p").html("E-mail"), $("input").attr("value", "").attr("type", "text").attr("name", "email")), $("div").appendChild($("input").attr("value", "Reset Password").attr("type", "submit")), $("div").appendChild($("p").attr("id", "messageContainer")), $("div").appendChild($("p").appendChild($("a").addClass("external").html("Signin").attr("href", "#signin?now"), $("span").html(" .... "), $("a").addClass("external").html("Signup").attr("href", "#signup?now")))).submit(function(evt) {
                        evt.preventDefault();
                        var data = evt.target.elements;
                        var messageContainer = $(this).selectElement("#messageContainer");
                        firebase.auth().sendPasswordResetEmail(data.email.value).then(function(e) {
                            console.log(e);
                        }).catch(function(error) {
                            if (error.message) {
                                messageContainer.html(error.message);
                            }
                        });
                    });
                    resolve();
                },
                setting: function(resolve, reject) {},
                about: function(resolve, reject) {},
                contact: function(resolve, reject) {}
            },
            header: {
                content: function() {
                    var lMn = doc.getElementById("lMn");
                    var buttonElement = $().selectElement("#lmH");
                    if (local.name.query.page != local.name.query.pagePrevious) {
                        buttonElement.attr("class", "icon-left").attr("data-id", "").click(function(evt) {
                            evt.preventDefault();
                            window.location.hash = "123?back".replace(/123/, local.name.query.pagePrevious);
                        });
                    } else if (buttonElement) {
                        buttonElement.attr("data-id", "lPl").attr("class", "icon-panel");
                    }
                }
            }
        }).initiate();
    });
})(scriptive);