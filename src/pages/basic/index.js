import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtListItem } from 'taro-ui'

import './index.scss'

export default class PanelBasic extends Component {
    config = {
        navigationBarTitleText: '个人信息'
    }

    constructor () {
        super(...arguments)
        this.state = {
            personinfo:{
                name:'老万',
                address:'湖南省、娄底市、新化县',
                mobile:'18500000000'
            }
        }
    }
    /*页面跳转*/
    goPage(e){
        const { page, userid } = e.currentTarget.dataset
        Taro.navigateTo({
            url: `/pages/${page}/index?id=${userid}`
        })
    }
    componentDidMount () {
      
    }
    render () {
        const { personinfo } = this.state;

        return (
            <View className="page page-basic">
                <View className="personinfo">
                    <View className="pic">
                        <open-data type="userAvatarUrl"></open-data>
                    </View>
                    <View className="desc">
                        <View style={{order:1}} className="srow title">
                            <open-data type="userNickName"></open-data>
                        </View>
                        <View style={{order:2}} className="srow">
                            {personinfo.address}
                        </View>
                        <View style={{order:3}} className="srow">
                            {personinfo.mobile}
                        </View>
                    </View>
                </View>

                <View className="row" data-page="cartList" data-userid="111" onClick={this.goPage}>
                    <AtListItem
                        title='查看水卡'
                        arrow='right'
                        thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'/>
                </View>

                <View className="row" data-page="feedback" onClick={this.goPage}>
                    <AtListItem
                        title='意见反馈'
                        arrow='right'
                        thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'/>
                </View>

            </View>
        )
    }
}
