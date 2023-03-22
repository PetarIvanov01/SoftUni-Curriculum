function attachEvents() {

    const inputField = document.getElementById('location');
    const getBtn = document.getElementById('submit');
    const divEl = document.getElementById('forecast');

    const current = document.getElementById('current');
    const upcoming = document.getElementById('upcoming');

    const weatherSymb = {
        'Sunny': '\u2600',
        'Partly sunny': '\u26C5',
        'Overcast': '\u2601',
        'Rain': '\u2614',
        'Degrees': '\u00B0',
    }

    getBtn.addEventListener('click', getWeather);

    async function getWeather() {

        divEl.style.display = 'block';

        const response = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
        const data = await response.json();

        const findObj = data.find(el => el.name === inputField.value);

        if (findObj === undefined) {
            divEl.textContent = 'Error';
            throw new Error()
        }

        const currResponse = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${findObj.code}`);
        const conditionData = await currResponse.json();

        const weatherIcon = conditionData.forecast.condition;

        const forecastResponse = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${findObj.code}`);
        const forecastData = await forecastResponse.json();

        if (!response.ok || !currResponse.ok || !forecastResponse.ok) {
            divEl.textContent = 'Error';
            throw new Error()
        }
        const divForecast = createEl('div', '', ['forecasts']);
        const spanCondSymbol = createEl('span', weatherSymb[weatherIcon], ['condition', 'symbol']);

        const spanCond = createEl('span', '', ['condition']);
        const spanName = createEl('span', `${conditionData.name}`, ['forecast-data']);
        const spanTemp = createEl('span', `${conditionData.forecast.low}${weatherSymb.Degrees}/${conditionData.forecast.high}${weatherSymb.Degrees}`, ['forecast-data']);
        const spanWeth = createEl('span', `${weatherIcon}`, ['forecast-data']);

        current.appendChild(divForecast);
        divForecast.appendChild(spanCondSymbol);
        divForecast.appendChild(spanCond);

        spanCond.appendChild(spanName);
        spanCond.appendChild(spanTemp);
        spanCond.appendChild(spanWeth);

        const arrOfWethData = forecastData.forecast;
        const name = forecastData.name;
        const upDivForecast = createEl('div', '', ['forecast-info']);

        for (const el of arrOfWethData) {

            const upSpan = createEl('span', '', ['upcoming']);
            const upSpanSymb = createEl('span', `${weatherSymb[el.condition]}`, ['symbol']);
            const upSpanTemp = createEl('span', `${el.low}${weatherSymb.Degrees}/${el.high}${weatherSymb.Degrees}`, ['forecast-data']);
            const upSpanWeth = createEl('span', `${el.condition}`, ['forecast-data']);

            upDivForecast.appendChild(upSpan);
            upSpan.appendChild(upSpanSymb);
            upSpan.appendChild(upSpanTemp);
            upSpan.appendChild(upSpanWeth);

        }
        upcoming.appendChild(upDivForecast);
    }

    function createEl(type, content, atribute = []) {
        let el = document.createElement(type);
        if (content) {
            el.textContent = content;
        }
        for (const atr of atribute) {
            el.classList.add(atr)
        }
        return el
    }
}

attachEvents();