import {ReplaceSingleQuotes} from "./textStatement.mjs";
import {RenPyLineStatement} from "./renPyLineStatement.mjs";


export class HideStatement extends RenPyLineStatement {


    ConvertToJavascript() {

        let convoCall = `convo.Hide('${ReplaceSingleQuotes(this.Target)})`;
        if (this.With)
            return convoCall + "\n" + this.With.ConvertToJavascript();
        else
            return 'await ' + convoCall


    }
}
