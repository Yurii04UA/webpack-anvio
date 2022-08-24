// show city and lang menu
export const closeAllDetails = () => {
  document.querySelectorAll("details[open]").forEach((el) => {
    el.open = false;
  });
};

//close all modal windows
export const closeAll = (
  arrayModals,
  arrayMenu,
  menuButtons,
  body,
  showContryOrLang
) => {
  arrayModals.forEach((modal) => {
    modal.classList.remove("show-modal");
  });
  arrayMenu.forEach((modal) => {
    modal.classList.remove("show-modal");
  });
  menuButtons.forEach((button) => {
    button.classList.remove("mobile-menu-active");
  });
  body.classList.remove("oh");
  showContryOrLang.forEach((e) => e.classList.remove("show-content"));
  closeAllDetails();
};
console.log("test2");
