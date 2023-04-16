const checkoutBtnSelectPath =
  "#multi-shop-cart-list > div:nth-child(1) > div > div.wt-grid.wt-position-relative.wt-pl-xs-0.wt-pr-xs-0 > div > div > div > form > div:nth-child(5) > div.wt-pb-xs-2 > button";

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

const inputDataInField = (field, data) => {
  var inputEvent = new Event("input", {
    bubbles: true,
    cancelable: true,
  });
  field.dispatchEvent(inputEvent);
  field.value = data;
  field.dispatchEvent(inputEvent);
};

window.addEventListener("load", () => {
  console.log("Page load");
  waitForElement(checkoutBtnSelectPath, 5000).then((checkoutBtn) => {
    if (
      window.confirm(
        "Fill Form Extension detected checkout button! Do you want to fill in automatically?"
      )
    ) {
      checkoutBtn.click();
    }
  });
});
