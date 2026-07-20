const STORAGE_KEY = "nexta-memory";

export function saveMemory(memory) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(memory)
    );
  } catch (error) {
    console.error("Failed to save memory:", error);
  }
}

export function loadMemory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return null;

    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to load memory:", error);
    return null;
  }
}

export function clearMemoryStorage() {
  localStorage.removeItem(STORAGE_KEY);
}