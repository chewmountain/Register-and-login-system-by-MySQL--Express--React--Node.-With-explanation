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
     * Для авторизации так же создаем состояния: username и password
     */
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /**
     * Чтобы понимать авторизованы мы или нет, создадим еще состояия для этого:
     */
    const [loginStatus, setloginStatus] = useState('');

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


    const login = () => {
        axios.post('http://localhost:3001/login', {
            username: username,
            password: password
        }).then(res => {
            /**
             * Если будет в ответе свойство message, которое мы создаем на сервере,
             * то устанавливаем стейт с этим сообщением.
             */
            if (res.data.message) {
                setloginStatus(res.data.message);
            /**
             * Иначе мы получаем пользователя в стейт записываем его username.
             */
            } else {
                setloginStatus(res.data[0].username)
            }
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
                {/* Авторизация. Так же делаем инпуты управляемыми и получаем с них данные */}
                <h2>Login</h2>
                <input type="text" placeholder="Username"
                    onChange={e => {
                        setUsername(e.target.value)
                    }}
                />
                <input type="password" placeholder="Password" 
                    onChange={e => {
                        setPassword(e.target.value)
                    }}
                />
                <button onClick={login}>Login</button>
            </div>

            {/* Если авторизованы, то отобразим сообщение в нашем компоненте об этом. */}
            <h1>{loginStatus}</h1>
        </div>
    );
};

export default App;