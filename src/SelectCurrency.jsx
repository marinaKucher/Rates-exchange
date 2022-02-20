import FormControl from "@mui/material/FormControl";
import NativeSelect from '@mui/material/NativeSelect';

function Option(props) {
    function newValueFunction() {
        props.setSelectedCurrency(props.value)
    }

    return (
        <option value={props.value} onClick={newValueFunction}>{props.text}</option>
    );
}

export default function Select(props) {
    return (
        <FormControl sx={{
            width: 1,
            height: 0.3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
        }}>
            <NativeSelect
                value={props.selectedCurrency} sx={{
                fontSize: 28
            }}
            >
                {props.currencyArray.map((currency, index) =>
                    <Option key={index} value={currency} text={currency}
                            setSelectedCurrency={props.setSelectedCurrency}/>)}
            </NativeSelect>
        </FormControl>
    );
}
