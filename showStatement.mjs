import Statement from "./statement.mjs";
import {parse} from "csv-parse/sync";
import {RenPyLineStatement} from "./renPyLineStatement.mjs";
import {ReplaceSingleQuotes} from "./textStatement.mjs";

function StringAndQuoteArray(pieces) {
    return pieces.map(ReplaceSingleQuotes).map(a => "'" + a + "'").join(',');
}

export class ShowStatement extends RenPyLineStatement {
    ConvertToJavascript() {
        const line = this.Line.Variable + ' ' + this.Line.Variables.map(a => a.Variable).join(" ");
        const pieces = this.Line.Variables.slice().map(a=>a.Variable);
        const atIndex = pieces.indexOf('at');
        const asIndex = pieces.indexOf('as');
        const withIndex = pieces.indexOf('with')
        let withEffect;
        let atLocation;
        if(withIndex >=0){
            pieces.splice(withIndex,1)
            withEffect = pieces.splice(withIndex,1)[0]
        }
        if(atIndex >=0){
            pieces.splice(atIndex,1)
            atLocation = pieces.splice(atIndex,1)[0]
        }
        if(asIndex >=0) // not yet supported
        {
            pieces.splice(asIndex,pieces.length - asIndex);
        }
        if (pieces.length === 2) {
            const actions = StringAndQuoteArray(pieces);

            return `//${line}
                await convo.Show(${actions})
            `
        }

        if (pieces.length === 3) {
            return `
            //${line}
            await  convo.Pose('${pieces[0]}','${pieces[1]}'); 
            await  convo.Say('${pieces[0]}','${pieces[2]}' ); 
            `

        }

        return  `
                //parse error
            //${line} 
            
            `
    }
}


