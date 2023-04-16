const cardNumberSelectPath = "#number";

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

window.addEventListener("load", (event) => {
  console.log("Page loaded");
  waitForElement(cardNumberSelectPath, 5000).then((cardNumberInput) => {
    console.log(cardNumberInput);
    // chrome.storage.sync.get(["access_token"]).then((result) => {
    //   const { access_token } = result;
    //   fetch("http://127.0.0.1:8000/api/v1/customer/settings/", {
    //     headers: {
    //       Authorization: `JWT ${access_token}`,
    //     },
    //   })
    //     .then(async (response) => {
    //       const data = await response.json();
    //       const { payment_cards } = data;
    //       const mainPayment = payment_cards[0];
    //       const { card_number } = mainPayment;
    //       inputDataInField(cardNumberInput, card_number);
    //     })
    //     .catch((error) => console.error(error));
    // });
  });
});
