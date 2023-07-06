-- must drop all tables that have ever existed
DROP TABLE IF EXISTS class_student;

DROP TABLE IF EXISTS class_skill;

DROP TABLE IF EXISTS user_skill;

DROP TABLE IF EXISTS class;

DROP TABLE IF EXISTS user_jobs;

DROP TABLE IF EXISTS jobs;

DROP TABLE IF EXISTS event_attendee;

DROP TABLE IF EXISTS event_bookmarker;

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

CREATE TABLE event_bookmarker (
    event_bookmarker_id INT GENERATED ALWAYS AS IDENTITY,
    event_id INT NOT NULL,
    bookmarker_id INT NOT NULL,
    bookmarked_at FLOAT DEFAULT extract(
        epoch
        from
            now()
    ),
    PRIMARY KEY (event_bookmarker_id),
    FOREIGN KEY (event_id) REFERENCES community_event("event_id"),
    FOREIGN KEY (bookmarker_id) REFERENCES user_account("user_id"),
    UNIQUE (event_id, bookmarker_id)
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
    start_date BIGINT,
    end_date BIGINT,
    capacity INT,
    created_at FLOAT DEFAULT extract(
        epoch
        from
            now()
    ),
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
