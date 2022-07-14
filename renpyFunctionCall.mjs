import {String2Csv} from "./string2Csv.mjs";

export class RenpyFunctionCall {

    WithCall = false
    Args = null;

    ConvertToJavascript(functionName) {
        if (!this.WithCall) return "";
        return `convo.`
    }

    ParseFunction(pieces) {
        if (pieces.length <= 0) {
            return;
        }
        this.WithCall = pieces.shift();

        let parenStart = this.WithCall.indexOf("(");
        if (parenStart < 0) {
            return;
        }
        let Args;
        let parensEnd = this.WithCall.slice(parenStart).indexOf(")");
        if (parensEnd > 0) {
            Args = this.WithCall.slice(parenStart, parensEnd);


        } else {
            while (pieces.length > 0 && this.WithCall.indexOf(")") < 0) {
                Args += pieces.shift()
            }
        }
        this.WithCall = this.WithCall.slice(0, parenStart);
        this.Args = String2Csv(Args);
    }
}
