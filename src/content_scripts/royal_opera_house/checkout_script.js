const checkoutBtnSelectPath = "#checkout";

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
