// import { EditableTableBodyElement } from '../../../../npm-modules/open-wc-elements/open-wc-elements';
// import { TaggedSelect } from '../../../custom/tagged-select/tagged-select';
import html from './oewc-overlay.html';
import styles from './oewc-overlay.styles.scss';

import { Item } from "open.elements.data.ts";
import { SideNavBar } from '../side-nav-bar/oewc-side-nav-bar';
export class Overlay extends HTMLElement {
  metadataItem;
  constructor(item) {
    super();
    this.metadataItem = item;
    this.shadow = this.attachShadow({ mode: 'open' });
    console.log("THIS METAATA ITEM IN OVERLAY ITEM");
    console.log(this.metadataItem);
  }
  connectedCallback() {
    let fields = this.metadataItem.fields;
    let mainStyles =``;
    let modal;
    if(fields!=undefined ){
      if(fields.get("main-overlay-styles")!=undefined)
    {
     mainStyles = fields.get("main-overlay-styles").fieldValue;
  }
  if(fields.get("modal")!=undefined)
  {
    modal = fields.get("modal").fieldValue;
   
}
this.addEventListener("closemodal",event=>{
  console.log("close modal event in overlay:",event);
  console.log("close modal event in overlay:",event.details);
})
}
console.log("Modal in ovelay is :",modal);
    this.shadow.innerHTML = `  <style>${styles} ${mainStyles}</style>${html}`
    this.shadowRoot.appendChild(modal);
    let d = new Item();
    d = this.metadataItem;

  }
}
customElements.define('oewc-overlay', Overlay)


