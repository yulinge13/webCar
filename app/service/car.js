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
        const res = await ctx.model.Distributor.findAll({
            include:[
                {
                    model:ctx.model.Area,
                    attributes: ['area_name']
                }
            ],
        });
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
        console.log("res",res);
        return res;
    }
}

module.exports = CarLists