
export default (sequelize:any, Sequelize:any) => {
  const User = sequelize.define("user", {
    name: {type: Sequelize.STRING},
    address: {type: Sequelize.STRING },
    phone: { type: Sequelize.INTEGER },
    email: { type: Sequelize.STRING },
  });

  return User;
};
