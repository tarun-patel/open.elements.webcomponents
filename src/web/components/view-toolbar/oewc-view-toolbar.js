// import { EditableTableBodyElement } from '../../../../npm-modules/open-wc-elements/open-wc-elements';
// import { TaggedSelect } from '../../../custom/tagged-select/tagged-select';
import html from './oewc-view-toolbar.html';
import styles from './oewc-view-toolbar.styles.scss';

import { Item } from "open.elements.data.ts";
export class ViewToolBar extends HTMLElement {
   metadataItem;
  constructor(item) {
    super();
   this.metadataItem=item;
    this.shadow = this.attachShadow({ mode: 'open' });
    console.log("THIS METAATA ITEM IN SIDEBAR");
    console.log(this.metadataItem);
  }
  connectedCallback() { 
   let fields=this.metadataItem.fields;
   let mainStyles=``;
   if(fields!=null && fields.get("toolbar-styles")!=undefined){
    mainStyles=fields.get("toolbar-styles").fieldValue;
  }
    this.shadow.innerHTML = `  <style>${styles} ${mainStyles}</style>${html}`
    // this.shadowRoot.quer
  let toolbar=    this.shadowRoot.querySelectorAll(".toolbar")[0];

 let  d= new Item();
d=this.metadataItem;
let toolbaritems=d.getRelElementsOnType("RNDR_MDT");

let navitem=document.createElement("nav");
toolbaritems.forEach(entry=>{
  console.log("entry in toolbar is");
  console.log(entry);
  console.log("entry.fields",entry.fields);
  console.log("entry.fields.get('name').fieldValue",entry.fields.get("name"));
  if(entry.type="icon"){}else{
  let aitem=document.createElement("a");
  
  let liitem=document.createElement("li");
  liitem.classList.add("nav-li");
  aitem.textContent=entry.fields.get("name");
  aitem.href="";
  liitem.appendChild(aitem);
  navitem.appendChild(liitem);
}
});

toolbar.appendChild(navitem);
 
}

}
customElements.define('oewc-view-toolbar', ViewToolBar)


