import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import calendar from '../res/calendar.svg';
import card from '../res/card.svg';
import coin from '../res/coin.svg';
import price from '../res/price.svg';

export const Invoice = () => {
    const params = useParams();
    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        fetch(
            `http://localhost:3001/invoice/${params.id}`,
        ).then(async data => {
            setInvoice(await data.json());
        });
    }, []);

    return <div className={'invoice'}>
        <h2 className={'invoice-header'}>{invoice ? 'Invoice' : 'No invoice'}</h2>
        {invoice && <div>
            <p>
                <img width={20} src={calendar} alt={'calendar'}/>
                Time: {invoice.time}
            </p>
            <p>
                <img width={20} src={coin} alt={'count'}/>
                Count: {invoice.count}
            </p>
            <p>
                <img width={20} src={price} alt={'price'}/>
                Price: {invoice.price} р
            </p>
            <p>
                <img width={20} src={card} alt={'card'}/>
                Card number: {invoice.card}
            </p>
        </div>}
    </div>
}