import StatementBlock from "./statementBlock.mjs";

export class MenuStatement extends StatementBlock {
    ConvertToJavascript() {
        super.ConvertToJavascript();
        let params = this.Statements.map(a => a.ConvertToJavascript());
        let params_delimit_string = params.join(',');
        return `await new Choices([${params_delimit_string}])`
    }
}
