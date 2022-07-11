import {StatementBlock} from "./statementBlock.mjs";

export class IfStatement extends StatementBlock {
    ConvertToJavascript() {
        super.ConvertToJavascript();

        let statements = this.Statements.map(a => a.ConvertToJavascript()).join("\n");
        let conditions = this.Line.slice(this.Line.indexOf('if') + 2).replace(":", "")
            .replace(/\sand\s/g,' && ')
            .replace(/\sor\s/g,' || ')
            .replace(/\snot\s/g,' ! ');

        return "if(" + conditions + ") { " + statements + "}"
    }
}
