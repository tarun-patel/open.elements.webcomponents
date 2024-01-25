import { Item, ItemData } from "open.elements.data.ts";
import { SelectMulOptions } from "../../components/select_tags/select.tag";
import { Layout2 } from "../../components/layout2/hello";
import { selectTag } from "../../components/select.tags2/select_tag";
import { displayTable } from "../../components/table_tag/table";
import { sideNav } from "../../components/nav-bar/side-nav";
import { StudentCalendar } from "../../components/lynk.calendar/lynk.calendar";
import { SelectTag } from "../../components/select.tag/select.tag";
import { ButtonElment } from "../../components/input-custom-elements/button.submit/button.submit";
import eleStyles from "./element-test.styles.scss";
import { SlotElement } from "../../components/input-custom-elements/slot-element/slot-ele";
export class ElementTest extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    // creating an item and name it

    let item = new Item();
    item.name = "select element";

    let optionItem1 = new Item();
    optionItem1.name = "India";
    item.addRelElementsOnType("options", optionItem1.name, optionItem1);

    let optionItem2 = new Item();
    optionItem2.name = "USA";
    // item.name='select element';
    item.addRelElementsOnType("options", optionItem2.name, optionItem2);

    let optionItem3 = new Item();
    optionItem3.name = "China";
    // item.name='select element';
    item.addRelElementsOnType("options", optionItem3.name, optionItem3);
    console.log("3rd item is added in the dataset", optionItem3);
    // console.log(item.name)

    let optionItem4 = new Item();
    optionItem4.name = "Japan";
    item.addRelElementsOnType("options", optionItem4.name, optionItem4);
    console.log("the 4th item added in this datatype is", optionItem4);

    let optionItem5 = new Item();
    optionItem5.name = "Canada";
    item.addRelElementsOnType("options", optionItem5.name, optionItem5);

    let optionItem6 = new Item();
    optionItem6.name = "Bangladesh";
    item.addRelElementsOnType("options", optionItem6.name, optionItem6);

    let optionItem7 = new Item();
    optionItem7.name = "ABC";
    item.addRelElementsOnType("options", optionItem7.name, optionItem7);

    let multiSelc = new SelectMulOptions(item);

    // this.shadowRoot.appendChild(multiSelc);

    let itm = new Item();
    itm.addData("name", new ItemData("name", "priya"));
    itm.addData("data", new ItemData("data", "ITEMDATA"));
    itm.addData("gender", new ItemData("gender", "Female"));
    console.log("new data that is gender of priya added into the dataset", itm);
    itm.addRelElementsOnType("user", "name", "chetan");
    let hello = new Layout2(itm);
    //this.shadowRoot.appendChild(hello);

    let add = new Item();
    add.addData("phone number", new ItemData("phone number", 6364800645));
    console.log("phone number of an employee", add);
    let data = [
      {
        id: "efb65b26-01f2-482d-a93e-17e4969c3b7e",
        name: "Watch Organizers",
      },
      {
        id: "ca8037cc-6197-46e9-bc7f-115a99e0db43",
        name: "Bread & Buns",
      },
      {
        id: "54da47e4-3c98-4e5a-b15c-c56080bcf0d8",
        name: "Diapers & Wipes ",
      },
      {
        id: "5eb4ed17-689d-462a-a5df-570a7592f877",
        name: "Baby Food & Formula",
      },
      {
        id: "4af21213-ba16-46bf-9c62-210383207d49",
        name: "Baby Bath & Hygiene",
      },
      {
        id: "137e4077-5b88-45fb-977b-26e0fb0b4df1",
        name: "Bakery Snacks",
      },
      {
        id: "cac8ca48-b90a-4ccd-9f18-884565b80134",
        name: "Cakes & Pastries",
      },
      {
        id: "297e21ac-1139-4823-b680-bcc481ccec4c",
        name: "Dairy Products",
      },
      {
        id: "5c17b39a-ac3f-4500-ad9c-4d3e329c4607",
        name: "Ice Creams & Desserts",
      },
      {
        id: "78db2aca-b9a8-4968-8cb4-a7bf90a30251",
        name: "Plant Based Alternatives",
      },
      {
        id: "524c44c8-28f7-48fa-9879-f5e2f36b9c60",
        name: "Oral Care",
      },
      {
        id: "121aca4f-93d2-4814-94c6-9413c0a48419",
        name: "Fragrances & Deodorants",
      },
      {
        id: "a2622428-173a-461c-9f1a-83db98565e60",
        name: "Hair Care ",
      },
      {
        id: "e26387e2-c133-4f72-bb75-b4e3ca178504",
        name: "Hair Tools & Accessories ",
      },
      {
        id: "b1f2cc40-6f92-465f-be1d-2d62ac8ab6f2",
        name: "Bath & Hand Wash",
      },
      {
        id: "037f93da-f66c-41f1-a79c-e0c0c1c7b61c",
        name: "Bathing Accessories",
      },
    ];

    let navdata = [
      {
        name: "leads_md",
        id: "edda6623-765d-4163-bd69-7100f511b12b",
        seqId: 1,
        status: "enabled",
        createdDate: 1690214770844,
        updatedDate: 1690214770844,
        relationalElements: {},
        relationalElementRefs: {},
        relationalSeqs: {},
        fields: {
          iconref: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "iconref",
            fieldValue: "../../assets/icons/product.svg",
            value: "../../assets/icons/product.svg",
          },
          lable: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "lable",
            fieldValue: "Leads",
            value: "Leads",
          },
          href: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "href",
            fieldValue: "/leads_md",
            value: "/leads_md",
          },
          tag: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "tag",
            fieldValue: "lynk-leads",
            value: "lynk-leads",
          },
        },
        relElementRefs: {},
        relElements: {},
        allRelElementRefs: {
          MD: {},
        },
        allRelElements: {
          MD: {},
        },
        dataMap: {
          iconref: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "iconref",
            fieldValue: "../../assets/icons/product.svg",
            value: "../../assets/icons/product.svg",
          },
          lable: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "lable",
            fieldValue: "Leads",
            value: "Leads",
          },
          href: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "href",
            fieldValue: "/leads_md",
            value: "/leads_md",
          },
          tag: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "tag",
            fieldValue: "lynk-leads",
            value: "lynk-leads",
          },
        },
      },

      {
        name: "financial_md",
        id: "edda6623-765d-4163-bd69-7100f511b12b",
        seqId: 2,
        status: "enabled",
        createdDate: 1690214770844,
        updatedDate: 1690214770844,
        relationalElements: {},
        relationalElementRefs: {},
        relationalSeqs: {},
        fields: {
          iconref: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "iconref",
            fieldValue: "../../assets/icons/product_catalog_export.svg",
            value: "../../assets/icons/product_catalog_export.svg",
          },
          lable: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "lable",
            fieldValue: "Financials",
            value: "Financials",
          },
          href: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "href",
            fieldValue: "/financial_md",
            value: "/financial_md",
          },
          tag: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "tag",
            fieldValue: "lynk-financial",
            value: "lynk-financial",
          },
        },
        relElementRefs: {},
        relElements: {},
        allRelElementRefs: {
          MD: {},
        },
        allRelElements: {
          MD: {},
        },
        dataMap: {
          iconref: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "iconref",
            fieldValue: "../../assets/icons/product_catalog_export.svg",
            value: "../../assets/icons/product_catalog_export.svg",
          },
          lable: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "lable",
            fieldValue: "Financials ",
            value: "Financials ",
          },
          href: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "href",
            fieldValue: "/financial_md",
            value: "/financial_md",
          },
          tag: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "tag",
            fieldValue: "lynk-financial",
            value: "lynk-financial",
          },
        },
      },
      {
        name: "location_md",
        id: "edda6623-765d-4163-bd69-7100f511b12b",
        seqId: 3,
        status: "enabled",
        createdDate: 1690214770844,
        updatedDate: 1690214770844,
        relationalElements: {},
        relationalElementRefs: {},
        relationalSeqs: {},
        fields: {
          iconref: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "iconref",
            fieldValue: "../../assets/icons/product_export_status.svg",
            value: "../../assets/icons/product_export_status.svg",
          },
          lable: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "lable",
            fieldValue: "Locations",
            value: "Locations",
          },
          href: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "href",
            fieldValue: "/location_md",
            value: "/location_md",
          },
          tag: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "tag",
            fieldValue: "lynk-location",
            value: "lynk-location",
          },
        },
        relElementRefs: {},
        relElements: {},
        allRelElementRefs: {
          MD: {},
        },
        allRelElements: {
          MD: {},
        },
        dataMap: {
          iconref: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "iconref",
            fieldValue: "../../assets/icons/product_export_status.svg",
            value: "../../assets/icons/product_export_status.svg",
          },
          lable: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "lable",
            fieldValue: "Locations",
            value: "Locations",
          },
          href: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "href",
            fieldValue: "/location_md",
            value: "/location_md",
          },
          tag: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "tag",
            fieldValue: "lynk-location",
            value: "lynk-location",
          },
        },
      },
      {
        name: "counsellors_md",
        id: "edda6623-765d-4163-bd69-7100f511b12b",
        seqId: 4,
        status: "enabled",
        createdDate: 1690214770844,
        updatedDate: 1690214770844,
        relationalElements: {},
        relationalElementRefs: {},
        relationalSeqs: {},
        fields: {
          iconref: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "iconref",
            fieldValue: "../../assets/icons/review_product_upload.svg",
            value: "../../assets/icons/review_product_upload.svg",
          },
          lable: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "lable",
            fieldValue: "Counsellor",
            value: "Counsellor",
          },
          href: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "href",
            fieldValue: "/counsellors_md",
            value: "/counsellors_md",
          },
          tag: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "tag",
            fieldValue: "lynk-counsellor",
            value: "lynk-counsellor",
          },
        },
        relElementRefs: {},
        relElements: {},
        allRelElementRefs: {
          MD: {},
        },
        allRelElements: {
          MD: {},
        },
        dataMap: {
          iconref: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "iconref",
            fieldValue: "../../assets/icons/review_product_upload.svg",
            value: "../../assets/icons/review_product_upload.svg",
          },
          lable: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "lable",
            fieldValue: "Counsellor",
            value: "Counsellor",
          },
          href: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "href",
            fieldValue: "/counsellors_md",
            value: "/counsellors_md",
          },
          tag: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "tag",
            fieldValue: "lynk-counsellor",
            value: "lynk-counsellor",
          },
        },
      },
      {
        name: "trainers_md",
        id: "edda6623-765d-4163-bd69-7100f511b12b",
        seqId: 5,
        status: "enabled",
        createdDate: 1690214770844,
        updatedDate: 1690214770844,
        relationalElements: {},
        relationalElementRefs: {},
        relationalSeqs: {},
        fields: {
          iconref: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "iconref",
            fieldValue: "../../assets/icons/product_upload_status.svg",
            value: "../../assets/icons/product_upload_status.svg",
          },
          lable: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "lable",
            fieldValue: "Trainers",
            value: "Trainers",
          },
          href: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "href",
            fieldValue: "/trainers_md",
            value: "/trainers_md",
          },
          tag: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "tag",
            fieldValue: "lynk-trainer",
            value: "lynk-trainer",
          },
        },
        relElementRefs: {},
        relElements: {},
        allRelElementRefs: {
          MD: {},
        },
        allRelElements: {
          MD: {},
        },
        dataMap: {
          iconref: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "iconref",
            fieldValue: "../../assets/icons/product_upload_status.svg",
            value: "../../assets/icons/product_upload_status.svg",
          },
          lable: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "lable",
            fieldValue: "Trainers",
            value: "Trainers",
          },
          href: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "href",
            fieldValue: "/trainers_md",
            value: "/trainers_md",
          },
          tag: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "tag",
            fieldValue: "lynk-trainer",
            value: "lynk-trainer",
          },
        },
      },
      {
        name: "courses_md",
        id: "edda6623-765d-4163-bd69-7100f511b12b",
        seqId: 6,
        status: "enabled",
        createdDate: 1690214770844,
        updatedDate: 1690214770844,
        relationalElements: {},
        relationalElementRefs: {},
        relationalSeqs: {},
        fields: {
          iconref: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "iconref",
            fieldValue: "../../assets/icons/product_domain.svg",
            value: "../../assets/icons/product_domain.svg",
          },
          lable: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "lable",
            fieldValue: "Courses",
            value: "Courses",
          },
          href: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "href",
            fieldValue: "/courses_md",
            value: "/courses_md",
          },
          tag: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "tag",
            fieldValue: "lynk-course",
            value: "lynk-course",
          },
        },
        relElementRefs: {},
        relElements: {},
        allRelElementRefs: {
          MD: {},
        },
        allRelElements: {
          MD: {},
        },
        dataMap: {
          iconref: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "iconref",
            fieldValue: "../../assets/icons/product_domain.svg",
            value: "../../assets/icons/product_domain.svg",
          },
          lable: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "lable",
            fieldValue: "Courses",
            value: "Courses",
          },
          href: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "href",
            fieldValue: "/courses_md",
            value: "/courses_md",
          },
          tag: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "tag",
            fieldValue: "lynk-course",
            value: "lynk-course",
          },
        },
      },
      {
        name: "bacthes_md",
        id: "edda6623-765d-4163-bd69-7100f511b12b",
        seqId: 7,
        status: "enabled",
        createdDate: 1690214770844,
        updatedDate: 1690214770844,
        relationalElements: {},
        relationalElementRefs: {},
        relationalSeqs: {},
        fields: {
          iconref: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "iconref",
            fieldValue: "../../assets/icons/product_sub_domain.svg",
            value: "../../assets/icons/product_sub_domain.svg",
          },
          lable: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "lable",
            fieldValue: "Batches",
            value: "Batches",
          },
          href: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "href",
            fieldValue: "/bacthes_md",
            value: "/bacthes_md",
          },
          tag: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "tag",
            fieldValue: "lynk-batch",
            value: "lynk-batch",
          },
        },
        relElementRefs: {},
        relElements: {},
        allRelElementRefs: {
          MD: {},
        },
        allRelElements: {
          MD: {},
        },
        dataMap: {
          iconref: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "iconref",
            fieldValue: "../../assets/icons/product_sub_domain.svg",
            value: "../../assets/icons/product_sub_domain.svg",
          },
          lable: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "lable",
            fieldValue: "Batches",
            value: "Batches",
          },
          href: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "href",
            fieldValue: "/bacthes_md",
            value: "/bacthes_md",
          },
          tag: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "tag",
            fieldValue: "lynk-batch",
            value: "lynk-batch",
          },
        },
      },
      {
        name: "students_md",
        id: "edda6623-765d-4163-bd69-7100f511b12b",
        seqId: 8,
        status: "enabled",
        createdDate: 1690214770844,
        updatedDate: 1690214770844,
        relationalElements: {},
        relationalElementRefs: {},
        relationalSeqs: {},
        fields: {
          iconref: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "iconref",
            fieldValue: "../../assets/icons/product_category.svg",
            value: "../../assets/icons/product_category.svg",
          },
          lable: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "lable",
            fieldValue: "Students",
            value: "Students",
          },
          href: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "href",
            fieldValue: "/students_md",
            value: "/students_md",
          },
          tag: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "tag",
            fieldValue: "lynk-student",
            value: "lynk-student",
          },
        },
        relElementRefs: {},
        relElements: {},
        allRelElementRefs: {
          MD: {},
        },
        allRelElements: {
          MD: {},
        },
        dataMap: {
          iconref: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "iconref",
            fieldValue: "../../assets/icons/product_category.svg",
            value: "../../assets/icons/product_category.svg",
          },
          lable: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "lable",
            fieldValue: "Students",
            value: "Students",
          },
          href: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "href",
            fieldValue: "/students_md",
            value: "/students_md",
          },
          tag: {
            eleid: "78e95980-dee2-4882-830b-f3e8b82e67cd",
            seqId: -1,
            name: "tag",
            fieldValue: "lynk-student",
            value: "lynk-student",
          },
        },
      },
    ];
    let navItem = new Item();

    let navItem1 = new Item();
    navItem1.addData("label", new ItemData("label", "PRODUCT DOMAIN"));
    navItem1.addData("href", new ItemData("href", "/product_domain"));
    navItem.addRelElementsOnType("nav", navItem1.id, navItem1);

    let navItem2 = new Item();
    navItem2.addData("label", new ItemData("label", "PRODUCT SUB DOMAIN"));
    navItem2.addData("href", new ItemData("href", "/product_sub_domain"));
    navItem.addRelElementsOnType("nav", navItem2.id, navItem2);

    let navItem3 = new Item();
    navItem3.addData("label", new ItemData("label", "PRODUCT CATEGOEY"));
    navItem3.addData("href", new ItemData("href", "/category"));
    navItem.addRelElementsOnType("nav", navItem3.id, navItem3);

    let navItem4 = new Item();
    navItem4.addData("label", new ItemData("label", "PRODUCT SUB CATEGORY"));
    navItem4.addData("href", new ItemData("href", "/product_sub_category"));
    navItem.addRelElementsOnType("nav", navItem4.id, navItem4);
    let sidenav = new sideNav(navItem);
    //this.shadowRoot.appendChild(sidenav);
    console.log(sidenav);
    let tableItem = new Item();
    tableItem.addData("name", new ItemData("name", "NAME"));
    tableItem.addData("code", new ItemData("code", "CODE"));
    tableItem.addData("action", new ItemData("action", "ACTION"));
    tableItem.addData("color", new ItemData("color", "COLOR"));
    tableItem.addData("image", new ItemData("image", "IMAGE"));
    tableItem.addData("text", new ItemData("text", "TEXT"));

    // let calendar = new StudentCalendar(); // to check the calendar uncomment these two lines
    // this.shadowRoot.appendChild(calendar);

    //adding data to fields of type string
    let product = new Item();
    product.addRelElementsOnType("month", "jan", "January");
    product.addRelElementsOnType("month", "feb", "Febraury");
    product.addRelElementsOnType("month", "march", "March");
    console.log(product);
    let fields = product.getRelElementsOnType("month");

    // fields.forEach((element) => {
    //   console.log(element.getAllRelElements("month"));
    // });
    // product.getAllRelElements("month").forEach((element) => {
    //   console.log(element);
    // });
    // console.log(product.getRelElementsOnType("month"));
    // let add1 = new Item();
    // console.log(add1);

    // let item_new = new Item();
    // item_new.addData("fname", new ItemData("fname", "Sathiya"));
    // item_new.addData("lname", new ItemData("lname", "Priya"));
    // console.log("the first name is", item_new.getData("fname").fieldValue);
    // //console.log()
    // console.log("adding fields to new item", item_new);
    // let fields = item_new.fields;
    // fields.forEach((element) => {
    //     console.log(element.fieldValue);
    // })

    //adding data to rel elements of type string
    let rel_ele = new Item();
    rel_ele.addRelElementsOnType("month", "jan", "Jan");
    rel_ele.addRelElementsOnType("month", "March", "March");
    rel_ele.addRelElementsOnType("month", "April", "April");
    rel_ele.addRelElementsOnType("month", "May", "May");
    rel_ele.addRelElementsOnType("month", "June", "June");
    rel_ele.addRelElementsOnType("month", "July", "July");
    rel_ele.addRelElementsOnType("month", "August", "August");
    rel_ele.addRelElementsOnType("month", "September", "September");
    rel_ele.addRelElementsOnType("month", "October", "October");
    rel_ele.addRelElementsOnType("month", "November", "November");
    rel_ele.addRelElementsOnType("month", "December", "December");
    console.log(rel_ele);
    let relele = rel_ele.getRelElementsOnType("month");
    relele.forEach((element) => {
      console.log(element);
    });

    //adding data to rel elements of type rel element item
    let newItem = new Item();
    newItem.addRelElementsOnType("months", "month_names", rel_ele);
    console.log("newly added rel element item: ", newItem);

    let reassign = newItem.getRelElementsOnType("months");
    reassign.forEach((element) => {
      console.log(element);
      let prop = element.getRelElementsOnType("month");
      prop.forEach((ele) => {
        console.log(ele);
      });
    });

    //console.log("adding rel elements ",rel_ele);
    //console.log(rel_ele.getRelElementOnType("month","jan"));
    //let select = new selectTag(data);
    // let select = new selectTag(data);
    // this.shadowRoot.appendChild(select);
    // let table = new displayTable(tableItem);
    // this.shadowRoot.appendChild(table);

    // inserting the data using fields
    // let fields = new Item();
    // fields.addData("shirt", new ItemData("Tshirt", "Printed Tshirt"));
    // fields.addData("pant", new ItemData("Jeans", "Jeans Pant"));
    // let singleItem = fields.fields;
    // singleItem.forEach(element => {
    //   console.log("single item from fields using foreach method",element.fieldValue);
    // });

    // let item1 = new Item();
    // item1.addData("shoes", new ItemData("puma", "Shoes"));
    // item1.addData("socks", new ItemData("puma", "Socks"));

    // let item2 = new Item();
    // item2.addData("top", new ItemData("kurti", "Anarkali"));
    // item2.addData("bottom", new ItemData("pant", "leggings"));

    // let product = new Item();
    // product.addData("product1", new ItemData("dress", item1));
    // product.addData("product2", new ItemData("accessories", item2));

    // console.log(product);
    // let singleItem1 = item1.fields;
    // console.log(singleItem1.get("shoes").fieldValue);
    // let singleItem2 = product.fields;
    // // console.log(singleItem2.get("top").fieldValue);
    // // console.log(singleItem2.get("bottom").name);

    // singleItem2.forEach((element) => {
    //   let ele = element.fieldValue;
    //   console.log("the field value of start", ele);
    //   ele.fields.forEach((item) =>{
    //     console.log(item.fieldValue);
    //   })
    //   //console.log(ele.get("top").fieldValue);
    //   // let prop = ele.fields;
    //   // console.log("the field values of second step", prop);
    //   // let fieldValue = prop.value;
    //   // console.log(fieldValue);
    //   // let fieldValue = prop.fields;
    //   // console.log("the field value :", fieldValue.fieldValue);
    // })

    //inserting data using fields of type string
    let shirt1 = new Item();
    shirt1.addData("size", new ItemData("size", "S"));
    shirt1.addData("color", new ItemData("color", "white"));
    shirt1.addData("price", new ItemData("price", 299));
    console.log(shirt1);
    let shirt2 = new Item();
    shirt2.addData("size", new ItemData("size", "S"));
    shirt2.addData("color", new ItemData("color", "white"));
    shirt2.addData("price", new ItemData("price", 299));
    console.log(shirt2);
    let shirt3 = new Item();
    shirt3.addData("size", new ItemData("size", "S"));
    shirt3.addData("color", new ItemData("color", "white"));
    shirt3.addData("price", new ItemData("price", 299));
    console.log(shirt3);
    let shirt4 = new Item();
    shirt4.addData("size", new ItemData("size", "S"));
    shirt4.addData("color", new ItemData("color", "white"));
    shirt4.addData("price", new ItemData("price", 299));
    console.log(shirt4);

    //adding data to fields of type item field
    let addProduct = new Item();
    addProduct.addData("shirt1", new ItemData("shirt1", shirt1));
    addProduct.addData("shirt2", new ItemData("shirt2", shirt2));
    addProduct.addData("shirt3", new ItemData("shirt3", shirt3));
    addProduct.addData("shirt4", new ItemData("shirt4", shirt4));
    console.log(addProduct);
    let field = addProduct.fields;
    console.log(field);
    field.forEach((ele) => {
      let element = ele.fieldValue;
      console.log(element);
      let prop = element.fields;
      console.log(prop);
      prop.forEach((ele) => {
        console.log(ele.fieldValue);
      });
    });

    // adding item of type fields to the rel elements item
    let newRelEle = new Item();
    newRelEle.addRelElementsOnType("product", "shirt1", shirt1);
    newRelEle.addRelElementsOnType("product", "shirt2", shirt2);
    newRelEle.addRelElementsOnType("product", "shirt3", shirt3);
    newRelEle.addRelElementsOnType("product", "shirt4", shirt4);

    console.log(newRelEle);

    let accRelEle = newRelEle.getRelElementsOnType("product");
    console.log(accRelEle);
    accRelEle.forEach((ele) => {
      console.log(ele);
      let prop = ele.fields;
      console.log(prop);
      prop.forEach((ele) => {
        console.log(ele.fieldValue);
      });
    });

    // adding item which is of type rel elements to the fields item
    let newField = new Item();
    newField.addData("displaymonth", new ItemData("displaymonth", newItem));
    console.log(newField);

    let accFld = newField.fields;
    accFld.forEach((ele) => {
      console.log(ele);
      let prop = ele.fieldValue;
      console.log(prop);
      let accRelEle = prop.getRelElementsOnType("months");
      console.log(accRelEle);
      accRelEle.forEach((ele) => {
        console.log(ele);
        let prop = ele.getRelElementsOnType("month");
        console.log(prop);
        prop.forEach((ele) => {
          console.log(ele);
        });
      });
    });

    //custom elements for input text

    // let inputItem = new Item();
    // inputItem.addData("element", new ItemData("element", "input"));
    // inputItem.addData("type", new ItemData("type", "text"));
    // inputItem.addData(
    //   "placeholder",
    //   new ItemData("placeholder", "enter your name")
    // );
    // let ele = inputItem.getData("element").fieldValue;
    // let type = inputItem.getData("type").fieldValue;
    // inputItem.addData("label", new ItemData("label", "Name"));
    // if (ele === "input" && type === "text") {
    //   let customEle = document.createElement("input-text");
    //   customEle.initialize(inputItem);
    //   this.shadowRoot.appendChild(customEle);
    // }

    //custom elements for input button

    // let inputItem = new Item();
    // inputItem.addData("element", new ItemData("element", "input"));
    // inputItem.addData("type", new ItemData("type", "button"));
    // inputItem.addData("value", new ItemData("value", "button"));
    // let ele = inputItem.getData("element").fieldValue;
    // let type = inputItem.getData("type").fieldValue;
    // if (ele === "input" && type === "button") {
    //   let customEle = document.createElement("input-button");
    //   customEle.initialize(inputItem);
    //   this.shadowRoot.appendChild(customEle);
    // }

    //custom elements for input checkbox

    // let inputItem = new Item();
    // inputItem.addData("element", new ItemData("element", "input"));
    // inputItem.addData("type", new ItemData("type", "checkbox"));
    // inputItem.addData("checked", new ItemData("checked", true));
    // inputItem.addData("label", new ItemData("label", "checkbox"));
    // inputItem.addData("ele", new ItemData("ele", "input"));
    // inputItem.addData("typ", new ItemData("typ", "submit"));
    // let element = inputItem.getData("ele").fieldValue;
    // let typ = inputItem.getData("typ").fieldValue;
    // let ele = inputItem.getData("element").fieldValue;
    // let type = inputItem.getData("type").fieldValue;
    // if (ele === "input" && type === "checkbox" && element === "input" && typ === "submit") {
    //   let customEle = document.createElement("input-checkbox");
    //   customEle.initialize(inputItem);
    //   this.shadowRoot.appendChild(customEle);
    // }

    //custom elements for input file

    // let inputItem = new Item();
    // inputItem.addData("element", new ItemData("element", "input"));
    // inputItem.addData("type", new ItemData("type", "file"));
    // inputItem.addData("ele", new ItemData("ele", "input"));
    // inputItem.addData("typ", new ItemData("typ", "submit"));
    // let element = inputItem.getData("ele").fieldValue;
    // let typ = inputItem.getData("typ").fieldValue;
    // let ele = inputItem.getData("ele").fieldValue;
    // let type = inputItem.getData("type").fieldValue;
    // if (ele === "input" && type === "file" && element === "input" && typ === "submit") {
    //   let customEle = document.createElement("input-file");
    //   customEle.initialize(inputItem);
    //   this.shadowRoot.appendChild(customEle);
    // }

    //custom elements for input date

    // let inputItem = new Item();
    // inputItem.addData("element", new ItemData("element", "input"));
    // inputItem.addData("type", new ItemData("type", "date"));
    // inputItem.addData("label", new ItemData("label", "Date"));
    // inputItem.addData("ele", new ItemData("ele", "input"));
    // inputItem.addData("typ", new ItemData("typ", "submit"));
    // let element = inputItem.getData("ele").fieldValue;
    // let typ = inputItem.getData("typ").fieldValue;
    // let ele = inputItem.getData("element").fieldValue;
    // let type = inputItem.getData("type").fieldValue;
    // if (ele === "input" && type === "date" && element === "input" && typ === "submit") {
    //   let customEle = document.createElement("input-date");
    //   customEle.initialize(inputItem);
    //   this.shadowRoot.appendChild(customEle);
    // }

    //custom elements for image input

    // let inputItem = new Item();
    // inputItem.addData("element", new ItemData("element", "input"));
    // inputItem.addData("type", new ItemData("type", "image"));
    // inputItem.addData("label", new ItemData("label", "Image"));
    // inputItem.addData("alt", new ItemData("alt", "new image"));
    // // inputItem.addData(
    // //   "src",
    // //   new ItemData("src", "D:sathiyaInternshipKeylynk\1.avif")
    // // );
    // inputItem.addData("value", new ItemData("value", ));

    // let ele = inputItem.getData("element").fieldValue;
    // let type = inputItem.getData("type").fieldValue;
    // if (ele === "input" && type === "image") {
    //   let customEle = document.createElement("input-image");
    //   customEle.initialize(inputItem);
    //   this.shadowRoot.appendChild(customEle);
    // }

    //custom elements for month input

    // let inputItem = new Item();
    // inputItem.addData("element", new ItemData("element", "input"));
    // inputItem.addData("type", new ItemData("type", "month"));
    // inputItem.addData("label", new ItemData("label", "Month"));
    // inputItem.addData("ele", new ItemData("ele", "input"));
    // inputItem.addData("typ", new ItemData("typ", "submit"));
    // let element = inputItem.getData("ele").fieldValue;
    // let typ = inputItem.getData("typ").fieldValue;
    // let ele = inputItem.getData("element").fieldValue;
    // let type = inputItem.getData("type").fieldValue;
    // if (ele === "input" && type === "month" && element === "input" && typ === "submit") {
    //   let customEle = document.createElement("input-month");
    //   customEle.initialize(inputItem);
    //   this.shadowRoot.appendChild(customEle);
    // }

    //custom elements for password

    // let inputItem = new Item();
    // inputItem.addData("element", new ItemData("element", "input"));
    // inputItem.addData("type", new ItemData("type", "password"));
    // inputItem.addData("label", new ItemData("label", "Password"));
    // inputItem.addData("ele", new ItemData("ele", "input"));
    // inputItem.addData("typ", new ItemData("typ", "submit"));
    // let element = inputItem.getData("ele").fieldValue;
    // let typ = inputItem.getData("typ").fieldValue;
    // let ele = inputItem.getData("element").fieldValue;
    // let type = inputItem.getData("type").fieldValue;
    // if (ele === "input" && type === "password" && element === "input" && typ === "submit") {
    //   let customEle = document.createElement("input-password");
    //   customEle.initialize(inputItem);
    //   this.shadowRoot.appendChild(customEle);
    // }

    //custom elements for radio button input

    // let inputItem = new Item();
    // inputItem.addData("element", new ItemData("element", "input"));
    // inputItem.addData("type", new ItemData("type", "radio"));
    // inputItem.addData("label", new ItemData("label", "Radio Button"));
    // inputItem.addData("ele", new ItemData("ele", "input"));
    // inputItem.addData("typ", new ItemData("typ", "submit"));
    // let element = inputItem.getData("ele").fieldValue;
    // let typ = inputItem.getData("typ").fieldValue;
    // let ele = inputItem.getData("element").fieldValue;
    // let type = inputItem.getData("type").fieldValue;
    // if (ele === "input" && type === "radio" && element === "input" && typ === "submit") {
    //   let customEle = document.createElement("input-radio");
    //   customEle.initialize(inputItem);
    //   this.shadowRoot.appendChild(customEle);
    // }

    //custom elements for search input

    // let inputItem = new Item();
    // inputItem.addData("element", new ItemData("element", "input"));
    // inputItem.addData("type", new ItemData("type", "search"));
    // inputItem.addData("label", new ItemData("label", "Search"));
    // inputItem.addData(
    //   "placeholder",
    //   new ItemData("placeholder", "type here to search...")
    // );
    // inputItem.addData("ele", new ItemData("ele", "input"));
    // inputItem.addData("typ", new ItemData("typ", "submit"));
    // let element = inputItem.getData("ele").fieldValue;
    // let typ = inputItem.getData("typ").fieldValue;
    // let ele = inputItem.getData("element").fieldValue;
    // let type = inputItem.getData("type").fieldValue;
    // if (ele === "input" && type === "search" && element === "input" && typ === "submit") {
    //   let customEle = document.createElement("input-search");
    //   customEle.initialize(inputItem);
    //   this.shadowRoot.appendChild(customEle);
    // }

    //custom elements for tel input

    // let inputItem = new Item();
    // inputItem.addData("element", new ItemData("element", "input"));
    // inputItem.addData("type", new ItemData("type", "tel"));
    // inputItem.addData("label", new ItemData("label", "Tel"));
    // inputItem.addData(
    //   "placeholder",
    //   new ItemData("placeholder", "91 12345 67890")
    // );
    // inputItem.addData(
    //   "pattern",
    //   new ItemData("pattern", "[0-9]{2} [0-9]{5} [0-9]{5}")
    // );
    // inputItem.addData("ele", new ItemData("ele", "input"));
    // inputItem.addData("typ", new ItemData("typ", "submit"));
    // let element = inputItem.getData("ele").fieldValue;
    // let typ = inputItem.getData("typ").fieldValue;
    // let ele = inputItem.getData("element").fieldValue;
    // let type = inputItem.getData("type").fieldValue;
    // if (
    //   ele === "input" &&
    //   type === "tel" &&
    //   element === "input" &&
    //   typ === "submit"
    // ) {
    //   let customEle = document.createElement("input-tel");
    //   customEle.initialize(inputItem);
    //   this.shadowRoot.appendChild(customEle);
    // }

    //custom elements for time input

    // let inputItem = new Item();
    // inputItem.addData("element", new ItemData("element", "input"));
    // inputItem.addData("type", new ItemData("type", "time"));
    // inputItem.addData("label", new ItemData("label", "Time"));
    // inputItem.addData("ele", new ItemData("ele", "input"));
    // inputItem.addData("typ", new ItemData("typ", "submit"));
    // let element = inputItem.getData("ele").fieldValue;
    // let typ = inputItem.getData("typ").fieldValue;
    // let ele = inputItem.getData("element").fieldValue;
    // let type = inputItem.getData("type").fieldValue;
    // if (ele === "input" && type === "time" && element === "input" && typ === "submit") {
    //   let customEle = document.createElement("input-time");
    //   customEle.initialize(inputItem);
    //   this.shadowRoot.appendChild(customEle);
    // }

    //custom elemets for url input

    // let inputItem = new Item();
    // inputItem.addData("element", new ItemData("element", "input"));
    // inputItem.addData("type", new ItemData("type", "url"));
    // inputItem.addData("label", new ItemData("label", "URL"));
    // inputItem.addData(
    //   "placeholder",
    //   new ItemData("placeholder", "type the url here...")
    // );
    // inputItem.addData("ele", new ItemData("ele", "input"));
    // inputItem.addData("typ", new ItemData("typ", "submit"));
    // let element = inputItem.getData("ele").fieldValue;
    // let typ = inputItem.getData("typ").fieldValue;
    // let ele = inputItem.getData("element").fieldValue;
    // let type = inputItem.getData("type").fieldValue;
    // if (ele === "input" && type === "url" && element === "input" && typ === "submit") {
    //   let customEle = document.createElement("input-url");
    //   customEle.initialize(inputItem);
    //   this.shadowRoot.appendChild(customEle);
    // }

    //custom elements for week input

    // let inputItem = new Item();
    // inputItem.addData("element", new ItemData("element", "input"));
    // inputItem.addData("type", new ItemData("type", "week"));
    // inputItem.addData("label", new ItemData("label", "Week"));
    // inputItem.addData("ele", new ItemData("ele", "input"));
    // inputItem.addData("typ", new ItemData("typ", "submit"));
    // let element = inputItem.getData("ele").fieldValue;
    // let typ = inputItem.getData("typ").fieldValue;
    // let ele = inputItem.getData("element").fieldValue;
    // let type = inputItem.getData("type").fieldValue;
    // if (ele === "input" && type === "week" && element === "input" && typ === "submit") {
    //   let customEle = document.createElement("input-week");
    //   customEle.initialize(inputItem);
    //   this.shadowRoot.appendChild(customEle);
    // }

    // let select_Tag = new SelectTag(data);
    // this.shadowRoot.appendChild(select_Tag);

    let buttonInput = new Item();
    buttonInput.addData("element", new ItemData("element", "Button"));
    buttonInput.addData("value", new ItemData("value", "text"));
    buttonInput.addData("type", new ItemData("type", "submit"));
    buttonInput.addData("input", new ItemData("input", "input"));
    buttonInput.addData("typ", new ItemData("typ", "reset"));
    buttonInput.addData("disabled", new ItemData("disabled", false));
    buttonInput.addData("placeholder", new ItemData("placeholder", "enter your name..."));
    let element = buttonInput.getData("element").fieldValue;
    let btnType = buttonInput.getData("type").fieldValue;
    let input = buttonInput.getData("input").fieldValue;
    let reset = buttonInput.getData("typ").fieldValue;
    let placeholder = buttonInput.getData("placeholder").fieldValue;
    buttonInput.addData("custom-style", new ItemData("custom-style", eleStyles));

    if(element === "Button" && btnType === "submit"){
      let btnEle = document.createElement("button-submit");
      btnEle.data(buttonInput);
      
      //let btn = new ButtonElment(buttonInput);
      this.shadowRoot.appendChild(btnEle);
      //this.shadowRoot.appendChild(btn);
      //btn.ButtonElment(buttonInput);
    }
    let slotElement = new SlotElement();
    this.shadowRoot.appendChild(slotElement);
  }
}
customElements.define("element-test", ElementTest);
