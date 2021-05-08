module.exports = (sequelize) => {
  const Comment = sequelize.define("comment", {
    name: {
      type: sequelize.STRING,
    },
    text: {
      type: sequelize.STRING,
    },
  });

  return Comment;
};
