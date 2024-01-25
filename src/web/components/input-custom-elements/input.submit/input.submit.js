import { Item } from "open.elements.data.ts";
export class InputSubmitEle extends HTMLElement {
  metaItem = new Item();
  constructor() {
    super();
    // this.metaItem = item;
    this.attachShadow({ mode: "open" });
  }
  initialize(item) {
    this.metaItem = item;
  }
  connectedCallback() {
    console.log("meta item rcvd  :", this.metaItem);
    let fields = this.metaItem.fields;
    let ele = fields.get("element").fieldValue;
    let type = fields.get("type").fieldValue;
    let lbl = fields.get("label")?.fieldValue;
    let value = fields.get("value")?.fieldValue;
    if (lbl != undefined) {
      let lblEle = document.createElement("label");
      lblEle.textContent = lbl;
      this.shadowRoot.appendChild(lblEle);
    }

    let element = document.createElement(ele);
    element.type = type;
    this.shadowRoot.appendChild(element);
  }
}
customElements.define("input-submit", InputSubmitEle);
