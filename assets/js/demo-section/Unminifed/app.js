"use strict";

// I am Darth Graph! join the dark side of the source.
angular
    .module("darthGraph", ["ui.ace", "ui.bootstrap"])
    .controller("GraphMagic", function($scope, $http) {
        $scope.examples = [
            {
                title: "Directors All of",
                sample_code: "" +
                    "{\n" +
                    '  director(func: allofterms(name, "steven spielberg")) {\n' +
                    "    name@en\n" +
                    "    director.film {\n" +
                    "      name@en\n" +
                    "      initial_release_date\n" +
                    "      country {\n" +
                    "        name@en\n" +
                    "      }\n" +
                    "      starring {\n" +
                    "        performance.actor {\n" +
                    "          name@en\n" +
                    "        }\n" +
                    "        performance.character {\n" +
                    "          name@en\n" +
                    "        }\n" +
                    "      }\n" +
                    "      genre {\n" +
                    "        name@en\n" +
                    "      }\n" +
                    "    }\n" +
                    "  }\n" +
                    "}\n"
            },
            {
                title: "Top 10 movie Recommendation",
                sample_code: "" +
                    "{\n" +
                    '   var(func:allofterms(name, "steven spielberg")) {\n' +
                    "       films as director.film {\n" +
                    "           p as count(starring)\n" +
                    "           q as count(genre)\n" +
                    "           r as count(country)\n" +
                    "           score as math(p + q + r)\n" +
                    "       }\n" +
                    "   }\n" +
                    "\n" +
                    "   TopMovies(id: var(films), orderdesc: var(score), first: 10){\n" +
                    "       name@en\n" +
                    "       var(score)\n" +
                    "   }\n" +
                    "}\n"
            },
            {
                title: "Greater than equal",
                sample_code: "" +
                    "{\n" +
                    "  directed(id: m.0bxtg) {\n" +
                    "    name@en\n" +
                    '    director.film @filter(ge(initial_release_date, "1970-01-01")) {\n' +
                    "      initial_release_date\n" +
                    "      name@en\n" +
                    "    }\n" +
                    "  }\n" +
                    "}\n"
            },
            {
                title: "Sort by date",
                sample_code: "" +
                    "{\n" +
                    '   bydate(func: allofterms(name@en, "steven spielberg")) {\n' +
                    "     name@en\n" +
                    "     director.film(orderasc: initial_release_date) {\n" +
                    "       name@en\n" +
                    "       initial_release_date\n" +
                    "     }\n" +
                    "   }\n" +
                    "}\n"
            },
            {
                title: "People who played Harry Potter",
                sample_code: "" +
                    "{\n" +
                    '   HP(func: allofterms(name@en, "Harry Potter")) @cascade{\n' +
                    "       name\n" +
                    "       starring{\n" +
                    '           performance.character@filter(allofterms(name@en, "harry")) {\n' +
                    "               name@en\n" +
                    "           }\n" +
                    "           performance.actor {\n" +
                    "               name@en\n" +
                    "           }\n" +
                    "       }\n" +
                    "   }\n" +
                    "}\n"
            },
            {
                title: "Shortest Path",
                sample_code: "" +
                    "{\n" +
                    "   A as shortest(from: 0x3b0de646eaf32b75, to: 0x36692145960cfceb) {\n" +
                    "       director.film\n" +
                    "       starring\n" +
                    "       performance.actor\n" +
                    "   }\n" +
                    "\n" +
                    "   names(id: var(A)) {\n" +
                    "       name@en\n" +
                    "   }\n" +
                    "}\n"
            },
            {
                title: "Geolocation Near",
                sample_code: "" +
                    "{\n" +
                    "  places(func: near(loc, [-122.469829, 37.771935], 1000) ) {\n" +
                    "    name.en: name\n" +
                    "  }\n" +
                    "}\n"
            }
        ];

        $scope.active_tab = null;
        $scope.result_json = true;

        $scope.activate = function(index) {
            if ($scope.active_tab) {
                $scope.active_tab.active = false;
            }
            $scope.active_tab = $scope.examples[index];
            $scope.active_tab.code =
                $scope.active_tab.code || $scope.active_tab.sample_code;
            $scope.active_tab.active = true;
        };

        $scope.activate(0);

        $scope.reset_example_code = function() {
            $scope.active_tab.code = $scope.active_tab.sample_code;
        };

        $scope.$watch("active_tab.code", function(newCode) {
            $scope.runQuery(newCode);
        });

        $scope.isNetPending = function() {
            return $scope.lastSentVersion != $scope.lastReceivedVersion;
        };

        $scope.queryEditorLoaded = function(editor) {
            editor.$blockScrolling = Infinity;
            editor.session.setOptions({
                mode: "ace/mode/graphql",
                tabSize: 2,
                useSoftTabs: true
            });

            editor.setOptions({
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true
            });
        };

        $scope.responseEditorLoaded = function(editor) {
            editor.$blockScrolling = Infinity;
        };

        // TODO: time to break this file into multiple independent components.
        $scope.typeahead_cache = [];
        $scope.typeahead_cache_indices = {};

        $scope.found_entity = function(data) {
            var index = $scope.typeahead_cache_indices[data.name];
            if (index == undefined) {
                $scope.typeahead_cache_indices[data.name] =
                    $scope.typeahead_cache.length;
                $scope.typeahead_cache.push(data);
            } else {
                var cached = $scope.typeahead_cache[index];
                cached.xid = cached.xid || data.xid;
                cached.uid = cached.uid || data.uid;
            }
        };

        $scope.$watch("active_tab.code", function(newCode) {
            if (!newCode) {
                return;
            }
            var newXID = newCode.match(/me\s*\(\s*_xid_\s*:\s*([^\s]*)\s*\)/);
            if (newXID && newXID[1]) {
                $scope.entity_selected("xid", newXID[1]);
                return;
            }

            var newUID = newCode.match(/me\s*\(\s*_uid_\s*:\s*([^\s]*)\s*\)/);
            if (newUID && newUID[1]) {
                $scope.entity_selected("uid", newUID[1]);
                return;
            }
        });

        $scope.entity_selected = function(field, value) {
            for (var i = 0; i < $scope.typeahead_cache.length; i++) {
                if ($scope.typeahead_cache[i][field] == value) {
                    $scope.typeahead_root_id = $scope.typeahead_cache[i].name;
                    return;
                }
            }
            $scope.typeahead_root_id = undefined;
        };

        $scope.runQuery = function(query) {
            var startTime = Date.now();
            $scope.lastSentVersion = $scope.lastSentVersion || 0;
            var currentCodeVersion = ++$scope.lastSentVersion;
            $http({
                url: "https://play.dgraph.io/query?debug=true",
                method: "POST",
                data: query
            }).then(
                function(response) {
                    $scope.had_network_error = false;
                    $scope.lastReceivedVersion = currentCodeVersion;

                    var keys = Object.keys(response.data);
                    var key = "";
                    for (var i = 0; i < keys.length; i++) {
                        if (keys[i] != "server_latency" && keys[i] != "uids") {
                            key = keys[i];
                            break;
                        }
                    }

                    if (key === "") {
                        return;
                    }

                    $scope.tree_result = response.data[key];
                    $scope.query_result = response.data;
                    $scope.json_result = JSON.stringify(
                        $scope.query_result,
                        null,
                        2
                    );

                    $scope.latency_data = response.data.server_latency || {};
                    $scope.latency_data.client_total_latency =
                        Date.now() - startTime;
                    if ($scope.json_result) {
                        $scope.latency_data.entity_count =
                            $scope.json_result.replace(
                                /"_uid_": /g,
                                '"_uid_": 1'
                            ).length - $scope.json_result.length;
                    } else {
                        $scope.latency_data.entity_count = 0;
                    }
                },
                function(error) {
                    console.log(error);
                    $scope.had_network_error = true;
                }
            );
        };
    });

