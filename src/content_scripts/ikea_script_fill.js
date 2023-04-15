const postCodeInputSelectPath = "#zipInInput";
const calculateCostBtnSelectPath =
  "#one-checkout > div.sc-dvEHMn.ekCwxE > div > div.sc-jSUZER.sc-jrcTuL.btAxHf.hlENrP > form > button";
const chooseDeliveryOptionBtnSelectPath = "#HOME_DELIVERY > button";
const continueBtnSelectPath =
  "#one-checkout > div.sc-dvEHMn.ekCwxE > div > div.sc-jSUZER.sc-jrcTuL.btAxHf.hlENrP > button";
const textContinueBtnSelectPath =
  "#one-checkout > div.sc-dvEHMn.ekCwxE > div > div.sc-jSUZER.sc-jrcTuL.btAxHf.hlENrP > button > span > span";
const editPostCodeBtnSelectPath =
  "#one-checkout > div.sc-dvEHMn.ekCwxE > div > div.sc-jSUZER.sc-jrcTuL.btAxHf.hlENrP > div.sc-leZLoi.eoCkWN > strong";
const firstNameInputSelectPath = "#REGULAR-shipping-firstName";
const lastNameInputSelectPath = "#REGULAR-shipping-lastName";
const emailInputSelectPath = "#REGULAR-shipping-email";
const mobileInputSelectPath = "#REGULAR-shipping-mobileNumber";
const houseNumberAndStreetSelectPath = "#REGULAR-shipping-addressLine1";
const cityInputSelectPath = "#REGULAR-shipping-city";
const continueBtnAddressSelectPath =
  "#one-checkout > div.sc-dvEHMn.ekCwxE > div > div.sc-jSUZER.sc-jrcTuL.btAxHh.hlENrP > form > div.sc-fuRDZQ.iTeAkm > button";

const formPaymentDataSelectPath = "#card_447126223737 > form";
const cardNumberSelectPath = "body > form > input.IFRAME_STYLE_1";
const cardNumberIframeSelectPath =
  "#card_14692394738 > form > div.wpwl-group.wpwl-group-cardNumber.wpwl-clearfix > div.wpwl-wrapper.wpwl-wrapper-cardNumber > iframe";
const expireDateSelectPath =
  "#card_1088183497391 > form > div.wpwl-group.wpwl-group-expiry.wpwl-clearfix > div.wpwl-wrapper.wpwl-wrapper-expiry > input";

const isVisibleElement = (element) =>
  element ? element.offsetParent !== null : false;

const isClickableElement = (element) =>
  element &&
  (element.getAttribute("onclick") != null ||
    element.getAttribute("href") != null);

function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

/**
 * Wait for an element before resolving a promise
 * @param {String} querySelector - Selector of element to wait for
 * @param {Integer} timeout - Milliseconds to wait before timing out, or 0 for no timeout
 */
