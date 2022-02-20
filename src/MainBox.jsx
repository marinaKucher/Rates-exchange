import Select from "./SelectCurrency";
import "./MainBox.css"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {grey} from "@mui/material/colors";

export default function MainBox(props){
    function handleChange(event) {
        if (((Number.isInteger(parseInt(event.target.value, 10)) && event.target.value.length <= 14) ||
            event.target.value == "") && props.inputAllowed) {
            if (event.target.value == "") {
                props.updateValue("");
            } else {
                let number = parseInt(event.target.value, 10)
                props.updateValue(number);
            }
        } else {
            if (props.inputAllowed) {
                alert("Пожалуйства,введие целое число, не более 14ти знаков")
            } else {
                alert("Число вводится в поле каточки справа, а результат отображается слева")
            }
        }
    }

    return (
        <Box
            sx={{width: 0.4, height: 0.5,}}>
            <Typography  variant="h5" gutterBottom sx={{height: 0.1, color: grey[700] }}>
                {props.title}
            </Typography>
            <Box sx={{
                width: 1,
                height: 0.9,
                border: '1px solid grey',
                borderRadius: 1,
                borderColor: grey[400],
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
            }}>
                <Select currencyArray={props.currencyArray} setSelectedCurrency={props.setSelectedCurrency}
                        selectedCurrency={props.selectedCurrency}/>
                <input className="input" onChange={handleChange} value={props.startValue}/>
                <Typography className="endText" variant="h5" gutterBottom
                            sx={{mt: 5, ml: 1, color: grey[700]}}>{props.exchangeRatesText}</Typography>
            </Box>
        </Box>
    );
}
