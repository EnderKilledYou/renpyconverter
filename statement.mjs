export default class Statement {
    /**
     *
     * @param {Parens} parsedLine
     * @param parent
     */
    constructor(parsedLine, parent) {
        this.Line = parsedLine;
        this.Depth = parsedLine.Depth;
        this.parent = parent;

    }

    GetLabelNode() {
        let label_node = this.parent;

        while (label_node.Depth > 0) {
            label_node = label_node.parent;
        }
        return label_node;
    }

    GetRootNode() {
        let root_node = this.parent;
        while (root_node.parent !== null) {
            root_node = root_node.parent;
        }
        return root_node;
    }

    PreProcess() {

    }

    ConvertToJavascript() {

        return "//{} coming " + this.Line.Variable
    }
}


