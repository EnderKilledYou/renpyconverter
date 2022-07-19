import Statement from "./statement.mjs";
import {parse} from "csv-parse/sync";

export class XposStatement extends Statement {
    ConvertToJavascript() {
        const base = super.ConvertToJavascript();
        const line = this.Line.Variable + ' ' + this.Line.Variables.map(a=>a.Variable).join(" ");
        return "// soon " + line;
        let parser;
        try {
            parser = parse(this.Line.trim(), {
                record_delimiter: ' ', escape: '\\'
            }).map(a => a[0]);
        } catch (e) {
            //  throw e
            if (this.Line.indexOf('"') < 0) {
                parser = this.Line.trim().split(' ');
            } else {
                throw e;
            }
        }
        if (parser.length < 2) {
            return "// soon " + this.Line.trim(); //malformed
        }
        if (parser.length === 3) {
            this.Sprite = parser[1];
            this.Frame = parser[2];
            return `
            convo.Pose('${this.Sprite}','${this.Frame}');
            `
        } else if (parser.length === 4) {
            this.Sprite = "";
            this.Frame = parser[2];
            this.Effect = parser[3]
            return `
            convo.Pose('${this.Sprite}','${this.Frame}');
            `
        } else if (parser.length > 4) {
            if (parser[3] === "at" || parser[3] === "with")
                this.Sprite = parser[1];
            this.Frame = parser[2];
            this.Effect = parser[4]
            return `convo.Pose('${this.Sprite}','${this.Frame}');`
        }

        return "// soon " + this.Line.trim();
    }
}
