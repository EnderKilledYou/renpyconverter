import Statement from "./statement.mjs";
import {ReplaceSingleQuotes} from "./textStatement.mjs";

export class VariableAssignmentStatement extends Statement {
    ConvertToJavascript() {
        super.ConvertToJavascript();
        const line = this.Line.Variable + ' ' + this.Line.Variables.map(a=>a.Variable).join(" ");
        let pieces = line.trim().split('-=');

        if (pieces.length === 2) {

                    return `DecrementSetting('${ReplaceSingleQuotes(pieces[0].slice(1))}',${pieces[1]})
                    `



        }
        pieces = line.trim().split('+=');
        if (pieces.length === 2) {

            return `Increment('${ReplaceSingleQuotes(pieces[0].slice(1))}',${pieces[1]})
            `



        }
        pieces = line.trim().split('=');
        if (pieces.length === 2) {

            return `SetSetting('${ReplaceSingleQuotes(pieces[0].slice(1))}',${pieces[1]})
            `



        }
        return "// coming soon " + this.Line
    }
}
