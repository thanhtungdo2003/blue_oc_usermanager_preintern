use worldofbookDB;




DELIMITER //
CREATE PROCEDURE sp_user_register(
	IN p_user_id VARCHAR(50),
	IN p_username VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_hasspass TEXT
)
BEGIN
    DECLARE user_exists INT;

    -- Kiểm tra xem username hoặc email đã tồn tại chưa
    SELECT COUNT(*) INTO user_exists FROM `user`
    WHERE username = p_username OR email = p_email;

    IF user_exists > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Username hoặc Email đã tồn tại';
    ELSE
        -- Nếu chưa tồn tại, thêm người dùng mới
        INSERT INTO `user` (user_id, username, email, hasspass) 
        VALUES (p_user_id, p_username, p_email, p_hasspass);
    END IF;
END //
DELIMITER ;





DELIMITER //
CREATE PROCEDURE sp_user_update(
    IN p_user_id INT,
    IN p_username VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_hasspass TEXT
)
BEGIN
    DECLARE user_exists INT;
    
    -- Kiểm tra xem username hoặc email đã tồn tại ở user khác không
    SELECT COUNT(*) INTO user_exists FROM `user`
    WHERE (user_name = p_username OR email = p_email) AND user_id <> p_user_id;

    IF user_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Username hoặc Email không tồn tại';
    ELSE
        -- Nếu mật khẩu NULL, không cập nhật mật khẩu
        IF p_hasspass IS NULL THEN
            UPDATE `user` 
            SET user_name = p_username, email = p_email
            WHERE user_id = p_user_id;
        ELSE
            UPDATE `user` 
            SET user_name = p_username, email = p_email, hass_pass = p_hasspass
            WHERE user_id = p_user_id;
        END IF;
    END IF;
END //
DELIMITER ;
