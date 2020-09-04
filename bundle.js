const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

var entry = './src/index.js';
var output = './dist/bundle.js'

build(entry)

function build(entry) {
    let modules = {};
    var entry = path.join(__dirname, entry).replace(/\\/g, '/')
    getModuleInfo(entry, modules)



    var strModules = '{'
    for (const key in modules) {
        if (modules.hasOwnProperty(key)) {
            strModules = strModules + "\"" + key + "\"" + ':' + modules[key]
        }
    }
    strModules += '}'
    const bundle = `
    (function(modules){
        function __webpack_require__(moduleId) {
            window.__webpack_exports__ = {}
            modules[moduleId].call(null, modules, __webpack_exports__, __webpack_require__)
    
            return __webpack_exports__
        }
        // 入口
        __webpack_require__("${entry}")
    })(` +
        strModules +
        `)`

    fs.writeFileSync(output, bundle, )
}

function getModuleInfo(file, modules) {
    file = file.replace(/\\/g, '/')
    const body = fs.readFileSync(file, 'utf-8')
    const ast = parser.parse(body, {
        sourceType: 'module' //表示我们要解析的是ES模块
    });

    var {
        code
    } = babel.transformFromAst(ast, null, {
        presets: ["@babel/preset-env"]
    })
    // 把 CMD的exports 和require 改成有标识性的名字，并给予定义
    code = code.replace(/exports/g, '__webpack_exports__')
    code = code.replace(/require\(([^\)]*)\)/g, function (reg, $1) {
        return '__webpack_require__(\"' + (path.join(path.dirname(path.resolve(file)), $1.replace(/"/g, ''))).replace(/\\/g, '/') + '\")'
    })

    modules[file] = 'function (module, __webpack_exports__, __webpack_require__) {' + code + '},'

    traverse(ast, {
        ImportDeclaration({
            node
        }) {
            if (node) {
                var requirePath = node.source.value
                requirePath = path.join(path.dirname(path.resolve(file)), requirePath)
                getModuleInfo(`${requirePath}`, modules)
            }
        }
    })

}