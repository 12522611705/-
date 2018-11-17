/**
 * 云通信基础能力业务短信发送
 */
const SMSClient = require('@alicloud/sms-sdk')
// ACCESS_KEY_ID
const accessKeyId = 'LTAIZhHI8aiumPgB'
// ACCESS_KEY_SECRET
const secretAccessKey = 'IuOFfsJH10iY7osbW5mNQc6HngtvIO'
// 短信最大有效时间
const MESSAGE_MAX_INVALID_TIME = 5 * 60 * 1000
//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})

const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

/**
 * 将获取到的手机号验证码保存到注册表以作后续校验
 * @param {String} mobile 当前接收验证码的手机号
 * @param {Object} userInfo 当前用户信息
 * @param {String} code 当前验证码
 * @returns {Promise}
 */
const saveDataToDB = (mobile, userInfo, code) => {
    return new Promise((res, rej) => {
        db.collection('register').add({
            data: {
                createTime: db.serverDate(),
                mobile,
                userInfo,
                code
            }
        }).then(() => {
            res()
        }).catch(() => {
            rej
        })
    })
}

/**
 * 返回错误信息
 * @param {*} error 错误信息
 */
const returnError = (error, message = '短信发送失败') => {
    return {
        status: 400,
        message,
        data: error
    }
}

/**
 * 生成6位随机数
 */
const createRandom = () => {
    let num= ""
    for (let i = 0; i < 6; i++) {
        num += Math.floor(Math.random()*10)
    }
    return num
}

/**
 * 从数据库查询当前手机号的验证码是否已经存在并且是否在有效期内
 */
const getDBMessage = (mobile) => {
    return new Promise((res, rej) => {
        db.collection('register').where({
            mobile
        })
        .orderBy('createTime', 'desc')
        .get()
        .then(data => {
            res({
                nowData: db.serverDate(),
                oldTime: data,
                diff: db.serverDate() - data.createTime
            })
            // if (data &&  (new Date(db.serverDate()) - new Date(data.createTime)) < MESSAGE_MAX_INVALID_TIME) {
            //     rej({
            //         status: 400,
            //         message: '请求太过频繁，请使用上一次验证码',
            //         data
            //     })
            // } else {
            //     res(data)
            // }
        })
    })
    
}

exports.main = async (event, context) => {
    let {
        mobile,
        userInfo
    } = event
    // 发送短信一定需要手机号
    if (!mobile) {
        return returnError(null, '参数错误，请检查')
    }
    

    try {
        let data = await getDBMessage(mobile)
        return data
        //发送短信
        let code = createRandom()
        let res = await smsClient.sendSMS({
            PhoneNumbers: mobile,
            SignName: '天天有水',
            TemplateCode: 'SMS_149390894',
            TemplateParam: JSON.stringify({
                code
            })
        })
        let { Code } = res
        if (Code === 'OK') {
            try {
                // 将短信信息存到注册表
                await saveDataToDB(mobile, userInfo, code)
                return {
                    status: 200,
                    message: '短信发送成功'
                }
            } catch (error) {
                return returnError(error)
            }
        } else {
            return returnError(error)
        }
    } catch (error) {
        return returnError(error)
    }
}