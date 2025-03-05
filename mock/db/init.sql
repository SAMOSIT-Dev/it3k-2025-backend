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
CREATE TABLE IF NOT EXISTS admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'admin_football', 'admin_basketball', 'admin_badminton', 'admin_pingpong', 'admin_athletics') NOT NULL
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(255) NOT NULL,
    admin_id INT NOT NULL,
    expires_at DATETIME NOT NULL,
    is_revoked BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id)
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
    status ENUM('upcoming','ongoing', 'break', 'finished') NOT NULL DEFAULT 'upcoming',
    timeStart DATETIME NOT NULL,
    timeEnd DATETIME NOT NULL,
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
    status ENUM('upcoming','ongoing', 'break', 'finished') NOT NULL  DEFAULT 'upcoming',
    timeStart TIMESTAMP NOT NULL,
    timeEnd TIMESTAMP NOT NULL,
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
    team_A_number INT NOT NULL,
    team_B_number INT NOT NULL,
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
    team_A_number INT NOT NULL,
    team_B_number INT NOT NULL,
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
INSERT INTO admins (username, password, role) VALUES
('super_admin111', 'hashedpassword1', 'super_admin'),
('coach_football', 'hashedpassword2', 'admin_football'),
('coach_basketball', 'hashedpassword3', 'admin_basketball'),
('coach_badminton', 'hashedpassword4', 'admin_badminton'),
('coach_pingpong', 'hashedpassword5', 'admin_pingpong'),
('coach_athletics', 'hashedpassword6', 'admin_athletics');

-- Insert mock data into points
INSERT INTO points (universityId, basketball_points, football_points, pingpong_points, badminton_points, athletics_points) VALUES
(1, 10, 8, 5, 7, 9),
(2, 12, 9, 6, 8, 10),
(3, 8, 7, 4, 5, 6),
(4, 14, 11, 7, 10, 12);

-- Insert mock data into football_matches
INSERT INTO football_matches (team_A_id, team_B_id, status, timeStart, timeEnd, locationId, score_A, score_B) VALUES
(1, 2, 'ongoing', '2025-03-01 16:30:00', '2025-03-01 18:30:00', 1, 1, 2),
(3, 4, 'break', '2025-03-01 16:30:00', '2025-03-01 18:00:00', 2, 0, 1),
(2, 3, 'finished', '2025-03-01 15:00:00', '2025-03-01 17:00:00', 3, 3, 1);

-- Insert mock data into basketball_matches
INSERT INTO Basketball_Match (team_A_id, team_B_id, status, timeStart, timeEnd, locationId, score_A_Q1, score_A_Q2, score_B_Q1, score_B_Q2, score_A_OT, score_B_OT) VALUES
(1, 3, 'finished', '2025-03-9 09:00:00', '2025-02-9 09:25:00', 1, 32, 3, 12, 2, 1, 2),
(4, 2, 'ongoing', '2025-03-9 09:35:00', '2025-02-9 10:00:00', 1, 32, 21, 31, 4, 2, 0),
(1, 2, 'upcoming', '2025-03-9 10:10:00', '2025-02-9 10:35:00', 1, 0, 0, 0, 0, 0, 0),
(3, 4, 'upcoming', '2025-03-9 10:45:00', '2025-02-9 11:10:00', 1, 0, 0, 0, 0, 0, 0),
(1, 4, 'upcoming', '2025-03-9 11:20:00', '2025-02-9 11:45:00', 1, 0, 0, 0, 0, 0, 0),
(3, 2, 'upcoming', '2025-03-9 11:55:00', '2025-02-9 12:20:00', 1, 0, 0, 0, 0, 0, 0);

-- Insert mock data into pingpong_matches (8 matches per type, only 4 teams, shuffled team_A_number)
INSERT INTO pingpong_matches (type, team_A_id, team_B_id, locationId, time, team_A_number, team_B_number) VALUES
-- mix
('mix', 1, 2, 1, '09:00:00', 1, 2),
('mix', 3, 4, 2, '09:30:00', 2, 1),
('mix', 1, 3, 1, '10:00:00', 2, 1),
('mix', 2, 4, 2, '10:30:00', 1, 2),
('mix', 1, 4, 3, '11:00:00', 1, 2),
('mix', 2, 3, 3, '11:30:00', 2, 1),
('mix', 3, 1, 4, '12:00:00', 1, 2),
('mix', 4, 2, 4, '12:30:00', 2, 1),

