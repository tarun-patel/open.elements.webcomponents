import html from './pagination.html';
import styles from './pagination.styles.scss';

export class Pagination extends HTMLElement{
    metaItem;
    constructor(item){
        super();
        this.metaItem=item;
        this.attachShadow({mode:'open'})
    }

    connectedCallback(){
        let css=this.metaItem.fields.get('styles')?.fieldValue;
        this.shadowRoot.innerHTML=`<style>${styles}${css}</style>${html}`;
        let pageList=this.shadowRoot.querySelector('.page-list');
        console.log(pageList);

        console.log('pagelist data :',this.metaItem);
        this.initPagination(pageList);
    }
    disconnectedCallback(){
        console.log("disconnected callback of paginatiion");
    }
    initPagination(pageList){
        let   init_pagination=this.metaItem.getRelElementsOnType("FUNCTIONS").get("paginationinit-function");
    //    let  paginationconextdata=undefined;
    // //    if(this.metaItem.getData("pagination_init_context")!=undefined){
    //     paginationconextdata=this.metaItem.getData("pagination_init_context");
    //    }
        init_pagination(this.metaItem).then(data=>{
          console.log("data received for pagination initiation:",data
          );
         let totalElements=data.fields.get("total_elements").fieldValue;
          let totalPages=data.fields.get("total_pages").fieldValue;
          console.log("total elements:",totalElements,"totalpages:",totalPages);
    
        let totalNo=totalPages;
        let currentPage=1;
        let eventFunc=this.metaItem.getRelElementsOnType("FUNCTIONS").get('pagination_element_select_function');
            console.log("Event function is:",eventFunc);
        console.log(totalNo);

        let prevBtn=this.shadowRoot.querySelector('.prev');
        prevBtn.classList.add('hover')
        let nextBtn=this.shadowRoot.querySelector('.next');
        nextBtn.classList.add('hover')

       
        prevBtn.addEventListener('click',(event)=>{
            if(currentPage>=1){
                currentPage--;
                // this.updatePaginationElement(currentPage,totalNo,false);
                // eventFunc(currentPage, event);  
                this.parentElement.dispatchEvent(new CustomEvent("table-page-change", {
                    detail: {"current_page_no":currentPage},
                    bubbles: true,
                    cancelable: true,
                    composed: false,
                  }))

                console.log('current value',currentPage)
                this.activeLinks(currentPage);
            }
           
        })
        nextBtn.addEventListener('click',(event)=>{
            if(currentPage<totalNo){
                currentPage++;
                // this.updatePaginationElement(currentPage,totalNo,false);
                // eventFunc(currentPage, event);
                this.parentElement.dispatchEvent(new CustomEvent("table-page-change", {
                    detail: {"current_page_no":currentPage},
                    bubbles: true,
                    cancelable: true,
                    composed: false,
                  }))

                console.log('current value',currentPage)
                this.activeLinks(currentPage);
            }    
        })

        for(let i=1; i<=totalNo;i++ ){
        // for(let i=1; i<=600;i++ ){
            let li=document.createElement('li');
            // li.id=i;
            li.classList.add('links')
            li.value=i;
            li.innerText=i;
            li.classList.add(''+i);

            // if(i<currentPage-3){
            //     li.classList.add('hide');
            // }
            if(currentPage==i){
                li.classList.add('active');
                // li.classList.remove('hide');
            }
            // if(i>currentPage+3){
            //     li.classList.add('hide')
            // }


            li.addEventListener('click',(event)=>{
                // this.updatePaginationElement(currentPage,totalNo,true);
                // console.log("calling eventfuc on select:",eventFunc);
                // eventFunc(i,event);

                currentPage=event.target.value;
                event.target.classList.add('active')
                // console.log("parent element of pagiation",);
                console.log('current page no:',currentPage)
                this.parentElement.dispatchEvent(new CustomEvent("table-page-change", {
                    detail: {"current_page_no":currentPage},
                    bubbles: true,
                    cancelable: true,
                    composed: false,
                  }))
                this.activeLinks(currentPage);

            });

            pageList.appendChild(li);
            this.activeLinks(currentPage)
        }
    });
   
    }
    activeLinks(currentPage){
        console.log("currentpage in activelinks:",currentPage);
        let links=this.shadowRoot.querySelectorAll('li');
        links.forEach((li,index)=>{
            li.classList.remove('active');
            if(index===currentPage-1){
                li.classList.add('active')
        console.log("currentpage in activelinks: added active to",li);

            }
        })
    }

    // updatePaginationElement(currentPage,totalNo,isinit){
    //     let elem=this.shadowRoot.querySelectorAll('li');
    //     // console.log(elem)
    //     // let totalNo=this.metaItem.fields.get('total-page').fieldValue;
    //     let prev= this.shadowRoot.querySelector('.prev');
    //     let next=this.shadowRoot.querySelector('.next');
        // for(let i=0;i<=elem.length;i++){
        //    let num=i+1;
        //    let li=elem[i];

        //    if(currentPage==1 && isinit){
        //     console.log('prev btn disabled')
        //     prev.classList.remove('hover')
        //     prev.disabled=true;
        //    }
        //     if(currentPage==totalNo){
        //     console.log('next btn disabled');
        //     next.classList.remove('hover');
        //     next.disabled=true;
        //    }
        //    if (currentPage>1 && currentPage<100){
        //     prev.classList.add('hover');
        //     prev.disabled=false;

        //     next.classList.add('hover');
        //     next.disabled=false;

        //    }

        //   if(num>=currentPage-3 && num<=currentPage+3){
            
        //     // if(li!=undefined){
        //     //     li.classList.remove('hide');
        //     // }
        //     // console.log("num>=currentPage-3 && num<=currentPage+3 :",i,li)
        //   }
        //   else{
        //     // console.log("under else of num>=currentPage-3 && num<=currentPage+3 :",i,li)

        //     // if(li!=undefined){
        //     //     li.classList.add('hide');
        //     // }
        //     // else
        //     // console.log("li is undefined for i :",num)
        //   }
        // }
      
    // }



       
}
customElements.define('pagination-links',Pagination)