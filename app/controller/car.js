var soap = require('soap');
const UUID = require('node-uuid')
const xlsx = require('xlsx');
const fs = require('fs')

function getTime(time) {
    const date = new Date(time - 0)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()
    const str = `${year}年${month}月${day}日 ${h}:${m}:${s}`
    return str
}
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
            if (provinceId) {
                const res = await ctx.service.car.getAllDistributorByArea(ctx.request.query)
                if (res) {
                    ctx.success('获取成功', res)
                } else {
                    ctx.error('获取失败!', res)
                }
            } else {
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
        async deleteDistributor() {
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
            if (name && carType && tel) {
                if (/^1[34578]\d{9}$/.test(tel)) {
                    const data = await ctx.model.Appointment.findAll({
                        where: {
                            tel
                        }
                    });
                    if (data.length > 0) {
                        ctx.error('已经预约过了', null)
                    } else {
                        const res = await ctx.service.car.makeAppointment(ctx.request.body)
                        if (res) {
                            ctx.success('获取成功', res)
                        } else {
                            ctx.error('预约失败!', res)
                        }
                    }
                } else {
                    ctx.error('请输入正确的手机号!', res)
                }
            } else {
                ctx.error('请填写完整信息!', res)
            }
        }
        //获取所有的预约
        async getAllAppointment() {
            const {
                ctx,
            } = this
            const {
                from,
                pageSize,
                pageNum
            } = ctx.query
            if (from && pageSize && pageNum) {
                const res = await ctx.service.car.getAllAppointment(ctx.query)
                const total = await ctx.service.car.getAllAppointmentTotal({
                    from
                })
                if (res) {
                    ctx.success('获取成功', {
                        lists: res,
                        total
                    })
                } else {
                    ctx.error('获取失败!', res)
                }
            } else {
                ctx.error('获取失败!', res)
            }
        }
        //获取所有的第三方 数据
        async getAllTreeData() {
            // const AuthenticatdKey = "A0000-000-000-00-00000"
            try {
                const AuthenticatdKey = "A2019-1825-6670-3095-155435"
                const {
                    ctx,
                } = this
                const {
                    name,
                    tel,
                    distributorVal,
                    carValue
                } = ctx.request.body
                var url = 'http://202.96.191.233:8080/MediaInterface/BaseInfoService.svc?wsdl';
                var args = {
                    // AuthenticatdKey:'A2019-1825-6670-3095-155435',
                    AuthenticatdKey: AuthenticatdKey,
                    RequestObject: [{
                        MEDIA_LEAD_ID: UUID.v1().replace(/-/g, ''),
                        FK_DEALER_ID: distributorVal,
                        CUSTOMER_NAME: name,
                        OPERATE_TYPE: '0',
                        STATUS: '0',
                        MOBILE: tel,
                        SMART_CODE: AuthenticatdKey,
                        SERIES: carValue
                    }]
                };
                const client = await soap.createClientAsync(url)
                client.SyncSaleClues({
                    inputParam: JSON.stringify(args)
                }, (err, res) => {
                    if (err) {
                        ctx.success('预约失败！')
                    }
                })
                ctx.success('预约成功!')
            } catch (err) {
                ctx.success('预约失败！')
            }
        }

        //到处excl
        async exprotData() {
            const {
                ctx,
            } = this
            try {
                const res = await ctx.service.car.getAllAppointment(ctx.query)
                const arr = res.map(i => {
                    return {
                        name: i.name,
                        tel: i.tel,
                        carType: i.carType,
                        distributorName: i.distributorName,
                        provinceName: i.provinceName,
                        cityName: i.cityName,
                        creatTime: getTime(i.creatTime)
                    }
                })
                const _headers = ['姓名', '手机号', '车型', '经销商', '经销商所在省份', '经销商所在城市', '预约时间']
                const headerData = ['name', 'tel', 'carType', 'distributorName', 'provinceName', 'cityName', 'creatTime']
                var headers = _headers
                    .map((v, i) => Object.assign({}, {
                        v: v,
                        position: String.fromCharCode(65 + i) + 1
                    }))
                    .reduce((prev, next) => Object.assign({}, prev, {
                        [next.position]: {
                            v: next.v
                        }
                    }), {});
                var data = arr
                    .map((v, i) => headerData.map((k, j) => {
                        return Object.assign({}, {
                            v: v[k],
                            position: String.fromCharCode(65 + j) + (i + 2)
                        })
                    }))
                    .reduce((prev, next) => {
                        return prev.concat(next)
                    })
                    .reduce((prev, next) => {
                        return Object.assign({}, prev, {
                            [next.position]: {
                                v: next.v
                            }
                        })
                    }, {});
                var output = Object.assign({}, headers, data);
                var outputPos = Object.keys(output);
                var ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];
                var wb = {
                    SheetNames: ['mySheet'],
                    Sheets: {
                        'mySheet': Object.assign({}, output, {
                            '!ref': ref
                        })
                    }
                };
                xlsx.writeFile(wb, './app/public/file/预约名单.xlsx')
                ctx.success('导出成功!', '/public/file/预约名单.xlsx')
            } catch (err) {
                ctx.error('导出失败!')
            }
        }

        //获取来源列表
        async getFromLists() {
            const {
                ctx,
            } = this
            const res = await ctx.service.car.getFromLists()
            if (res) {
                ctx.success('获取成功', res)
            } else {
                ctx.error('获取失败!', res)
            }
        }
    }

}