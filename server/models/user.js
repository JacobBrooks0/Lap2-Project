const db = require('../database/connect');

class User {
    constructor({ user_id, username, password, name, is_admin }) {
        this.id = user_id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.isAdmin = is_admin;
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM user_account WHERE user_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM user_account WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async create(data) {
        const { username, password, isAdmin } = data;
        let response = await db.query("INSERT INTO user_account (username, password) VALUES ($1, $2) RETURNING user_id;",
            [username, password]);
        const newId = response.rows[0].user_id;
        const newUser = await User.getOneById(newId);
        return newUser;
    }

    static async getSkills(userId) {
        const response = await db.query(
            `SELECT s.*
            FROM user_account AS u
            LEFT JOIN class_student AS cs ON u.user_id = cs.student_id
            LEFT JOIN class_skill AS csk ON cs.class_id = csk.class_id
            LEFT JOIN skill AS s ON csk.skill_id = s.skill_id
            WHERE u.user_id = $1;`, [userId]);
        return response.rows;
    }
    
    static async getClasses(userId) {
        const response = await db.query(
            `SELECT c.*
            FROM user_account AS u
            LEFT JOIN class_student AS cs ON u.user_id = cs.student_id
            LEFT JOIN class AS c ON cs.class_id = c.class_id
            WHERE u.user_id = $1;`, [userId]);
        return response.rows;
    }
    
    static async getEvents(userId) {
        const response = await db.query(
          `SELECT e.*
           FROM user_account AS u
           LEFT JOIN user_events AS ue ON u.user_id = ue.user_id
           LEFT JOIN events AS e ON ue.event_id = e.event_id
           WHERE u.user_id = $1;`, [userId]);
        return response.rows;
      }
      
    
}


module.exports = User;
