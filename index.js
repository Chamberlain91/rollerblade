'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var merge = _interopDefault(require('deepmerge'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */













function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}



function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

var path = require('path');
var rollup = require('rollup');
var typescript = require('rollup-plugin-typescript2');
// import typescript from 'rollup-plugin-typescript2';
var sourcemaps = require('rollup-plugin-sourcemaps');
var commonjs = require('rollup-plugin-commonjs');
var minify = require('rollup-plugin-babel-minify');
var json = require('rollup-plugin-json');
var cacheRoot = path.join(path.resolve(__filename, process.cwd()), '.cache');
function rollerblade(paths) {
    return __awaiter(this, void 0, void 0, function () {
        var results, paths_1, paths_1_1, input, finfo, mapFile, jsFile, rollupResult, result, e_1_1, e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(paths.length == 0)) return [3 /*break*/, 1];
                    throw new Error("Must specify at least one path to a file.");
                case 1:
                    results = new Array();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 8, 9, 10]);
                    paths_1 = __values(paths), paths_1_1 = paths_1.next();
                    _b.label = 3;
                case 3:
                    if (!!paths_1_1.done) return [3 /*break*/, 7];
                    input = paths_1_1.value;
                    // 
                    if (input.format === undefined) {
                        input.format = "es";
                    }
                    // 
                    if (input.sourcemap === undefined) {
                        input.sourcemap = true;
                    }
                    // 
                    if (input.target === undefined) {
                        input.target = 'es5';
                    }
                    // 
                    if (input.target !== undefined && input.tsconfig !== undefined) {
                        console.warn('Both target and tsconfig specified, target will be overriden by tsconfig.');
                    }
                    console.log(input);
                    finfo = path.parse(input.output || input.input);
                    mapFile = path.join(finfo.dir, finfo.name + ".js.map");
                    jsFile = path.join(finfo.dir, finfo.name + ".js");
                    return [4 /*yield*/, rollup.rollup({
                            input: input.input,
                            treeshake: true,
                            plugins: [
                                json(),
                                typescript({
                                    cacheRoot: cacheRoot,
                                    useTsconfigDeclarationDir: true,
                                    tsconfigDefaults: {
                                        "compilerOptions": {
                                            "moduleResolution": "node",
                                            "target": input.target,
                                            "lib": [
                                                "es2018",
                                                "es2017",
                                                "es2016",
                                                "es2015",
                                                "dom"
                                            ],
                                            "declaration": true,
                                            "declarationDir": finfo.dir,
                                            "allowSyntheticDefaultImports": true,
                                            "experimentalDecorators": true,
                                            "emitDecoratorMetadata": true,
                                            "downlevelIteration": true,
                                            "noImplicitAny": true,
                                            "noImplicitReturns": true,
                                            "noImplicitThis": true
                                        }
                                    },
                                    tsconfigOverride: merge(input.tsconfig || {}, {
                                        "compilerOptions": {
                                            "sourceMap": input.sourcemap
                                        }
                                    })
                                }),
                                commonjs(),
                                minify({ comments: false }),
                                sourcemaps()
                            ]
                        })];
                case 4:
                    rollupResult = _b.sent();
                    return [4 /*yield*/, rollupResult.generate({
                            format: input.format,
                            sourcemapFile: mapFile,
                            sourcemap: input.sourcemap
                        })];
                case 5:
                    result = _b.sent();
                    results.push({
                        js: {
                            file: jsFile,
                            content: result.code
                                + (input.sourcemap ? "//# sourceMappingURL=./" + (finfo.name + ".js.map") : '')
                        },
                        map: input.sourcemap ? {
                            file: mapFile,
                            content: result.map
                        } : undefined
                    });
                    _b.label = 6;
                case 6:
                    paths_1_1 = paths_1.next();
                    return [3 /*break*/, 3];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) _a.call(paths_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/, results];
                case 11: return [2 /*return*/];
            }
        });
    });
}

module.exports = rollerblade;
