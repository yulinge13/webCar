module.exports = app => {
    return class CarLists extends app.Controller {
        //注册
        // async addUserInfo() {
        //     const {
        //         ctx
        //     } = this
        //     const {
        //         name,
        //         passWord,
        //         sex,
        //         age
        //     } = ctx.request.body
        //     let signInfo = {
        //         name,
        //         passWord,
        //         sex,
        //         age
        //     }
        //     let res = await this.ctx.service.user.addUser(signInfo)
        //     if (res) {
        //         ctx.success('恭喜注册成功!', res)
        //     } else {
        //         ctx.error('注册失败!', res)
        //     }
        // }
        // //登陆
        // async login() {
        //     const {
        //         ctx
        //     } = this
        //     const {
        //         name,
        //         passWord,
        //     } = ctx.request.body
        //     if (name && passWord) {
        //         let signInfo = {
        //             name,
        //             passWord,
        //         }
        //         let res = await this.ctx.service.user.login(signInfo)
        //         if (res) {
        //             ctx.success('登陆成功', res)
        //         } else {
        //             ctx.error('登陆失败，账号密码错误', null)
        //         }
        //     } else {
        //         ctx.error('登陆失败', null)
        //     }
        // }
        //获取所有的车子类型
        async getCarLists() {
            const {
                ctx
            } = this
            const res = await ctx.service.car.getCarLists()
            if (res) {
                ctx.success('获取成功', res)
            } else {
                ctx.error('获取失败!', res)
            }
        }
        //新增汽车
        async addCar() {
            const {
                ctx
            } = this
            const {
                name
            } = ctx.request.body
            console.log(ctx.model);
            if (name) {
                const res = await ctx.service.car.addCar({
                    name
                })
                if (res) {
                    ctx.success('新增成功', res)
                } else {
                    ctx.error('新增失败!', res)
                }
            } else {
                ctx.error('请填写汽车类型!', res)
            }
        }

        //查询所有的经销商
        async getAllDistributor() {
            const {
                ctx
            } = this
            const res = await ctx.service.car.getAllDistributor()
            if (res) {
                ctx.success('获取成功', res)
            } else {
                ctx.error('获取失败!', res)
            }
        }

        //根据省市区查询经销商
        async getAllDistributorByArea() {
            const {
                ctx
            } = this
            const {
                provinceId,
                cityId
            } = ctx.request.query
            if(provinceId){
                const res = await ctx.service.car.getAllDistributorByArea(ctx.request.query)
                if (res) {
                    ctx.success('获取成功', res)
                } else {
                    ctx.error('获取失败!', res)
                }
            }else{
                ctx.error('请选择省市', null)
            }
        }

        //新增经销商
        async addDistributor() {
            const {
                ctx
            } = this
            const {
                name,
                state,
                largeArea,
                province,
                prefectureLevelCity,
                address,
                tel
            } = ctx.request.body
            if (name && state && largeArea && province && prefectureLevelCity && address && tel) {
                const res = await ctx.service.car.addDistributor(ctx.request.body)
                if (res) {
                    ctx.success('获取成功', res)
                } else {
                    ctx.error('获取失败!', res)
                }
            } else {
                ctx.error('获取失败!', res)
            }
        }
        //删除经销商
        async deleteDistributor(){
            const {
                ctx
            } = this
            const {
                id
            } = ctx.request.body
            if (id) {
                const res = await ctx.service.car.deleteDistributor(id)
                if (res) {
                    ctx.success('删除成功', res)
                } else {
                    ctx.error('删除失败!', res)
                }
            } else {
                ctx.error('删除失败!', res)
            }
        }
        //获取省 市 区
        async getArea() {
            const {
                ctx
            } = this
            const {
                id
            } = ctx.request.query
            if (id) {
                const res = await ctx.service.car.getArea(id)
                if (res) {
                    ctx.success('获取成功', res)
                } else {
                    ctx.error('获取失败!', res)
                }
            } else {
                ctx.error('获取失败!', res)
            }
        }



        //预约
        async makeAppointment() {
            const {
                ctx,
            } = this
            const {
                carType,
                name,
                tel,
                provinceId,
                cityId,
                distributorId
            } = ctx.request.body
            if (name && carType  && tel) {
                if(/^1[34578]\d{9}$/.test(tel)){
                    const data = await ctx.model.Appointment.findAll({
                        where:{
                            tel
                        }
                    });
                    if(data.length>0){
                        ctx.error('已经预约过了', null)
                    }else{
                        const res = await ctx.service.car.makeAppointment(ctx.request.body)
                        if (res) {
                            ctx.success('获取成功', res)
                        } else {
                            ctx.error('预约失败!', res)
                        }
                    }
                }else{
                    ctx.error('请输入正确的手机号!', res)
                }
            } else {
                ctx.error('请填写完整信息!', res)
            }
        }
        //获取所有的预约
        async getAllAppointment(){
            const {
                ctx,
            } = this
            const res = await ctx.service.car.getAllAppointment()
            if (res) {
                ctx.success('获取成功', res)
            } else {
                ctx.error('预约失败!', res)
            }
        }
    }

}