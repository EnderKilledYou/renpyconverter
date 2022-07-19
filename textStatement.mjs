import Statement from "./statement.mjs";
import {parse} from "csv-parse/sync";

export class TextStatement extends Statement {
    ConvertToJavascript() {
        super.ConvertToJavascript();
        const line = this.Line.Variable + ' ' + this.Line.Variables.map(a=>a.Variable).join(" ");
        try {
            const parser = parse(line.trim(), {
                    record_delimiter: ' ', escape: '\\'
                }
            ).map(a => ReplaceSingleQuotes(a[0]));

            if (parser.length === 1) {
                return `await convo.Say('Narrator','${parser[0]}');`
            }
            if (parser.length === 2) {
                if(parser[0] ==="window")
                    return "//" + line + " \n";
                    else
                return `await convo.Say('${parser[0]}','${parser[1]}');`
            }
            if (parser.length === 3) {
                return `
                //${line}
                 await  convo.Pose('${parser[0]}','${parser[1]}');` + `
                 await  convo.Say('${parser[0]}','${parser[2]}');`
            }
            return line.trim();

        } catch (e) {
            console.log(line.trim())
        }
    }
}

export const ReplaceSingleQuotes = str => str.replace(/'/g, "\\'")
