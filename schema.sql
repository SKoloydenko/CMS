create type enum_users_role as enum ('USER', 'ADMIN');
alter type enum_users_role owner to "user";
create table courses (
  id serial primary key,
  title varchar(200) not null unique,
  description varchar(500) not null,
  starting_date timestamp with time zone not null,
  finishing_date timestamp with time zone not null
);
alter table courses owner to "user";
create table users (
  id serial primary key,
  email varchar(200) not null unique,
  password varchar(256) not null,
  name varchar(100) not null,
  surname varchar(100) not null,
  patronymic varchar(100),
  role enum_users_role default 'USER'::enum_users_role not null,
  registered_at timestamp with time zone default now(),
  updated_at timestamp with time zone
);
alter table users owner to "user";
create table user_courses (
  id serial primary key,
  user_id integer not null references users on update cascade on delete cascade,
  course_id integer not null references courses on update cascade on delete cascade,
  unique (user_id, course_id)
);
alter table user_courses owner to "user";