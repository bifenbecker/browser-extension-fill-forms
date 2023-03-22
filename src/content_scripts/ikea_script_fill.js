const postCodeInputSelectPath = "#zipInInput";
const calculateCostBtnSelectPath =
  "#one-checkout > div.sc-dvEHMn.ekCwxE > div > div.sc-jSUZER.sc-jrcTuL.btAxHf.hlENrP > form > button";
const chooseDeliveryOptionBtnSelectPath = "#HOME_DELIVERY > button";
const continueBtnSelectPath =
  "#one-checkout > div.sc-dvEHMn.ekCwxE > div > div.sc-jSUZER.sc-jrcTuL.btAxHf.hlENrP > button";
const editPostCodeBtnSelectPath =
  "#one-checkout > div.sc-dvEHMn.ekCwxE > div > div.sc-jSUZER.sc-jrcTuL.btAxHf.hlENrP > div.sc-hmTbGb.fPnYFC > strong > a";
const firstNameInputSelectPath = "#REGULAR-shipping-firstName";

const isVisibleElement = (element) =>
  element ? element.offsetParent !== null : false;

/**
 * Wait for an element before resolving a promise
 * @param {String} querySelector - Selector of element to wait for
 * @param {Integer} timeout - Milliseconds to wait before timing out, or 0 for no timeout
 */
function waitForElement(querySelector, timeout) {
  return new Promise((resolve, reject) => {
    var timer = false;
    let element = document.querySelector(querySelector);
    if (element && isVisibleElement(element)) return resolve(element);
    const observer = new MutationObserver(() => {
      element = document.querySelector(querySelector);
      console.log(isVisibleElement(element));
      if (element && isVisibleElement(element)) {
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

function waitForElementWithInfo(querySelector, timeout) {
  return new Promise((resolve, reject) => {
    waitForElement(querySelector, timeout)
      .then((element) => {
        console.log("find!");
        console.log(element);
        resolve(element);
      })
      .catch((error) => reject(error));
  });
}

const requestCustomersSettings = () => {
  return new Promise((resolve, reject) => {
    StorageService.getValue("access_token").then((token) => console.log(token));
    fetch("http://127.0.0.1:8000/api/v1/customer/settings/").then(
      async (response) => {
        const data = await response.json();
        console.log(data);
      }
    );
  });
};

const chooseDeliveryOptionAndContinue = () => {
  waitForElementWithInfo(chooseDeliveryOptionBtnSelectPath, 20000).then(
    (chooseDeliveryOptionBtn) => {
      chooseDeliveryOptionBtn.click();
      waitForElementWithInfo(continueBtnSelectPath, 20000).then(
        (continueBtn) => {
          continueBtn.click();
          waitForElementWithInfo(firstNameInputSelectPath, 10000).then(
            (firstNameInput) => {
              firstNameInput.select();
              var inputEvent = new Event("input", {
                bubbles: true,
                cancelable: true,
              });
              firstNameInput.dispatchEvent(inputEvent);
              firstNameInput.value = "Name";
              firstNameInput.dispatchEvent(inputEvent);
              // requestCustomersSettings();
            }
          );
        }
      );
    }
  );
};

window.addEventListener("load", () => {
  console.log("Page load");

  waitForElementWithInfo(postCodeInputSelectPath, 10000)
    .then((postCodeInput) => {
      postCodeInput.select();
      var inputEvent = new Event("input", {
        bubbles: true,
        cancelable: true,
      });
      postCodeInput.dispatchEvent(inputEvent);
      postCodeInput.value = "PE2 9ET";
      postCodeInput.dispatchEvent(inputEvent);
      waitForElementWithInfo(calculateCostBtnSelectPath, 1000).then(
        (calculateCostBtn) => {
          calculateCostBtn.click();
          chooseDeliveryOptionAndContinue();
        }
      );
    })
    .catch((error) => {
      waitForElementWithInfo(editPostCodeBtnSelectPath, 2000).then(() => {
        chooseDeliveryOptionAndContinue();
      });
    });
});
