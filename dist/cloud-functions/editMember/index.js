const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
    let { userInfo, openId, ...cardInfo } = event
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
            // 需要查询当前操作人是否是店主，不是则不能够编辑会员资料
            let data = await cloud.callFunction({
                name: 'isShopkeeper'
            })
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
        // 没有代表新增用户
        } else {
            let result = await db.collection('general_users').add({
                data: {
                    shopkeeperOpenId: userInfo.openId,
                    ...cardInfo,
                    createTime: db.serverDate(),
                    lastEditTime: db.serverDate()
                }
            })
            return {
                status: 200,
                data: result,
                message: '客户添加成功'
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
    let { name, address, waterType, mobile, phone } = param
    if (!name) {
        return {
            status: false,
            message: '请填写用户名'
        }        
    }
    if (!address) {
        return {
            status: false,
            message: '请填写用户地址'
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