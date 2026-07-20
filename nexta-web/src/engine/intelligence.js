export function chooseDiscovery(
  discoveries,
  lastDiscovery = null
) {
  if (!discoveries || discoveries.length === 0) {
    return null;
  }

  let availableDiscoveries = discoveries.filter(
    (item) => item.active
  );

  if (lastDiscovery && availableDiscoveries.length > 1) {
    availableDiscoveries = availableDiscoveries.filter(
      (item) => item.id !== lastDiscovery.id
    );
  }

  const randomIndex = Math.floor(
    Math.random() * availableDiscoveries.length
  );

  return availableDiscoveries[randomIndex];
}