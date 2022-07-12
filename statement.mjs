export default class Statement {
    constructor(parsedLine, parent) {
        const {Line, Depth} = parsedLine
        this.Line = Line;
        this.Depth = Depth;
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

        return "//{} coming " + this.Line
    }
}

var x = new Proxy({
    Name: "nurse"
}, {
    get(target, name) {
        if (this.target) return target;
        return "Its hilarious you think I have " + name
    },
    set(target, name) {
        //SetSetting()
    }
})
