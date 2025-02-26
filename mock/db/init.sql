-- Create University table
CREATE TABLE IF NOT EXISTS universities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    uniName ENUM('KMUTT', 'KMITL', 'KMUTNB', 'KMUTNB_PR') NOT NULL,
    image VARCHAR(255),
    color_code VARCHAR(50)
);

-- Create Location table
CREATE TABLE IF NOT EXISTS locations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

-- Create User table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'football', 'basketball', 'badminton', 'pingpong', 'athletics') NOT NULL
);

-- Create Point table
CREATE TABLE IF NOT EXISTS points (
    id INT PRIMARY KEY AUTO_INCREMENT,
    universityId INT NOT NULL,
    basketball_points INT DEFAULT 0,
    football_points INT DEFAULT 0,
    pingpong_points INT DEFAULT 0,
    badminton_points INT DEFAULT 0,
    athletics_points INT DEFAULT 0,
    FOREIGN KEY (universityId) REFERENCES universities(id) ON DELETE CASCADE
);

-- Create Football_Match table
CREATE TABLE IF NOT EXISTS football_matches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    team_A_id INT NOT NULL,
    team_B_id INT NOT NULL,
    status ENUM('ongoing', 'break', 'finished') NOT NULL,
    time TIME NOT NULL,
    locationId INT NOT NULL,
    score_A INT DEFAULT 0,
    score_B INT DEFAULT 0,
    FOREIGN KEY (locationId) REFERENCES locations(id) ON DELETE CASCADE,
    FOREIGN KEY (team_A_id) REFERENCES universities(id) ON DELETE CASCADE,
    FOREIGN KEY (team_B_id) REFERENCES universities(id) ON DELETE CASCADE
);

-- Create Basketball_Match table
CREATE TABLE IF NOT EXISTS basketball_matches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    team_A_id INT NOT NULL,
    team_B_id INT NOT NULL,
    status ENUM('ongoing', 'break', 'finished') NOT NULL,
    time TIME NOT NULL,
    locationId INT NOT NULL,
    score_A_Q1 INT DEFAULT 0,
    score_A_Q2 INT DEFAULT 0,
    score_B_Q1 INT DEFAULT 0,
    score_B_Q2 INT DEFAULT 0,
    score_A_OT INT DEFAULT 0,
    score_B_OT INT DEFAULT 0,
    FOREIGN KEY (locationId) REFERENCES locations(id) ON DELETE CASCADE,
    FOREIGN KEY (team_A_id) REFERENCES universities(id) ON DELETE CASCADE,
    FOREIGN KEY (team_B_id) REFERENCES universities(id) ON DELETE CASCADE
);

-- Create Pingpong_Match table
CREATE TABLE IF NOT EXISTS pingpong_matches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('mix', 'single_male', 'single_female', 'pair_male', 'pair_female') NOT NULL,
    team_A_id INT NOT NULL,
    team_B_id INT NOT NULL,
    locationId INT NOT NULL,
    time TIME NOT NULL,
    FOREIGN KEY (locationId) REFERENCES locations(id) ON DELETE CASCADE,
    FOREIGN KEY (team_A_id) REFERENCES universities(id) ON DELETE CASCADE,
    FOREIGN KEY (team_B_id) REFERENCES universities(id) ON DELETE CASCADE
);

-- Create Pingpong_Set table
CREATE TABLE IF NOT EXISTS pingpong_sets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pingpong_match_id INT NOT NULL,
    round INT NOT NULL,
    score_A INT DEFAULT 0,
    score_B INT DEFAULT 0,
    FOREIGN KEY (pingpong_match_id) REFERENCES pingpong_matches(id) ON DELETE CASCADE
);

-- Create Badminton_Match table
CREATE TABLE IF NOT EXISTS badminton_matches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('mix', 'single_male', 'single_female', 'pair_male', 'pair_female') NOT NULL,
    team_A_id INT NOT NULL,
    team_B_id INT NOT NULL,
    locationId INT NOT NULL,
    time TIME NOT NULL,
    FOREIGN KEY (locationId) REFERENCES locations(id) ON DELETE CASCADE,
    FOREIGN KEY (team_A_id) REFERENCES universities(id) ON DELETE CASCADE,
    FOREIGN KEY (team_B_id) REFERENCES universities(id) ON DELETE CASCADE
);

-- Create Badminton_Set table
CREATE TABLE IF NOT EXISTS badminton_sets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    badminton_match_id INT NOT NULL,
    round INT NOT NULL,
    score_A INT DEFAULT 0,
    score_B INT DEFAULT 0,
    FOREIGN KEY (badminton_match_id) REFERENCES badminton_matches(id) ON DELETE CASCADE
);

