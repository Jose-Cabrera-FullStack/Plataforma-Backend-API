const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  async getUsers({
    tags
  }) {
    const query = tags && {
      tags: {
        $in: tags
      }
    };
    const users = await this.mongoDB.getAll(this.collection, query);
    return users || [];
  }

  async getUser({
    email
  }) {
    const [user] = await this.mongoDB.getAll(this.collection, {
      email
    });
    return user;
  }
  async getUserId({
    userId
  }) {
    const user = await this.mongoDB.get(this.collection, userId);
    return user || {};
  }

  async createUser({
    user
  }) {
    const {
      name,
      email,
      password,
      isAdmin,
      birthday,
      contentRating,
      classes,
      discord,
      server,
      verified
    } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserId = await this.mongoDB.create(this.collection, {
      name,
      email,
      password: hashedPassword,
      isAdmin: Boolean(isAdmin),
      birthday,
      contentRating,
      discord,
      classes,
      server,
      verified
    });

    return createUserId;
  }

  async getOrCreateUser({
    user
  }) {
    const queriedUser = await this.getUser({
      email: user.email
    });

    if (queriedUser) {
      return queriedUser;
    }

    await this.createUser({
      user
    });
    return await this.getUser({
      email: user.email
    });
  }

  async updateUser({
    userId,
    verified
  } = {}) {
    const updatedUserId = await this.mongoDB.update(this.collection, userId, verified);
    return updatedUserId;
  }

  // async partialUpdateUser() {
  //   const updatedUserId = await Promise.resolve(usersMock[0].id)
  //   return updatedUserId
  // }

  async deleteUser({
    userId
  }) {
    const deletedUserId = await this.mongoDB.delete(this.collection, userId);
    return deletedUserId;
  }
}

module.exports = UsersService;