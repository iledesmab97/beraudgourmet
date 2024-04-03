import Input from '@mui/material/Input'

function PizzaText({ text }) {
    return (
        <Input
            fullWidth={true}
            readOnly={true}
            // disabled={true}
            value={text}
        />
    )
}

export default PizzaText