import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtListItem } from 'taro-ui'

import './index.scss'

export default class PanelBasic extends Component {
    config = {
        navigationBarTitleText: '用户详情'
    }

    constructor () {
        super(...arguments)
        this.state = {
            user:{
                name:'老万',
                address:'湖南省、娄底市、新化县',
                serial:'A100',
                usermobile:'18588999708',
                remark:'备注信息'
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
        const { user } = this.state;

        return (
            <View className="page page-cartDetail">
                <AtListItem className="srow" extraText='用户名称' title={user.name} />
                <AtListItem className="srow" extraText='用户地址' title={user.address} />
                <AtListItem className="srow" extraText='用户卡号' title={user.serial} />
                <AtListItem className="srow" extraText='联系方式' title={user.usermobile} />
                <AtListItem className="srow" extraText='备注' title={user.remark} />
                <View className="row" data-page="history" onClick={this.goPage}>
                    <AtListItem
                        title='查看用户水卡'
                        arrow='right'
                        thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'/>
                </View>
            </View>
        )
    }
}
