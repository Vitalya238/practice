async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Ошибка при загрузке данных: ${response.status}`);
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    }
}

const url = 'https://wttr.in/Minsk?format=%C+%t';

fetchData(url)
    .then(data => {
        console.log('Полученные данные:', data);
    })
    .catch(error => {
        console.error('Произошла ошибка при загрузке данных:', error);
    });
