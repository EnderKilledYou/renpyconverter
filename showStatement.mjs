import Statement from "./statement.mjs";
import {parse} from "csv-parse/sync";
import {RenPyLineStatement} from "./renPyLineStatement.mjs";
import {ReplaceSingleQuotes} from "./textStatement.mjs";

export class ShowStatement extends RenPyLineStatement {
    ConvertToJavascript() {

        let convoCall = `convo.Hide('${ReplaceSingleQuotes(this.Target)})`;
        if (this.With)
            return convoCall + "\n" + this.With.ConvertToJavascript();
        else
            return 'await ' + convoCall


    }
}
