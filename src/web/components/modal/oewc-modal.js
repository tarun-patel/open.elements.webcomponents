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
    let modalheader=this.shadowRoot.querySelectorAll(".modalheader")[0];
    let htext = document.createTextNode(d.fields.get("header").fieldValue);

    modalheader.appendChild(htext);
    let modalbody=this.shadowRoot.querySelectorAll(".modalbody")[0];
    let btext = document.createTextNode(d.fields.get("body").fieldValue);
    modalbody.appendChild(btext);

   
    let modalbutton=this.shadowRoot.querySelectorAll(".modalbutton")[0];
    modalbutton.innerHTML=d.fields.get("button").fieldValue;
  
  //  let modalview=this.shadowRoot.querySelectorAll(".modal-btn-close")[0];
   Array.from(this.shadowRoot.querySelectorAll(".modal-btn-close")).forEach((modalview)=>{
    modalview.addEventListener("click",event=>{
      console.log("close item is clicked");
      console.log(event);
      console.log("eventtarget close modal",event.target);
      // this.remove()
      console.log("this in event for close is:",this);
      console.log("this parent is in event for close is:",this.parentNode.host);
      // this.remove();
      let cevent = new CustomEvent("closemodal",{detail: "modal"});
      this.parentNode.host.remove();  
      //document.dispatchEvent(cevent);
      // event.target.parentNode
    })
   });
   
  }
}
customElements.define('oewc-modal', Modal)


