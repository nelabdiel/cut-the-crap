document.getElementById('cleanButton').addEventListener('click', () => {
  const linkInput = document.getElementById('linkInput').value;
  const cleanURL = cleanLink(linkInput);
  document.getElementById('result').textContent = cleanURL;

  // Copy the cleaned URL to the clipboard
  navigator.clipboard.writeText(cleanURL).then(() => {
    alert("Clean link copied to clipboard!");
  }).catch(err => {
    console.error("Could not copy text: ", err);
  });
});

function cleanLink(link) {
  try {
    const url = new URL(link);
    const params = url.searchParams;

    // List of marketing/tracking parameters to remove
    const trackingParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "source", "medium", "campaign", "term"];

    trackingParams.forEach(param => {
      params.delete(param);
    });

    url.search = params.toString();
    return url.toString();
  } catch (error) {
    console.error("Error cleaning the link: ", error);
    alert("Failed to clean the link. Please make sure it's a valid URL.");
    return link;
  }
}
