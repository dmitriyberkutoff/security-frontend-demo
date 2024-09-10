import { Form } from "./Form";
import { Coin } from "./Coin";
import { Profile } from "./Profile";
import cat from '../res/cat.jpg'
import dog from '../res/dog.jpg'

export const MainPage = () => {
    return (
        <div className={'main'}>
            <div style={{width: '400px'}}>
                <Profile/>
                <Form/>
                <Coin/>
            </div>
            <div className={'content'}>
                <h2>Стена</h2>
                <div>
                    <p>Кошечка</p>
                    <img width={500} src={cat} alt={'cat'}/>
                </div>
                <div>
                    <p>Собачка</p>
                    <img width={500} src={dog} alt={'dog'} />
                </div>
            </div>
        </div>
    )
}