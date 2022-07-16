import MenuDecision from "./menuDecision.mjs";


export function lowerCase(line) {
    return line.trim().toLowerCase();
}


import {AvatarStatement} from "./avatarStatement.mjs";
import {QuestStatement} from "./questStatement.mjs";
import {PauseStatement} from "./pauseStatement.mjs";
import {TextStatement} from "./textStatement.mjs";
import {ExtendStatement} from "./extendStatement.mjs";
import {ElIfStatement} from "./elIfStatement.mjs";
import {ShowStatement} from "./showStatement.mjs";
import {LabelStatement} from "./labelStatement.mjs";
import {MenuStatement} from "./menuStatement.mjs";
import {ElseStatement} from "./elseStatement.mjs";
import {ReturnStatement} from "./returnStatement.mjs";
import {IfStatement} from "./ifStatemeant.mjs";
import {VariableAssignmentStatement} from "./variableAssignmentStatement.mjs";
import {XposStatement} from "./xposStatement.mjs";
import {HideStatement} from "./hideStatement.mjs";
import RenPyLine from "./renPyLine.mjs";


export default function parseStatement(parsed_lines, i, parent) {

    let parsedLine = parsed_lines[i];
    if (!parsedLine) {
        debugger
    }
    const trimmed_line = parsedLine.Line.trim();
    const pieces = trimmed_line.split(" ")
    const name = pieces.shift();
    let renPyLine = new RenPyLine(name, pieces)
    renPyLine.Depth = parsedLine.Depth
    if (trimmed_line.startsWith('"?') || trimmed_line.startsWith('"\\"')) {
        let menuDecision = new MenuDecision(renPyLine, parent);

        i = menuDecision.parseMethodStatements(parsed_lines, i + 1);
        return {j: i, statement: menuDecision}
    }


    let statement;
    switch (name.toLowerCase()) {
        case "label":
            statement = new LabelStatement(renPyLine, parent);
            i = statement.parseMethodStatements(parsed_lines, i + 1);
            return {j: i, statement: statement}
        case "menu":
            statement = new MenuStatement(renPyLine, parent);
            i = statement.parseMethodStatements(parsed_lines, i + 1);
            return {j: i, statement: statement}
        case "elif":
            statement = new ElIfStatement(renPyLine, parent);
            i = statement.parseMethodStatements(parsed_lines, i + 1);
            return {j: i, statement: statement}
        case "if":
            statement = new IfStatement(renPyLine, parent);
            i = statement.parseMethodStatements(parsed_lines, i + 1);
            return {j: i, statement: statement}
        case "else":
            statement = new ElseStatement(renPyLine, parent);
            i = statement.parseMethodStatements(parsed_lines, i + 1);
            return {j: i, statement: statement}
        case "extend":
            let extendStatement = new ExtendStatement(renPyLine, parent);
            return parseStatement(parsed_lines, i + 1, parent)
        case "pause":
            let pauseStatement = new PauseStatement(renPyLine, parent);
            return {j: i + 1, statement: pauseStatement}


        case "hide":
            let hideStatement = new HideStatement(renPyLine, parent);
            return {j: i + 1, statement: hideStatement}

        case "xpos":
            let xposStatement = new XposStatement(renPyLine, parent);
            return {j: i + 1, statement: xposStatement}

        case "return":
            let returnStatement = new ReturnStatement(renPyLine, parent);
            return {j: i + 1, statement: returnStatement}

    }


    if (trimmed_line.startsWith('$quest')) {
        let questStatement = new QuestStatement(renPyLine, parent);
        return {j: i + 1, statement: questStatement}
    }
    if (trimmed_line.startsWith('$') && trimmed_line.indexOf('(') >= 0) {
        let avatarStatement = new AvatarStatement(renPyLine, parent);
        return {j: i + 1, statement: avatarStatement}
    }

    if (trimmed_line.startsWith('$')) {
        let variableAssignmentStatement = new VariableAssignmentStatement(renPyLine, parent);
        return {j: i + 1, statement: variableAssignmentStatement}
    }
    if (parent instanceof MenuStatement) {
        let menuDecision = new MenuDecision(renPyLine, parent);

        i = menuDecision.parseMethodStatements(parsed_lines, i + 1);
        return {j: i, statement: menuDecision}
    }
    return {j: i + 1, statement: new TextStatement(renPyLine, parent)}
}
