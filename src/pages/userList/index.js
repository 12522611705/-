import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtSearchBar, AtButton, AtListItem } from 'taro-ui'

import './index.scss'

export default class PanelBasic extends Component {
    config = {
        navigationBarTitleText: '用戶列表'
    }

    constructor () {
        super(...arguments)
        this.state = {
            currentId:'',
            cartList:[{
                name:'用戶名',
                address:'湖南省、娄底市、新化县',
                note:'18588999708'
            },{
                name:'用戶名',
                address:'湖南省、娄底市、新化县',
                note:'18588999708'
            },{
                name:'用戶名',
                address:'湖南省、娄底市、新化县',
                note:'18588999708'
            },{
                name:'用戶名',
                address:'湖南省、娄底市、新化县',
                note:'18588999708'
            },{
                name:'用戶名',
                address:'湖南省、娄底市、新化县',
                note:'18588999708'
            },{
                name:'用戶名',
                address:'湖南省、娄底市、新化县',
                note:'18588999708'
            },{
                name:'用戶名',
                address:'湖南省、娄底市、新化县',
                note:'18588999708'
            },{
                name:'用戶名',
                address:'湖南省、娄底市、新化县',
                note:'18588999708'
            },{
                name:'用戶名',
                address:'湖南省、娄底市、新化县',
                note:'18588999708'
            }]
        }
    }

    componentDidMount () {
        
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
                                <View key={index} className="srow" onClick={this.goPage} data-page="userDetail">
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

                <View className="row" onClick={this.goPage} data-page="addUser">
                    <AtButton type='primary'>添加用戶</AtButton>
                </View>
            </View>
        )
    }
}
