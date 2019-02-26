module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE
    } = app.Sequelize;

    const Area = app.model.define('dt_area', {
        id: {
            type: INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        area_name:STRING(16),
        area_code:STRING(128),
        area_short:STRING(32),
        area_is_hot:STRING(1),
        area_sequence:INTEGER(11),
        area_parent_id:INTEGER(11),
        init_date:DATE,
        init_addr:STRING(16)
    });

    return Area;
};