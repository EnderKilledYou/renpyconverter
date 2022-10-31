export default function RenPyLine(name,pieces) {

    const ParsedRenPyLine = {};
    let subParens = [];
    let parts = [];
    let parens = new Parens(name);
    ParensStep(0, pieces, parens);

    return parens;
    if (parts.length > 0) {
        this.Command = parts[0];
        this.Arguments = parts.slice()
    }
}

function ParensStep(parensCount, pieces, parens) {
    if (pieces.length === 0) {
        return parens;
    }

    const parensPiece = pieces.shift();
    const openPieceIndex = parensPiece.indexOf('(');
    const closePieceIndex = parensPiece.indexOf(')');
    if (openPieceIndex >= 0) {
        parensCount++;

        const beforeParens = parensPiece.slice(0, openPieceIndex);
        const afterParens = parensPiece.slice(openPieceIndex + 1);

        const tmp = new Parens(beforeParens)
        parens.Variables.push(tmp);
        for (const parensPieceElement of afterParens.split(",").reverse()) {
            pieces.unshift(parensPieceElement);
        }
    //    if (afterParens.trim().length > 0)
   //         pieces.unshift(afterParens)
        ParensStep(parensCount, pieces, tmp);
    } else if (closePieceIndex >= 0) {
        parensCount--;
        const beforeParens = parensPiece.slice(0, closePieceIndex);

        const afterParens = parensPiece.slice(closePieceIndex + 1);
        pieces.unshift(afterParens);
        if(beforeParens.trim().length >0)
            parens.Variables.push(new Variable(beforeParens));

    } else {

        parens.Variables.push(new Variable(parensPiece));
        ParensStep(parensCount, pieces, parens)
    }

}


export class Variable {
    Variable;
    ConvertToJavascript(){
        return this.Variable;
    }
    constructor(variable) {
        this.Variable = variable;

    }


}

export class Parens extends  Variable{
    Depth=0
    Variables = []
    text = '';
    constructor(text) {
        super(text);
    }

    ConvertToJavascript(){
        let variables = this.Variables.map(a => a.ConvertToJavascript());
        return `${this.Variable}(${variables.join(",")})`;
    }
}
