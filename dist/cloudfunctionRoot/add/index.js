// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const db = cloud.database()
    let data = null
    try {
        await db.collection('store_users').add({
            data: {
                test: 123123123
            }
        })
        data = {
            status: 200,
            message: '添加数据成功',
            data: null
        }
    } catch (error) {
        data = {
            status: 502,
            message: '服务器错误',
            data: null
        }
    }
    return data
}