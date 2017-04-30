create database burgers_db;

use burgers_db;

create table burgers(
	`id` int not null auto_increment,
    `burger_name` varchar(256) not null,
    `devoured` bool not null,
    `date` DATETIME not null,
    primary key(`id`)
);

create database todolist;

use todolist;

select * from todos;