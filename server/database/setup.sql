DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS play;
DROP TABLE IF EXISTS user_account;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

CREATE TABLE play (
    play_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL, 
    name VARCHAR(50) UNIQUE NOT NULL,
    summary VARCHAR(500),
    length INT NOT NULL,
    time BIGINT NOT NULL,
    PRIMARY KEY (play_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

INSERT INTO user_account (username, password)
VALUES 
    ('Globe', 'asdf');

INSERT INTO play (user_id, name, summary, length, time)
VALUES 
    (1, 'Hamlet', 'The ghost of the King of Denmark tells his son Hamlet to avenge his murder by killing the new king, Hamlet''s uncle. Hamlet feigns madness, contemplates life and death, and seeks revenge. His uncle, fearing for his life, also devises plots to kill Hamlet.', 120, 1688230800),
    (1, 'Romeo And Juliet', 'An age-old vendetta between two powerful families erupts into bloodshed. A group of masked Montagues risk further conflict by gatecrashing a Capulet party. A young lovesick Romeo Montague falls instantly in love with Juliet Capulet, who is due to marry her father''s choice, the County Paris.', 140, 1689451200),
    (1, 'Othello', 'Iago is furious about being overlooked for promotion and plots to take revenge against his General; Othello, the Moor of Venice. Iago manipulates Othello into believing his wife Desdemona is unfaithful, stirring Othello''s jealousy. Othello allows jealousy to consume him, murders Desdemona, and then kills himself.', 130, 1689620400);

