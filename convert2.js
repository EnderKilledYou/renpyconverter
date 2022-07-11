module.exports= class Convert2 {
    constructor(lines) {
        this.lines = lines;
        this.index = 0;
        this.Depth = 0;
    }

    CountWhiteSpace(item) {

        return item.length - item.trimStart().length

    }

    DepthLines = []

    ParseLine() {
        if (this.index >= this.lines.length) return null;
        const line = this.lines[this.index++].replace(/##.*/g,'');


        return {Line: line, Depth: this.CountWhiteSpace(line) / 2}

    }
}
