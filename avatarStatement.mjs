import Statement from "./statement.mjs";

export class AvatarStatement extends Statement {
    ConvertToJavascript() {
        super.ConvertToJavascript();
        const trim = this.Line.trim();
        const pieces = trim.slice(1).split('.');
        const avatar = PascalCase(pieces[0]);
        let function_args_between_parens = trim.slice(trim.indexOf('(') + 1).slice(0, -1);
        if (pieces.length === 1) {
            return `${avatar}(${function_args_between_parens})`
        }
        const function_call = pieces.slice(1).join(".");
        const function_name = function_call.split("(").at(0);
        return `${function_name}('${avatar}',${function_args_between_parens})`
    }
}

export function PascalCase(input) {
    return input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, character) => character.toUpperCase());
}
