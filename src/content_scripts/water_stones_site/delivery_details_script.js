const editAddressManuallySelectPath = "#lnkDeliveryAddressManual";
const address1SelectPath = "#txtAddress1Delivery";
const address2SelectPath = "#txtAddress2Delivery";
const citySelectPath = "#txtCityDelivery";
const countrySelectPath = "#txtCountyDelivery";
const postCodeSelectPath = "#txtPostCodeDeliveryManual";
const nextPaymentSelectPath =
  "body > div.row.chk-surround.large-min-height > div.small-24.chk-left.medium-24.large-18.columns.main-container > div.panel-content-delivery.display-none.small-24.medium-24.large-24.columns.small-border.medium-border.large-border.small-margin-top-24.medium-margin-top-24.large-margin-top-24 > div:nth-child(11) > div > div.btnCheckOutTablet.small-24.medium-7.large-7.columns.small-padding-right-18.medium-padding-right-18.large-padding-right-18.small-padding-left-18.medium-padding-left-18.large-padding-left-18.small-margin-top-12.medium-margin-top-6.float-right > input";

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
  waitForElement(editAddressManuallySelectPath, 10000).then(
    (editAddressManually) => {
      editAddressManually.click();
      waitForElement(address1SelectPath, 5000).then((address1Input) => {
        chrome.storage.sync.get(["access_token"]).then((result) => {
          const { access_token } = result;
          fetch("http://127.0.0.1:8000/api/v1/customer/settings/", {
            headers: {
              Authorization: `JWT ${access_token}`,
            },
          })
            .then(async (response) => {
              const data = await response.json();
              const { addresses } = data;
              const mainAddress = addresses[0] || {};
              const {
                country,
                city,
                street,
                house_number,
                flat_number,
                postal_code,
              } = mainAddress;
              const address2Input = document.querySelector(address2SelectPath);
              const cityInput = document.querySelector(citySelectPath);
              const countryInput = document.querySelector(countrySelectPath);
              const postalCodeInput =
                document.querySelector(postCodeSelectPath);

              const nextBtn = document.querySelector(nextPaymentSelectPath);
              inputDataInField(address1Input, street);
              inputDataInField(
                address2Input,
                `${house_number || ""} ${flat_number || ""}`
              );
              inputDataInField(cityInput, city);
              inputDataInField(countryInput, country);
              inputDataInField(postalCodeInput, postal_code);
              nextBtn.click();
            })
            .catch((error) => console.error(error));
        });
      });
    }
  );
});