-- Create Athletics_Match table
CREATE TABLE IF NOT EXISTS athletics_matches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event ENUM('100m_male', '100m_female', '400m_male', '400m_female') NOT NULL,
    team_A_id INT NOT NULL,
    team_B_id INT NOT NULL,
    team_C_id INT NOT NULL,
    team_D_id INT NOT NULL,
    time TIME NOT NULL,
    locationId INT NOT NULL,
    score_A INT DEFAULT 0,
    score_B INT DEFAULT 0,
    score_C INT DEFAULT 0,
    score_D INT DEFAULT 0,
    FOREIGN KEY (locationId) REFERENCES locations(id),
    FOREIGN KEY (team_A_id) REFERENCES universities(id) ON DELETE CASCADE,
    FOREIGN KEY (team_B_id) REFERENCES universities(id) ON DELETE CASCADE,
    FOREIGN KEY (team_C_id) REFERENCES universities(id) ON DELETE CASCADE,
    FOREIGN KEY (team_D_id) REFERENCES universities(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS schedules (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('football', 'basketball', 'pingpong', 'badminton', 'athletics') NOT NULL,
    team_A_id INT NOT NULL,
    team_B_id INT NOT NULL,
    time TIME NOT NULL,
    locationId INT NOT NULL,
    FOREIGN KEY (locationId) REFERENCES locations(id) ON DELETE CASCADE,
    FOREIGN KEY (team_A_id) REFERENCES universities(id) ON DELETE CASCADE,
    FOREIGN KEY (team_B_id) REFERENCES universities(id) ON DELETE CASCADE
);



-- Insert mock data into universities
INSERT INTO universities (uniName, image, color_code) VALUES
('KMUTT', 'kmutt_logo.png', '#FF5733'),
('KMITL', 'kmitl_logo.png', '#FFC300'),
('KMUTNB', 'kmutnb_logo.png', '#28A745'),
('KMUTNB_PR', 'kmutnbpr_logo.png', '#007BFF');

-- Insert mock data into locations (ensuring every match has a valid location)
INSERT INTO locations (name) VALUES
('Stadium A'),
('Stadium B'),
('Indoor Court'),
('Outdoor Court');

-- Insert mock data into users
INSERT INTO users (username, password, role) VALUES
('admin1', 'hashedpassword1', 'admin'),
('coach_football', 'hashedpassword2', 'football'),
('coach_basketball', 'hashedpassword3', 'basketball'),
('coach_badminton', 'hashedpassword4', 'badminton'),
('coach_pingpong', 'hashedpassword5', 'pingpong'),
('coach_athletics', 'hashedpassword6', 'athletics');

-- Insert mock data into points
INSERT INTO points (universityId, basketball_points, football_points, pingpong_points, badminton_points, athletics_points) VALUES
(1, 10, 8, 5, 7, 9),
(2, 12, 9, 6, 8, 10),
(3, 8, 7, 4, 5, 6),
(4, 14, 11, 7, 10, 12);

-- Insert mock data into football_matches
INSERT INTO football_matches (team_A_id, team_B_id, status, time, locationId, score_A, score_B) VALUES
(1, 2, 'ongoing', '14:00:00', 1, 1, 2),
(3, 4, 'break', '16:30:00', 2, 0, 1),
(2, 3, 'finished', '18:00:00', 3, 3, 1);

-- Insert mock data into basketball_matches
INSERT INTO basketball_matches (team_A_id, team_B_id, status, time, locationId, score_A_Q1, score_A_Q2, score_B_Q1, score_B_Q2, score_A_OT, score_B_OT) VALUES
(1, 3, 'ongoing', '15:00:00', 2, 12, 18, 14, 16, 5, 3),
(2, 4, 'finished', '17:00:00', 3, 20, 25, 22, 19, 0, 0);

-- Insert mock data into pingpong_matches
INSERT INTO pingpong_matches (type, team_A_id, team_B_id, locationId, time) VALUES
('single_male', 1, 2, 3, '13:00:00'),
('pair_female', 3, 4, 4, '14:30:00');

-- Insert mock data into pingpong_sets
INSERT INTO pingpong_sets (pingpong_match_id, round, score_A, score_B) VALUES
(1, 1, 11, 9),
(1, 2, 7, 11),
(1, 3, 11, 8);

-- Insert mock data into badminton_matches
INSERT INTO badminton_matches (type, team_A_id, team_B_id, locationId, time) VALUES
('single_female', 1, 3, 1, '16:00:00'),
('pair_male', 2, 4, 2, '17:30:00');

-- Insert mock data into badminton_sets
INSERT INTO badminton_sets (badminton_match_id, round, score_A, score_B) VALUES
(1, 1, 21, 19),
(1, 2, 18, 21),
(1, 3, 21, 17);

-- Insert mock data into athletics_matches
-- Insert mock data into athletics_matches
INSERT INTO athletics_matches (event, team_A_id, team_B_id, team_C_id, team_D_id, time, locationId, score_A, score_B, score_C, score_D) VALUES
('100m_male', 1, 2, 3, 4, '10:00:00', 3, 9, 11, 10, 8),
('400m_female', 1, 2, 3, 4, '11:30:00', 4, 55, 58, 52, 57);


-- Insert mock data into schedules
INSERT INTO schedules (type, team_A_id, team_B_id, time, locationId) VALUES
('football', 1, 2, '14:00:00', 1),
('football', 3, 4, '16:30:00', 2),
('basketball', 2, 3, '15:00:00', 3),
('basketball', 1, 4, '17:00:00', 4),
('pingpong', 1, 3, '13:30:00', 1),
('pingpong', 2, 4, '14:45:00', 2),
('badminton', 1, 2, '16:15:00', 3),
('badminton', 3, 4, '17:45:00', 4),
('athletics', 1, 4, '10:00:00', 1),
('athletics', 2, 3, '11:30:00', 2);