angular.module("darthGraph").directive("tree", function($compile) {
    return {
        restrict: "E",
        scope: {
            obj: "=",
            expanded: "="
        },
        templateUrl: "tree_node.html",
        compile: function(tElement, tAttr) {
            var contents = tElement.contents().remove();
            var compiledContents;
            return function(scope, iElement, iAttr) {
                if (!compiledContents) {
                    compiledContents = $compile(contents);
                }
                compiledContents(scope, function(clone, scope) {
                    iElement.append(clone);
                });

                scope.$watch("obj", function(newVal) {
                    scope.fields = scope.get_fields(newVal);
                    scope.summary = scope.get_summary(newVal, scope.fields);
                });

                scope.$on("force_expand", function() {
                    scope.expanded = true;
                    for (var i = 0; i < scope.fields.length; i++) {
                        scope.fields[i].expanded = true;
                    }
                });

                scope.expand_all = function() {
                    scope.expanded = true;
                    scope.$broadcast("force_expand");
                };

                scope.get_fields = function(obj) {
                    var fields = [];
                    for (var k in obj) {
                        if (fields.length > 100) {
                            break;
                        }
                        if (!obj.hasOwnProperty(k)) {
                            continue;
                        }
                        if (
                            typeof obj[k] == "string" ||
                            typeof obj[k] == "number" ||
                            obj[k] === null ||
                            obj[k] === undefined
                        ) {
                            fields.push({
                                key: k,
                                value: obj[k]
                            });
                            continue;
                        }
                        if (obj[k] instanceof Array) {
                            fields.push({
                                key: k,
                                array: obj[k]
                            });
                        } else {
                            fields.push({
                                key: k,
                                subobj: obj[k]
                            });
                        }
                    }
                    return fields;
                };

                scope.get_summary = function(obj, fields) {
                    if (obj === null || obj === undefined) {
                        return {
                            title: "<n/a>",
                            fields: [],
                            children: 0
                        };
                    }
                    var children = 0;
                    var title = obj["_uid_"];
                    for (var i = 0; i < fields.length; i++) {
                        if (fields[i].subobj) {
                            children++;
                        } else if (fields[i].array) {
                            children += fields[i].array.length;
                        }
                        if (fields[i].key.indexOf("name") == 0) {
                            title = fields[i].value;
                        }
                    }
                    return {
                        title: title,
                        fields: fields.length,
                        children: children
                    };
                };
            };
        }
    };
});
