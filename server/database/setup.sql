DROP TABLE IF EXISTS class_student;

DROP TABLE IF EXISTS class_skill;

DROP TABLE IF EXISTS user_skill;

DROP TABLE IF EXISTS skill;

DROP TABLE IF EXISTS class;

DROP TABLE IF EXISTS user_jobs;

DROP TABLE IF EXISTS jobs;

DROP TABLE IF EXISTS event_attendee;

DROP TABLE IF EXISTS community_event;

DROP TABLE IF EXISTS token;

-- can't use 'user' as a table name
DROP TABLE IF EXISTS user_account;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    name VARCHAR(30),
    dp_url VARCHAR,
    profile_summary VARCHAR,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

CREATE TABLE community_event (
    event_id INT GENERATED ALWAYS AS IDENTITY,
    creator_id INT NOT NULL,
    name VARCHAR(50) UNIQUE NOT NULL,
    info VARCHAR(1000),
    main_image_url VARCHAR,
    start_date BIGINT NOT NULL,
    end_date BIGINT NOT NULL,
    PRIMARY KEY (event_id),
    FOREIGN KEY (creator_id) REFERENCES user_account("user_id")
);

CREATE TABLE event_attendee (
    event_attendee_id INT GENERATED ALWAYS AS IDENTITY,
    event_id INT NOT NULL,
    attendee_id INT NOT NULL,
    confirmed_at FLOAT DEFAULT extract(
        epoch
        from
            now()
    ),
    PRIMARY KEY (event_attendee_id),
    FOREIGN KEY (event_id) REFERENCES community_event("event_id"),
    FOREIGN KEY (attendee_id) REFERENCES user_account("user_id"),
    UNIQUE (event_id, attendee_id)
);

CREATE TABLE jobs (
    job_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    job_subject VARCHAR(50) UNIQUE NOT NULL,
    job_description VARCHAR(500),
    job_location VARCHAR(100),
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
    creator_id INT NOT NULL,
    name VARCHAR(50) UNIQUE NOT NULL,
    info VARCHAR(1000),
    main_image_url VARCHAR,
    start_date BIGINT NOT NULL,
    end_date BIGINT NOT NULL,
    capacity INT,
    PRIMARY KEY (class_id),
    FOREIGN KEY (creator_id) REFERENCES user_account("user_id")
);

CREATE TABLE class_student (
    class_student_id INT GENERATED ALWAYS AS IDENTITY,
    class_id INT NOT NULL,
    student_id INT NOT NULL,
    enrolled_at FLOAT DEFAULT extract(
        epoch
        from
            now()
    ),
    PRIMARY KEY (class_student_id),
    FOREIGN KEY (class_id) REFERENCES class("class_id"),
    FOREIGN KEY (student_id) REFERENCES user_account("user_id"),
    UNIQUE (class_id, student_id)
);

-- the password is 1
INSERT INTO
    user_account (username, password, name, dp_url,	profile_summary)
VALUES
    (
        'florin',
        '$2b$10$.pj1LTt4HxpVVg6fZDhdFOMBfiywBTikuDqx3KjDy85aJNyZ4IoJC',
        'flo rin',
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
        'My name is florin. Description ... '
    ),
    (
        'Student1',
        '$2b$10$.pj1LTt4HxpVVg6fZDhdFOMBfiywBTikuDqx3KjDy85aJNyZ4IoJC',
        'flo rin',
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
        'My name is florin. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ),
    (
        'Student2',
        '$2b$10$.pj1LTt4HxpVVg6fZDhdFOMBfiywBTikuDqx3KjDy85aJNyZ4IoJC',
        'flo rin',
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
        'My name is florin'
    ),
    (
        'Student3',
        '$2b$10$.pj1LTt4HxpVVg6fZDhdFOMBfiywBTikuDqx3KjDy85aJNyZ4IoJC',
        'flo rin',
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
        'My name is florin'
    ),
    (
        'Student4',
        '$2b$10$.pj1LTt4HxpVVg6fZDhdFOMBfiywBTikuDqx3KjDy85aJNyZ4IoJC',
        'flo rin',
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
        'My name is florin'
    ),
    (
        'Student5',
        '$2b$10$.pj1LTt4HxpVVg6fZDhdFOMBfiywBTikuDqx3KjDy85aJNyZ4IoJC',
        'flo rin',
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
        'My name is florin'
    );

INSERT INTO
    community_event (
        creator_id,
        name,
        info,
        start_date,
        end_date
    )
VALUES
    (
        1,
        'Florin Barbecue',
        'Our annual summer barbecue. Everyone''s invited.',
        1688230800,
        1688240800
    );

INSERT INTO
    event_attendee (event_id, attendee_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3);

INSERT INTO
    class (
        creator_id,
        name,
        info,
        start_date,
        end_date,
        capacity
    )
VALUES
    (
        1,
        'Gardening 101',
        'Learn to garden so you don''t have to hire one',
        1688230800,
        1688240800,
        6
    ),
    (
        1,
        'Garbage Learning',
        'Learn to manage rubbish disposal',
        1688230800,
        1688240800,
        5
    );

INSERT INTO
    class_student (class_id, student_id)
VALUES
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (2, 2);

INSERT INTO
    jobs (
        user_id,
        job_subject,
        job_description,
        job_location,
        job_requirements
    )
VALUES
    (
        1,
        'Landscaper Needed',
        'We desperately need a landscaper to help with the area outside of the Town Hall',
        'Florian',
        'Gardening, Landscaping, etc'
    ),
    (
        1,
        'Baker needed?',
        'Does anybody around here know a local bakers that would be able to make a custom cake for my daughters birthday?',
        'Florian',
        'Baking'
    ),
    (
        1,
        'Emergency Plumber!!!',
        'I need a Plumber to come round asap we have a huge leak',
        'Whittle',
        'Plumber'
    ),
    (
        2,
        'Driveway fitting',
        'Would anybody be able to give me a quote for my driveway?',
        'Bridalhull',
        'Specailist Tradesperson'
    );
