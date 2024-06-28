document.addEventListener('click', function(event) {
  if (event.target.tagName === 'A') {
    const link = event.target.href;
    const cleanedLink = cleanLink(link);
    if (cleanedLink !== link) {
      event.preventDefault();
      window.location.href = cleanedLink;
    }
  }
}, true);

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
    return link;
  }
}
