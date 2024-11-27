export default defineBackground(() => {
  let popupWindowId: number | undefined;

  chrome.action.onClicked.addListener(() => {
    if (popupWindowId === undefined) {
      chrome.windows.create(
        {
          url: "sidepanel.html",
          // You can also use types such as "popup" or "normal."
          type: "normal",
          width: 400,
          height: 600,
        },
        (window) => {
          if (window?.id) {
            popupWindowId = window.id;
          }
        }
      );
    } else {
      chrome.windows.update(popupWindowId, { focused: true });
    }
  });

  chrome.windows.onRemoved.addListener((windowId) => {
    if (windowId === popupWindowId) {
      popupWindowId = undefined;
    }
  });
});
