export default class Statement {
    constructor(parsedLine,parent) {
        const {Line, Depth} = parsedLine
        this.Line = Line;
        this.Depth = Depth;
        this.parent = parent;

    }
    PreProcess(){

    }

    ConvertToJavascript() {

        return "//{} coming " + this.Line
    }
}
