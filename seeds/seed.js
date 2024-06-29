const sequelize = require('../config/connection');
const { Blog, User, Comments } = require('../models');

const blogData = require('./blogData.json');
const userData = require('./userData.json');
const commentsData = require('./commentsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blog.create({
      ...blog,
    });
  }

  for (const comments of commentsData) {
    await Comments.create({
      ...comments,
    });
  }

  process.exit(0);
};

seedDatabase();

module.exports = seedDatabase;