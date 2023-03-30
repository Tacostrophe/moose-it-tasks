<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Sprint 3</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Запланированный функционал

#### Авторизация и работа с ролями

Важно максимум комментариев, т.к. быстро забывается тема

#### Работы с профилем

Отдельные таблицы:

- user - авторизация - логин/mail, пароль и пр.;

- profile - фамилия, телефон и пр. (на свое усмотрение). Связь OneToOne.

эндпоинт для регистрации, его обрабатывает код, который относится к profile.
Обращение к коду авторизации => получение ID_user => использование его для создания профиля.

Позволит сделать код авторизации неизменным.

Права - AdminOrOwner.

#### Модуль "Текстовый блок"

На главной странице сайте:

- текст-приветствие;

- блок из трех преимуществ. Каждое преимущество содержит:

  - картинка;

  - текст;

  - заголовок.

Админ должен мочь это редактировать.

CRUD-методы для управления такими блоками:

- уникальное название для поиска (например, main-hero-text);

- название;

- картинка;

- текст;

- ГРУППА - (например, main-page - чтобы все блоки главной страницы или другой группы фронтэнд мог получать одним запросом).

Права - AdminOnly.

В списке должна быть фильтрация по группе.

#### Модуль по сохранению файлов

При загрузке картинок, пользователь видит их до подтверждения сохранения(превью).

В БД должны быть поля:

- createdAt;

- essenceTable - сущность;

- essenceId.

эндпоинт для удаления лишних файлов. Файл считается лишним, если:

- прошло больше часа с момента создания;

- нигде не используется (essenceId/essenceTable пустые);

essenceTable + essenceId могут быть, например, такие: profile 17, profile 19, film 23, film 17 (одновременно только одна пара значений само собой записана или null)

#### Возможность использовать файловый модуль в "текстовом блоке"

"Текстовый блок" вызывает модуль сохранения файла. Вся работа с файлами сосредоточена в одном месте.
Файл - необязательное поле. При удалении блока файл перестает использоваться.
