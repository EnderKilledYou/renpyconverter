import Statement from "./statement.mjs";

export class PauseStatement extends Statement {
    ConvertToJavascript() {
        super.ConvertToJavascript();
        const items = this.Line.trim().split(' ');
        if (items.length === 2) {
            return `convo.Pause(${items[1]})`
        }
        return "// coming soon " + this.Line;

    }
}
