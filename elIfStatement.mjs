import {StatementBlock} from "./statementBlock.mjs";

export class ElIfStatement extends StatementBlock {
    ConvertToJavascript() {
        super.ConvertToJavascript();

        let statements = this.Statements.map(a => a.ConvertToJavascript()).join("\n");
        return "else if(" + this.Line.slice(this.Line.indexOf('if') + 2).replace(":", "") + ") { " + statements + "}"
    }
}
