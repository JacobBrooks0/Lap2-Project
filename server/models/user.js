const db = require("../database/connect");

class User {
  constructor({ user_id, username, password, name, dp_url, profile_summary }) {
    this.id = user_id;
    this.username = username;
    this.password = password;
    this.name = name;
    this.dp_url = dp_url;
    this.profile_summary = profile_summary;
  }

  static async getOneById(id) {
    const response = await db.query(
      "SELECT * FROM user_account WHERE user_id = $1",
      [id]
    );
    return new User(response.rows[0]);
  }

  static async getOneByUsername(username) {
    const response = await db.query(
      "SELECT * FROM user_account WHERE username = $1",
      [username]
    );
    if (response.rows.length != 1) {
      throw new Error("User with this username doesn't exist");
    }
    return new User(response.rows[0]);
  }

  static async createUser(data) {
    const { username, password} = data;
    let response = await db.query(
      "INSERT INTO user_account (username, password) VALUES ($1, $2) RETURNING user_id;",
      [username, password]
    );
    const newId = response.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;
  }

  async updateProfileDetails(data) {
    const { name, dp_url, profile_summary } = data;
    let response = await db.query(
      "UPDATE user_account SET name = $1, dp_url = $2, profile_summary = $3 WHERE user_id = $4 RETURNING user_id;",
      [name, dp_url, profile_summary, this.id]
    );
    const newId = response.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;
  }
}


module.exports = User;
