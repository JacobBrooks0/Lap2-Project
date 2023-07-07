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
    info VARCHAR,
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
    info VARCHAR,
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

-- the password is 1
INSERT INTO
    user_account (username, password, name, dp_url,	profile_summary)
VALUES
    (
        'florin',
        '$2b$10$.pj1LTt4HxpVVg6fZDhdFOMBfiywBTikuDqx3KjDy85aJNyZ4IoJC',
        'Florin Florinberg',
        'https://img.freepik.com/premium-vector/woman-profile-cartoon_18591-58477.jpg',
        'I am a mature, positive and hardworking individual, who always strives to achieve the highest standard possible, at any given task. In my previous role as a Sales Representative, I demonstrated the ability to work under intense pressure, sell products and services to customers from all backgrounds, handle customer complaints and solve problematic situations as and when they arose. I was promoted twice for exceeding my sales targets.'
    ),
    (
        'Student1',
        '$2b$10$.pj1LTt4HxpVVg6fZDhdFOMBfiywBTikuDqx3KjDy85aJNyZ4IoJC',
        'Alex Mooney',
        'https://bootdey.com/img/Content/avatar/avatar7.png',
        'My name is florin. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ),
    (
        'Student2',
        '$2b$10$.pj1LTt4HxpVVg6fZDhdFOMBfiywBTikuDqx3KjDy85aJNyZ4IoJC',
        'Alex Mooney',
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
        main_image_url,
        info,
        start_date,
        end_date
    )
VALUES
    (
        1,
        'Florin Barbecue',
        'https://www.teamais.net/wp-content/uploads/2021/06/How-to-Have-a-Fun-and-Safe-Barbecue-Experience.jpg',
        'Our annual summer barbecue. Everyone''s invited.',
        1688230800,
        1688240800
    ),
    (
        1,
        'Florin Fun Fair',
        'https://www.shropshirestar.com/resizer/brSwl2Q7ElYor0cclGjaICMlfXg=/1200x0/cloudfront-us-east-1.images.arcpublishing.com/mna/O7MVBMXF7JAIHF3757W44CY2RE.jpg',
        'Have a great time at our summer fun fair. Everyone''s invited.',
        1688230800,
        1689240800
    );

INSERT INTO
    event_bookmarker (event_id, bookmarker_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3);

INSERT INTO
    class (
        creator_id,
        name,
        main_image_url,
        info,
        start_date,
        end_date,
        capacity
    )
VALUES
    (
        1,
        'Gardening',
        'https://www.allaboutgardening.com/wp-content/uploads/2021/08/Child-Gardening-With-Shovel.jpg',
        'Horticulture is the science and art of cultivating plants, encompassing the study of plant growth, propagation, and management. You can learn about the biology of plants, how to cultivate them for food, fibre, and aesthetic purposes, and how to manage plant pests and diseases. By studying with us, you will be introduced to a unique array of plant collections, both within our campuses and across the capital, providing you with the opportunity to work within some of Florin''s most prestigious parks and gardens.',
        1688230800,
        1688240800,
        5
    ),
    (
        1,
        'Knitting',
        'https://hips.hearstapps.com/hmg-prod/images/knitting-642aeeb5e6b60.jpg?crop=0.668xw:1.00xh;0.210xw,0&resize=1200:*',
        'Want a relaxing hobby you can enjoy almost anywhere? Come along and discover knitting at this relaxed and friendly craft class. During this basic knitting class, you will learn how to cast on, to knit a garter stitch and to cast off. Throughout the class, you will receive hands-on help and support from your friendly teacher – get ready to knit your cares away!',
        1688119079,
        1689240800,
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

