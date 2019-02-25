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
    ]
    routerConfig.forEach(item => {
        router[item.method](item.url, ...item.middlewareLists)
    })
}

module.exports = routers