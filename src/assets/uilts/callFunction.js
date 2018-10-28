import { resolveModuleName } from "typescript";

/**
 * 云函数调用封装
 * @param {String} name 云函数名字
 * @param {Object} data 调用所传递的参数
 */
export const callFunction = (name, data) => {
    wx.showLoading({
        title: '努力加载中'
    })
    return new Promise((res, rej) => {
        wx.cloud.callFunction({
            name,
            data
        }).then(data => {
            
            wx.hideLoading()
            console.log(data)
            let result = data.result
            if (result.status === 200) {
                res(result)
            } else {
                let errInfo = {
                    title: result.message,
                    icon: 'none'
                }
                wx.showToast(errInfo)
                rej(errInfo)
            }
            
        }).catch(err => {
            wx.hideLoading()
            let errInfo = {
                title: '未知错误',
                icon: 'none'
            }
            wx.showToast(errInfo)
            rej(errInfo)
        })
    })
    
}