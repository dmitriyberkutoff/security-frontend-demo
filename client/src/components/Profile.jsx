import { useEffect, useState } from "react";
import defaultAvatar from '../res/default.svg';
import edit from '../res/edit.svg'

export const Profile = () => {
    const [isChangingName, setIsChangingName] = useState(false);
    const [name, setName] = useState('');
    const [displayedName, setDisplayedName] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/name').then(async res => {
            const body = await res.json();
            setName(body.name);
            setDisplayedName(body.name);
        })
    }, [])

    const updateName = () => {
        fetch('http://localhost:3001/setName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name
            })
        }).then(() => {
            setDisplayedName(name);
        }).finally(() => {
            setIsChangingName(false);
        })
    }

    const handleAvatarChange = (input) => {
        const fileTypes = ['jpg', 'jpeg', 'png', 'gif', 'svg'];

        if (input.files && input.files[0]) {
            const extension = input.files[0].name.split('.').pop().toLowerCase(),
                isSuccess = fileTypes.indexOf(extension) > -1;

            if (isSuccess) {
                const reader = new FileReader();

                if (extension === "svg") {
                    reader.onload = () => {
                        document.getElementById('icon').innerHTML = reader.result;
                    };
                    reader.readAsText(input.files[0]);
                }
                else {
                    // proceed the other image types
                }
            }
            else {
                console.log('Wrong image type');
            }
        }
    };

    const openFile = (event) => {
        handleAvatarChange(event.target);
    }

    return (
        <>
            <div className="profile">
                <h2>Профиль</h2>
                <div className={'avatar'}>
                    <label id={'icon'} for='avatar' className={'profile-avatar'}>
                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M1.2 10A4.804 4.804 0 0 0 6 14.8h3.981a4.804 4.804 0 0 0 4.8-4.8V6a4.804 4.804 0 0 0-4.8-4.8h-3.98A4.804 4.804 0 0 0 1.2 6v4zm10.136 2.9l-.01-.05a1.88 1.88 0 0 0-1.839-1.5H6.528c-.877 0-1.637.6-1.833 1.46-.006.02 0 .05.015.07l-.039.03c.413.19.866.29 1.33.29h3.98c.473 0 .935-.1 1.355-.3zm1.31-1.13c.346-.52.535-1.13.535-1.77V6a3.203 3.203 0 0 0-3.2-3.2h-3.98A3.203 3.203 0 0 0 2.8 6v4c0 .65.195 1.27.554 1.8a3.477 3.477 0 0 1 3.173-2.05h2.96c1.38 0 2.6.81 3.157 2.02zM8.01 4.11A2.39 2.39 0 0 0 5.625 6.5a2.39 2.39 0 0 0 2.386 2.39 2.388 2.388 0 0 0 2.385-2.39c0-1.32-1.069-2.39-2.385-2.39zm0 1.6c.434 0 .785.36.785.79a.785.785 0 1 1-1.57 0c0-.43.351-.79.785-.79z"
                                  className="svg-fill"/>
                        </svg>
                    </label>
                    <input
                        id='avatar'
                        type="file"
                        accept="image/*"
                        onChange={openFile}
                        className={"profile-avatar-input"}
                    />
                </div>
                {isChangingName
                    ? <div className={'changing-name-container'}>
                        <p>Смена имени</p>
                        <input
                            type="text"
                            value={name}
                            placeholder={'Введите имя'}
                            onChange={e => setName(e.target.value)}
                            className={"profile-name-input"}
                        />
                        <button className={'save-name'} onClick={updateName}>Сохранить</button>
                    </div>
                    : <div className={'name-container'}>
                        <h2 className={"profile-name"} dangerouslySetInnerHTML={{__html:displayedName}}/>
                        <button className={'change-name'} onClick={() => setIsChangingName(true)}>
                            <img src={edit} width={20} alt={'save'}/>
                        </button>
                    </div>}
            </div>
        </>
    );
}