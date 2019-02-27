const Service = require('egg').Service
class CarLists extends Service {
    //获取所有的车子类型
    async getCarLists() {
        const {
            ctx
        } = this
        const res = await ctx.model.Car.findAll();
        return res
    }
    //新增汽车
    async addCar(params) {
        const {
            ctx
        } = this
        const {
            name
        } = params
        const res = await ctx.model.Car.create({
            name
        });
        return res;
    }
    //获取所有的经销商
    async getAllDistributor() {
        const {
            ctx
        } = this
        // const res = await ctx.model.Distributor.findAll({
        //     include: {
        //         model: ctx.model.Area,
        //         attributes: ['area_name']
        //     }
        // });
        let sql = `SELECT d.*,a.area_name as provinceName ,c.area_name AS cityName FROM distributor d LEFT JOIN dt_area a ON d.province = a.id LEFT JOIN dt_area c ON d.prefectureLevelCity = c.id`
        const res = await ctx.model.query(sql, {
            type: this.app.Sequelize.QueryTypes.SELECT
        })
        return res;
    }
    //根据省市区查询经销商
    async getAllDistributorByArea(params){
        const {
            ctx
        } = this
        const {
            provinceId,
            cityId
        } = params
        let sql = `SELECT 
            d.*,a.area_name as provinceName ,
            c.area_name AS cityName 
        FROM 
            distributor d LEFT JOIN dt_area a 
        ON 
            d.province = a.id LEFT JOIN dt_area c 
        ON 
            d.prefectureLevelCity = c.id where d.province = ${provinceId} and d.prefectureLevelCity = ${cityId}`
        const res = await ctx.model.query(sql, {
            type: this.app.Sequelize.QueryTypes.SELECT
        })
        return res;
    }
    //新增经销商
    async addDistributor(params) {
        const {
            ctx
        } = this
        const {
            province,
            prefectureLevelCity
        } = params
        const res = await ctx.model.Distributor.create(params);
        return res;
    }
    //获取省 市 区
    async getArea(id) {
        const {
            ctx
        } = this
        const res = await ctx.model.Area.findAll({
            where: {
                area_parent_id: id
            }
        });
        return res;
    }
    //预约
    async makeAppointment(params) {
        const {
            ctx
        } = this
        const res = await ctx.model.Appointment.create({
            ...params
        });
        console.log("res", res);
        return res;
    }
}

module.exports = CarLists