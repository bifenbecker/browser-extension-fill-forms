const firstNameInputSelectPath =
  "#regform > div > div:nth-child(3) > div.mobile-span12.span6.alpha.mobile-omega > div.mobile-span9.span12.alpha.omega > input";
const lastNameInputSelectPath =
  "#regform > div > div:nth-child(3) > div.mobile-span12.span6.mobile-alpha.omega > div.mobile-span9.span12.mobile-alpha.omega > input";
const emailInputSelectPath = "#registerEmail";
const confirmEmailInputSelectPath = "#confirmEmail";

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

  waitForElement(emailInputSelectPath, 5000).then((emailInput) => {
    chrome.storage.sync.get(["access_token"]).then((result) => {
      const { access_token } = result;
      fetch("http://127.0.0.1:8000/api/v1/customer/settings/", {
        headers: {
          Authorization: `JWT ${access_token}`,
        },
      })
        .then(async (response) => {
          const data = await response.json();
          const { email_address, first_name, last_name } = data;
          const firstNameInput = document.querySelector(
            firstNameInputSelectPath
          );
          const lastNameInput = document.querySelector(lastNameInputSelectPath);
          const confirmEmailInput = document.querySelector(
            confirmEmailInputSelectPath
          );
          inputDataInField(emailInput, email_address);
          inputDataInField(confirmEmailInput, email_address);
          inputDataInField(lastNameInput, last_name);
          inputDataInField(firstNameInput, first_name);
        })
        .catch((error) => console.error(error));
    });
  });
});
