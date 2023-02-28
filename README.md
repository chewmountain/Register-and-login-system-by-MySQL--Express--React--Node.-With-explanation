## Соединяем работу MySQL, React.js, Express.js, Node.js
Создаем новый проект. В корень каталога для fullstack app создаем две папки:

 - client
 - server

В папке client будет клиентская часть (frontend), в папке server серверная часть (backend).

В папке client создаю react проект:

> npm create vite@latest

В папке server создаю index.js файл и устанавливаю зависимости:

> npm i express mysql cors nodemon

nodemon для автоматической перезагрузке сервера после внесения и сохранения изменений.

express.js - фреймворк для веб-приложений, создания api и роутов для общения с сервером.

mysql - библиотека для базы данные MySQL

cors - механизм, использующий дополнительные HTTP-заголовки, чтобы дать возможность агенту пользователя получать разрешения на доступ к выбранным ресурсам с сервера на источнике (домене), отличном от того, что сайт использует в данный момент.

На клиентской части создаю две простые формы: для регистрации и аутентификации.

На части сервера создаю подклчение с помощью express и создаю соединение с БД.