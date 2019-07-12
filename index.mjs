// https://astexplorer.net/
// https://summerrouxin.github.io/

import parser from "@babel/parser";
import generator from "@babel/generator";
import t from "@babel/types";
import traverse from "@babel/traverse";

const generate = generator.default;

const code = "";
const ast = parser.parse(code);

// BinaryExpression a + b
const binaryExp = t.binaryExpression("+", t.identifier("a"), t.identifier("b"));
const returnStatement = t.returnStatement(binaryExp);

// function body
const fnBody = t.blockStatement([returnStatement]);
const params = [t.identifier("a"), t.identifier("b")];

const fnDeclaraton = t.functionDeclaration(t.identifier("add"), params, fnBody);
ast.program.body.push(fnDeclaraton);

const output = generate(ast, {}, code);

console.log("Input \n", code);
console.log("Output \n", output.code);
