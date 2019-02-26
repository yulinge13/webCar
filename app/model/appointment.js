module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE
    } = app.Sequelize;

    const Appointment = app.model.define('appointment', {
        id: {
            type: INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        carType:INTEGER(11),
        name:STRING(255),
        tel:STRING(11),
        provinceId:INTEGER(11),
        cityId:INTEGER(11),
        distributorId:INTEGER(11)
    });

    return Appointment;
};