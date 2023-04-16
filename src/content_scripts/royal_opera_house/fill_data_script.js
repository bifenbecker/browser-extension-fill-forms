const firstNameInputSelectPath = "#TextField1";
const emailMeCheckboxSelectPath = "#marketing_opt_in";
const lastNameInputSelectPath = "#TextField2";
const addressInputSelectPath = "#TextField9";
const apartmentInputSelectPath = "#TextField5";
const postalCodeInputSelectPath = "#TextField10";
const cityInputSelectPath = "#TextField11";
const phoneInputSelectPath = "#TextField8";
const continueToShippingBtnSelectPath =
  "#Form1 > div:nth-child(1) > div > div.VheJw > div.oQEAZ.WD4IV > div:nth-child(1) > button";

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
  chrome.storage.sync.get(["access_token"]).then((result) => {
    const { access_token } = result;
    fetch("http://127.0.0.1:8000/api/v1/customer/settings/", {
      headers: {
        Authorization: `JWT ${access_token}`,
      },
    })
      .then(async (response) => {
        const data = await response.json();
        const {
          first_name,
          last_name,
          email_address,
          mobile_number,
          addresses,
          payment_cards,
          isAgreeSendMessagesOnEmail,
        } = data;
        const mainAddress = addresses[0];
        const { city, house_number, postal_code, street, flat_number } =
          mainAddress;
        waitForElement(firstNameInputSelectPath, 5000).then(
          (firstNameInput) => {
            const emailMeCheckbox = document.querySelector(
              emailMeCheckboxSelectPath
            );
            emailMeCheckbox.checked = isAgreeSendMessagesOnEmail;
            const lastNameInput = document.querySelector(
              lastNameInputSelectPath
            );
            const addressInput = document.querySelector(addressInputSelectPath);
            const apartmentInput = document.querySelector(
              apartmentInputSelectPath
            );
            const postCodeInput = document.querySelector(
              postalCodeInputSelectPath
            );
            const cityInput = document.querySelector(cityInputSelectPath);
            const phoneInput = document.querySelector(phoneInputSelectPath);
            inputDataInField(firstNameInput, first_name);
            inputDataInField(lastNameInput, last_name);
            inputDataInField(
              addressInput,
              `${street || ""} ${house_number || ""}`
            );
            inputDataInField(apartmentInput, flat_number || "");
            inputDataInField(postCodeInput, postal_code);
            inputDataInField(cityInput, city);
            inputDataInField(phoneInput, mobile_number);

            const continueToShippingBtn = document.querySelector(
              continueToShippingBtnSelectPath
            );
            continueToShippingBtn.click();
          }
        );
      })
      .catch((error) => console.error(error));
  });
});
