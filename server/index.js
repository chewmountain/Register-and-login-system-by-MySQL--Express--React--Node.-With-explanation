/** 
 * Использую express для создания подключения и роутов.
 * mysql для подключения к бд.
 * cors нужен, чтобы сервер мог общаться с клиентом (устанавливает специальные htpp-заголовки) */
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// Инициализирую приложение express
const app = express();

// Позволяет приложению обрабатывать данные, полученные в формате json
// Позволяет приложению использовать cors
app.use(express.json());
app.use(cors());

/**
 * Создаю подключение к БД. Данные для входа указываются поставщиком либо, если
 * это локальная машина, то там все по стандарту.
 */
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "users",
});

/**
 * Создаю роут, по которому мы сможем делать POST-запросы.
 * Метод post принимает в себя строку - путь - и аргументы (req, res) - запрос, ответ.
 */
app.post('/register', (req, res) => {

    /**
     * Создаю переменные, которые будут принимать в себя с сервера данные:
     * username - body.username
     * password - body.password
     * Указываем название так же, как и указали на клиентской части при передачи данных (мы делаем запросы на клиентской часть с помощью axios - см. клиентскую часть)
     */
    const username = req.body.username;
    const password = req.body.password;

    // Создаем запрос к БД
    db.query(
        "INSERT INTO user_list (username, password) VALUES (?, ?)",
        // Вместо "?" принимает данные
        [username, password],
        // Можно добавить callback-функцию, которая будет принимать сообщения об ошибках (если есть) и результате запроса.
        (err, result) => {
            // Тут просто выводим ошибки в консоль если есть. Если их не будет, то просто получим в консоль null.
            console.log(err);
    });
});



/**
 * Создаю роут по которому буду авторизироваться. Использую метод post
 */
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Создаем запрос к БД
    db.query(
        "SELECT * FROM user_list WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
            // Если будет ошибка, то отправим клиенту эту ошибку
            if (err) {
                res.send({ err: err })
            }

            /**
             * Проверяем по длине массива, который будет содержать наши данные.
             * Если совпадений нет, то будет 0, если есть, то, конечно, будет >= 1
             * 
             * Если такой пользователь есть, то просто передаем в ответ (data) массив с данными из БД (id, username, password)
             */
            if (result.length > 0) {
                res.send(result)
            } else {
                // Если нет совпадений, то отправим клиенту это сообщение в ответе (data)
                res.send({ message: "Wrong username/password combination!" })
            }
    });
});



// Запускаем приложение на 3001 порту, но лучше порт, данные для доступа к БД передавать через env-кофигурационный файл.
app.listen(3001, () => {
    console.log("Running server...");
});