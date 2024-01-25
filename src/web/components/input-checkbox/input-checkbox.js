import styles from "./input-checkbox.styles.scss";
import html from "./input-checkbox.html";

export class InputCheckBox extends HTMLElement {
  metadataItem;
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }
  initialize(item) {
    this.metadataItem = item;
  }
  connectedCallback() {
    //let customStyles = this.metadataItem.fields?.get("styles").fieldValue;
    //this.shadowRoot.innerHTML = `<style>${customStyles}</style>`;
    console.log(this.metadataItem);
    // let input = this.shadowRoot.querySelector("input");

    let fields = this.metadataItem.fields;
    let ele = fields.get("element").fieldValue;
    let type = fields.get("type").fieldValue;
    let lbl = fields.get("label")?.fieldValue;
    //let value = fields.get("value")?.fieldValue;
    let checked = fields.get("checked")?.fieldValue;

    if (lbl != undefined) {
      let lblEle = document.createElement("label");
      lblEle.textContent = lbl;
      this.shadowRoot.appendChild(lblEle);
    }
    let elecheck = document.createElement(ele);
    elecheck.type = type;

    if (checked != undefined) {
      elecheck.checked = checked;
    }
    this.shadowRoot.appendChild(elecheck);
    let subEle = fields.get("ele").fieldValue;
    let subType = fields.get("typ").fieldValue;
    let element1 = document.createElement(subEle);
    element1.type = subType;
    this.shadowRoot.appendChild(element1);
    element1.addEventListener("click", () => {
      localStorage.setItem("date", lbl);
      alert("data stored successfully");
      console.log("date stored successfully");
      let date = localStorage.getItem("date");
      console.log(date);
    });
    //let label = this.metadataItem.getData("label")?.fieldValue;
    //let checked = this.metadataItem.getData("checked");

    // input.value = true;
    // input.setAttribute("data-val", true);
    //input.classList.add("input-checkbox");
    // if (this.metadataItem != undefined) {
    //   // input.checked = this.metadataItem.fieldValue;
    // } else {
    //   input.checked = false;
    // }
  }
}
customElements.define("input-checkbox", InputCheckBox);
