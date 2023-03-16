import html from './toggle.switch.html';
import styles from './toggle.switch.styles.scss';

export class MultiSelectCheckbox extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.shadowRoot.innerHTML=` <style>${styles}</style> ${html} `

        let container=document.createElement('div');

        let label=document.createElement('label');
        label.classList.add('outer-container');

        let input=document.createElement('input');
        input.type='checkbox';
        input.classList.add('switch-checkbox');
        let span=document.createElement('span');
        span.classList.add('switch-roller');


        label.appendChild(input);
        label.appendChild(span);

        container.appendChild(label);

        this.shadowRoot.appendChild(container);
  
    }
}
customElements.define('toggle-switch',MultiSelectCheckbox);

//  export default MultiSelectCheckbox;