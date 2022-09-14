insert into courses (
    id,
    title,
    description,
    starting_date,
    finishing_date
  )
values (
    1,
    'Курс 1',
    'Описание 1',
    '2022-09-01',
    '2023-01-01'
  );
insert into users (
    id,
    email,
    password,
    name,
    surname,
    patronymic,
    role
  )
values (
    1,
    'common@alive.kfc',
    '$2a$08$TCN5qyLdjH.7uwSC1s452.uA/8a72mJ7Sz.8NpZexkb.JMVpCtDQK',
    'Коммон',
    'Жив',
    null,
    'ADMIN'
  ),
  (
    2,
    'user1@email.com',
    '$2a$08$TCN5qyLdjH.7uwSC1s452.uA/8a72mJ7Sz.8NpZexkb.JMVpCtDQK',
    'Name 1',
    'Surname 1',
    'Patronymic 1',
    'USER'
  ),
  (
    3,
    'user2@email.com',
    '$2a$08$TCN5qyLdjH.7uwSC1s452.uA/8a72mJ7Sz.8NpZexkb.JMVpCtDQK',
    'Name 2',
    'Surname 2',
    'Patronymic 2',
    'USER'
  ),
  (
    4,
    'user3@email.com',
    '$2a$08$TCN5qyLdjH.7uwSC1s452.uA/8a72mJ7Sz.8NpZexkb.JMVpCtDQK',
    'Name 3',
    'Surname 3',
    'Patronymic 3',
    'USER'
  );
insert into user_courses (user_id, course_id)
values (2, 1),
  (3, 1);