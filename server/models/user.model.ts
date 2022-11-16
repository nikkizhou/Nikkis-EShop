
export default (sequelize:any, Sequelize:any) => {
  const User = sequelize.define("tutorial", {
    name: {type: Sequelize.STRING},
    address: {type: Sequelize.STRING },
    phone: { type: Sequelize.NUMBER },
    email: { type: Sequelize.STRING },
  });

  return User;
};
