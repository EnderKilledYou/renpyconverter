import {StatementBlock} from "./statementBlock.mjs";
import {LabelStatement} from "./labelStatement.mjs";
import {ReturnStatement} from "./returnStatement.mjs";
import {ReplaceSingleQuotes} from "./textStatement.mjs";

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

        let exec = MenuDecision.matcher.exec(this.Line);
        if (exec) {

            return exec[1]
        }

        return this.Line.split("|").at(-1).slice(0, -2);
    }

    GetMenuTextAsClassName() {
        return ReplaceSingleQuotes (this.GetMenuText().replace(/[^A-Za-z]/g, '').toUpperCase())
    }

    AddReturn = false;

    PreProcess() {
        super.PreProcess();

        const ReturnStatements = this.Statements.filter(a => a instanceof ReturnStatement);
        if (ReturnStatements.length === 1) { //if there are return statements more than one and not the last one then don't refractor
            if (!(this.Statements.at(-1) instanceof ReturnStatement)) {
                return;
            }
        }
        //refractor out into new function/helper file
        let root_node = this.parent;
        let label_node = this.parent;
        while (root_node.parent !== null) {
            root_node = root_node.parent;
        }
        while (label_node.Depth > 0) {
            label_node = label_node.parent;
        }
        let labelStatement = new LabelStatement({Line: "label " + this.GetMenuText(), Depth: 0}, root_node);
        label_node.AdditionalLabels.push(labelStatement)
        labelStatement.Statements = this.Statements;
   //     root_node.Statements.push(labelStatement)
    }

    ConvertToJavascript() {

        return `new MenuDecision('${ReplaceSingleQuotes(this.GetMenuTextAsClassName())}', ${this.GetMenuText()})`
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
