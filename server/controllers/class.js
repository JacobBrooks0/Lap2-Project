const { DatabaseError } = require("pg");
const Class = require("../models/class");

class ClassController {
  static async getAllClasses(req, res) {
    try {
      const data = await Class.getAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(404).json({ Error: error.message });
    }
  }

  static async getClassByClassId(req, res) {
    const class_id = req.params.id;
    try {
      const data = await Class.getOneByClassId(class_id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(404).json({ Error: error.message });
    }
  }

  static async getUsersEnrolled(req, res) {
    const class_id = req.params.id;
    try {
      const data = await Class.getUsersEnrolled(class_id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(404).json({ Error: error.message });
    }
  }

  static async getMyEnrolledClasses(req, res) {
    const student_id = req.tokenObj.user_id;
    console.log(student_id)
    try {
      const data = await Class.getEnrolledByStudentId(student_id);
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ Error: error.message });
    }
  }

  static async getMyCreatedClasses(req, res) {
    const creator_id = req.tokenObj.user_id;
    try {
      const data = await Class.getCreatedByCreatorId(creator_id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(404).json({ Error: error.message });
    }
  }

  static async createClass(req, res) {
    const creator_id = req.tokenObj.user_id;
    const classInfo = req.body;
    try {
      const data = await Class.createClass(creator_id, classInfo);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ Error: error.message });
    }
  }

  static async updateClass(req, res) {
    const class_id = req.params.id;
    const creator_id = req.tokenObj.user_id;
    const classInfo = req.body;
    try {
      const skillsClass = await Class.getOneByClassId(class_id);
      const data = await skillsClass.updateClass(creator_id, classInfo);
      res.status(202).json(data);
    } catch (error) {
      console.log(error);
      res.status(304).json({ Error: error.message });
    }
  }

  static async deleteClass(req, res) {
    const class_id = req.params.id;
    const creator_id = req.tokenObj.user_id;
    try {
      const skillsClass = await Class.getOneByClassId(class_id);
      const data = await skillsClass.deleteClass(creator_id);
      res.status(204).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ Error: error.message });
    }
  }

  static async enrollClass(req, res) {
    const class_id = req.params.id;
    const student_id = req.tokenObj.user_id;
    try {
      const skillsClass = await Class.getOneByClassId(class_id);
      if (await skillsClass.isAtCapacity()) {
        throw new Error(
          `Sorry, the class is full. Only ${skillsClass.capacity} students are allowed to enroll at a time`
        );
      } else {
        const data = await skillsClass.enrollStudent(student_id);
        res.status(201).json(data);
      }
    } catch (error) {
      if (error instanceof DatabaseError) {
        switch (+error.code) {
          case 23505:
            res.status(500).json({ Error: "You've already enrolled to this class" });
            break;
          default:
            res.status(500).json({ Error: error });
            break;
        }
      } else {
        res.status(500).json({ Error: error.message });
      }
    }
  }

  static async delistClass(req, res) {
    const class_id = req.params.id;
    const student_id = req.tokenObj.user_id;
    try {
      const skillsClass = await Class.getOneByClassId(class_id);
      const data = await skillsClass.delistStudent(student_id);
      res.status(204).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ Error: "You haven't enrolled to this class or the class doesn't exist anymore." });
    }
  }
}

module.exports = ClassController;
