-- Tạo cơ sở dữ liệu nếu chưa tồn tại
CREATE DATABASE IF NOT EXISTS landinvest;

-- Sử dụng cơ sở dữ liệu
USE landinvest;

-- Tạo bảng Provinces
CREATE TABLE IF NOT EXISTS Provinces (
    ProvinceID INT PRIMARY KEY AUTO_INCREMENT,
    ProvinceName VARCHAR(255) NOT NULL
);

-- Tạo bảng Groups (sử dụng backtick để tránh từ khóa MySQL)
CREATE TABLE IF NOT EXISTS `Groups` (
    GroupID INT PRIMARY KEY AUTO_INCREMENT,
    GroupName VARCHAR(255) NOT NULL
);

-- Tạo bảng Users
CREATE TABLE IF NOT EXISTS Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    FullName VARCHAR(50) NOT NULL,
    Username VARCHAR(50) UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Phone VARCHAR(20),
    Gender ENUM('Nam', 'Nữ'),
    BirthDate DATE,
    BirthTime TIME,
    ProvinceID INT,
    IsAnonymous TINYINT(1),
    RegistrationIP VARCHAR(45),
    LastLoginIP VARCHAR(45),
    LastActivityTime DATETIME,
    IsLoggedIn BOOLEAN DEFAULT FALSE,
    Role BOOLEAN NOT NULL,
    avatarLink VARCHAR(400),
    Bio VARCHAR(255),
    CurrentAdd VARCHAR(255),
    BirthPlace VARCHAR(255),
    Confirmed BOOLEAN DEFAULT FALSE,
    Blocked BOOLEAN DEFAULT FALSE,
    Create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
);

-- Tạo bảng ForumPosts
CREATE TABLE IF NOT EXISTS ForumPosts (
    PostID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    GroupID INT NOT NULL,
    Title TEXT,
    Content TEXT,
    PostTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    IPPosted VARCHAR(45),
    PostLatitude NUMERIC(10, 8),
    PostLongitude NUMERIC(11, 8),
    UpdatePostAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    timeView INT DEFAULT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (GroupID) REFERENCES `Groups`(GroupID) ON DELETE CASCADE ON UPDATE CASCADE
);


INSERT INTO Users (
    FullName, 
    Username, 
    Password, 
    Email, 
    Phone, 
    Gender, 
    BirthDate, 
    BirthTime, 
    ProvinceID, 
    IsAnonymous, 
    RegistrationIP, 
    LastLoginIP, 
    LastActivityTime, 
    IsLoggedIn, 
    Role, 
    avatarLink, 
    Bio, 
    CurrentAdd, 
    BirthPlace, 
    Confirmed, 
    Blocked, 
    Create_at
) 
VALUES (
    'Hoàng Tiến Thái',        -- FullName
    'hthai1523',          -- Username
    '123456', -- Password (nên mã hóa mật khẩu trước khi lưu)
    'hthai1523@gmail.com', -- Email
    '0964819465',           -- Phone
    'Nam',                  -- Gender (có thể là 'Nam', 'Nữ', 'Đồng tính nữ', 'Đồng tính nam')
    '2003-09-15',          -- BirthDate (theo định dạng YYYY-MM-DD)
    '12:00:00',            -- BirthTime (theo định dạng HH:MM:SS)
    1,                     -- ProvinceID (ID của tỉnh)
    0,                     -- IsAnonymous (0 là không ẩn danh, 1 là ẩn danh)
    '192.168.0.1',         -- RegistrationIP
    '192.168.0.1',         -- LastLoginIP
    NOW(),                 -- LastActivityTime (thời gian hiện tại)
    0,                     -- IsLoggedIn (1 là đăng nhập, 0 là chưa đăng nhập)
    1,                     -- Role (1 có thể là quyền Admin, 0 là người dùng bình thường)
    'https://linktoavatar', -- avatarLink (đường dẫn hình ảnh đại diện)
    'I am a software developer', -- Bio (tiểu sử)
    '123 Street Name',     -- CurrentAdd (địa chỉ hiện tại)
    'Hanoi',               -- BirthPlace (nơi sinh)
    1,                     -- Confirmed (1 là đã xác nhận)
    0,                     -- Blocked (0 là chưa bị chặn, 1 là bị chặn)
    NOW()                  -- Create_at (thời gian tạo tài khoản, sử dụng hàm NOW() để lấy thời gian hiện tại)
);
