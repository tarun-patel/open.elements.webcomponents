import { Item } from "open.elements.data.ts";
export class InputFileEle extends HTMLElement {
  metaItem = new Item();
  constructor() {
    super();
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
    
    let element = document.createElement(ele);
    element.type = type;
    this.shadowRoot.appendChild(element);

    let subEle = fields.get("ele").fieldValue;
    let subType = fields.get("typ").fieldValue;
    let element1 = document.createElement(subEle);
    element1.type = subType;
    this.shadowRoot.appendChild(element1);
    if(element1 === "click"){
      localStorage.setItem("file", element);
      console.log("file stored successfully");
    }
  }
}
customElements.define("input-file", InputFileEle);
