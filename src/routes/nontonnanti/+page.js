export async function load() {
  try {
    const data = JSON.parse(localStorage.getItem('nonton-nanti'));
    const storedData = data.reverse()
    return { nontonNantiData: storedData || [] };
  } catch (error) {
    console.error('Error reading data from local storage:', error);
    return { nontonNantiData: [] };
  }
}