-- single_male
('single_male', 1, 2, 1, '13:00:00', 1, 1),
('single_male', 3, 4, 2, '13:30:00', 2, 2),
('single_male', 1, 3, 1, '14:00:00', 2, 1),
('single_male', 2, 4, 2, '14:30:00', 1, 2),
('single_male', 1, 4, 3, '15:00:00', 1, 1),
('single_male', 2, 3, 3, '15:30:00', 2, 2),
('single_male', 3, 1, 4, '16:00:00', 1, 1),
('single_male', 4, 2, 4, '16:30:00', 2, 2),

-- single_female
('single_female', 1, 2, 1, '17:00:00', 1, 1),
('single_female', 3, 4, 2, '17:30:00', 2, 2),
('single_female', 1, 3, 1, '18:00:00', 2, 1),
('single_female', 2, 4, 2, '18:30:00', 1, 2),
('single_female', 1, 4, 3, '19:00:00', 1, 1),
('single_female', 2, 3, 3, '19:30:00', 2, 2),
('single_female', 3, 1, 4, '20:00:00', 1, 1),
('single_female', 4, 2, 4, '20:30:00', 2, 2),

-- pair_male
('pair_male', 1, 2, 1, '08:00:00', 1, 2),
('pair_male', 3, 4, 2, '08:30:00', 2, 1),
('pair_male', 1, 3, 1, '09:00:00', 2, 1),
('pair_male', 2, 4, 2, '09:30:00', 1, 2),
('pair_male', 1, 4, 3, '10:00:00', 1, 2),
('pair_male', 2, 3, 3, '10:30:00', 2, 1),
('pair_male', 3, 1, 4, '11:00:00', 1, 2),
('pair_male', 4, 2, 4, '11:30:00', 2, 1),

-- pair_female
('pair_female', 1, 2, 1, '12:00:00', 1, 2),
('pair_female', 3, 4, 2, '12:30:00', 2, 1),
('pair_female', 1, 3, 1, '13:00:00', 2, 1),
('pair_female', 2, 4, 2, '13:30:00', 1, 2),
('pair_female', 1, 4, 3, '14:00:00', 1, 2),
('pair_female', 2, 3, 3, '14:30:00', 2, 1),
('pair_female', 3, 1, 4, '15:00:00', 1, 2),
('pair_female', 4, 2, 4, '15:30:00', 2, 1);

-- Insert mock data into pingpong_sets
INSERT INTO pingpong_sets (pingpong_match_id, round, score_A, score_B) VALUES
(1, 1, 11, 9), (1, 2, 8, 11), (1, 3, 11, 7),
(2, 1, 9, 11), (2, 2, 11, 6), (2, 3, 10, 12),
(3, 1, 11, 5), (3, 2, 9, 11), (3, 3, 11, 8),
(4, 1, 10, 12), (4, 2, 11, 9), (4, 3, 8, 11),
(5, 1, 11, 6), (5, 2, 7, 11), (5, 3, 11, 9),
(6, 1, 8, 11), (6, 2, 11, 5), (6, 3, 9, 11),
(7, 1, 11, 7), (7, 2, 9, 11), (7, 3, 11, 6),
(8, 1, 10, 12), (8, 2, 11, 8), (8, 3, 7, 11),
(9, 1, 11, 5), (9, 2, 9, 11), (9, 3, 11, 8),
(10, 1, 10, 12), (10, 2, 11, 6), (10, 3, 9, 11),
(11, 1, 11, 9), (11, 2, 8, 11), (11, 3, 11, 7),
(12, 1, 9, 11), (12, 2, 11, 5), (12, 3, 10, 12),
(13, 1, 11, 6), (13, 2, 7, 11), (13, 3, 11, 9),
(14, 1, 8, 11), (14, 2, 11, 5), (14, 3, 9, 11),
(15, 1, 11, 7), (15, 2, 9, 11), (15, 3, 11, 6),
(16, 1, 10, 12), (16, 2, 11, 8), (16, 3, 7, 11),
(17, 1, 11, 5), (17, 2, 9, 11), (17, 3, 11, 8),
(18, 1, 10, 12), (18, 2, 11, 6), (18, 3, 9, 11),
(19, 1, 11, 9), (19, 2, 8, 11), (19, 3, 11, 7),
(20, 1, 9, 11), (20, 2, 11, 5), (20, 3, 10, 12),
(21, 1, 11, 6), (21, 2, 7, 11), (21, 3, 11, 9),
(22, 1, 8, 11), (22, 2, 11, 5), (22, 3, 9, 11),
(23, 1, 11, 7), (23, 2, 9, 11), (23, 3, 11, 6),
(24, 1, 10, 12), (24, 2, 11, 8), (24, 3, 7, 11),
(25, 1, 11, 5), (25, 2, 9, 11), (25, 3, 11, 8),
(26, 1, 10, 12), (26, 2, 11, 6), (26, 3, 9, 11),
(27, 1, 11, 9), (27, 2, 8, 11), (27, 3, 11, 7),
(28, 1, 9, 11), (28, 2, 11, 5), (28, 3, 10, 12),
(29, 1, 11, 6), (29, 2, 7, 11), (29, 3, 11, 9),
(30, 1, 8, 11), (30, 2, 11, 5), (30, 3, 9, 11),
(31, 1, 11, 7), (31, 2, 9, 11), (31, 3, 11, 6),
(32, 1, 10, 12), (32, 2, 11, 8), (32, 3, 7, 11),
(33, 1, 11, 5), (33, 2, 9, 11), (33, 3, 11, 8),
(34, 1, 10, 12), (34, 2, 11, 6), (34, 3, 9, 11),
(35, 1, 11, 9), (35, 2, 8, 11), (35, 3, 11, 7),
(36, 1, 9, 11), (36, 2, 11, 5), (36, 3, 10, 12),
(37, 1, 11, 6), (37, 2, 7, 11), (37, 3, 11, 9),
(38, 1, 8, 11), (38, 2, 11, 5), (38, 3, 9, 11),
(39, 1, 11, 7), (39, 2, 9, 11), (39, 3, 11, 6),
(40, 1, 10, 12), (40, 2, 11, 8), (40, 3, 7, 11);


