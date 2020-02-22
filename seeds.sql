use clown_db;

insert into users (username, password, noOfPosts, score, createdAt, updatedAt) values ("Person1", "bigPassword", 123, 123232, "00:11:22", "22:11:00");
insert into posts (text, image, author, createdAt, updatedAt, UserId) values ("hello", "img.img", "author", "00:11:22", "22:11:00", 1)