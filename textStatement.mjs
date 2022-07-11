import Statement from "./statement.mjs";
import {parse} from "csv-parse/sync";

export class TextStatement extends Statement {
    ConvertToJavascript() {
        super.ConvertToJavascript();
        try {
            const parser = parse(this.Line.trim(), {
                    record_delimiter: ' ', escape: '\\'
                }
            ).map(a => ReplaceSingleQuotes(a[0]));
            if (parser.length === 1) {
                return `convo.Say('Narrator','${parser[0]}');`
            }
            if (parser.length === 2) {
                return `convo.Say('${parser[0]}','${parser[1]}');`
            }
            if (parser.length === 3) {
                return `
                 convo.Pose('${parser[0]}','${parser[1]}');` + `
                 convo.Say('${parser[0]}','${parser[2]}');`
            }
            return this.Line.trim();

        } catch (e) {
            console.log(this.Line.trim())
        }
    }
}

export const ReplaceSingleQuotes = str => str.replace(/'/g, "\\'")
