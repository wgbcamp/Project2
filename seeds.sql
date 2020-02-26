use clown_db;

insert into users (username, password, noOfPosts, score, createdAt, updatedAt) 
values ("Person1", "bigPassword", 123, 123232, "00:11:22", "22:11:00");

insert into users (username, password, noOfPosts, score, createdAt, updatedAt)
values ("Person2", "pass", 13123, 153445, "00:11:22", "22:11:00");

insert into users (username, password, noOfPosts, score, createdAt, updatedAt)
values ("Person3", "pass21312", 1, 12, "00:11:22", "22:11:00");

insert into posts (title, image, author, createdAt, updatedAt, UserId) 
values ("Hippo Chasing a Guy", "assets/sampleimg/funny.jpg", "Person1", "00:11:22", "22:11:00", 1);

insert into posts (title, image, author, createdAt, updatedAt, UserId)
values ("Man seducing a wild beast", "assets/sampleimg/funny.jpg", "Person3", "00:11:22", "22:11:00", 3);

insert into captions (text, noOfVotes, author, createdAt, updatedAt, postId, UserId) 
values ("I knew I should've worn pants this morning!", 2, "Person2", "00:11:22", "22:11:00", 1, 2);

insert into captions (text, noOfVotes, author, createdAt, updatedAt, postId, UserId) 
values ("But we were just getting started!", 0, "Person3", "00:11:22", "22:11:00", 1, 3);

insert into captions (text, noOfVotes, author, createdAt, updatedAt, postId, UserId) 
values ("Ahhhh!", 1, "Person2", "00:11:22", "22:11:00", 2, 1);