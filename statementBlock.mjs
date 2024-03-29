import Statement from "./statement.mjs";
import Lexer from "./lexer.mjs";

export default class StatementBlock extends Statement {
    constructor(parsedLine, parent) {
        super(parsedLine, parent)
        this.Statements = []

    }

    PreProcess() {
        super.PreProcess();
        for (let statement of this.Statements) {
            statement.PreProcess();

        }
    }

    parseMethodStatements(lines, i) {
        while (lines[i] && lines[i].Depth > this.Depth) {
            let {j, statement} = Lexer(lines, i, this);
            this.Statements.push(statement);
            i = j;
        }

        return i
    }
}

