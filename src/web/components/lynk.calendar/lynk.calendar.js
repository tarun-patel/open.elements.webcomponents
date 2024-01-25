import html from "./lynk.calendar.html";
import styles from "./lynk.calendar.styles.scss";

export class StudentCalendar extends HTMLElement {
  metaDataItem;
  clicked = null;
  addingAnEvent;
  counter;
  calendar;
  deletingAnEvent;
  backDrop;
  eventTitleInput;
  weekdays;
  events;
  constructor(item) {
    super();
    this.attachShadow({ mode: "open" });
    this.metaDataItem = item;
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = `<style>${styles}</style> ${html} `;
    this.counter = 0; // to keep track of month displayed in the header

    this.events = localStorage.getItem("events")
      ? JSON.parse(localStorage.getItem("events"))
      : [];

    this.calendar = this.shadowRoot.getElementById("calendar");
    this.addingAnEvent = this.shadowRoot.getElementById("addingAnEvent");
    this.deletingAnEvent = this.shadowRoot.getElementById("deletingAnEvent");
    this.backDrop = this.shadowRoot.getElementById("modalBackDrop");
    this.eventTitleInput = this.shadowRoot.getElementById("eventTitleInput");
    //console.log(this.eventTitleInput);
    console.log(this.calendar);
    this.weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    this.headerButtons();
    this.load();
  }
  openModal(date) {
    this.clicked = date;

    const eventForDay = this.events.find((e) => e.date === this.clicked); // when we click on the date in the month it will display the addevent container

    if (eventForDay) {
      this.shadowRoot.getElementById("eventText").innerText = eventForDay.title; // storing the event in the delete event
      this.deletingAnEvent.style.display = "block";
      console.log(eventForDay.value, eventForDay.title);
    } else {
      this.addingAnEvent.style.display = "block";
    }

    this.backDrop.style.display = "block";
  }

  load() {
    const dt = new Date();

    if (this.counter !== 0) {
      dt.setMonth(new Date().getMonth() + this.counter); //setting the month which is displayed in the header
    }

    const day = dt.getDate(); //getting the date
    const month = dt.getMonth(); // getting the month
    const year = dt.getFullYear(); // getting the year

    const firstDayOfMonth = new Date(year, month, 1); // setting the firstday in a month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // counting the number of days in current month

    const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    // console.log(dateString);
    // console.log(firstDayOfMonth);
    // console.log(daysInMonth);
    const paddingDays = this.weekdays.indexOf(dateString.split(",")[0]); // setting the previuos month date and next month date that will display in the current month
    // console.log(paddingDays);
    this.shadowRoot.getElementById(
      "monthDisplay"
    ).innerText = `${dt.toLocaleDateString("en-us", {
      month: "long",
    })} ${year}`; // storing the month and the year in the header

    this.calendar.innerHTML = "";

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const daySquare = document.createElement("div"); // creating the div for storing the dates for current month
      daySquare.classList.add("day");

      const dayString = `${month + 1}/${i - paddingDays}/${year}`;// setting the dates for current month
      //console.log(dayString);

      if (i > paddingDays) {
        daySquare.innerText = i - paddingDays;
        const eventForDay = this.events.find((e) => e.date === dayString);

        if (i - paddingDays === day && this.counter === 0) {
          daySquare.id = "currentDay";
        }

        if (eventForDay) {
          const eventDiv = document.createElement("div");
          eventDiv.classList.add("event");
          eventDiv.innerText = eventForDay.title;
          daySquare.appendChild(eventDiv);
          //console.log(daySquare);
          // let displayTask = this.shadowRoot.querySelector(".displaytask");
          // displayTask.append(eventForDay.title);

        }

        daySquare.addEventListener("click", () => this.openModal(dayString));
      } else {
        daySquare.classList.add("padding");
      }

      this.calendar.appendChild(daySquare);
    }
  }
  closeModal = () => {
    //console.log(this.eventTitleInput);
    this.eventTitleInput.classList.remove("error");
    this.addingAnEvent.style.display = "none";
    this.deletingAnEvent.style.display = "none";
    this.backDrop.style.display = "none";
    this.eventTitleInput.value = "";
    this.clicked = null;
    this.load();
  };
  saveEvent = () => {
    // console.log(this.eventTitleInput);
    // console.log(this.eventTitleInput.value);

    if (this.eventTitleInput.value) {
      this.eventTitleInput.classList.remove("error");
      // if (this.eventTitleInput.title === "none") {
      //   alert("enter any event");
      // }
      //this.eventTitleInput.console.error(alert("enter an event"));

      this.events.push({
        date: this.clicked,
        title: this.eventTitleInput.value, // adding the event to the month
      });

      //let li = this.shadowRoot.createElement('li');
      //li.appendChild(eventTitleInput.value);
      
      localStorage.setItem("events", JSON.stringify(this.events));
      this.closeModal();
      //console.log(this.closeModal);

      //console.log(eventTitleInput.value);
    } else {
      this.eventTitleInput.classList.add("error");
    }
  };
  deleteEvent = () => {
    this.events = this.events.filter((e) => e.date !== this.clicked);
    localStorage.setItem("events", JSON.stringify(this.events)); // if the same event added day is clicked that should open the delete event model
    console.log(this.events);
    this.closeModal();
  };
  headerButtons() {
    this.shadowRoot
      .getElementById("nextButton")
      .addEventListener("click", () => {
        this.counter++; // next button to display the next month
        this.load();
      });

    this.shadowRoot
      .getElementById("backButton")
      .addEventListener("click", () => {
        this.counter--; // back button to display previous month
        this.load();
      });

    this.shadowRoot
      .getElementById("saveButton")
      .addEventListener("click", this.saveEvent);
    this.shadowRoot
      .getElementById("cancelButton")
      .addEventListener("click", this.closeModal);
    this.shadowRoot
      .getElementById("deleteButton")
      .addEventListener("click", this.deleteEvent);
    this.shadowRoot
      .getElementById("closeButton")
      .addEventListener("click", this.closeModal);
  }
}
customElements.define("student-calendar", StudentCalendar);
