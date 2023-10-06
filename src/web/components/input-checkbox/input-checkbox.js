import styles from "./input-checkbox.styles.scss";
import html from "./input-checkbox.html";

export class InputCheckBox extends HTMLElement {
  metadataItem;
  constructor(item) {
    super();
    this.metadataItem = item;
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    let customStyles = this.metadataItem.fields?.get("styles").fieldValue;
    this.shadowRoot.innerHTML = `<style>${styles}${customStyles}</style>${html}`;
    let input = this.shadowRoot.querySelector("input");
    // input.value = true;
    // input.setAttribute("data-val", true);
    input.classList.add("input-checkbox");
    if (this.metadataItem != undefined) {
      input.checked = this.metadataItem.fieldValue;
    } else {
      input.checked = false;
    }
  }
}
customElements.define("input-checkbox", InputCheckBox);
