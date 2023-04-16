const firstNameInputSelectPath = "#first";
const lastNameInputSelectPath = "#last";
const paymentIframe = "#card-element > div > iframe";
const cardNumberInputSelectPath =
  "#root > form > div > div.CardField-input-wrapper > span.CardField-number.CardField-child > span:nth-child(2) > div > div.CardNumberField-input-wrapper > span > input";

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

  waitForElement(firstNameInputSelectPath, 5000).then((firstNameInput) => {
    chrome.storage.sync.get(["access_token"]).then((result) => {
      const { access_token } = result;
      fetch("http://127.0.0.1:8000/api/v1/customer/settings/", {
        headers: {
          Authorization: `JWT ${access_token}`,
        },
      })
        .then(async (response) => {
          const data = await response.json();
          const { first_name, last_name } = data;

          const lastNameInput = document.querySelector(lastNameInputSelectPath);
          inputDataInField(firstNameInput, first_name);
          inputDataInField(lastNameInput, last_name);
        })
        .catch((error) => console.error(error));
    });
  });
});
