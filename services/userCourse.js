const MongoLib = require('../lib/mongo');

class UserCourseService {
  constructor() {
    this.collection = 'user-courses';
    this.mongoDB = new MongoLib();
  }

  async getUserCourse({ userId }) {
    const query = userId && { userId };
    const userCourse = await this.mongoDB.getAll(this.collection, query);

    return userCourse || [];
  }

  async createUserCourse({ userCourse }) {
    const createdUserCourseId = await this.mongoDB.create(
      this.collection,
      userCourse
    );

    return createdUserCourseId;
  }

  async deleteUserCourse({ userCourseId }) {
    const deletedUserCourseId = await this.mongoDB.delete(
      this.collection,
      userCourseId
    );

    return deletedUserCourseId;
  }

}

module.exports = UserCourseService;