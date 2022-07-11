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


export default function parseStatement(parsed_lines, i,parent) {

    let parsedLine = parsed_lines[i];
    if (!parsedLine) {
        debugger
    }
    let line = parsedLine.Line;

    const trimmed_line = lowerCase(line);
    if (trimmed_line.startsWith("label")) {

        let conversationFunction = new LabelStatement(parsedLine,parent);
        i = conversationFunction.parseMethodStatements(parsed_lines, i + 1);
        return {j: i, statement: conversationFunction}
    }
    if (trimmed_line.startsWith("menu")) {
        let menuStatement = new MenuStatement(parsedLine,parent);

        i = menuStatement.parseMethodStatements(parsed_lines, i + 1);
        return {j: i, statement: menuStatement}
    }
    if (trimmed_line.startsWith("elif")) {
        let elIfStatement = new ElIfStatement(parsedLine,parent);

        i = elIfStatement.parseMethodStatements(parsed_lines, i + 1);
        return {j: i, statement: elIfStatement}
    }
    if (trimmed_line.startsWith("if")) {
        let menuStatement = new IfStatement(parsedLine,parent);

        i = menuStatement.parseMethodStatements(parsed_lines, i + 1);
        return {j: i, statement: menuStatement}
    }
    if (trimmed_line.startsWith("else")) {
        let menuStatement = new ElseStatement(parsedLine,parent);

        i = menuStatement.parseMethodStatements(parsed_lines, i + 1);
        return {j: i, statement: menuStatement}
    }
    if (trimmed_line.startsWith('"?') || trimmed_line.startsWith('"\\"')) {
        let menuDecision = new MenuDecision(parsedLine,parent);

        i = menuDecision.parseMethodStatements(parsed_lines, i + 1);
        return {j: i, statement: menuDecision}
    }


    if (trimmed_line.startsWith('return')) {
        let returnStatement = new ReturnStatement(parsedLine,parent);
        return {j: i + 1, statement: returnStatement}
    }
    if (trimmed_line.startsWith('show')) {
        let showStatement = new ShowStatement(parsedLine,parent);
        return {j: i + 1, statement: showStatement}
    }
    if (trimmed_line.startsWith('extend')) {
        let extendStatement = new ExtendStatement(parsedLine,parent);
        return parseStatement(parsed_lines, i + 1,parent)

    }
    if (trimmed_line.startsWith('pause')) {
        let pauseStatement = new PauseStatement(parsedLine,parent);
        return {j: i + 1, statement: pauseStatement}

    }
    if (trimmed_line.startsWith('$quest')) {
        let questStatement = new QuestStatement(parsedLine,parent);
        return {j: i + 1, statement: questStatement}
    }
    if (trimmed_line.startsWith('$') && trimmed_line.indexOf('(') >= 0) {
        let avatarStatement = new AvatarStatement(parsedLine,parent);
        return {j: i + 1, statement: avatarStatement}
    }
    if(parent instanceof MenuStatement){
        let menuDecision = new MenuDecision(parsedLine,parent);

        i = menuDecision.parseMethodStatements(parsed_lines, i + 1);
        return {j: i, statement: menuDecision}
    }
    return {j: i + 1, statement: new TextStatement(parsedLine,parent)}
}
