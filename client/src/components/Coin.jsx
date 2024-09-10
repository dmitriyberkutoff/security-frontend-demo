import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useCounter = () => {
    const [counter, setCounter] = useState(0);

    const increment = () => {
        setCounter((val) => ++val);
    };

    const decrement = () => {
        setCounter((val) =>
            val === 0 ? val : --val
        );
    };

    return {increment, decrement, counter};
};

const PRICE = 35;

export const Coin = () => {
    const {increment, decrement, counter} = useCounter();
    const [invoices, setInvoices] = useState([]);

    const updateInvoices = async () => {
        const res = await fetch('http://localhost:3001/invoices')
        const json = await res.json();
        setInvoices(json.items);
    }

    useEffect(() => {
        updateInvoices()
    }, [])

    const buy = async () => {
        await fetch('http://localhost:3001/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                count: counter,
                price: counter * PRICE
            })
        });
        await updateInvoices();
    }

    return (
        <div className={'coin'}>
            <h2>Покупка коинов</h2>
            <div className={'counter-body'}>
                <button disabled={counter === 0} onClick={() => decrement()} className={'left-button'}>-</button>
                <p>{counter}</p>
                <button onClick={() => increment()} className={'right-button'}>+</button>
            </div>
            <button disabled={counter === 0} className={'buy-button'} onClick={buy}>{counter === 0 ? 'Купить' : `Купить за ${counter*PRICE}р`}</button>
            <ul className={'invoice-history'}>
                <p>История покупок</p>
                {invoices.map(inv => (
                    <li key={inv.id}>
                        <Link style={{color: '#f58220'}} to={'/invoice/'+inv.id}>Время: {inv.time}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}