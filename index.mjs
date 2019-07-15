// https://astexplorer.net/
// https://summerrouxin.github.io/

import parser from "@babel/parser";
import generator from "@babel/generator";
import t from "@babel/types";
import traverser from "@babel/traverse";

const generate = generator.default;
const traverse = traverser.default;

const code = `
define("modules/bdm/index/index", function(require, exports, module) {
  var $ = require("$");
  var pageManager = require("pageManager");

});
`;
const ast = parser.parse(code);

const content = ast.program.body[0].expression.arguments[1].body;

traverse(ast, {
  ExpressionStatement(path) {
    
    if (path.parent.type === 'Program') {
      path.insertAfter(content)
      // 删除原methods
      path.remove()
    }
  }
})


const output = generate(ast, {}, code);

console.log("Input \n", code);
console.log("Output \n", output.code);
