import {ReplaceSingleQuotes} from "./textStatement.mjs";
import {RenPyLineStatement} from "./renPyLineStatement.mjs";


export class HideStatement extends RenPyLineStatement {

    constructor(renpy, parent) {
        super(renpy, parent);
    }

    ConvertToJavascript() {

        let quoted_params = this.Line.Variables.map(a => a.ConvertToJavascript()).join(",");
        if (this.Line.Variables.length === 0) {
            return "await convo.Hide()" //probably gonna throw no params to hide;
        }
        if (this.Line.Variables.length === 1) {
            const avatar = this.Line.Variables[0];
            return `await convo.Hide('${ReplaceSingleQuotes(avatar)}')`
        }
        let whom = this.Line.Variables[0];
        if (this.Line.Variables.length === 3) {
            if (this.Line.Variables[1].Variable === "with") {
                switch (this.Line.Variables[2].Variable) {
                    case "Dissolve":
                        if (!this.Line.Variables[2].Variables || this.Line.Variables[2].Variables.length === 0)
                            return `await convo.HideDissolve('${ReplaceSingleQuotes(avatar)}')`
                        else {
                           const quoted_params= this.Line.Variables[2].Variables.map(a=>a.ConvertToJavascript()).join(",")
                            return `await convo.HideDissolve('${quoted_params}')`
                        }
                }
            }

            let convoCall = `convo.Hide(${quoted_params})`;
            if (this.With)
                return convoCall + "\n" + this.With.ConvertToJavascript();
            else
                return 'await ' + convoCall


        }
    }
}
