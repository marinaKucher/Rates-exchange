async function getExchangeRates(onDataLoaded) {
    const requestURL = "https://www.cbr-xml-daily.ru/latest.js"
    try {
        await fetch(requestURL)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                alert("Произошла ошибка,попробуйте позже")
            })
            .then((data) => {
                let currencyTypes = new Map();
                let ratioMatrix = new Map();
                Object.keys(data.rates).map((key) => currencyTypes.set(key, data.rates[key]))
                currencyTypes.set("RUB", 1)
                currencyTypes.forEach((valueX, keyX, map) => {
                    ratioMatrix.set(keyX, new Map())
                    currencyTypes.forEach((valueY, keyY, map) => {
                        if (keyX == keyY) {
                            ratioMatrix.get(keyX).set(keyY, 1)
                            return
                        }
                        if (keyX == "RUB") {
                            ratioMatrix.get(keyX).set(keyY, valueY)
                            return;
                        }
                        const toRub = (1 / valueX)
                        if (keyY == "RUB") {
                            ratioMatrix.get(keyX).set(keyY, toRub)
                            return;
                        }
                        ratioMatrix.get(keyX).set(keyY, valueY * toRub)
                    });
                });
                onDataLoaded(currencyTypes, ratioMatrix)
            });
    } catch (e) {
        alert("Произошла ошибка,попробуйте позже")
    }
}

export default getExchangeRates