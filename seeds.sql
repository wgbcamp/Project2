use clown_db;

insert into users (username, password, noOfPosts, score, createdAt, updatedAt) 
values ("Person1", "bigPassword", 123, 123232, "00:11:22", "22:11:00");

insert into users (username, password, noOfPosts, score, createdAt, updatedAt)
values ("Person2", "pass", 13123, 153445, "00:11:22", "22:11:00");

insert into posts (title, image, author, createdAt, updatedAt, UserId) 
values ("Hippo Chasing a Guy", "./public/assets/sampleimg/funny.jpg", "Person1", "00:11:22", "22:11:00", 1);

insert into captions (text, noOfVotes, voter, createdAt, updatedAt, postId, UserId) 
values ("I knew I should've worn pants this morning!", 0, "Person2", "00:11:22", "22:11:00", 1, 2)