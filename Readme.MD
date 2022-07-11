## Renpy To javascript Converter

Dirty (much like the content you will be converting) parser and converter that bends the rules and expect well-behaved
rpy;

# Usage

Most of the time you just stick an rpy in and get a folder full of files back. It assumes you have a variable with
something that can call Say or Pose or or other renpy-ish proxies. I wrote this to work with my phaser library.

```javascript
import parseStatement from "./parseStatement.mjs";
import Convert2 from "./convert2.js";

import fs from "fs";
import {RpyFile} from "./statementBlock.mjs";


const data = fs.readFileSync('./test.yaml', 'utf-8')
const lines = data.split(/\r?\n/).filter(a => a.trim().length > 0);


let convert = new Convert2(lines);
let parsed_lines = [];
let line;
while (line = convert.ParseLine()) {


    parsed_lines.push(line);
}

const ast = new RpyFile({}, null);
```

that'll do donkey.

```javascript

let i = 0;
while (i < parsed_lines.length) {
    let {j, statement} = parseStatement(parsed_lines, i, ast);
    //console.log(statement)
    i = j
    ast.Statements.push(statement)
}
for (let statement of ast.Statements) {
    statement.PreProcess();
}
for (let statement of ast.Statements) {
    let getLabelName = statement.GetLabelName().replace(/\(.*/g, '');
    console.log(getLabelName);
    fs.writeFileSync('./out/' + getLabelName + ".js", statement.ConvertToJavascript(), 'utf-8')
}
```

and print it some where. call preprocess because I like to refractor shit out. don't call it to have hob flob code all
nimbly wimbly in there stacked like your hentai harem's tiddy stat.
