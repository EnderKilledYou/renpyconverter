import Statement from "./statement.mjs";
import {BadCommandError} from "./badCommandError.mjs";
import {DissolveEffect} from "./dissolveEffect.mjs";

export class RenPyLineStatement extends Statement {
    Target = false

    PreProcess() {
        super.PreProcess();
        const line = this.Line.trim()
        const functionName = pieces.shift();
        const pieces = line.split(/\s+/);

        while (pieces.length > 0) {
            if (!this.Target) {
                this.Target = pieces.shift();
            }
            if (pieces[0] === "with") {
                pieces.shift();
                if (pieces.length > 0) {
                    let searchSTr = pieces[0].trim().toLowerCase();
                    if (searchSTr.indexOf('dissolve')) {
                        this.With = new DissolveEffect(pieces);
                        continue;
                    }
                }
            }
            throw new BadCommandError();
        }
    }
}
