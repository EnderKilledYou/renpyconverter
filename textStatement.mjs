import Statement from "./statement.mjs";
import {parse} from "csv-parse/sync";

export class TextStatement extends Statement {
    ConvertToJavascript() {
        super.ConvertToJavascript();
        const line = this.Line.Variable + ' ' + this.Line.Variables.map(a => a.Variable).join(" ");
        try {
            const parser = parse(line.trim(), {
                    record_delimiter: ' ', escape: '\\'
                }
            ).map(a => ReplaceSingleQuotes(a[0]));

            const withIndex = parser.indexOf('with');

            if (parser.length === 1) {
                return `await convo.Say('Narrator','${parser[0]}');`
            }
            if (parser.length === 2) {

                return `await convo.Say('${parser[0]}','${parser[1]}');`
            }
            if (parser.length === 3) {
                return `
                //${line}
                 await  convo.Pose('${parser[0]}','${parser[1]}');` + `
                 await  convo.Say('${parser[0]}','${parser[2]}');`
            }
            if (parser.length === 4 && withIndex >= 0) {

                const withItems = [];
                parser.splice(withIndex, 1);
                const withEffect = parser.splice(withIndex, 1)[0]
                // while (parser.length > withIndex) {
                //     withItems.push(parser.splice(withIndex, 1))
                // }
                return `
                //${line}
                 
                 await  convo.Say('${parser[0]}','${parser[1]}','${withEffect}');`
            }
            if (parser.length === 5 && withIndex >= 0) {

                const withItems = [];
                parser.splice(withIndex, 1);
                const withEffect = parser.splice(withIndex, 1)[0]
                // while (parser.length > withIndex) {
                //     withItems.push(parser.splice(withIndex, 1))
                // }

                return `
                //${line}
                 await  convo.Pose('${parser[0]}','${parser[1]}');` + `
                 await  convo.Say('${parser[0]}','${parser[2]}','${withEffect}');`

            }
            return `
            //${line} 
            `


        } catch (e) {
            console.log(line.trim())
        }
    }
}

export const ReplaceSingleQuotes = str => str.replace(/'/g, "\\'")
