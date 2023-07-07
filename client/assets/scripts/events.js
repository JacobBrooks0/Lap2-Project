const showEvents = async () => {
  //fetch events from dtb
  const resp = await fetch(`https://florinate-api.onrender.com/events`);
  if (!resp.ok) {
    console.log(Error.detail);
  }
  const events = await resp.json();

  const options = {
    method: "GET",
    headers: {
      authorization: localStorage.getItem("token"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const resp2 = await fetch(
    `https://florinate-api.onrender.com/events/bookmarked`,
    options
  );
  const bookmarkedEvents = resp2.ok ? await resp2.json() : false;

  events.forEach((event) => {
    const { name, main_image_url, info, start_date, end_date } = event;

    const row = document.createElement("tr");
    const eventImageColumn = document.createElement("td");
    const eventButtonColumn = document.createElement("td");
    const eventName = document.createElement("td");
    const eventInfo = document.createElement("td");
    const eventImage = document.createElement("img");
    const eventDate = document.createElement("td");
    const bookmarkButton = document.createElement("button");

    const checkIfBookmarked = () => {
      if (bookmarkedEvents) {
        const bookmarked = bookmarkedEvents.find((bookmarkedEvent) => {
          return bookmarkedEvent.event_id == event.event_id;
        });
        return bookmarked;
      } else {
        return false;
      }
    };

    if (checkIfBookmarked()) {
      bookmarkButton.textContent = "Un-bookmark";
      row.style.backgroundColor = "lightgrey";
      bookmarkButton.addEventListener("click", () => {
        deleteBookmark(event);
      });
    } else {
      bookmarkButton.textContent = "Bookmark";
      bookmarkButton.addEventListener("click", () => {
        bookmarkEvent(event);
      });
    }

    eventImage.src = main_image_url;
    eventName.textContent = name;
    eventInfo.innerHTML = `${info ? info : ""}`;
    eventDate.innerHTML = `${new Date(start_date * 1000).toLocaleString(
      "en-GB",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    )}<br> to ${new Date(end_date * 1000).toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`;

    eventsTable.appendChild(row);
    eventImageColumn.appendChild(eventImage);
    row.appendChild(eventImageColumn);
    row.appendChild(eventName);
    row.appendChild(eventInfo);
    row.appendChild(eventDate);
    eventButtonColumn.appendChild(bookmarkButton);

    row.appendChild(eventButtonColumn);
  });
};

const bookmarkEvent = async (event) => {
  //grey out bookmarked events - delete bookmark
  try {
    const options = {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const resp = await fetch(
      `https://florinate-api.onrender.com/events/${event.event_id}/bookmark`,
      options
    );
    const data = await resp.json();

    if (resp.status == 201) {
      popup.firstChild.remove();
      const popupText = document.createElement("p");
      popup.appendChild(popupText);
      popupText.classList.add("popupText");

      popupText.innerHTML = `You have bookmarked the ${event.name} event!`;
      popupText.classList.toggle("show");
      setTimeout(() => window.location.reload(), 5000);
    } else {
      alert(data.Error);
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteBookmark = async (event) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const resp = await fetch(
      `https://florinate-api.onrender.com/events/${event.event_id}/bookmark`,
      options
    );

    if (resp.status == 204) {
      const popupText = document.createElement("p");
      popup.appendChild(popupText);
      popupText.classList.add("popupText");
      popupText.innerHTML = `You have un-bookmarked the ${event.name} event.`;
      popupText.classList.toggle("show");

      setTimeout(() => window.location.reload(), 5000);
    } else {
      const data = await resp.json();
      console.log(data.Error);
    }
  } catch (err) {
    console.log(err);
  }
};

const createEvent = () => {
  window.open("./createEvent.html", "_self");
};

const eventsTable = document.querySelector("#community-events");

const createButton = document.querySelector("#create");
createButton.addEventListener("click", () => {
  createEvent();
});

const popup = document.querySelector(".popup");

showEvents();
