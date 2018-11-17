import Taro from '@tarojs/taro'
import { View, Image, navigator, Button  } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import logoImg from '../../assets/images/logo_taro.png'
import iconBasic from '../../assets/images/icon-list-basic.png'
import iconView from '../../assets/images/icon-list-view.png'
import { callFunction } from '../../assets/uilts/callFunction.js'

import './index.scss'

export default class Index extends Taro.Component {
    config = {
        navigationBarTitleText: '天天有水'
    }
    constructor () {
        super(...arguments)
        this.state = {
            list: [{
                id: 'shopkeeper',
                title: '我是店主',
                icon: iconBasic
            },{
                id: 'user',
                title: '我是用户',
                icon: iconView
            }],
            testId: ''
        }
    }
    onShareAppMessage () {
        return {
            title: '天天有水',
            path: '/pages/index/index',
            imageUrl: 'http://storage.360buyimg.com/mtd/home/share1535013100318.jpg'
        }
    }
    goPage = e => {
        const { id } = e.currentTarget.dataset
        if(id == 'shopkeeper'){
            Taro.navigateTo({
                url: `/pages/register/index?id=${id.toLowerCase()}`
            })
        }else{
            Taro.navigateTo({
                url: `/pages/basic/index?id=${id.toLowerCase()}`
            })  
        }
    }
    
    /**
     * 当前用户是否是店主
     */
    isShopkeeper() {
        callFunction('isShopkeeper').then(data => {
            console.log('当前用户是否是店主', data)
        })
    }

    /**
     * 添加店主
     */
    addShopkeeper() {
        callFunction('addShopkeeper', {
            name: '王二',
            mobile: '18026265559'
        }).then(data => {
            console.log('店主添加状态', data)
        })
    }

    /**
     * 添加用户
     */
    addMember() {
        callFunction('editMember', {
            cardCode: 'B12',
            name: '王老二',
            address: '广州市白云大道北',
            waterType: '景天',
            salesType: '10-1',
            mobile: '12399889999',
            phone: '3613991',
            PessureBarrels: '10个'
        }).then(data => {
            console.log('用户添加成功', data)
        })
    }

    render () {
        const { list } = this.state
        return (
            <View className='page page-index'>
                <View className='logo'>
                    <open-data type="userAvatarUrl"></open-data>
                </View>
                <View className='page-title'>
                    <open-data type="userNickName"></open-data>
                </View>
                {
                    list.map((item, index) => (
                        <View
                            className="page-btn"
                            key={index}
                            data-id={item.id}
                            data-name={item.title}
                            onClick={this.goPage}>
                                <Text className="text">{item.title}</Text>
                        </View>
                    ))
                }
                <official-account></official-account>
                <Button plain onClick={this.isShopkeeper}>判断是否是店主</Button>
                <Button plain onClick={this.addShopkeeper}>添加店主</Button>
                <Button plain onClick={this.addMember}>添加用户</Button>
                <Button plain onClick={this.modifyData}>编辑卡片</Button>
                <Button plain onClick={this.modifyData}>获取卡片列表</Button>
                <Button plain onClick={this.modifyData}>获取卡片详情</Button>
                <Button plain onClick={this.modifyData}>获取水卡记录</Button>
                <Button plain onClick={this.modifyData}>编辑水卡记录</Button>
            </View>
        )
    }
}
