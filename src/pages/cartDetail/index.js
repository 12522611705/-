import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtListItem } from 'taro-ui'

import './index.scss'

export default class PanelBasic extends Component {
    config = {
        navigationBarTitleText: '水卡详情'
    }

    constructor () {
        super(...arguments)
        this.state = {
            cartInfo:{
                serial:'编号',
                username:'用户名',
                address:'地址',
                kind:'水种',
                mobile:'联系电话',
                press:'压桶数量',
                price:'20元'
            }
        }
    }

    componentDidMount () {
      
    }
    /*页面跳转*/
    goPage(e){
        const { page, userid } = e.currentTarget.dataset
        Taro.navigateTo({
            url: `/pages/${page}/index?id=${userid}`
        })
    }
    render () {
      const { cartInfo } = this.state;

      return (
        <View className="page page-cartDetail">
            <AtListItem className="srow" title='编号' extraText={cartInfo.serial} />
            <AtListItem className="srow" title='用户名' extraText={cartInfo.username} />
            <AtListItem className="srow" title='地址' extraText={cartInfo.address} />
            <AtListItem className="srow" title='水种' extraText={cartInfo.kind} />
            <AtListItem className="srow" title='联系电话' extraText={cartInfo.mobile} />
            <AtListItem className="srow" title='压桶数量' extraText={cartInfo.press} />
            <AtListItem className="srow" title='20元' extraText={cartInfo.price} />
            <View className="row" data-page="history" onClick={this.goPage}>
                <AtListItem
                    title='查看历史配送记录'
                    arrow='right'
                    thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'/>
            </View>
        </View>
      )
    }
}
