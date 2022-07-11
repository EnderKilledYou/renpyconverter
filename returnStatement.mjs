import Statement from "./statement.mjs";

export class ReturnStatement extends Statement {
    ConvertToJavascript() {
        super.ConvertToJavascript();
        return "return"
    }
}
