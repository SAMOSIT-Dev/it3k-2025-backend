CREATE DATABASE admin_db;
use admin_db;


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

-- Create Basketball_Match table
CREATE TABLE IF NOT EXISTS Basketball_Match (
    id INT PRIMARY KEY AUTO_INCREMENT,
    team_A_id INT,
    team_B_id INT,
    status ENUM('ongoing', 'break', 'finished'),
    timeStart TIME,
    timeEnd TIME,
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

-- Insert mock data into University
INSERT INTO University (uniName, image, color_code) VALUES
('KMUTT', 'kmutt_logo.png', '#FF0000'),
('KMITL', 'kmitl_logo.png', '#FFA500'),
('KMUTNB', 'kmutnb_logo.png', '#0000FF'),
('KMUTNB_PR', 'kmutnb_pr_logo.png', '#008000');

-- Insert mock data into Location
INSERT INTO Location (name) VALUES
('Gymnasium');

-- Insert mock data into Basketball_Match
INSERT INTO Basketball_Match (team_A_id, team_B_id, status, timeStart, timeEnd, locationId, score_A_Q1, score_A_Q2, score_B_Q1, score_B_Q2, score_A_OT, score_B_OT) VALUES
(1, 3, 'ongoing', '09:00', '09:25', 1, 0, 0, 0, 0, 0, 0),
(4, 2, 'ongoing', '09:35', '10:00', 1, 0, 0, 0, 0, 0, 0),
(1, 2, 'ongoing', '10:10', '10:35', 1, 0, 0, 0, 0, 0, 0),
(3, 4, 'ongoing', '10:45', '11:10', 1, 0, 0, 0, 0, 0, 0),
(1, 4, 'ongoing', '11:20', '11:45', 1, 0, 0, 0, 0, 0, 0),
(3, 2, 'ongoing', '11:55', '12:20', 1, 0, 0, 0, 0, 0, 0);
