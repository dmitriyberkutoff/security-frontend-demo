import { useState } from "react";
import defaultAvatar from '../res/default.svg';
import edit from '../res/edit.svg'

export const Profile = () => {
    const [isChangingName, setIsChangingName] = useState(false);
    const [name, setName] = useState('Дима');
    const [displayedName, setDisplayedName] = useState('Дима');
    const [avatar, setAvatar] = useState(null);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatar(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <div className="profile">
                <h2>Профиль</h2>
                <div className={'avatar'}>
                    <label for='avatar'>
                        <img src={avatar ? avatar : defaultAvatar} alt={'Аватар'} className={"profile-avatar"} />
                    </label>
                    <input
                        id='avatar'
                        type="file"
                        onChange={handleAvatarChange}
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
                        <button className={'save-name'} onClick={() => {
                            setDisplayedName(name);
                            setIsChangingName(false);
                        }}>Сохранить</button>
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