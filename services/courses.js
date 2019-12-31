const MongoLib = require('../lib/mongo');

class CoursesService {
  constructor() {
    this.collection = 'courses';
    this.mongoDB = new MongoLib();
  }

  async getCourses({
    tags
  }) {
    const query = tags && {
      tags: {
        $in: tags
      }
    };
    const courses = await this.mongoDB.getAll(this.collection, query);
    return courses || [];
  }
  
  // async getCourse({ schedule }) {
  //   const [course] = await this.mongoDB.getAll(this.collection, { schedule });
  //   return course;
  // }
  async getCourse({
    courseId
  }) {
    const course = await this.mongoDB.get(this.collection, courseId);
    return course || {};
  }

  async createCourse({
    course
  }) {
    const { schedule, coach, type,enable,price,premium } = course;

    const createCourseId = await this.mongoDB.create(this.collection, {
      schedule,
      coach,
      enable,
      type,
      price,
      premium,
    });

    return createCourseId;
  }

  async getOrCreateCourse({course}) {
    const queriedCourse = await this.getUser({schedule:course.schedule});

    if(queriedCourse) {
      return queriedCourse;
    }

    await this.createCourse({course});
    return await this.getCourse({course:course.schedule});
  }

  async updateCourse({courseId,course}={}) {
    const updatedCourseId = await this.mongoDB.update(this.collection, courseId, course);
    return updatedCourseId;
  }

  async partialUpdateCourse() {
    const updatedCourseId = await Promise.resolve(courseMock[0].id)
    return updatedCourseId
  }

  async deleteCourse({courseId}) {
    const deletedCourseId = await this.mongoDB.delete(this.collection, courseId);
    return deletedCourseId;
  }
}

module.exports = CoursesService;