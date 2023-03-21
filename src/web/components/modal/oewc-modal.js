// import { EditableTableBodyElement } from '../../../../npm-modules/open-wc-elements/open-wc-elements';
// import { TaggedSelect } from '../../../custom/tagged-select/tagged-select';
import html from './oewc-modal.html';
import styles from './oewc-modal.styles.scss';

import { Item } from "open.elements.data.ts";
import { SideNavBar } from '../side-nav-bar/oewc-side-nav-bar';
export class Modal extends HTMLElement {
  metadataItem;
  constructor(item) {
    super();
    this.metadataItem = item;
    this.shadow = this.attachShadow({ mode: 'open' });
    console.log("THIS METAATA ITEM IN SIDEBAR");
    console.log(this.metadataItem);
  }
  connectedCallback() {

    let fields = this.metadataItem.fields;
    let mainStyles =``;
    if(fields!=undefined ){
      if(fields.get("main-overlay-styles")!=undefined)
    {
     mainStyles = fields.get("main-overlay-styles").fieldValue;
  }
}

    this.shadow.innerHTML = `  <style>${styles} ${mainStyles}</style>${html}`
    // this.shadowRoot.quer

    let d = new Item();
    d = this.metadataItem;
   
    let modalview=this.shadowRoot.querySelectorAll(".modal-btn-close")[0];
    modalview.addEventListener("click",event=>{
      console.log("close item is clicked");
      console.log(event);
      console.log("eventtarget close modal",event.target);
      // this.remove()
      console.log("this in event for close is:",this);
      console.log("this parent is in event for close is:",this.parentNode.parentNode);
      // this.remove();
      let cevent = new CustomEvent("closemodal",{detail: "modal"});
      document.dispatchEvent(cevent);
      // event.target.parentNode
    })
  }
}
customElements.define('oewc-modal', Modal)


