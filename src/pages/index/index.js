import Taro from '@tarojs/taro'
import { View, Image, navigator, Button  } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import logoImg from '../../assets/images/logo_taro.png'
import iconBasic from '../../assets/images/icon-list-basic.png'
import iconView from '../../assets/images/icon-list-view.png'

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
    gotoPanel = e => {
        const { id } = e.currentTarget.dataset
        if(id == 'shopkeeper'){
            Taro.navigateTo({
                url: `/pages/register/index?id=${id.toLowerCase()}`
            })
        }else{
            Taro.navigateTo({
                url: `/pages/panel/index?id=${id.toLowerCase()}`
            })  
        }
    }
    /**
     * 获取数据
     */
    getData(){
        wx.cloud.callFunction({
            name: 'get'
        }).then(data => {
            console.log('这里是获取到的数据', data)
            let list = data.result.data
            if (list.length > 0 ) {
                this.setState({
                  testId: list[0]._id
                })
            }
        })
    }
    /**
     * 添加数据
     */
    addData() {
        wx.cloud.callFunction({
            name: 'add'
        }).then(data => {
            console.log(data)
        })
    }
    /**
     * 修改数据
     */
    modifyData() {
        if (!this.state.testId) {
            console.error('请先获取数据，之后再修改数据')
            return
        }
        wx.cloud.callFunction({
            name: 'modify',
            data: {
                id: this.state.testId,
                content: 456456
            }
        }).then(data => {
            console.log(data)
        })
    }
    /**
     * 删除数据
     */
    removeData() {
        if (!this.state.testId) {
            console.log('请先获取数据，之后再修改数据')
            return
        }
        wx.cloud.callFunction({
            name: 'remove',
            data: {
                id: this.state.testId
            }
        }).then(data => {
            console.log(data)
            this.setState({
                testId: ''
            })
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
                <Button plain onClick={this.getData}>获取数据</Button>
                <Button plain onClick={this.addData}>增加一条数据</Button>
                <Button plain onClick={this.removeData}>删除一条数据</Button>
                <Button plain onClick={this.modifyData}>修改一条数据</Button>
                <View className='module-list'>
                    {
                        list.map((item, index) => (
                            <View
                                className='module-list__item'
                                key={index}
                                data-id={item.id}
                                data-name={item.title}
                                onClick={this.gotoPanel}>
                                    <View className='module-list__icon'>
                                        <Image src={item.icon} className='img' mode='widthFix' />
                                    </View>
                                    <View className='module-list__info'>
                                        <View className='title'>{item.title}</View>
                                    </View>
                                    <View className='module-list__arrow'>
                                        <AtIcon value='chevron-right' />
                                    </View>
                            </View>
                        ))
                    }
                </View>
                <official-account></official-account>
            </View>
        )
    }
}
