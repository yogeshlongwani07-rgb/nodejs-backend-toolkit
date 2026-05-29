use college;

-- create table students (
--     roll_no  int primary key,
--     name  varchar(100) not null
-- );

-- create table subjects (
--     subject_id  int primary key,
--     subject_name  varchar(200) not null
-- );

-- create table students_subjects (
--     roll_no int,
--     subject_id int,
--     primary key(roll_no,subject_id),
--     foreign key(roll_no) references students(roll_no),
--     foreign key(subject_id) references subjects(subject_id)
-- );

-- create table users (
--     id int primary key,
--     username varchar(100),
--     email varchar(200),
--     password varchar(100)
-- );

-- TRUNCATE TABLE users;
alter table users modify column id int AUTO_INCREMENT  not null;

-- insert into students values (101,"Yogesh")

