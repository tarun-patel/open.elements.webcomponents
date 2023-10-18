import {
  enableInputEditHandler,
  enableInputHandlerOnTabKey,
} from "./event.handlers.util";
import {
  handleChildDropDownSelect,
  handleChildXORDropDownSelect,
  handleFileDownload,
} from "./select.handlers";

export class FormElementsEventHandlersRepo {
  repo: Map<string, Array<any>> = new Map([
    [
      "input_text",
      [
        {
          eventname: "dblclick",
          handler: enableInputEditHandler,
        },
        {
          eventname: "keyup",
          handler: enableInputHandlerOnTabKey,
        },
      ],
    ],
    [
      "input_email",
      [
        {
          eventname: "dblclick",
          handler: enableInputEditHandler,
        },
        {
          eventname: "keyup",
          handler: enableInputHandlerOnTabKey,
        },
      ],
    ],
    [
      "select",
      [
        {
          eventname: "change",
          handler: handleChildDropDownSelect,
        },
      ],
    ],
    [
      "file_link",
      [
        {
          eventname: "click",
          handler: handleFileDownload,
        },
      ],
    ],
    //   ,
    //    ["select_XOR",[{
    //     "eventname":"change",
    //     "handler":handleChildXORDropDownSelect
    // }]]
  ]);
  getHandlers(key: string): Array<any> | undefined {
    // console.debug("Checking on handler repo: for key:"+key);
    // console.debug("this.repo : keys",this.repo.keys());
    // console.debug("this.repo : values",this.repo.values());
    // console.debug("this.repo : entries",this.repo.entries());
    // console.debug("this.repo : this.repo.get(key)",this.repo.get(key));

    return this.repo.get(key);
  }
}
