import StatementBlock from "./statementBlock.mjs";

export class LabelStatement extends StatementBlock {
    constructor(parsedLine, parent) {
        super(parsedLine, parent)
    }
    GetLabelName() {
        return this.Variables[0].Variable
    }

    AdditionalLabels = []

    ConvertToJavascript() {
        let getLabelName = this.GetCodeLabel();
        let statements = this.Statements;
        let helpfulness = this.AdditionalLabels.map(a => a.ConvertToBlock(a.GetCodeLabel(), a.Statements)).join("\n");
        return this.ConvertToBlock(getLabelName, statements) + helpfulness;
    }

    GetCodeLabel() {
        let getLabelName = this.GetLabelName();
        if (getLabelName.indexOf('(') <= 0) {
            getLabelName += '()'
        }
        return getLabelName;
    }

    ConvertToBlock(getLabelName, statements) {
        return `
function ${getLabelName}{
    ${statements.map(a => a.ConvertToJavascript()).join("\n")}
}`.trim();
    }
}
