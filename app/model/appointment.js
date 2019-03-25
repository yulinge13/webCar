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
        carType:STRING(255),
        name:STRING(255),
        tel:STRING(11),
        provinceId:INTEGER(11),
        cityId:INTEGER(11),
        distributorId:INTEGER(11),
        creatTime:STRING(40)
    });
    Appointment.sync({
        force:false
    })
    return Appointment;
};