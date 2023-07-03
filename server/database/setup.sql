DROP TABLE IF EXISTS class_student;
DROP TABLE IF EXISTS class_skill;
DROP TABLE IF EXISTS class;
DROP TABLE IF EXISTS skill;
DROP TABLE IF EXISTS user_jobs;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS token;
-- can't use 'user' as a table name
DROP TABLE IF EXISTS user_account;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    name VARCHAR(30) UNIQUE NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

CREATE TABLE jobs (
    job_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL, 
    job_subject VARCHAR(50) UNIQUE NOT NULL,
    job_description VARCHAR(500),
    job_location VARCHAR(100) ,
    job_requirements VARCHAR(100), 
    PRIMARY KEY (job_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

CREATE TABLE user_jobs(
    user_jobs_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    job_id INT NOT NULL,
    PRIMARY KEY (user_jobs_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id"),
    FOREIGN KEY (job_id) REFERENCES jobs("job_id")
);

CREATE TABLE class (
    class_id INT GENERATED ALWAYS AS IDENTITY,
    teacher_id INT NOT NULL,
    name VARCHAR(50) UNIQUE NOT NULL,
    summary VARCHAR(500),
    main_image_url VARCHAR(500),
    start_date BIGINT NOT NULL,
    end_date BIGINT NOT NULL,
    PRIMARY KEY (class_id),
    FOREIGN KEY (teacher_id) REFERENCES user_account("user_id")
);

CREATE TABLE skill (
    skill_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(500),
    image_id VARCHAR(500),
    PRIMARY KEY (skill_id)
);

CREATE TABLE class_student (
    class_student_id INT GENERATED ALWAYS AS IDENTITY,
    class_id INT NOT NULL,
    student_id INT NOT NULL,
    PRIMARY KEY (class_student_id),
    FOREIGN KEY (class_id) REFERENCES class("class_id"),
    FOREIGN KEY (student_id) REFERENCES user_account("user_id")
);

CREATE TABLE class_skill (
    class_skill_id INT GENERATED ALWAYS AS IDENTITY,
    class_id INT NOT NULL,
    skill_id INT NOT NULL,
    PRIMARY KEY (class_skill_id),
    FOREIGN KEY (class_id) REFERENCES class("class_id"),
    FOREIGN KEY (skill_id) REFERENCES skill("skill_id")
);

INSERT INTO user_account (username, password, name)
VALUES 
    ('florin', '$2b$10$.pj1LTt4HxpVVg6fZDhdFOMBfiywBTikuDqx3KjDy85aJNyZ4IoJC', 'Florin Florinberg'),
    ('Student', '$2b$10$.pj1LTt4HxpVVg6fZDhdFOMBfiywBTikuDqx3KjDy85aJNyZ4IoJC', 'Stu Dent');
-- the password is 1

INSERT INTO class (name, summary, start_date, end_date, teacher_id)
VALUES 
    ('Gardening 101', 'Learn to garden so you don''t have to hire one', 1688230800, 1688230800, 1);

INSERT INTO skill (name, description, image_id)
VALUES 
    ('Gardening Pro', 'Has professional gardening ability', 54);

INSERT INTO class_skill (class_id, skill_id)
VALUES 
    (1, 1);

INSERT INTO class_student (class_id, student_id)
VALUES 
    (1, 2);

INSERT INTO jobs (user_id,job_subject,job_description,job_location,job_requirements)
VALUES
    (1,'Landscaper Needed','We desperately need a landscaper to help with the area outside of the Town Hall','Florian','Gardening, Landscaping, etc');


