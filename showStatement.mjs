import Statement from "./statement.mjs";
import {parse} from "csv-parse/sync";
import {RenPyLineStatement} from "./renPyLineStatement.mjs";
import {ReplaceSingleQuotes} from "./textStatement.mjs";

export class ShowStatement extends RenPyLineStatement {
    ConvertToJavascript() {
        const showList = []
        let showFunction = 'Show'
        let showFunctionExtraArgs = '';
        let MoveTo = '';
        const line = this.Line.Variable + ' ' + this.Line.Variables.map(a => a.Variable).join(" ");
        const pieces = this.Line.Variables.slice();

        while (pieces.length > 0) {
            const piece = pieces.shift();
            switch (piece.Variable) {
                case "at":
                    const atVar = pieces.shift();
                    if (!atVar) continue;
                    showFunction = atVar.Variable
                    if (atVar.Variables && atVar.Variables.length !== 0) {
                        showFunctionExtraArgs = atVar.Variables.map(a => a.ConvertToJavascript()).join(",")

                    }
                    continue;
                case "with":
                    const withVar = pieces.shift();
                    if (!withVar) continue;
                    showFunction = withVar.Variable
                    if (withVar.Variables && withVar.Variables.length !== 0) {
                        showFunctionExtraArgs = withVar.Variables.map(a => a.ConvertToJavascript()).join(",")

                    }
                    continue;
                case "as":
                    const groupName = pieces.shift()
                    continue;

            }
            showList.push(piece);
        }
        if (showList.length === 0) return "// Show error nothing to show";
        let avi_qoted = ReplaceSingleQuotes(showList[0].Variable);


        return `await convo.Show('${avi_qoted}',  ${showFunctionExtraArgs})`;


    }
}
