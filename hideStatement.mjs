import {ReplaceSingleQuotes} from "./textStatement.mjs";
import {RenPyLineStatement} from "./renPyLineStatement.mjs";


export class HideStatement extends RenPyLineStatement {

    constructor(renpy, parent) {
        super(renpy, parent);
    }

    ConvertToJavascript() {
        const HideList = []
        let HideFunction = ''
        let HideFunctionExtraArgs = ',';
        let MoveTo = '';

        const pieces = this.Line.Variables.slice();

        while (pieces.length > 0) {
            const piece = pieces.shift();
            switch (piece.Variable) {
                case "at":
                    const atVar = pieces.shift();
                    if (!atVar) continue;
                    HideFunction = atVar.Variable
                    if (atVar.Variables && atVar.Variables.length !== 0) {
                        HideFunctionExtraArgs = atVar.Variables.map(a => a.ConvertToJavascript()).join(",")

                    }
                    continue;
                case "with":
                    const withVar = pieces.shift();
                    if (!withVar) continue;
                    HideFunction = withVar.Variable
                    if (withVar.Variables && withVar.Variables.length !== 0) {
                        HideFunctionExtraArgs = withVar.Variables.map(a => a.ConvertToJavascript()).join(",")

                    }
                    continue;
                case "as":
                    const groupName = pieces.shift()
                    continue;

            }
            HideList.push(piece);
        }
        if (HideList.length === 0) return "// Hide error nothing to Hide";
        let avi_qoted = ReplaceSingleQuotes(HideList[0].Variable);

        return `await convo.Hide('${avi_qoted}'  ${HideFunctionExtraArgs})`;


    }
}
