import StatementBlock from "./statementBlock.mjs";

import {ReturnStatement} from "./returnStatement.mjs";
import {ReplaceSingleQuotes} from "./textStatement.mjs";
import {parse} from "csv-parse/sync";
import {LabelStatement} from "./labelStatement.mjs";
import {Variable} from "./renPyLine.mjs";

export default class MenuDecision extends StatementBlock {
    static matcher = /"\\"([^\\]+)\\"/;
    static iconer = /image=([^}]+)/;

    GetMenuCondition() {
        const menu_conditions = this.Line.split(/\|/);
        if (menu_conditions.length === 0) {
            return "";
        }
        if (menu_conditions.length === 1) {
            return "";
        }
        let condition = new MenuCondition(menu_conditions.shift());


        for (let menuCondition of menu_conditions) {
            let exec = MenuDecision.matcher.exec(menuCondition);
            if (exec) {
                continue;
            }
            let icon = MenuDecision.iconer.exec(menuCondition)
            if (icon) {
                condition.Icons.push(new MenuDecisionIcon(icon[1]))
            }

        }
        return condition.ToJavaScript();
    }

    GetMenuText() {
        let parser;
        const line = this.Line.Variable + ' ' + this.Line.Variables.map(a=>a.Variable).join(" ");
        if (line.indexOf('|') >= 0) {
            return line.split("|").at(-1).slice(0, -2);
        }
        try {
            parser = parse(line.trim().slice(0, -1), {
                record_delimiter: ' ', escape: '\\'
            }).map(a => a[0]);
            if (parser) {
                return parser[0]
            }
        } catch (e) {
            console.log(line)
            throw e;
        }

        return "???????NOTFOUND???????????"

    }

    GetMenuTextAsClassName() {
        return ReplaceSingleQuotes(this.GetMenuText().replace(/[^A-Za-z]/g, '').toUpperCase())
    }

    AddReturn = false;

    PreProcess() {
        super.PreProcess();

        const ReturnStatements = this.Statements.filter(a => a instanceof ReturnStatement);
        for (const returnStatement of ReturnStatements) {
            returnStatement.Refractored = true; //sets it to set return statements to throw instead of just return;
        }
        //refractor out into new function/helper file

        const root_node = this.GetRootNode()
        const label_node = this.GetLabelNode();
       let labelStatement = new LabelStatement({Variable: "label",Variables:[new Variable(this.GetMenuTextAsClassName())], Depth: 0}, root_node);
         label_node.AdditionalLabels.push(labelStatement)
         labelStatement.Statements = this.Statements;
            root_node.Statements.push(labelStatement)
    }

    ConvertToJavascript() {

        return `new MenuDecision('${ReplaceSingleQuotes(this.GetMenuText())}', ${this.GetMenuTextAsClassName()})`
    }
}


class MenuDecisionIcon {
    constructor(icon_text) {

    }

}

class MenuCondition {
    constructor(condition_text) {
        this.Conditions = condition_text.split("@")
        this.Icons = []
    }

    ToJavaScript() {
        return "";
    }
}
