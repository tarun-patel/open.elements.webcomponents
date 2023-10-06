import { Item } from "open.elements.data.ts";
import html from "./select-search.html";
import styles from "./select-search.styles.scss";
export class SelectSearchComp extends HTMLElement {
  metaDataItem;
  ul;
  lis = [];
  selected_option;
  options;
  options_container;
  constructor(item) {
    super();
    this.metaDataItem = item;
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    let customStyles = this.metaDataItem.getData("custom-styles")?.feildValue;

    this.shadowRoot.innerHTML = `<style>${styles}${customStyles}</style>${html}`;
    this.ul = this.shadowRoot.querySelector(".options_list");
    this.selected_option = this.shadowRoot.querySelector("#value");

    let selectFuncs = this.metaDataItem.getRelElementsOnType("FUNCTIONS");
    console.log("select function rcvd from the item", selectFuncs);

    let create_options_func = selectFuncs.get("get_options_function");
    console.log(create_options_func);

    create_options_func().then((data) => {
      console.log("data response from the promise", data);
      this.options = data.getRelElementsOnType("options");
      console.log("options list:", this.options);
      this.createOptions(this.options);
    });

    this.addEvents();
  }

  addEvents() {
    let selection_bar = this.shadowRoot.querySelector(".selected_input_bar");
    this.options_container =
      this.shadowRoot.querySelector(".options_container");
    let serach_input = this.shadowRoot.querySelector(".seach_input");
    // this.lis = this.shadowRoot.querySelectorAll(".option");
    // console.log("lis", this.lis);
    selection_bar.addEventListener("click", () => {
      this.options_container.classList.toggle("show");
      serach_input.value = "";
      if (this.options_container.classList.contains("show")) {
        this.lis.forEach((li) => {
          li.style.display = "block";
        });
      }
    });
    this.filterOptions(serach_input);
  }
  createOptions(options) {
    options.forEach((op) => {
      let itm = new Item();
      itm = op;
      let li = document.createElement("li");
      li.textContent = itm.name;
      li.id = itm.id;
      li.classList.add("option");
      this.ul.appendChild(li);
      this.lis.push(li);
    });
    this.optionSelection(this.lis);
  }
  optionSelection(lis) {
    lis.forEach((li) => {
      //   console.log(li);
      li.addEventListener("click", () => {
        this.selected_option.value = li.textContent;
        // console.log(li.textContent);
        this.options_container.classList.toggle("show");
      });
    });
  }
  filterOptions(serach_input) {
    serach_input.addEventListener("keyup", () => {
      let filter_value = serach_input.value.toLowerCase();
      //   console.log(filter_value);
      this.lis.forEach((li) => {
        let li_text = li.textContent.toLowerCase();
        if (li_text.includes(filter_value)) {
          li.style.display = "block";
        } else li.style.display = "none";
      });
    });
  }
}
customElements.define("select-search", SelectSearchComp);
