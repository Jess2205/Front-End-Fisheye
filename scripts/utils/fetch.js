// scripts/utils/fetch.js
async function fetchData() {
    try {
        const response = await fetch('data/data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
