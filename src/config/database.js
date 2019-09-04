module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'docker',
  password: 'docker',
  database: 'gobarber2',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
