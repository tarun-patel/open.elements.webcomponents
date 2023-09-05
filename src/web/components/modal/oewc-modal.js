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
  let impS=this.metadataItem.getData("styles")?.fieldValue;


    this.shadow.innerHTML = `  <style>${styles} ${mainStyles} ${impS}</style>${html}`
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
      console.log("this parent is in event for close is:",this.parentNode.parentNode.parentNode);
      console.log("this parent is in event for close is:",this.parentNode.parentNode.host);
      // this.remove();
      let cevent = new CustomEvent("closemodal",{detail: "modal"});
      this.parentNode.parentNode.host.remove();  
      //document.dispatchEvent(cevent);
      // event.target.parentNode
      console.log("METADATA ITEM IM MODAL IS",this.metadataItem);
      // this.metadataItem.getRelElementOnType()
      console.log("this.metadataItem.getRelElementOnType(FUNCTIONS",this.metadataItem.getRelElementsOnType("FUNCTIONS"));
      let funcs=this.metadataItem.getRelElementsOnType("FUNCTIONS");

      console.log("this.metadataItem.getRelElementOnType(FUNCTIONS",funcs);
      console.log(".get(modal-on-close-func)",funcs.get("modal-on-close-func"));

      if(this.metadataItem.getRelElementsOnType("FUNCTIONS")!=undefined){
      let oncloseFunc=this.metadataItem.getRelElementsOnType("FUNCTIONS")?.get("modal-on-close-func");
      console.log("oncloseFunc is:",oncloseFunc);
      if(oncloseFunc!=undefined)
      console.log("calling oncloseFunc is:",oncloseFunc);

        oncloseFunc();
      }
    })
   });
   
  }
}
customElements.define('oewc-modal', Modal)


