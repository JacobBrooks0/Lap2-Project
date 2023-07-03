const db = require('../database/connect');

class Play {
    constructor(name, summary, length, time) {
        this.name = name;
        this.summary = summary;
        this.length = length;
        this.time = time;
    }

    static async getAll() {
        const response = await db.query('SELECT * FROM play');
        if (response.rows.length === 0) {
            throw new Error('No Plays found')
        }
        return response.rows;
    }

    static async getAllById(id) {
        const response = await db.query('SELECT * FROM play where user_id = $1', [id]);
        if (response.rows.length === 0) {
            throw new Error('No Plays found')
        }
        return response.rows;
    }

    static async createPlay(data) {
        let response = await db.query('INSERT INTO play (user_id, name, summary, length, time) VALUES ($1, $2, $3, $4, $5) RETURNING *;',data);
        return response.rows[0];
    }
}

module.exports = Play;
