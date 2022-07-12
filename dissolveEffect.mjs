import {RenpyFunctionCall} from "./renpyFunctionCall.mjs";

export class DissolveEffect extends RenpyFunctionCall {
    constructor(pieces) {
        super();
        this.ParseFunction(pieces)
    }
}
