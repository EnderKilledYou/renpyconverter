import RenPyLine from "../renPyLine.mjs";
import {HideStatement} from "../hideStatement.mjs";
import {ShowStatement} from "../showStatement.mjs";
import {IfStatement} from "../ifStatemeant.mjs";


//let renPyLine = RenPyLine("hide",`jacklyn with Dissolve(.5)`.split(" "));
//console.log(new HideStatement(renPyLine,null).ConvertToJavascript());
//RenPyLine("if",`not quest.isabelle_stolen["hold_your_horse_dick"] or (quest.isabelle_stolen["hold_your_horse_dick"] and not quest.isabelle_stolen["help_with_the_project"])`.split(" "))
//let pyLine = RenPyLine("show","school art_class art_in_progress sketch_libation as libation".split(" "));
//console.log(pyLine)
//console.log(new ShowStatement(pyLine,null).ConvertToJavascript())

// pyLine = RenPyLine("show","jacklyn smile with Dissolve(.5)".split(" "));
// console.log(pyLine)
// console.log(new ShowStatement(pyLine,null).ConvertToJavascript())

// pyLine = RenPyLine("show","jacklyn neutral at move_to(.5)".split(" "));
// console.log(pyLine)
// console.log(new ShowStatement(pyLine,null).ConvertToJavascript())


// pyLine = RenPyLine("show","jo sad at appear_from_left(.5)".split(" "));
// console.log(pyLine)
// console.log(new ShowStatement(pyLine,null).ConvertToJavascript())

//
// pyLine = RenPyLine("if",`not quest.isabelle_stolen["hold_your_horse_dick"] or (quest.isabelle_stolen["hold_your_horse_dick"] and not quest.isabelle_stolen["help_with_the_project"])`.split(" "))
// console.log(pyLine)
// console.log(new IfStatement(pyLine,null).ConvertToJavascript())

const pyLine = RenPyLine("if",`not quest.isabelle_stolen["hold_your_horse_dick"] or (quest.isabelle_stolen["hold_your_horse_dick"] and not quest.isabelle_stolen["help_with_the_project"])`.split(" "))
console.log(pyLine)
console.log(new IfStatement(pyLine,null).ConvertToJavascript())
