-- Create University table
CREATE TABLE IF NOT EXISTS University (
    id INT PRIMARY KEY AUTO_INCREMENT,
    uniName ENUM('KMUTT', 'KMITL', 'KMUTNB', 'KMUTNB_PR'),
    image VARCHAR(255),
    color_code VARCHAR(50)
);

-- Create Location table
CREATE TABLE IF NOT EXISTS Location (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

-- Create User table
CREATE TABLE IF NOT EXISTS User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'football', 'basketball', 'badminton', 'pingpong', 'athletics')
);

-- Create Point table
CREATE TABLE IF NOT EXISTS Point (
    id INT PRIMARY KEY AUTO_INCREMENT,
    univesityId INT,
    basketballId INT,
    footballId INT,
    pingpongId INT,
    badmintonId INT,
    athleticsId INT,
    FOREIGN KEY (univesityId) REFERENCES University(id)
);

-- Create Football_Match table
CREATE TABLE IF NOT EXISTS Football_Match (
    id INT PRIMARY KEY AUTO_INCREMENT,
    team_A_id INT,
    team_B_id INT,
    status ENUM('ongoing', 'break', 'finished'),
    time TIME,
    locationId INT,
    score_A INT,
    score_B INT,
    FOREIGN KEY (locationId) REFERENCES Location(id),
    FOREIGN KEY (team_A_id) REFERENCES University(id),
    FOREIGN KEY (team_B_id) REFERENCES University(id)
);

-- Create Basketball_Match table
CREATE TABLE IF NOT EXISTS Basketball_Match (
    id INT PRIMARY KEY AUTO_INCREMENT,
    team_A_id INT,
    team_B_id INT,
    status ENUM('ongoing', 'break', 'finished'),
    time TIME,
    locationId INT,
    score_A_Q1 INT,
    score_A_Q2 INT,
    score_B_Q1 INT,
    score_B_Q2 INT,
    score_A_OT INT,
    score_B_OT INT,
    FOREIGN KEY (locationId) REFERENCES Location(id),
    FOREIGN KEY (team_A_id) REFERENCES University(id),
    FOREIGN KEY (team_B_id) REFERENCES University(id)
);

-- Create Pingpong_Match table
CREATE TABLE IF NOT EXISTS Pingpong_Match (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('mix', 'single male', 'single female', 'pair male', 'pair female'),
    team_A_id INT,
    team_B_id INT,
    locationId INT,
    time TIME,
    FOREIGN KEY (locationId) REFERENCES Location(id),
    FOREIGN KEY (team_A_id) REFERENCES University(id),
    FOREIGN KEY (team_B_id) REFERENCES University(id)
);

-- Create Pingpong_Set table
CREATE TABLE IF NOT EXISTS Pingpong_Set (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pingpong_match_id INT,
    round INT,
    score_A INT,
    score_B INT,
    FOREIGN KEY (pingpong_match_id) REFERENCES Pingpong_Match(id)
);

-- Create Badminton_Match table
CREATE TABLE IF NOT EXISTS Badminton_Match (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('mix', 'single male', 'single female', 'pair male', 'pair female'),
    team_A_id INT,
    team_B_id INT,
    locationId INT,
    time TIME,
    FOREIGN KEY (locationId) REFERENCES Location(id),
    FOREIGN KEY (team_A_id) REFERENCES University(id),
    FOREIGN KEY (team_B_id) REFERENCES University(id)
);

-- Create Badminton_Set table
CREATE TABLE IF NOT EXISTS Badminton_Set (
    id INT PRIMARY KEY AUTO_INCREMENT,
    badminton_match_id INT,
    round INT,
    score_A INT,
    score_B INT,
    FOREIGN KEY (badminton_match_id) REFERENCES Badminton_Match(id)
);

-- Create Athletics_Match table
CREATE TABLE IF NOT EXISTS Athletics_Match (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('100m male', '100m female', '400m male', '400m female'),
    team_A_id INT,
    team_B_id INT,
    time TIME,
    locationId INT,
    score_A INT,
    score_B INT,
    FOREIGN KEY (locationId) REFERENCES Location(id),
    FOREIGN KEY (team_A_id) REFERENCES University(id),
    FOREIGN KEY (team_B_id) REFERENCES University(id)
);