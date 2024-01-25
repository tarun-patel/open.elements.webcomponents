import html from "./hello.html";
import styles from "./hello.styles.scss";

export class Layout2 extends HTMLElement {
  constructor(item) {
    super();
    this.metaData = item;
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    console.log("hello from the hellocomp");
    this.shadowRoot.innerHTML = `<style>${styles}</style>${html}`;
    console.log("meta item rcvd", this.metaData);
    console.log(
      "fields= get(name)=fieldValue :",
      this.metaData.fields.get("name").fieldValue
    );
    console.log(
      "fields= get(name)=fieldValue :",
      this.metaData.fields.get("data").fieldValue 
    );
      "relelements :",
          console.log(
this.metaData.getRelElementsOnType("user").get("name")
    );
  }
}
customElements.define("lay-out", Layout2);
