<h1 align="center">Сайт с модулем электронного судейства по художественной гимнастике</h1>
<h2 align="center">ВКР (дипломная работа)</h2>

Идея разработки: создание сайта для автоматизации процесса судейства соревнований по художественной гимнастике.
Ключевой реализованный функционал:

1. авторизация и регистрация
2. процессы подготовки соревнования (создание, настройка, жеребьёвка)
3. выставление оценок. Реализовано только для индивидуального зачета

Установка и запуск проекта:

1. скачать файлы находящиеся в ветке master
2. необходимо выполнить команды `yarn install` в корне и папках проекта.
3. использован PostgreSQL. В папке `server` в файле `.env` храниться информация о данных с которыми необходимо создать базу данных. Также в базу необходимо добавить 1 пользователя, т.к. регистрацию может выполнять только администратор после авторизации.
4. Запуск проекта реализован в двух окнах консоли: после перехода в папки `server` и `client` необходимо в каждой из них выполнить команду yarn run start

Использование проекта:

1. после запуска проекта требуется перейти по адресу http://localhost:3000/
2. будет открыта первая страница проекта, предлагающая различные пункты меню
3. после успешной авторизации, пользователь перейдет в модуль судейства откуда ему доступен основной функционал.
4. на странице рейтинга можно посмотреть рейтинг участников текущего соревнования.
