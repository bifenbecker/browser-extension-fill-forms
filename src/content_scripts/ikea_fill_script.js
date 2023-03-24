const checkoutBtnSelectPath =
  "#one-checkout > main > div > div > div > div.shoppingBag_desktop_sidebarGrid__LzQtb > div > div:nth-child(4) > button";
const guestBtnSelectPath =
  "#one-checkout > main > div > div > div > div.cart-ingka-modal-wrapper.cart-ingka-modal-wrapper--open > div:nth-child(4) > div > div.cart-ingka-sheets__content-wrapper > div > div > button.cart-ingka-btn.cart-ingka-btn--primary.cart-ingka-btn--fluid";

/**
 * Wait for an element before resolving a promise
 * @param {String} querySelector - Selector of element to wait for
 * @param {Integer} timeout - Milliseconds to wait before timing out, or 0 for no timeout
 */
function waitForElement(querySelector, timeout) {
  return new Promise((resolve, reject) => {
    var timer = false;
    let element = document.querySelector(querySelector);
    if (element) return resolve(element);
    const observer = new MutationObserver(() => {
      element = document.querySelector(querySelector);
      if (element) {
        observer.disconnect();
        if (timer !== false) clearTimeout(timer);
        return resolve(element);
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    if (timeout)
      timer = setTimeout(() => {
        observer.disconnect();
        reject("Not found such element");
      }, timeout);
  });
}

window.addEventListener("load", (event) => {
  console.log("Page loaded");
  waitForElement(checkoutBtnSelectPath, 10000).then((checkoutBtn) => {
    console.log("find!");
    console.log(checkoutBtn);
    if (
      window.confirm(
        "Checkout button detected! Do you want to fill in automatically?"
      )
    ) {
      checkoutBtn.click();
      waitForElement(guestBtnSelectPath, 5000).then((guestBtn) => {
        console.log("find!");
        console.log(guestBtn);
        guestBtn.click();
      });
    }
  });
});
