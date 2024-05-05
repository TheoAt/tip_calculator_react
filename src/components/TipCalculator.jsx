import { useState } from 'react'
import './tip.css'

export default function TipCalculator() {

    const [billAmount, setBillAmount] = useState(null)
    const [tipPercentage, setTipPercentage] = useState(10)
    const [splitCount, setSplitCount] = useState(2)
    const [tipAmount, setTipAmount] = useState(0)
    const [errorMsg, setErrorMsg] = useState('')

    const handleCalculateTip = () => {
        if (!billAmount || billAmount <= 0 || !tipPercentage || tipPercentage <= 0) {
            setTipAmount(null)
            setErrorMsg("Merci d'entrer des valeurs valides")
            return
        }

        const bill = parseFloat(billAmount);
        const tip = (bill * tipPercentage) / 100;
        const totalAmount = bill + tip;
        const tipAmountPerPerson = tip / splitCount;
        const totalAmountPerPerson = totalAmount / splitCount;

        setTipAmount({
            totalAmount: totalAmount.toFixed(2),
            tipPerPerson: tipAmountPerPerson.toFixed(2),
            totalPerPerson: totalAmountPerPerson.toFixed(2),
        });
        setErrorMsg('')
    }

    return (
        <div className="calculator-container">
            <div className="input-container">
                <label>Montant Facture:</label>
                <input onChange={(event) => setBillAmount(event.target.value)} type="number" value={billAmount} />
            </div>

            <div className="input-container">
                <label>Pourcentage pourboire :</label>
                <input onChange={(event) => setTipPercentage(event.target.value)} type="number" value={tipPercentage} />
            </div>

            <div className="input-container">
                <label>Nombre personnes :</label>
                <input onChange={(event) => setSplitCount(event.target.value)} type="number" value={splitCount} />
            </div>

            <button onClick={handleCalculateTip}>Calculez Pourboire</button>

            {
                errorMsg ? <p className="error-message">{errorMsg}</p> : null
            }

            {
                tipAmount ?
                    <div className='tip-result'>
                        <p>Montant total : {tipAmount.totalAmount}</p>
                        <p>Pourboire/Personne : {tipAmount.tipPerPerson}</p>
                        <p>Total/Personne : {tipAmount.totalPerPerson}</p>
                    </div>
                    :
                    null
            }
        </div>
    )
}