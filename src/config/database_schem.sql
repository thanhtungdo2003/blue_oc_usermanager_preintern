
-- mysql

create database worldofbookDB;
use worldofbookDB;


-- bảng người dùng
CREATE TABLE user(
    user_id VARCHAR(50) PRIMARY KEY, 
    username VARCHAR(255) NOT NULL,
    email VARCHAR(125) NOT NULL UNIQUE,
    hasspass VARCHAR(125) NOT NULL,
    role_id VARCHAR(50),
	created_at timestamp default current_timestamp,
	FOREIGN KEY (role_id) REFERENCES user_role(role_id) ON DELETE SET NULL
);

-- bảng vai trò (nhóm các quyền)
CREATE TABLE user_role(
    role_id VARCHAR(50) PRIMARY KEY, 
    role_name VARCHAR(255) NOT NULL,
	created_at timestamp default current_timestamp
);

-- bảng quyền
CREATE TABLE permission(
    perm_id VARCHAR(50) PRIMARY KEY, 
    perm_name VARCHAR(255) NOT NULL,
    role_id VARCHAR(50), 
	FOREIGN KEY (role_id) REFERENCES user_role(role_id) ON DELETE SET NULL
);


-- bảng tác giả
CREATE TABLE author(
    author_id VARCHAR(50) PRIMARY KEY, 
    author_name VARCHAR(255) NOT NULL,
    contribution_points BIGINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- bảng thể loại
CREATE TABLE genre(
    genre_id VARCHAR(50) PRIMARY KEY, 
    genre_name VARCHAR(255) NOT NULL,
    genre_parent_id VARCHAR(50),
    created_at timestamp default current_timestamp,
    FOREIGN KEY (genre_parent_id) REFERENCES genre(genre_id) ON DELETE SET NULL
);
-- bảng lưu dữ liệu sách
CREATE TABLE book(
	book_id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id VARCHAR(50), 
    genre_id varchar(50), 
    publish_year YEAR,
    created_at timestamp default current_timestamp,
    FOREIGN KEY (author_id) REFERENCES author(author_id) ON DELETE SET NULL,
    FOREIGN KEY (genre_id) REFERENCES genre(genre_id) ON DELETE SET NULL
);

-- bảng lưu lịch sử mượn sách
CREATE TABLE borrowingHistory(
	borrowing_id VARCHAR(50) PRIMARY KEY,
    user_id varchar(50), 
    created_at timestamp default current_timestamp,
	returned_date timestamp NOT NULL,
    status ENUM('borrowed', 'returned') DEFAULT 'borrowed',
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE SET NULL
);

CREATE INDEX idx_borrowing_id ON borrowingHistory(borrowing_id);
CREATE INDEX idx_borrowing_user ON borrowingHistory(user_id);
CREATE INDEX idx_borrowing_created ON borrowingHistory(created_at);

 -- bảng lưu chi tiết lịch sử mượn sách
CREATE TABLE borrowingDetail(
	borrowing_id VARCHAR(50),
    book_id varchar(50),
    FOREIGN KEY (borrowing_id) REFERENCES borrowingHistory(borrowing_id) ON DELETE SET NULL,
	FOREIGN KEY (book_id) REFERENCES book(book_id) ON DELETE SET NULL
);

CREATE INDEX idx_borrowing_detail_id ON borrowingDetail(borrowing_id);
CREATE INDEX idx_borrowing_detail_book ON borrowingDetail(book_id);


