import { useEffect, useState } from "react";

export const Form = () => {
    const [bio, setBio] = useState('');
    const [city, setCity] = useState('');
    const [displayedBio, setDisplayedBio] = useState('');
    const [displayedCity, setDisplayedCity] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/info').then(async res => {
            const r = await res.json();
            setBio(r.bio);
            setCity(r.city);
            setDisplayedBio(r.bio);
            setDisplayedCity(r.city);
        })
    }, [])

    const save = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/saveInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bio: displayedBio,
                city: displayedCity
            })
        }).then(() => {
            setBio(displayedBio);
            setCity(displayedCity);
        }).catch(() => {
            setDisplayedBio(bio);
            setDisplayedCity(city);
        })
    }

    const cancel = () => {
        setDisplayedBio(bio);
        setDisplayedCity(city);
    }

    const changed = displayedBio !== bio || displayedCity !== city;

    return (
        <div className={'coin'}>
            <h2>Личная информация</h2>
            <form onSubmit={save} className={'form'}>
                <div className={'input'}>
                    <label>Bio</label>
                    <input type={'text'} name={'bio'} value={displayedBio} onChange={e => setDisplayedBio(e.target.value)}/>
                </div>
                <div className={'input'}>
                    <label>City</label>
                    <input type={'text'} name={'city'} value={displayedCity} onChange={e => setDisplayedCity(e.target.value)}/>
                </div>
                <div className={'buttons'}>
                    <button disabled={!changed} onClick={e => {
                        e.preventDefault();
                        cancel();
                    }}>
                        Отменить
                    </button>
                    <button disabled={!changed} type={'submit'}>
                        Сохранить
                    </button>
                </div>
            </form>
        </div>
    );
}