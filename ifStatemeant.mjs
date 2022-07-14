import {StatementBlock} from "./statementBlock.mjs";
import {ReplaceSingleQuotes} from "./textStatement.mjs";

export class IfStatement extends StatementBlock {
    ConvertToJavascript() {
        super.ConvertToJavascript();

        let statements = this.Statements.map(a => a.ConvertToJavascript()).join("\n");
        let conditions = this.Line.slice(this.Line.indexOf('if') + 2).replace(":", "")
            .replace(/\sand\s/g, ' && ')
            .replace(/\sor\s/g, ' || ')
            .replace(/\snot\s/g, ' ! ');
        let pieces = conditions.split(" ");
        let condition2 = [];
        while (pieces.length > 0) {
            let piece = pieces.shift();
            piece = piece.replace(/quest\.([^\[]+)\[["']([^"']+)["']\]/, (match, g1, g2, g3, offset, string, groups) => {
                return `GetSetting('${ReplaceSingleQuotes(g2)}','${ReplaceSingleQuotes(g1)}')`
            })
            piece = piece.replace(/([^\[]+)\[["']([^"']+)["']\]/g, (match, g1, g2, g3, offset, string, groups) => {
                return `GetSetting('${ReplaceSingleQuotes(g2)}_${ReplaceSingleQuotes(g1)}')`
            })
            condition2.push(piece)
        }


        return "if(" + condition2.join(" ") + ") { " + statements + "}"
    }
}
