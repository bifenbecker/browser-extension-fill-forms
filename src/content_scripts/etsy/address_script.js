const postalCodeInputXPath =
  "/html/body/main/div[1]/div[1]/div/div[2]/div[1]/form/div[2]/div[5]/div[3]/div/div[1]/div/input";
const emailInputXPath = '//*[@id="shipping-form-email-input"]';
const confirmEmailInputXPath = '//*[@id="shipping-form-email-confirmation"]';
const cityInputXPath =
  "/html/body/main/div[1]/div[1]/div/div[2]/div[1]/form/div[2]/div[5]/div[1]/input";
const aptInputXPath =
  "/html/body/main/div[1]/div[1]/div/div[2]/div[1]/form/div[2]/div[4]/div[2]/input";
const streetInputXPath =
  "/html/body/main/div[1]/div[1]/div/div[2]/div[1]/form/div[2]/div[4]/div[1]/input";
const countrySelectPath = "#country_id10-select";
const continueBtnSelectPath =
  "#shipping-address-form > div:nth-child(2) > button";

const fullNameXpath =
  "/html/body/main/div[1]/div[1]/div/div[2]/div[1]/form/div/div[3]/div/input";

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
  field.select();
  var inputEvent = new Event("input", {
    bubbles: true,
    cancelable: true,
  });
  field.dispatchEvent(inputEvent);
  field.value = data;
  field.dispatchEvent(inputEvent);
};

function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

window.addEventListener("load", () => {
  console.log("Page load address");
  waitForElement(countrySelectPath, 10000).then((countriesSelect) => {
    chrome.storage.sync.get(["access_token"]).then((result) => {
      const { access_token } = result;
      fetch("http://127.0.0.1:8000/api/v1/customer/settings/", {
        headers: {
          Authorization: `JWT ${access_token}`,
        },
      })
        .then(async (response) => {
          const data = await response.json();
          const { full_name, addresses, email_address } = data;
          const mainAddress = addresses[0];
          const { country, city, postal_code, street, house_number } =
            mainAddress;

          let isCountrySelected = false;
          for (let index = 0; index < countriesSelect.length; index++) {
            const element = countriesSelect[index];
            if (element.text === country) {
              element.selected = true;
              isCountrySelected = true;
              break;
            }
          }
          const emailInput = getElementByXpath(emailInputXPath);
          const emailConfirmInput = getElementByXpath(confirmEmailInputXPath);
          const postalCodeInput = getElementByXpath(postalCodeInputXPath);
          const cityInput = getElementByXpath(cityInputXPath);
          const fullNameInput = getElementByXpath(fullNameXpath);
          const aptInput = getElementByXpath(aptInputXPath);
          const streetInput = getElementByXpath(streetInputXPath);

          inputDataInField(fullNameInput, full_name);
          inputDataInField(emailInput, email_address);
          inputDataInField(emailConfirmInput, email_address);
          inputDataInField(postalCodeInput, postal_code);
          inputDataInField(cityInput, city);
          inputDataInField(aptInput, house_number);
          inputDataInField(streetInput, street);
          const continueBtn = document.querySelector(continueBtnSelectPath);

          if (!isCountrySelected) {
            window.confirm(
              `Fill Form Extension: No such country in list - ${country}`
            );
          } else {
            continueBtn.click();
          }
        })
        .catch((error) => console.error(error));
    });
  });
});
