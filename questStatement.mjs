import Statement from "./statement.mjs";

export class QuestStatement extends Statement {

    ConvertToJavascript() {
        super.ConvertToJavascript();
        if (this.Line.match(/start\(\)/)) {
            const quest = this.Line.trim().split('.').at(1)
            return `StartQuest(convo.Scene,"${quest}");`
        }
    }
}
