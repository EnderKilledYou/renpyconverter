import Statement from "./statement.mjs";

export class ReturnStatement extends Statement {
    Refractored = false;

    ConvertToJavascript() {
        super.ConvertToJavascript();
        if (this.Refractored)
            return " throw new ConversationEndedException() // ends the conversation like the old return statement. this lets us have sub functions "
        else return " return "
    }
}
