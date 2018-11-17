const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

/**
 * 校验验证码
 * @param {String} mobile 接收验证码的手机号
 * @param {String} code 验证码
 */
const verifyCode = (mobile, code) => {
    return new Promise((res, rej) => {
        if (!code) {
            rej()
            return
        }
        // 从注册表里面查出当前手机号最新的一条记录
        await db.collection('register').where({
            mobile
        })
        .orderBy('createTime', 'desc')
        .get()
        .then(data =>{
            // 如果当前手机号有存在注册表里面，然后去校验时间，超过5分钟则认定为失效，需要重新获取
            if (data) {
                let curTime = db.serverDate()
                // 超过过有效时间，提示需要重新获取
                if (curTime - data.createTime > MESSAGE_MAX_INVALID_TIME) {
                    rej()
                } else {
                    if (code === data.code) {
                        res()
                    } else {
                        rej()
                    }
                }
            } else {
                rej()
            }
        }).catch(err => {
            rej()
        })
    })
}

/**
 * 添加用户
 * @param {Object} userInfo 用户信息
 * @param {Object} cardInfo 卡片信息
 * @param {String} code 验证码
 */
const addMember = (userInfo, cardInfo, code) => {
    return new Promise((res, rej) => {
        if (!code) {
            rej({
                status: 400,
                message: '参数错误，请检查',
                data: null
            })
            return
        }
        // 校验验证码
        this.verifyCode(cardInfo.mobile, code).then(() => {
            db.collection('general_users').add({
                data: {
                    shopkeeperOpenId: userInfo.openId,
                    ...cardInfo,
                    createTime: db.serverDate(),
                    lastEditTime: db.serverDate()
                }
            }).then(() => {
                res({
                    status: 200,
                    message: '用户添加成功',
                    data: null
                })
            }).catch(() => {
                rej({
                    status: 400,
                    message: '用户添加失败',
                    data: null
                })
            })
        }).catch(() => {
            rej({
                status: 400,
                message: '验证码错误',
                data: null
            })
        })
    })
}


/**
 * 更新用户信息
 * @param {String} openId 当前需要编辑用户的openId
 * @param {Object} userInfo 操作人用户信息
 * @param {Object} cardInfo 卡片详情
 */
const updateMember = (openId, userInfo, cardInfo) => {
    return new Promise((res, rej) => {
        // 需要查询当前操作人是否是店主，不是则不能够编辑会员资料
        try {
            let data = await cloud.callFunction({
                name: 'isShopkeeper'
            })
            if (data.status === 200 && data.data.status) {
                rej({
                    status: 400,
                    message: '不是店主不能编辑用信息',
                    data: null
                })
            } else {
                rej({
                    status: 400,
                    message: '不是店主不能编辑用信息',
                    data: null
                })
            }
        } catch (error) {
            
        }
        
        let result = await db.collection('general_users').where({
            openId,
            shopkeeperOpenId: userInfo.openId
        }).update({
            data: {
                ...cardInfo,
                lastEditTime: db.serverDate()
            }
        })
        return {
            status: 200,
            data: result,
            message: '客户资料修改添加成功'
        }
    })
    
}

exports.main = async (event, context) => {
    let {
        userInfo,
        openId,
        code,
        ...cardInfo
    } = event
    let {status, message} = paramVerify(cardInfo)
    
    if (!status) {
        return {
            status: 400,
            message
        }
    }
    try {
        // 有传openId代表数需要修改当前用户信息
        if (openId) {
            this.updateMember(openId, userInfo, cardInfo)
        // 没有代表新增用户
        } else {
            try {
                let data = await this.addMember(userInfo, cardInfo, code)
                return data
            } catch (error) {
                return error
            }
        }
    } catch (error) {
        return {
            status: 502,
            message: '未知错误'
        }
    }   
}

/**
 * 参数校验
 * @param {Object} param 当前需要校验的参数
 *  -name {String} 用户名称
 *  -address {String} 用户地址
 *  -waterType {String} 水种类
 *  -mobile {String} 用户手机号
 *  -phone {String} 用户座机号
 * @returns {Object} 返回当前校验状态和提示信息
 */
const paramVerify = (param = {}) => {
    let {
        name,
        address,
        waterType,
        mobile,
        phone
    } = param
    if (!name) {
        return {
            status: false,
            message: '请填写用户名'
        }        
    }
    if (!address) {
        return {
            status: false,
            message: '请填写用户名'
        }
    }
    if (!waterType) {
        return {
            status: false,
            message: '请填写水种类'
        }
    }

    if (!mobile || !phone) {
        return {
            status: false,
            message: '联系方式必须填一个'
        }
    }
    return {
        status: true
    }
}