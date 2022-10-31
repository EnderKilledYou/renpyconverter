import StatementBlock from "./statementBlock.mjs";
import {Walk} from "./ifStatemeant.mjs";

export class ElIfStatement extends StatementBlock {
    ConvertToJavascript() {
        super.ConvertToJavascript();
        const pieces = this.Line.Variables.slice();
        const statements = this.Statements.map(a => a.ConvertToJavascript()).join("\n");
        const ConditionStr = Walk(pieces);
        return `else if  ${ConditionStr} { ${statements}  }`


    }
}
