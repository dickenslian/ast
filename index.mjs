// https://astexplorer.net/
// https://summerrouxin.github.io/

import parser from "@babel/parser";
import generator from "@babel/generator";
import t from "@babel/types";
import traverser from "@babel/traverse";

function generateImp(name, module) {
  const id = t.identifier(name);
  const sp = t.importDefaultSpecifier(id);
  const literal = t.stringLiteral(module);

  return t.importDeclaration([sp], literal);
}

const generate = generator.default;
const traverse = traverser.default;

const code = `
define("modules/bdm/index/index", function(require, exports, module) {
  var $ = require("$");
  var pageManager = require("pageManager");
  
  
})`;
const ast = parser.parse(code);

const content = ast.program.body[0].expression.arguments[1].body.body;
traverse(ast, {
  ExpressionStatement(path) {
    if (path.parent.type === "Program") {
      // 插入正文内容
      content.forEach(node => {
        path.insertBefore(node);
      });

      // 删除 define
      path.remove();
    }
  },
  VariableDeclaration(path) {
    const init = path.node.declarations[0].init;
    if (init.type === "CallExpression" && init.callee.name === "require") {
      const module = init.arguments[0].value;
      const name = path.node.declarations[0].id.name;
      const imp = generateImp(name, module);

      path.insertAfter(imp);
      path.remove();
    }
  }
});

const output = generate(ast, {}, code);

console.log("Input \n", code);
console.log("Output \n", output.code);
