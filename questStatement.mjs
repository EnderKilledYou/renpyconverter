import Statement from "./statement.mjs";

export class QuestStatement extends Statement {

    ConvertToJavascript() {
        super.ConvertToJavascript();
        const line = this.Line.Variable + ' ' + this.Line.Variables.map(a=>a.Variable).join(" ");
        if (line.match(/start\(\)/)) {
            const quest = line.trim().split('.').at(1)
            return `StartQuest(convo.Scene,"${quest}");`
        }
    }
}
