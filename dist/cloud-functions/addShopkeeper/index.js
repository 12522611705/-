const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 短信最大有效时间
const MESSAGE_MAX_INVALID_TIME = 5 * 60 * 1000

/**
 * 校验验证码
 * @param {String} mobile 接收验证码的手机号
 * @param {String} code 验证码
 */
const verifyCode = (mobile, code) => {
    return new Promise((res, rej) => {
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

exports.main = async (event, context) => {
    let {
        // 店主名称
        name,
        // 店主手机号
        mobile,
        // 手机验证码
        code,
        // 用户信息
        userInfo
    } = event
    let message = ''
    if (!name) {
        message = '请填写店主名称'  
    }
    if (!mobile) {
        message = '请填写店主手机号'
    }
    if (!code) {
        message = '请填写手机验证码'
    }
    if (message) {
        return {
            status: 400,
            data: {
                status: false
            },
            message   
        }
    }
    try {
        // 校验验证码
        await verifyCode(mobile, code)    
    } catch (error) {
        return {
            status: 400,
            data: {
                status: false
            },
            message: '验证码校验失败'
        }
    }
    
    try {
        let data = await db.collection('store_users').where({
            openId: userInfo.openId
        }).get()
        if (data.data.length > 0) {
            return {
                status: 400,
                data: {
                    status: false
                },
                message: '当前用户已经是店主，不能重复添加'    
            }
        }

        await db.collection('store_users').add({
            data: {
                openId: userInfo.openId,
                name,
                mobile,
                createTime: db.serverDate()
            }
        })
        return {
            status: 200,
            data: {
                status: true
            },
            message: '店主添加成功'
        }
    } catch (error) {
        return {
            status: 502,
            message: '未知错误'
        }   
    }
}