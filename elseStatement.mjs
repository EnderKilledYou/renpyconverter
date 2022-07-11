import {StatementBlock} from "./statementBlock.mjs";

export class ElseStatement extends StatementBlock {
    ConvertToJavascript() {
        super.ConvertToJavascript();
        let statements = this.Statements.map(a => a.ConvertToJavascript()).join("\n");
        return "else { " + statements + "}"
    }
}
