
module.exports = {
  // Format the date as MM/DD/YYYY
  formatDate: (date) => {
    const rawDate = new Date(date);
    return rawDate.toLocaleDateString();
  },
  // Toggle the  element visibility
  toggleMessage: (elementName, newContent) => {
    const element = document.getElementById(elementName);
    if (element) {
      const message = element.querySelector(".message");
      if (message) {
        message.innerHTML = newContent ? newContent : "";
      }
      element.classList.remove("hidden");
      element.classList.add("display-flex");
    }
  },
  // Scroll to the top of the page
  scrollToTop: () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  },
};