function waitForElement(querySelector, timeout, validator = null) {
  return new Promise((resolve, reject) => {
    var timer = false;
    var isValid = true;

    const validate = () => {
      if (validator && validator instanceof Function) {
        isValid = validator();
      }
    };

    let element = document.querySelector(querySelector);
    if (element && isVisibleElement(element)) {
      validate();
      return isValid && resolve(element);
    }
    const observer = new MutationObserver(() => {
      element = document.querySelector(querySelector);
      if (element && isVisibleElement(element)) {
        validate();
        if (isValid) {
          observer.disconnect();
          if (timer !== false) clearTimeout(timer);
          return resolve(element);
        }
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    if (timeout)
      timer = setTimeout(() => {
        observer.disconnect();
        reject(`Not found such element - ${querySelector}`);
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
    chrome.storage.sync.get(["access_token"]).then((result) => {
      const { access_token } = result;
      fetch("http://127.0.0.1:8000/api/v1/customer/settings/", {
        headers: {
          Authorization: `JWT ${access_token}`,
        },
      })
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  });
};

const inputDataInField = (field, data) => {
  var inputEvent = new Event("input", {
    bubbles: true,
    cancelable: true,
  });
  field.dispatchEvent(inputEvent);
  field.value = data;
  field.dispatchEvent(inputEvent);
};

const inputPaymentData = (payment) => {
  const { card_number, expire_date } = payment;
  console.info("Looking for card number input");
  waitForElementWithInfo(cardNumberIframeSelectPath, 10000)
    .then((cardNumberIframe) => {
      const cardNumberInput =
        cardNumberIframe.contentWindow.document.body.querySelector(
          cardNumberSelectPath
        );
      inputDataInField(cardNumberInput, card_number);
      const expireDateInput = document.querySelector(expireDateSelectPath);
      const expireDate = new Date(expire_date);
      inputDataInField(
        expireDateInput,
        `${expireDate.getMonth()} / ${expireDate.getFullYear()}`
      );
    })
    .catch(() => {
      const cardNumberInput = getElementByXpath("/html/body/form/input[1]");
      console.log("find", cardNumberInput);
      // const cardNumberInput =
      //   cardNumberIframe.contentWindow.document.body.querySelector(
      //     cardNumberSelectPath
      //   );
      inputDataInField(cardNumberInput, card_number);
      const expireDateInput = document.querySelector(expireDateSelectPath);
      const expireDate = new Date(expire_date);
      inputDataInField(
        expireDateInput,
        `${expireDate.getMonth()} / ${expireDate.getFullYear()}`
      );
    });
};

const chooseDeliveryOptionAndContinue = (data) => {
  const {
    addresses,
    payment_cards,
    email_address,
    first_name,
    full_name,
    isAgreeSendMessagesOnEmail,
    last_name,
    mobile_number,
  } = data;
  const mainAddress = addresses[0];
  const mainPayment = payment_cards[0];
  waitForElementWithInfo(chooseDeliveryOptionBtnSelectPath, 20000).then(
    (chooseDeliveryOptionBtn) => {
      chooseDeliveryOptionBtn.click();
      const validatorForContinueBtn = () => {
        const isValidText = waitForElement(textContinueBtnSelectPath, 500)
          .then((spanText) => spanText.innerText === "Continue")
          .catch(() => false);

        const isValidBtn = waitForElement(continueBtnSelectPath, 500)
          .then((btn) => !btn.disabled)
          .catch(() => false);
        return isValidText && isValidBtn;
      };
      waitForElementWithInfo(
        continueBtnSelectPath,
        20000,
        validatorForContinueBtn
      ).then((continueBtn) => {
        setTimeout(() => continueBtn.click(), 5000);
        waitForElementWithInfo(firstNameInputSelectPath, 10000).then(
          (firstNameInput) => {
            firstNameInput.select();
            const lastNameInput = document.querySelector(
              lastNameInputSelectPath
            );
            const emailInput = document.querySelector(emailInputSelectPath);
            const mobileInput = document.querySelector(mobileInputSelectPath);
            const houseNumberAndStreetInput = document.querySelector(
              houseNumberAndStreetSelectPath
            );
            const cityInput = document.querySelector(cityInputSelectPath);
            inputDataInField(firstNameInput, first_name);
            inputDataInField(lastNameInput, last_name);
            inputDataInField(emailInput, email_address);
            inputDataInField(mobileInput, mobile_number);
            const { street, house_number, flat_number, city } = mainAddress;
            inputDataInField(
              houseNumberAndStreetInput,
              `${street || ""} ${house_number || ""} ${flat_number || ""}`
            );
            inputDataInField(cityInput, city);
            waitForElementWithInfo(continueBtnAddressSelectPath, 2000).then(
              (continueBtnAddress) => {
                continueBtnAddress.click();
                inputPaymentData(mainPayment);
              }
            );
          }
        );
      });
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
      requestCustomersSettings().then((data) => {
        const { addresses } = data;
        const mainAddress = addresses[0];
        postCodeInput.value = mainAddress.postal_code;
        postCodeInput.dispatchEvent(inputEvent);
        waitForElementWithInfo(calculateCostBtnSelectPath, 1000).then(
          (calculateCostBtn) => {
            calculateCostBtn.click();
            chooseDeliveryOptionAndContinue(data);
          }
        );
      });
    })
    .catch((error) => {
      waitForElementWithInfo(editPostCodeBtnSelectPath, 5000).then(() => {
        requestCustomersSettings().then((data) =>
          chooseDeliveryOptionAndContinue(data)
        );
      });
    });
});
