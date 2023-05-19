import html from './pagination.html';
import styles from './pagination.styles.scss';

export class pagination extends HTMLElement{
    metaItem;
    constructor(item){
        super();
        this.metaItem=item;
        this.attachShadow({mode:'open'})
    }

    connectedCallback(){
        this.shadowRoot.innerHTML=`<style>${styles}</style>${html}`;
        let pageList=this.shadowRoot.querySelector('.page-list');
        console.log(pageList);

        console.log('pagelist data :',this.metaItem);

        let totalNo=this.metaItem.fields.get('total-page').fieldValue;
        let currentPage=5;
        let eventFunc=this.metaItem.fields.get('e-func').fieldValue;

        console.log(totalNo);

        let prevBtn=this.shadowRoot.querySelector('.prev');
        prevBtn.classList.add('hover')
        let nextBtn=this.shadowRoot.querySelector('.next');
        nextBtn.classList.add('hover')

       
        prevBtn.addEventListener('click',(event)=>{
            if(currentPage>=1){
                currentPage--;
                this.updatePaginationElement(currentPage);
                eventFunc(currentPage, event);
                console.log('current value',currentPage)
                this.activeLinks(currentPage);
            }
           
        })
        nextBtn.addEventListener('click',(event)=>{
            if(currentPage<totalNo){
                currentPage++;
                this.updatePaginationElement(currentPage);
                eventFunc(currentPage, event);
                console.log('current value',currentPage)
                this.activeLinks(currentPage);
            }    
        })

        for(let i=1; i<=totalNo;i++ ){
            let li=document.createElement('li');
            // li.id=i;
            li.classList.add('links')
            li.value=i;
            li.innerText=i;
            li.classList.add(''+i);

            if(i<currentPage-3){
                li.classList.add('hide');
            }
            if(currentPage==i){
                li.classList.add('active');
                li.classList.remove('hide');
            }
            if(i>currentPage+3){
                li.classList.add('hide')
            }


            li.addEventListener('click',(event)=>{
                this.updatePaginationElement(currentPage);
                eventFunc(i,event);

                currentPage=event.target.value;
                event.target.classList.add('active')
                console.log('current page no:',currentPage)
                this.activeLinks(currentPage);

            });

            pageList.appendChild(li);
            this.activeLinks(currentPage)
        }
   
    }
    activeLinks(currentPage){
        let links=this.shadowRoot.querySelectorAll('li');
        links.forEach((li,index)=>{
            li.classList.remove('active');
            if(index===currentPage-1){
                li.classList.add('active')
            }
        })
    }

    updatePaginationElement(currentPage){
        let elem=this.shadowRoot.querySelectorAll('li');
        // console.log(elem)
        let totalNo=this.metaItem.fields.get('total-page').fieldValue;
        let prev= this.shadowRoot.querySelector('.prev');
        let next=this.shadowRoot.querySelector('.next');
        for(let i=0;i<=elem.length;i++){
           let num=i+1;
           let li=elem[i];

           if(currentPage==1){
            console.log('prev btn disabled')
            prev.classList.remove('hover')
            prev.disabled=true;
           }
            if(currentPage==totalNo){
            console.log('next btn disabled');
            next.classList.remove('hover');
            next.disabled=true;
           }
           if (currentPage>1 && currentPage<100){
            prev.classList.add('hover');
            prev.disabled=false;

            next.classList.add('hover');
            next.disabled=false;

           }

          if(num>=currentPage-3 && num<=currentPage+3){
            
            if(li!=undefined){
                li.classList.remove('hide');
            }
            // console.log("num>=currentPage-3 && num<=currentPage+3 :",i,li)
          }
          else{
            // console.log("under else of num>=currentPage-3 && num<=currentPage+3 :",i,li)

            if(li!=undefined){
                li.classList.add('hide');
            }
            // else
            // console.log("li is undefined for i :",num)
          }
        }
      
    }



       
}
customElements.define('page-link',pagination)