import Statement from "./statement.mjs";
import {BadCommandError} from "./badCommandError.mjs";
import {DissolveEffect} from "./dissolveEffect.mjs";

export class RenPyLineStatement extends Statement {
    Target = false
    Emotion = false;
    AppearLocation = false;

    PreProcess() {
        super.PreProcess();
        const line = this.Line.trim()

        const pieces = line.split(/\s+/);
        const functionName = pieces.shift();
        while (pieces.length > 0) {
            const Item = pieces.shift();

            if (!this.Target) {
                this.Target = Item;
                continue;
            }
            if (Item === "with" && pieces.length > 0) {
                pieces.shift();
                if (pieces.length > 0) {
                    let searchSTr = pieces[0].trim().toLowerCase();
                    if (!searchSTr.indexOf('dissolve')) {
                        continue;
                    }
                    this.With = new DissolveEffect(pieces);
                }
                continue;
            }
            if (Item === "at" && pieces.length > 0) {
                if (pieces.length > 0)
                    this.AppearLocation = pieces.shift();
                continue;
            } else {
                if (!this.Emotion) {
                    this.Emotion = Item;
                    continue;
                }
            }
         //   throw new BadCommandError();
        }

    }
}

