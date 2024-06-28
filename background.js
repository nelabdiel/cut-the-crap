chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "cleanLink",
    title: "Cut the Cr*p",
    contexts: ["link"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "cleanLink") {
    cleanLink(info.linkUrl, tab);
  }
});

function cleanLink(link, tab) {
  try {
    const url = new URL(link);
    const params = url.searchParams;

    // List of marketing/tracking parameters to remove
    const trackingParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "source", "medium", "campaign", "term"];

    trackingParams.forEach(param => {
      params.delete(param);
    });

    url.search = params.toString();
    const cleanURL = url.toString();

    // Execute script to copy the cleaned URL to the clipboard
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: copyToClipboard,
      args: [cleanURL]
    }, () => {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icon48.png",
        title: "Cut the Cr*p",
        message: "Link cleaned and copied to clipboard!"
      });
    });
  } catch (error) {
    console.error("Error cleaning the link: ", error);
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon48.png",
      title: "Cut the Cr*p",
      message: "Failed to clean the link. Please make sure it's a valid URL."
    });
  }
}

function copyToClipboard(text) {
  const input = document.createElement("textarea");
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}
