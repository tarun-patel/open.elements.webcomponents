import html from "./multi.select.html";
import styles from "./multi.select.styles.scss";
import { Item, ItemData } from "open.elements.data.ts";
export class MultiSelect extends HTMLElement {
  metadataItem;
  // type;

  constructor(item) {
    super();
    this.metadataItem = item;
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    let customStyles =
      this.metadataItem.fields?.get("custom-styles")?.fieldValue;
    this.shadow.innerHTML = `  <style>${styles}${customStyles}</style>${html}`;

    //  let fields = this.metadataItem.fields;
    //  console.log("Connected callback form : ",fields);
    // if(fields.get("table-styles")!=undefined){
    // let mainStyles = fields.get("styles").fieldValue;
    this.shadow.innerHTML = `  <style>${styles} </style>${html}`;

    //console.log("calling add events of table filter ");
    this.addEvents();
  }

  // setType=(typ)=>{
  //   this.type=typ;
  //   console.log("call under setType",this.type);

  // }
  addEvents = () => {
    // console.log("METADATA ITEM IS:",this.metadataItem);
    let ip = this.shadowRoot.querySelector('[name="multiselectip"]');
    ip.setAttribute(
      "type",
      this.metadataItem.fields.get("input-element-type").fieldValue
    );

    ip.addEventListener("keypress", this.createChips);
  };

  createChips = (event) => {
    let parentnode = event.target.parentNode.parentNode;
    // console.log("createChips parentnode is:::",parentnode);
    let errorcontainer = parentnode.querySelector(".errorchipscontainer");
    if (errorcontainer != undefined && errorcontainer != null) {
      parentnode.removeChild(errorcontainer);
    }
    if (event.key === "Enter") {
      // console.log("event of enter observed on target",event.target);
      // console.log("event of enter observed on target event.target.value",event.target.value);

      if (event.target.value.trim() != "") {
        let addchip = true;
        let duplicatechip = false;
        let chipscontainer = this.shadowRoot.querySelector(
          '[name="chipscontainer"]'
        );
        let maxChipcount = this.metadataItem.fields.get("max-chip-count");
        // console.log("maxChipcount ::",maxChipcount);
        if (maxChipcount != undefined && maxChipcount != null) {
          let noofChips = chipscontainer.querySelectorAll("p").length;
          // console.log("noofChips ::",noofChips);

          if (noofChips >= maxChipcount.fieldValue) {
            addchip = false;
          }
        }
        let currentChips = this.extractChips();

        if (currentChips.includes(event.target.value)) {
          duplicatechip = true;
        }
        // if(noofChips< this.metadataItem.getD)
        let clo = document.createElement("p");
        let cli = document.createElement("p");
        cli.textContent = event.target.value;
        let closspan = document.createElement("span");
        closspan.classList.add("sup");

        closspan.textContent = "x";
        cli.classList.add("chip-value");
        closspan.addEventListener("click", this.removeChip);
        clo.appendChild(cli);
        clo.appendChild(closspan);
        if (addchip && !duplicatechip) {
          chipscontainer.appendChild(clo);
        } else if (duplicatechip) {
          let errorchiptstemp = this.shadowRoot.getElementById(
            "dupllicate-chip-span"
          ).content;
          let arow = errorchiptstemp
            .cloneNode(true)
            .querySelector(".errorchipscontainer");
          let pnode = chipscontainer.parentNode;
          pnode.appendChild(arow);
        } else {
          let errorchiptstemp =
            this.shadowRoot.getElementById("error-span").content;
          let arow = errorchiptstemp
            .cloneNode(true)
            .querySelector(".errorchipscontainer");
          let pnode = chipscontainer.parentNode;
          pnode.appendChild(arow);
        }
        event.target.value = "";
      }
    }
  };

  extractChips() {
    let cc = this.shadowRoot.querySelector(".chipscontainer");
    let fieldvalueArr = new Array();
    let ps = cc.querySelectorAll(".chip-value");

    ps.forEach((p) => {
      // console.log("each p value is: ",p);
      if (!fieldvalueArr.includes(p.innerText)) {
        fieldvalueArr.push(p.innerText);
      }
    });
    // console.log("returning fielvaluearr",fieldvalueArr);
    return fieldvalueArr;
  }
  removeChip = (event) => {
    let chip = event.target.parentNode;
    let chipParent = chip.parentNode;
    chipParent.removeChild(chip);
  };
}
customElements.define("multi-select-ip", MultiSelect);
