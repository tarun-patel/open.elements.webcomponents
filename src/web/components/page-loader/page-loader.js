import html from './page-loader.html';
import styles from './page-loader.styles.scss'

export class PageLoader extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"})
    }
    connectedCallback(){
        this.shadowRoot.innerHTML=`<style>${styles}</style>${html}`;
        let modal=this.shadowRoot.querySelector('.modal-box');
        let loader=this.shadowRoot.querySelector('.loader')
        // console.log('modal element', modal)
        modal.showModal();

        window.addEventListener('load',()=>{
            modal.close()
        })
    //     window.addEventListener('transitioinend',()=>{
    //         this.shadowRoot.removeChild(loader)
    //     })
    }
}
customElements.define('page-loader',PageLoader)