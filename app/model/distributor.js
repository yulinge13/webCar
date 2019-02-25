module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE
    } = app.Sequelize;

    const Distributor = app.model.define('Distributor', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: STRING(255),
        state: STRING(255),
        largeArea: STRING(255),
        province: STRING(255),
        prefectureLevelCity: STRING(255),
        address: STRING(255),
        tel: STRING(255)
    });

    return Distributor;
};