const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
    let { name, mobile, userInfo } = event
    let message = ''
    if (!name) {
        message = '请填写店主名称'  
    }
    if (!mobile) {
        message = '请填写店主手机号'
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