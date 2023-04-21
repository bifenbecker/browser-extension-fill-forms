const checkoutBtnXPath =
  "/html/body/main/div/div[2]/div[4]/div[1]/div[1]/div/div[1]/div/div/div/form/div[2]/div[1]/button";

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
  console.log("Page load");
  const checkoutBtn = getElementByXpath(checkoutBtnXPath);
  if (
    window.confirm(
      "Fill Form Extension detected checkout button! Do you want to fill in automatically?"
    )
  ) {
    checkoutBtn.click();
  }
});
