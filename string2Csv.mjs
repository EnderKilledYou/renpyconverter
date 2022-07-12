import {parse} from "csv-parse/sync";

export function String2Csv(str) {

    try {
        return parse(this.Line.trim(), {
            record_delimiter: ' ', escape: '\\'
        }).map(a => a[0]);
    } catch (e) {

        if (str.indexOf('"') < 0)
            return str.trim().split(' ');

        throw e;
    }
}
