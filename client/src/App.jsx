import { useState } from "react";
import axios from 'axios';

const App = () => {
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const register = () => {
        axios.post('http://localhost:3001/register', {
            username: usernameReg,
            password: passwordReg
        }).then(res => {
            console.log(res);
        })
    }

    return (
        <div className="App">
            <div className="registration">
                <h2>Registration</h2>
                <label>Username</label>
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