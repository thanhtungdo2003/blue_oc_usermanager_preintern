
-- mysql

create database worldofbook;
use worldofbook;

-- bảng người dùng
CREATE TABLE user(
    user_id VARCHAR(50) PRIMARY KEY, 
    username VARCHAR(255) NOT NULL,
    email VARCHAR(125) NOT NULL UNIQUE,
    hasspass VARCHAR(125) NOT NULL,
	created_at timestamp default current_timestamp
);


-- bảng tác giả
CREATE TABLE author(
    user_id VARCHAR(50) PRIMARY KEY,  -- Dùng user_id làm khóa chính
    author_name VARCHAR(255) NOT NULL,
    contribution_points BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
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
    user_id VARCHAR(50), 
    genre_id varchar(50), 
    publish_year YEAR,
    created_at timestamp default current_timestamp,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE SET NULL,
    FOREIGN KEY (genre_id) REFERENCES genre(genre_id) ON DELETE SET NULL
);

-- bảng lưu lịch sử mượn sách
CREATE TABLE borrowingHistory(
	borrowing_id VARCHAR(50) PRIMARY KEY,
	book_id VARCHAR(50),
    user_id varchar(50), 
    created_at timestamp default current_timestamp,
	returned_date timestamp NOT NULL,
    status ENUM('borrowed', 'returned') DEFAULT 'borrowed',
    FOREIGN KEY (book_id) REFERENCES book(book_id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE SET NULL
);

CREATE INDEX idx_borrowing_book ON borrowingHistory(book_id);
CREATE INDEX idx_borrowing_user ON borrowingHistory(user_id);
CREATE INDEX idx_borrowing_created ON borrowingHistory(created_at);

 
