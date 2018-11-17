const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
    try {
        let data = await db.collection('store_users').where({
            openId: event.userInfo.openId
        }).get()
        return {
            status: 200,
            data: {
                status: data.data.length > 0
            },
            message: '查询成功'
        }
    } catch (err) {
        return {
            status: 502,
            message: '未知错误',
            data: err
        }
    }
    
    
}