-- Insert mock data into pingpong_matches (8 matches per type, only 4 teams, shuffled team_A_number)
INSERT INTO badminton_matches (type, team_A_id, team_B_id, locationId, time, team_A_number, team_B_number) VALUES
-- mix
('mix', 1, 2, 1, '09:00:00', 1, 2),
('mix', 3, 4, 2, '09:30:00', 2, 1),
('mix', 1, 3, 1, '10:00:00', 2, 1),
('mix', 2, 4, 2, '10:30:00', 1, 2),
('mix', 1, 4, 3, '11:00:00', 1, 2),
('mix', 2, 3, 3, '11:30:00', 2, 1),
('mix', 3, 1, 4, '12:00:00', 1, 2),
('mix', 4, 2, 4, '12:30:00', 2, 1),

-- single_male
('single_male', 1, 2, 1, '13:00:00', 1, 1),
('single_male', 3, 4, 2, '13:30:00', 2, 2),
('single_male', 1, 3, 1, '14:00:00', 2, 1),
('single_male', 2, 4, 2, '14:30:00', 1, 2),
('single_male', 1, 4, 3, '15:00:00', 1, 1),
('single_male', 2, 3, 3, '15:30:00', 2, 2),
('single_male', 3, 1, 4, '16:00:00', 1, 1),
('single_male', 4, 2, 4, '16:30:00', 2, 2),

-- single_female
('single_female', 1, 2, 1, '17:00:00', 1, 1),
('single_female', 3, 4, 2, '17:30:00', 2, 2),
('single_female', 1, 3, 1, '18:00:00', 2, 1),
('single_female', 2, 4, 2, '18:30:00', 1, 2),
('single_female', 1, 4, 3, '19:00:00', 1, 1),
('single_female', 2, 3, 3, '19:30:00', 2, 2),
('single_female', 3, 1, 4, '20:00:00', 1, 1),
('single_female', 4, 2, 4, '20:30:00', 2, 2),

-- pair_male
('pair_male', 1, 2, 1, '08:00:00', 1, 2),
('pair_male', 3, 4, 2, '08:30:00', 2, 1),
('pair_male', 1, 3, 1, '09:00:00', 2, 1),
('pair_male', 2, 4, 2, '09:30:00', 1, 2),
('pair_male', 1, 4, 3, '10:00:00', 1, 2),
('pair_male', 2, 3, 3, '10:30:00', 2, 1),
('pair_male', 3, 1, 4, '11:00:00', 1, 2),
('pair_male', 4, 2, 4, '11:30:00', 2, 1),

