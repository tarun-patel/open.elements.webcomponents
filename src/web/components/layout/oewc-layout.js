// import { EditableTableBodyElement } from '../../../../npm-modules/open-wc-elements/open-wc-elements';
// import { TaggedSelect } from '../../../custom/tagged-select/tagged-select';
import html from './oewc-layout.html';
import styles from './oewc-layout.styles.scss';

import { Item } from "open.elements.data.ts";
import { SideNavBar } from '../side-nav-bar/oewc-side-nav-bar';
export class Layout extends HTMLElement {
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
    let mainStyles = fields.get("main-layout-styles").fieldValue;

    this.shadow.innerHTML = `  <style>${styles} ${mainStyles}</style>${html}`
    // this.shadowRoot.quer
    let leftbar = this.shadowRoot.querySelectorAll(".layout-leftbar")[0];

    let d = new Item();
    d = this.metadataItem;
    let navbaritems = d.getRelElementsOnType("RNDR_MDT").get("side-nav-bar");
    console.log("navbaritemsnavbaritemsnavbaritemsnavbaritems", navbaritems);
    let filenamesbar = new SideNavBar(navbaritems);
    console.debug(filenamesbar);
    leftbar.appendChild(filenamesbar);

  }
}
customElements.define('oewc-layout', Layout)


