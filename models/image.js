module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      //MySQL 에는 images 테이블 생성
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
    }
  );
  Image.associate = (db) => {
    db.Image.belognsTo(db.Post);
  };
  return Image;
};
