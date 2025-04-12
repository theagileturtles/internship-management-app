CREATE DATABASE IF NOT EXISTS internship_management_app;
USE internship_management_app;

-- Roles Table
CREATE TABLE roles (
 id INT PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(64),
 alias VARCHAR(64)
);

-- Departments Table
CREATE TABLE departments (
 id INT PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(64),
 alias VARCHAR(64)
);

-- Users Table
CREATE TABLE users (
 UUID BINARY(16) PRIMARY KEY,
 first_name VARCHAR(64),
 last_name VARCHAR(64),
 password VARCHAR(64), 
 email VARCHAR(256),
 role_id INT,
 created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
 image VARCHAR(300),
 FOREIGN KEY (role_id) REFERENCES roles(id)
);

DELIMITER //

CREATE TRIGGER before_insert_users
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
  IF NEW.UUID IS NULL THEN
    SET NEW.UUID = UUID_TO_BIN(UUID());
  END IF;
END;
//

DELIMITER ;

-- Students Table
CREATE TABLE students (
 school_id VARCHAR(9),
 user_uuid BINARY(16),
 department_id INT,
 PRIMARY KEY (user_uuid),
 FOREIGN KEY (user_uuid) REFERENCES users(UUID),
 FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Instructors Table
CREATE TABLE instructors (
 user_uuid BINARY(16) PRIMARY KEY,
 title VARCHAR(64),
 department_id INT,
 FOREIGN KEY (user_uuid) REFERENCES users(UUID),
 FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Internship Applications Table
CREATE TABLE internship_applications (
 uuid BINARY(16) PRIMARY KEY,
 user_uuid BINARY(16),
 company VARCHAR(64),
 sgk_entry BOOLEAN,
 type ENUM('mandatory', 'optional'),
 status ENUM('pending', 'approved', 'rejected'),
 created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
 updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 FOREIGN KEY (user_uuid) REFERENCES users(UUID)
);

DELIMITER //

CREATE TRIGGER before_insert_internship_applications
BEFORE INSERT ON internship_applications
FOR EACH ROW
BEGIN
  IF NEW.uuid IS NULL THEN
    SET NEW.uuid = UUID_TO_BIN(UUID());
  END IF;
END;
//

DELIMITER ;

-- Internship Opportunities Table
CREATE TABLE internship_opportunities (
 uuid BINARY(16) PRIMARY KEY,
 header VARCHAR(100),
 company VARCHAR(100),
 explanation VARCHAR(100),
 website VARCHAR(256),
 type ENUM('mandatory', 'optional'),
 created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //

CREATE TRIGGER before_insert_internship_opportunities
BEFORE INSERT ON internship_opportunities
FOR EACH ROW
BEGIN
  IF NEW.uuid IS NULL THEN
    SET NEW.uuid = UUID_TO_BIN(UUID());
  END IF;
END;
//

DELIMITER ;

-- Messages Table
CREATE TABLE messages (
 uuid BINARY(16) PRIMARY KEY,
 sender_uuid BINARY(16),
 subject VARCHAR(45),
 message VARCHAR(500),
 created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
 receiver_uuid BINARY(16),
 `read` BOOLEAN,
 FOREIGN KEY (sender_uuid) REFERENCES users(UUID),
 FOREIGN KEY (receiver_uuid) REFERENCES users(UUID)
);

DELIMITER //

CREATE TRIGGER before_insert_messages
BEFORE INSERT ON messages
FOR EACH ROW
BEGIN
  IF NEW.uuid IS NULL THEN
    SET NEW.uuid = UUID_TO_BIN(UUID());
  END IF;
END;
//

DELIMITER ;

-- Letter Requests Table
CREATE TABLE letter_requests (
 uuid BINARY(16) PRIMARY KEY,
 user_uuid BINARY(16),
 company VARCHAR(64),
 type ENUM('internship', 'education', 'other'),
 message VARCHAR(150),
 status ENUM('pending', 'approved', 'rejected'),
 incomplete_internship BOOLEAN,
 created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
 updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 FOREIGN KEY (user_uuid) REFERENCES users(UUID)
);

DELIMITER //

CREATE TRIGGER before_insert_letter_requests
BEFORE INSERT ON letter_requests
FOR EACH ROW
BEGIN
  IF NEW.uuid IS NULL THEN
    SET NEW.uuid = UUID_TO_BIN(UUID());
  END IF;
END;
//

DELIMITER ;

-- Application Forms Table
CREATE TABLE application_forms (
 uuid BINARY(16) PRIMARY KEY,
 department_id INT,
 created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (department_id) REFERENCES departments(id)
);

DELIMITER //

CREATE TRIGGER before_insert_application_forms
BEFORE INSERT ON application_forms
FOR EACH ROW
BEGIN
  IF NEW.uuid IS NULL THEN
    SET NEW.uuid = UUID_TO_BIN(UUID());
  END IF;
END;
//

DELIMITER ;



INSERT INTO departments (name, alias) VALUES
('Computer Engineering', 'CE'),
('Electrical and Electronics Engineering', 'EEE'),
('Mechanical Engineering', 'ME'),
('Civil Engineering', 'CEV'),
('Business Administration', 'BA'),
('Economics', 'ECON'),
('Psychology', 'PSY'),
('Architecture', 'ARCH');


INSERT INTO roles (name, alias) VALUES
('Admin', 'admin'),
('Student', 'student'),
('Instructor', 'instructor'),
('Career Center', 'career-center');


INSERT INTO users (uuid, first_name, last_name, email, password, role_id, image) VALUES
(UUID_TO_BIN('123e4567-e89b-12d3-a456-426614174000'), 'John', 'Doe', 'john.doe@example.com', MD5('password123'), 1, 'https://randomuser.me/api/portraits/men/44.jpg'), -- Admin
(UUID_TO_BIN('223e4567-e89b-12d3-a456-426614174001'), 'Alice', 'Smith', 'alice.smith@example.com', MD5('studentpass'), 2, 'https://randomuser.me/api/portraits/women/45.jpg'), -- Student
(UUID_TO_BIN('323e4567-e89b-12d3-a456-426614174002'), 'Robert', 'Johnson', 'robert.johnson@example.com', MD5('instructorpass'), 3, 'https://randomuser.me/api/portraits/men/46.jpg'), -- Instructor
(UUID_TO_BIN('423e4567-e89b-12d3-a456-426614174003'), 'Emma', 'Williams', 'emma.williams@example.com', MD5('careercenterpass'), 4, 'https://randomuser.me/api/portraits/women/47.jpg'); -- Career Center

-- Insert Robert Johnson (Instructor) into instructors
INSERT INTO instructors (user_uuid, title, department_id) 
VALUES (UUID_TO_BIN('323e4567-e89b-12d3-a456-426614174002'), 'Lecturer', 1);

-- Insert Alice Smith (Student) into students
INSERT INTO students (school_id, user_uuid, department_id) 
VALUES ('190190091', UUID_TO_BIN('223e4567-e89b-12d3-a456-426614174001'), 1);


