-- Database Creation Script
drop database education;

create database education;

use education;

-- create tables
create table major(
	id int primary key auto_increment,
	name varchar(50) not null,
	req_credits int not null,
	description varchar(1000) not null
);

create table school_year(
	id int primary key auto_increment,
	semester varchar(20) not null
);

create table department(
	id int primary key auto_increment,
	code varchar(10) not null, 
	name varchar(50) not null
);

create table instructor(
	id int primary key auto_increment,
	first_name varchar(30) not null,
	last_name varchar(30) not null,
	year_hired int not null,
	is_tenured tinyint not null default 0,
	department_id int,
	foreign key (department_id) references department(id) 
		on delete set null
		on update cascade
);

-- create table account(
	-- id int primary key auto_increment,
	-- username varchar(10),
	-- password varchar(50)
-- );

create table student(
	id int primary key auto_increment,
	first_name varchar(30) not null,
	last_name varchar(30) not null,
	first_semester int,
	gpa decimal(4,2) default 0.00,
	major_id int,
	foreign key (major_id) references major(id)
		on delete set null
		on update cascade,
	foreign key (first_semester) references school_year(id)
);

-- create table student(
	-- id int primary key auto_increment,
	-- first_name varchar(30) not null,
	-- middle_init varchar(1),
	-- last_name varchar(30) not null,
	-- street varchar(30),
	-- _state varchar(5),
	-- zip varchar(10),
	-- sid int not null,
	-- first_semester int not null,
	-- gpa decimal(4, 2) default 0.00,
	-- username_id int,
	-- major_id int,
	-- foreign key (major_id) references major(id)
		-- on delete set null
		-- on update cascade,
	-- foreign key (username_id) references account(id),
	-- foreign key (first_semester) references school_year(id)
-- );

create table class(
	id int primary key auto_increment,
	department_id int,
	num varchar(10) not null,
	name varchar(100) not null,
	credits int not null,
	description varchar(2000) not null,
	foreign key (department_id) references department(id)
		on delete set null
		on update cascade
);

create table classroom(
	id int primary key auto_increment,
	building varchar(30) not null,
	num int not null,
	num_seats int not null
);

create table class_list(
	id int primary key auto_increment,
	class_id int,
	section int not null,
	semester varchar(15) not null,
	classroom_id int,
	days set ("M", "T", "W", "R", "F", "S") not null,
	instructor_id int,
	begin_time time not null,
	end_time time not null,
	foreign key (class_id) references class(id)
		on delete set null
		on update cascade,
	foreign key (classroom_id) references classroom(id) 
		on delete set null
		on update cascade,
	foreign key (instructor_id) references instructor(id)
		on delete set null
		on update cascade
);

create table major_class_relationship(
	id int primary key auto_increment,
	major_id int not null,
	class_id int not null,
	foreign key (major_id) references major(id)
		on delete cascade
		on update cascade,
	foreign key (class_id) references class(id)
		on delete cascade
		on update cascade
);

create table student_classes_taken(
	id int primary key auto_increment,
	student_id int not null,
	class_list_id int not null,
	grade set ("A", "B", "C", "D", "F"),
	foreign key (student_id) references student(id)
		on delete cascade
		on update cascade,
	foreign key (class_list_id) references class_list(id)
);

create table prerequisites(
	id int primary key auto_increment,
	class_id int not null,
	prereq_class_id int not null,
	foreign key (class_id) references class(id)
		on delete cascade
		on update cascade,
	foreign key (prereq_class_id) references class(id)
		on delete cascade
		on update cascade
);