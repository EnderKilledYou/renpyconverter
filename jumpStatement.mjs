import Statement from "./statement.mjs";
import {ReplaceSingleQuotes} from "./textStatement.mjs";

export class JumpStatement extends Statement {
ConvertToJavascript() {
      super.ConvertToJavascript();
      const jump = this.Line.Variables.map(a => `'${ReplaceSingleQuotes(a.Variable)}'`).join(",");
      return `await convo.Jump(${jump})
      `;
}
}
