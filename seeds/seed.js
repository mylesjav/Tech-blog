const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userSeeds = require("./user-seeds.json");
const postSeeds = require("./post-seeds.json");
const commentSeeds = require("./comment-seeds.json");

const cleanDB = async () => {
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
  await sequelize.sync({ force: true });
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
};

cleanDB();

const seedDB = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeeds, {
    individualHooks: true,
    returning: true,
  });
  console.log("Users seeded");

  for (const post of postSeeds) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  console.log("Posts seeded");

  for (const comment of commentSeeds) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: Math.floor(Math.random() * postSeeds.length) + 1,
    });
  }
  console.log("Comments seeded");

  process.exit(0);
};

seedDB();