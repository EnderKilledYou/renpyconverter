import StatementBlock from "./statementBlock.mjs";
import {Walk} from "./ifStatemeant.mjs";

export class ElseStatement extends StatementBlock {
    ConvertToJavascript() {
        super.ConvertToJavascript();

        const statements = this.Statements.map(a => a.ConvertToJavascript()).join("\n");

        return `else   { ${statements}  }`


    }
}
