
const updateFilterQueryMetadata=(formItem,optionsdata,filter_attrList)=>
{
  //  let optionsdata=this.metadataItem.getRelElementsOnType("RNDR_MDT").get("filter_attr_condition_options").getRelElementsOnType("RNDR_MDT");
  //  console.log("updateFilterQueryMetadata optionsdata is:",optionsdata.getRelElementsOnType("options"));
 
//  let filter_attrList=this.metadataItem.getData("filter_attr_list").fieldValue;
//  console.log("updateFilterQueryMetadata filter_attrList is:",filter_attrList);

  let fields=formItem.fields;
  fields?.forEach(field=>{
    let fname=field.name;
    // console.log("field::",field);
    let fild=filter_attrList.filter(field=>field.name===fname)[0];
    // console.log("fildis:",fild);
   let ele=fild.getData("element").fieldValue;
   let typ= fild.getData("type").fieldValue;
   let opotions=optionsdata.get(ele+"_"+typ).getRelElementsOnType("options").get(field.type);
    // console.log("otpins are:",opotions);
    field.metaData=opotions.metaData
  })
}

export {updateFilterQueryMetadata}
