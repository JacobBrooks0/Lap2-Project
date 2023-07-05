const db = require("../database/connect");
const User = require("./user");

class Class {
  constructor({
    class_id,
    creator_id,
    name,
    info,
    main_image_url,
    start_date,
    end_date,
    capacity,
  }) {
    this.class_id = class_id;
    this.creator_id = creator_id;
    this.name = name;
    this.info = info;
    this.main_image_url = main_image_url;
    this.start_date = start_date;
    this.end_date = end_date;
    this.capacity = capacity;
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM class ORDER BY name;");
    if (response.rows.length === 0) {
      throw new Error("No classes are available.");
    }
    return response.rows.map((g) => new Class(g));
  }

  static async getOneByClassId(class_id) {
    const response = await db.query(
      "SELECT * FROM class WHERE class_id = $1;",
      [class_id]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to find the class you're looking for");
    }
    return new Class(response.rows[0]);
  }

  static async getUsersEnrolled() {
    const response = await db.query(
      "SELECT * FROM user_account u LEFT JOIN class_student cs ON u.user_id = cs.student_id WHERE class_id = $1;",
      [this.class_id]
    );
    if (response.rows.length < 1) {
      throw new Error("No students have enrolled to this class yet");
    }
    return response.rows.map((r) => new User(r)).map((u) => u.name);
  }

  static async getEnrolledByStudentId(student_id) {
    const response = await db.query(
      "SELECT * FROM class c LEFT JOIN class_student cs ON c.class_id = cs.class_id WHERE cs.student_id = $1;",
      [student_id]
    );
    if (response.rows.length < 1) {
      throw new Error("You haven't enrolled to any classes yet.");
    }
    return response.rows.map((record) => new Class(record));
  }

  static async getCreatedByCreatorId(creator_id) {
    const response = await db.query(
      "SELECT * FROM class WHERE creator_id = $1 ORDER BY name",
      [creator_id]
    );
    if (response.rows.length < 1) {
      throw new Error("You haven't created any classes.");
    }
    return response.rows.map((record) => new Class(record));
  }

  static async createClass({
    creator_id,
    name,
    main_image_url,
    info,
    start_date,
    end_date,
    capacity,
  }) {
    const values = [
      creator_id,
      name,
      main_image_url,
      info,
      start_date,
      end_date,
      capacity,
    ];
    const response = await db.query(
      "INSERT INTO class (creator_id, name, main_image_url, info, start_date, end_date, capacity) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
      values
    );
    const classId = response.rows[0].class_id;
    const newClass = await Class.getOneByClassId(classId);
    return newClass;
  }

  async deleteClass() {
    await db.query(
      "DELETE FROM class_student WHERE class_id = $1 RETURNING *;",
      [this.class_id]
    );
    const response = await db.query(
      "DELETE FROM class WHERE class_id = $1 RETURNING *;",
      [this.class_id]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to delete class.");
    }
    return new Class(response.rows[0]);
  }

  async isAtCapacity() {
    const response = await db.query(
      "SELECT COUNT(*) FROM class_student WHERE class_id = $1",
      [this.class_id]
    );
    const studentCount = response.rows[0].count;
    return studentCount >= this.capacity;
  }

  async enrollStudent(studentId) {
    const response = await db.query(
      "INSERT INTO class_student (class_id, student_id) VALUES ($1, $2) RETURNING *;",
      [this.class_id, studentId]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to enroll student.");
    }
    return response.rows[0];
  }

  async delistStudent(studentId) {
    const response = await db.query(
      "DELETE FROM class_student WHERE class_id = $1 AND student_id = $2 RETURNING *;",
      [this.class_id, studentId]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to delist student.");
    }
    return response.rows[0];
  }
}

module.exports = Class;