-- pair_female
('pair_female', 1, 2, 1, '12:00:00', 1, 2),
('pair_female', 3, 4, 2, '12:30:00', 2, 1),
('pair_female', 1, 3, 1, '13:00:00', 2, 1),
('pair_female', 2, 4, 2, '13:30:00', 1, 2),
('pair_female', 1, 4, 3, '14:00:00', 1, 2),
('pair_female', 2, 3, 3, '14:30:00', 2, 1),
('pair_female', 3, 1, 4, '15:00:00', 1, 2),
('pair_female', 4, 2, 4, '15:30:00', 2, 1);

INSERT INTO badminton_sets (badminton_match_id, round, score_A, score_B) VALUES
(1, 1, 11, 9), (1, 2, 8, 11), (1, 3, 11, 7),
(2, 1, 9, 11), (2, 2, 11, 6), (2, 3, 10, 12),
(3, 1, 11, 5), (3, 2, 9, 11), (3, 3, 11, 8),
(4, 1, 10, 12), (4, 2, 11, 9), (4, 3, 8, 11),
(5, 1, 11, 6), (5, 2, 7, 11), (5, 3, 11, 9),
(6, 1, 8, 11), (6, 2, 11, 5), (6, 3, 9, 11),
(7, 1, 11, 7), (7, 2, 9, 11), (7, 3, 11, 6),
(8, 1, 10, 12), (8, 2, 11, 8), (8, 3, 7, 11),
(9, 1, 11, 5), (9, 2, 9, 11), (9, 3, 11, 8),
(10, 1, 10, 12), (10, 2, 11, 6), (10, 3, 9, 11),
(11, 1, 11, 9), (11, 2, 8, 11), (11, 3, 11, 7),
(12, 1, 9, 11), (12, 2, 11, 5), (12, 3, 10, 12),
(13, 1, 11, 6), (13, 2, 7, 11), (13, 3, 11, 9),
(14, 1, 8, 11), (14, 2, 11, 5), (14, 3, 9, 11),
(15, 1, 11, 7), (15, 2, 9, 11), (15, 3, 11, 6),
(16, 1, 10, 12), (16, 2, 11, 8), (16, 3, 7, 11),
(17, 1, 11, 5), (17, 2, 9, 11), (17, 3, 11, 8),
(18, 1, 10, 12), (18, 2, 11, 6), (18, 3, 9, 11),
(19, 1, 11, 9), (19, 2, 8, 11), (19, 3, 11, 7),
(20, 1, 9, 11), (20, 2, 11, 5), (20, 3, 10, 12),
(21, 1, 11, 6), (21, 2, 7, 11), (21, 3, 11, 9),
(22, 1, 8, 11), (22, 2, 11, 5), (22, 3, 9, 11),
(23, 1, 11, 7), (23, 2, 9, 11), (23, 3, 11, 6),
(24, 1, 10, 12), (24, 2, 11, 8), (24, 3, 7, 11),
(25, 1, 11, 5), (25, 2, 9, 11), (25, 3, 11, 8),
(26, 1, 10, 12), (26, 2, 11, 6), (26, 3, 9, 11),
(27, 1, 11, 9), (27, 2, 8, 11), (27, 3, 11, 7),
(28, 1, 9, 11), (28, 2, 11, 5), (28, 3, 10, 12),
(29, 1, 11, 6), (29, 2, 7, 11), (29, 3, 11, 9),
(30, 1, 8, 11), (30, 2, 11, 5), (30, 3, 9, 11),
(31, 1, 11, 7), (31, 2, 9, 11), (31, 3, 11, 6),
(32, 1, 10, 12), (32, 2, 11, 8), (32, 3, 7, 11),
(33, 1, 11, 5), (33, 2, 9, 11), (33, 3, 11, 8),
(34, 1, 10, 12), (34, 2, 11, 6), (34, 3, 9, 11),
(35, 1, 11, 9), (35, 2, 8, 11), (35, 3, 11, 7),
(36, 1, 9, 11), (36, 2, 11, 5), (36, 3, 10, 12),
(37, 1, 11, 6), (37, 2, 7, 11), (37, 3, 11, 9),
(38, 1, 8, 11), (38, 2, 11, 5), (38, 3, 9, 11),
(39, 1, 11, 7), (39, 2, 9, 11), (39, 3, 11, 6),
(40, 1, 10, 12), (40, 2, 11, 8), (40, 3, 7, 11);


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
