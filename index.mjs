// https://astexplorer.net/
// https://summerrouxin.github.io/

import parser from "@babel/parser";
import generator from "@babel/generator";
import t from "@babel/types";
import traverser from "@babel/traverse";

const generate = generator.default;
const traverse = traverser.default;

const code = ``;
const ast = parser.parse(code);
 
// 生成 identifier
const id = t.identifier('str')
// 生成 literal
const literal = t.stringLiteral('hello world')
// 生成 variableDeclarator
const declarator = t.variableDeclarator(id, literal)
 // 生成 variableDeclaration
const declaration = t.variableDeclaration('const', [declarator])

// 将表达式放入body中
ast.program.body.push(declaration)

const output = generate(ast, {}, code);

console.log("input \n", code);
console.log("output \n", output.code);
