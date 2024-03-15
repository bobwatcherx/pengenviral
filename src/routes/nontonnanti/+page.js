export async function load() {
  try {
    const storedData = localStorage.getItem('nonton-nanti');

    return { nontonNantiData: JSON.parse(storedData) || [] };
  } catch (error) {
    console.error('Error reading data from local storage:', error);
    return { nontonNantiData: [] };
  }
}
