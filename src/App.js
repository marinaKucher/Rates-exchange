import MainBox from "./MainBox";
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import {grey} from "@mui/material/colors";
import getExchangeRates from './getExchangeRates'

let defaultCurrency = ["RUB", "USD", "EUR"]




let ratioMatrix = new Map();

function convertation(leftCurrency, rightCurrency, x) {
    return (ratioMatrix.get(leftCurrency).get(rightCurrency) * x).toFixed(2)
}

function getRatio(leftCurrency, rightCurrency) {
    return ratioMatrix.get(leftCurrency).get(rightCurrency).toFixed(4)
}

function getExchangeRatesText(leftCurrency, rightCurrency) {
    return `1 ${leftCurrency} = ${getRatio(leftCurrency, rightCurrency)} ${rightCurrency}`
}

function App() {
    const [currencyArray, setCurrencyArray] = useState(defaultCurrency)

    const [x, setX] = useState("0")
    const [y, setY] = useState("0")

    const [selectedCurrency1, setSelectedCurrency1] = useState("RUB")
    const [selectedCurrency2, setSelectedCurrency2] = useState("USD")

    const [exchangeRates1, setExchangeRates1] = useState("")
    const [exchangeRates2, setExchangeRates2] = useState("")

    const [loading, setLoading] = useState(true)

    function swapCurrency() {
        setSelectedCurrency1(selectedCurrency2)
        setSelectedCurrency2(selectedCurrency1)
    }

    useEffect(() => {
        getExchangeRates(function (loadedCurrencyTypes, loadedRatioMatrix) {
            setCurrencyArray(Array.from(loadedCurrencyTypes.keys()))
            ratioMatrix = loadedRatioMatrix
            setExchangeRates1(getExchangeRatesText(selectedCurrency1, selectedCurrency2));
            setExchangeRates2(getExchangeRatesText(selectedCurrency2, selectedCurrency1));
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (loading) {
            return
        }

        setY(convertation(selectedCurrency1, selectedCurrency2, x))
    }, [x])

    useEffect(() => {
        if (loading) {
            return
        }

        setY(convertation(selectedCurrency1, selectedCurrency2, x))
        setExchangeRates1(getExchangeRatesText(selectedCurrency1, selectedCurrency2));
        setExchangeRates2(getExchangeRatesText(selectedCurrency2, selectedCurrency1));
    }, [selectedCurrency1])

    useEffect(() => {
        if (loading) {
            return
        }

        setY(convertation(selectedCurrency1, selectedCurrency2, x))
        setExchangeRates1(getExchangeRatesText(selectedCurrency1, selectedCurrency2));
        setExchangeRates2(getExchangeRatesText(selectedCurrency2, selectedCurrency1));
    }, [selectedCurrency2])

    if (loading) {
        return (
            <div className="App">
                <div className="loaderContainer">
                    <CircularProgress/>
                </div>
            </div>
        )
    }
    return (
        <div className="App">
            <MainBox startValue={x} updateValue={setX} currencyArray={currencyArray} title={"У меня есть"}
                     exchangeRatesText={exchangeRates1} setSelectedCurrency={setSelectedCurrency1}
                     selectedCurrency={selectedCurrency1}
                     inputAllowed={true}
            />
            <IconButton aria-label="delete" onClick={swapCurrency} sx={{
                color: grey[900],
                width: 0.1,
                height: 0.2,
                borderRadius: 1,

            }}>
                <CompareArrowsIcon sx={{
                    width: 1,
                    height: 1,
                }}/>
            </IconButton>
            <MainBox startValue={y} updateValue={setY} currencyArray={currencyArray} title={"Я получу"}
                     exchangeRatesText={exchangeRates2} setSelectedCurrency={setSelectedCurrency2}
                     selectedCurrency={selectedCurrency2}
                     inputAllowed={false}
            />
        </div>
    );
}

export default App;
