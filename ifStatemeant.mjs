import StatementBlock from "./statementBlock.mjs";
import {ReplaceSingleQuotes} from "./textStatement.mjs";
import {Parens} from "./renPyLine.mjs";


export class IfStatement extends StatementBlock {
    ConvertToJavascript() {
        super.ConvertToJavascript();
        const pieces = this.Line.Variables.slice();
        const statements = this.Statements.map(a => a.ConvertToJavascript()).join("\n");
        const ConditionStr = Walk(pieces);
        return `if  ${ConditionStr} { ${statements}  }`


    }
}

export function Walk(pieces) {
    let ConditionStr = '';
    while (pieces.length > 0) {
        const piece = pieces.shift();
        if (piece instanceof Parens) {
            ConditionStr += ParensWalker(piece);
            continue
        }
        switch (piece.Variable.toLowerCase()) {
            case "and":
                ConditionStr += " && ";
                continue;
            case "or":
                ConditionStr += " || ";
                continue;
            case "not":
                ConditionStr += " ! ";
                continue;
            default:
                let tmp = piece.Variable.replace(/quest\.([^\[]+)\[["']([^"']+)["']\]/, (match, g1, g2, g3, offset, string, groups) => {
                    return `GetSetting('${ReplaceSingleQuotes(g2)}','${ReplaceSingleQuotes(g1)}')`
                })
                tmp = tmp.replace(/([^\(\[]+)\[["']([^"']+)["']\]/g, (match, g1, g2, g3, offset, string, groups) => {
                    return `GetSetting('${ReplaceSingleQuotes(g2)}_${ReplaceSingleQuotes(g1)}')`
                })
                ConditionStr += tmp + " ";
        }

    }
    return '(' + ConditionStr + ')';
}

export function ParensWalker(paren) {
    const pieces = paren.Variables.slice();

    const ConditionStr = Walk(pieces);
    return ConditionStr;
}
