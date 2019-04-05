const routers = app => {
    const {
        router,
        controller,
        io
    } = app
    const {
        isParmas,
        isToken,
        isLogin
    } = app.middleware
    const routerConfig = [
        //用户
        {
            url: '/addUserInfo',
            middlewareLists: [
                isParmas(['name', 'passWord']),
                controller.user.addUserInfo,
            ],
            method: 'post'
        },
        {
            url: '/login',
            middlewareLists: [
                isParmas(['name', 'passWord']),
                controller.user.login,
            ],
            method: 'post'
        },
        //获取所有的车
        {
            url: '/getCarLists',
            middlewareLists: [
                controller.car.getCarLists,
            ],
            method: 'get'
        },
        {
            url: '/addCar',
            middlewareLists: [
                controller.car.addCar,
            ],
            method: 'post'
        },

        //经销商
        {
            url: '/getAllDistributor',
            middlewareLists: [
                controller.car.getAllDistributor,
            ],
            method: 'get'
        },
        {
            url: '/addDistributor',
            middlewareLists: [
                controller.car.addDistributor,
            ],
            method: 'post'
        },
        {
            url: '/getAllDistributorByArea',
            middlewareLists: [
                controller.car.getAllDistributorByArea,
            ],
            method: 'get'
        },
        {
            url: '/deleteDistributor',
            middlewareLists: [
                controller.car.deleteDistributor,
            ],
            method: 'post'
        },
        //省市区
        {
            url: '/getArea',
            middlewareLists: [
                controller.car.getArea,
            ],
            method: 'get'
        },
        //预约
        {
            url: '/makeAppointment',
            middlewareLists: [
                controller.car.makeAppointment,
            ],
            method: 'post'
        },
        //获取预约
        {
            url: '/getAllAppointment',
            middlewareLists: [
                controller.car.getAllAppointment,
            ],
            method: 'get'
        },
        //对接第三方 预约功能
        {
            url: '/getAllTreeData',
            middlewareLists: [
                controller.car.getAllTreeData,
            ],
            method: 'post'
        },
<<<<<<< HEAD
        {
            url: '/exprotData',
            middlewareLists: [
                controller.car.exprotData,
            ],
=======
        //导出
        {
            url: '/exprotData',
            middlewareLists: [
                isParmas(['from', 'pageSize', 'pageNum']),
                controller.car.exprotData,
            ],
            method: 'get'
        },
        //获取所有来源列表
        {
            url: '/getFromLists',
            middlewareLists: [
                controller.car.getFromLists,
            ],
>>>>>>> af4807185ddd3d54537332b396e55fbaefe34008
            method: 'get'
        },
    ]
    routerConfig.forEach(item => {
        router[item.method](item.url, ...item.middlewareLists)
    })
}

module.exports = routers