import html from "./side-nav.html";
import { Item, ItemData } from "open.elements.data.ts";

export class sideNav extends HTMLElement{
    data = new Item();
    constructor(data){
        super();
        this.data = data;
        this.attachShadow({mode:"open"});
    }
    connectedCallback(){
        this.shadowRoot.innerHTML = `${html}`;
        
        
       console.log("data from side nav",this.data);
       let template = this.shadowRoot.querySelector("template");
       //console.log(template);
       let ul = this.shadowRoot.querySelector("ul");
       let relele = this.data.getRelElementsOnType("nav");
       console.log(relele);
       relele.forEach(element => {
        console.log(element.fields);
        console.log(element.getData("label").fieldValue);
        console.log(element.fields.get("label").fieldValue);
           let li = template.content.cloneNode(true);
            console.log("li tag",li);
            let span = li.querySelector('span');
            span.innerHTML = element.fields.get("label").fieldValue;
            console.log("span innerhtml",span);
            console.log("converting into item");
           // console.log(element.fields.lable.fieldValue);
            ul.appendChild(li);
       });
    }
  }
  customElements.define('side-nav',sideNav);