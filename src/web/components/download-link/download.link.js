import html from './download.link.html'
import styles from './download.link.styles.scss'

export class DownloadLink extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.shadowRoot.innerHTML=`<style>${styles}</style> ${html}`;
        this.addEvents();
    }
    
   tags = ["HTML","CSS"];

    addEvents(){           
        let ul = this.shadowRoot.querySelector("ul");
        let input = this.shadowRoot.querySelector("input");
       
        this.createTag(ul);
        this.shadowRoot.addEventListener('click',(e)=>{
            // console.log(e.target)
            if(e.target.tagName==='SPAN'){
                // console.log(e.target);
                // console.log(e.target.getAttribute('name'));
                this.remove(e.target,e.target.getAttribute('name'));
            }
        })


        input.addEventListener("keyup",(e)=>{
            if(e.key == "Enter"){
                let tag = e.target.value.replace(/\s+/g, ' ');

                // console.log(this.tags)
                if(tag.length > 1 && !this.tags.includes(tag)){
    
                    this.tags.push(tag);
                    // console.log(tag,'this tag is created')
                    this.createTag(ul);
                    
                }
                e.target.value = "";
            }
        }
    );
    } 

    createTag(ul){
        //refreshing the ul list
        // console.log(this.tags)
        ul.querySelectorAll("li").forEach(li => li.remove()); 

         this.tags.slice().reverse().forEach(tag =>{
            //creating the li element for each tag in tags 
            let liTag = `<li>${tag} <span class="close" name=${tag}>&#x2716;</span></li>`;
            // console.log(liTag);
            ul.insertAdjacentHTML("afterbegin",liTag);
        });
    }


    
            //remove tag
     remove(element, tag){
        let index  = this.tags.indexOf(tag);
        // console.log(index);
        this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)];
        element.parentElement.remove();
        }


}

customElements.define('download-link',DownloadLink);

