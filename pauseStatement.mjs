import Statement from "./statement.mjs";

export class PauseStatement extends Statement {
    ConvertToJavascript() {
        super.ConvertToJavascript();
        const line = this.Line.Variable + ' ' + this.Line.Variables.map(a=>a.Variable).join(" ");
        const items = line.trim().split(' ');
        if (items.length === 2) {
            return `convo.Pause(${items[1]})`
        }
        return "// coming soon " + this.Line;

    }
}
