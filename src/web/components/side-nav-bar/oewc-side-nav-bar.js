// import { EditableTableBodyElement } from '../../../../npm-modules/open-wc-elements/open-wc-elements';
// import { TaggedSelect } from '../../../custom/tagged-select/tagged-select';
import html from './oewc-side-nav-bar.html';
import styles from './oewc-side-nav-bar.styles.scss';
import { Item } from "open.elements.data.ts";

export class SideNavBar extends HTMLElement {
   metadataItem;
  constructor(item) {
    super();
   this.metadataItem=item;
    this.shadow = this.attachShadow({ mode: 'open' });
    console.log("THIS METAATA ITEM IN SIDEBAR");
    console.log(this.metadataItem);
  }
  connectedCallback() { 
    this.shadow.innerHTML = `  <style>${styles}</style>${html}`

 let  d= new Item();
 d= this.metadataItem;
 console.log("this . metadata");
 console.log(this.metadataItem);
   let eles=d.getRelElementsOnType("RNDR_MDT");
  
   console.log("this . metadata eles");
 console.log(eles);
 console.log("keys is"+JSON.stringify(eles.keys()));
 let  div=document.createElement("div");
    div.classList.add("nav-bar-container")
    eles.forEach(key=>{

      console.log("key is",key,"key.fields.get(fileName)",key.fields.get("fileName"));
    let  nav=document.createElement("nav");
    let a=document.createElement("a");
    // a.href=key.fields.get("schemaId").fieldValue;
    a.textContent=key.fields.get("fileName").fieldValue;
    let clickFunction=key.fields.get("click_function").fieldValue;
      console.log("clickFunction is:",clickFunction);
      console.log("clickFunction key is :",key);
    a.addEventListener("click",(event) => clickFunction(event, key));
      
    // nav.textContent=key.fields.get("fileName").fieldValue;
    nav.appendChild(a);
    div.appendChild(nav);
    })
    this.shadowRoot.appendChild(div);

  }
}
customElements.define('oewc-side-nav-bar', SideNavBar)


