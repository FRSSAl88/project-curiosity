export function chooseDiscovery(discoveries, lastDiscovery = null) {
  if (!discoveries || discoveries.length === 0) {
    return null;
  }

  let availableDiscoveries = discoveries;

  if (lastDiscovery && discoveries.length > 1) {
    availableDiscoveries = discoveries.filter(
      (item) => item.text !== lastDiscovery.text
    );
  }

  const randomIndex = Math.floor(
    Math.random() * availableDiscoveries.length
  );

  return availableDiscoveries[randomIndex]
  ;
}