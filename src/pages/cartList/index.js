import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtSearchBar, AtButton, AtListItem } from 'taro-ui'

import './index.scss'

export default class PanelBasic extends Component {
    config = {
        navigationBarTitleText: '水卡列表'
    }

    constructor () {
        super(...arguments)
        this.state = {
            currentId:'',
            cartList:[{
                name:'A001',
                address:'湖南省、娄底市、新化县',
                note:'剩余13桶'
            },{
                name:'A002',
                address:'湖南省、娄底市、新化县',
                note:'剩余13桶'
            },{
                name:'A003',
                address:'湖南省、娄底市、新化县',
                note:'剩余13桶'
            },{
                name:'A004',
                address:'湖南省、娄底市、新化县',
                note:'剩余13桶'
            },{
                name:'A005',
                address:'湖南省、娄底市、新化县',
                note:'剩余13桶'
            },{
                name:'A006',
                address:'湖南省、娄底市、新化县',
                note:'剩余13桶'
            },{
                name:'A007',
                address:'湖南省、娄底市、新化县',
                note:'剩余13桶'
            },{
                name:'A008',
                address:'湖南省、娄底市、新化县',
                note:'剩余13桶'
            },{
                name:'A009',
                address:'湖南省、娄底市、新化县',
                note:'剩余13桶'
            }]
        }
    }

    componentDidMount () {
        const { id } = this.$router.params
        this.setState({
            currentId: id.toLowerCase() || ''
        })
    }

    gotoComponent = e => {
        const { id } = e.currentTarget.dataset
        Taro.navigateTo({
            url: `/pages/cart/index?id=${id}`
        })
    }
    /*页面跳转*/
    goPage(e){
        const { page } = e.currentTarget.dataset
        Taro.navigateTo({
            url: `/pages/${page}/index`
        })
    }
    /*搜索框*/
    onChange(value){
        console.log(e)
    }
    render () {
        const { cartList, currentId, searchValue } = this.state;

        return (
            <View className="page">
                <AtSearchBar
                    value={searchValue}
                    onChange={this.onChange.bind(this)}/> 

                <View className='cart-list'>
                    <View className="main">
                        {
                            cartList.map((item, index) => (
                                <View key={index} className="srow" onClick={this.goPage} data-page="cartDetail">
                                    <AtListItem
                                        arrow='right'
                                        note={item.address}
                                        title={item.name}
                                        extraText={item.note}/>
                                </View>
                            ))
                        }
                    </View>
                </View>

                <View className="row" onClick={this.goPage} data-page="createCart">
                    <AtButton type='primary'>创建水卡</AtButton>
                </View>
            </View>
        )
    }
}
