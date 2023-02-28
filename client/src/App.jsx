import { useState } from "react";
import axios from 'axios';

const App = () => {
    /**
     * Создаем состояния для инпутов, чтобы сделать их контролируемыми и записывать
     * в наш state данные пользователя.
     * 
     * Можно все это сделать на Formik + RTQ Query, чтобы приложение можно было легко масшабировать, 
     * но здесь это просто учебный проект.
     */
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    /**
     * Создадим функцию для регистрации.
     * Для фетчинга (отправки и получения запросов) будем использовать axios.
     */
    const register = () => {
        /**
         * Указываем в методе post роут по которому проходит регистрация.
         * Роут для регистрации мы указывали в серверной части.
         * 
         * Вторым параметром передаем объект с данными: username и password.
         * Далее такие же переменные с таким же именем будем принимать на серверной части (см. server)
         */
        axios.post('http://localhost:3001/register', {
            username: usernameReg,
            password: passwordReg
            // Если все ок, то просто выводим результат в консоль.
        }).then(res => {
            console.log(res);
        })
    }

    return (
        <div className="App">
            <div className="registration">
                {/* Регистрация */}
                <h2>Registration</h2>
                <label>Username</label>
                {/* Управляемые инпуты для username и password */}
                <input type="text"
                    onChange={e => {
                        setUsernameReg(e.target.value)
                    }}
                />
                <label>Password</label>
                <input type="text"
                    onChange={e => {
                        setPasswordReg(e.target.value)
                    }}
                />
                <button onClick={register}>Register</button>
            </div>

            <div className="login">
                <h2>Login</h2>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button>Login</button>
            </div>
        </div>
    );
};

export default App;