-- comment
select * from users;

insert into users(id,name,email,password,status, update_at) values (
1, 'user1', 'user1@gmail.com' , '123456', true, NOW()
);
insert into users(id,name,email,password,status,created_at, update_at) values (
2, 'user2', 'user2@gmail.com' , '123456', false, NOW(), NOW()
);
insert into users(id,name,email,password,status,created_at, update_at) values (
3, 'user3', 'user3@gmail.com' , '123456', true, NOW(), NOW()
);
insert into users(id,name,email,password,status,created_at, update_at) values (
4, 'user4', 'user4@gmail.com' , '123456', true, NOW(), NOW()
);

UPDATE users SET name='user 11', email='user11@gmail.com', status=false, update_at=NOW()
where id=1;

DELETE FROM users where id = 1;