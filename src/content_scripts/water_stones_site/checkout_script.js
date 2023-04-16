const nextBtnSelectPath =
  "body > div.row.chk-surround.large-min-height > div.small-24.chk-left.medium-24.large-18.columns.main-container > div.panel-basket.panel-content-basket > div > div.panel-mobile-call-to-action.panel-mobile-call-to-action.small-padding-top-16.medium-padding-top-16.large-padding-top-16.small-padding-bottom-16.medium-padding-bottom-16.large-padding-bottom-16.highlight-box.small-border-top.medium-border-top.large-border-top.full-width.float-left > div.btnCheckOutTablet.small-24.medium-7.large-7.columns.small-padding-right-18.small-padding-left-18.medium-padding-right-18.large-padding-right-18.medium-padding-left-18.large-padding-left-18.small-margin-top-12.medium-margin-top-6.float-right > input";

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

window.addEventListener("load", () => {
  console.log("Page load");
  waitForElement(nextBtnSelectPath, 10000).then((nextBtn) => {
    if (
      window.confirm(
        "Fill Form Extension detected checkout button! Do you want to fill in automatically?"
      )
    ) {
      nextBtn.click();
    }
  });
});
