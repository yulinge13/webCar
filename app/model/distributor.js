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
        province: INTEGER(11),
        prefectureLevelCity: INTEGER(11),
        address: STRING(255),
        tel: STRING(255)
    });
    // Distributor.associate = function() {
    //     app.model.Distributor.hasMany(app.model.Area,{foreignKey:'id',targetKey: 'province' }); 
    // }
    // Distributor.sync({
    //     force: true
    // });
    return Distributor;
};