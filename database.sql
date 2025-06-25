CREATE DATABASE backend_week6;
USE backend_week6;

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE journalists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(50),
    bio TEXT
);

CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    journalistId INT REFERENCES journalists(id),
    categoryId INT REFERENCES categories(id)
);

INSERT INTO categories (name) VALUES
('Technology'),
('Politics'),
('Science'),
('Health'),
('Sports'),
('Education'),
('Travel'),
('Entertainment'),
('Business'),
('Environment');

INSERT INTO journalists (name, email, bio) VALUES
('Alice Smith', 'alice@example.com', 'Tech journalist with 10 years of experience.'),
('Bob Johnson', 'bob@example.com', 'Covers politics and international affairs.'),
('Clara Nguyen', 'clara@example.com', 'Science and innovation writer.'),
('David Lee', 'david@example.com', 'Health and wellness reporter.'),
('Emma Brown', 'emma@example.com', 'Sports journalist and former athlete.'),
('Frank Garcia', 'frank@example.com', 'Education sector writer.'),
('Grace Kim', 'grace@example.com', 'Travel and culture reporter.'),
('Henry White', 'henry@example.com', 'Entertainment news editor.'),
('Isla Thomas', 'isla@example.com', 'Business and finance expert.'),
('Jack Wilson', 'jack@example.com', 'Environment and climate journalist.');

INSERT INTO articles (title, content, journalistId, categoryId) VALUES
('The Rise of AI', 'Exploring how AI is transforming industries.', 1, 1),
('Election Predictions 2025', 'Analyzing upcoming election trends.', 2, 2),
('Water on Mars?', 'NASA confirms new findings about water.', 3, 3),
('Healthy Living Tips', 'Tips to stay healthy in busy life.', 4, 4),
('World Cup Highlights', 'Top moments from the latest tournament.', 5, 5),
('Education in 2030', 'Predictions on the future of education.', 6, 6),
('Travel During Holidays', 'Top places to visit during holidays.', 7, 7),
('Behind the Scenes of the Oscars', 'What you didn’t see on TV.', 8, 8),
('AI in Finance', 'How AI is being used in financial markets.', 1, 9),
('Climate Change and Politics', 'The intersection of climate and policy.', 2, 10);
