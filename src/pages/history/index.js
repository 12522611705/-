import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import { AtListItem, AtIcon } from 'taro-ui'

import './index.scss'

export default class PanelBasic extends Component {
    config = {
        navigationBarTitleText: '历史配送详情'
    }

    constructor () {
        super(...arguments)
        this.state = {
            history:[{
                name:'A001(景甜)',
                time:'2018-11-15',
                price:'20元'
            },{
                name:'A001(景甜)',
                time:'2018-11-15',
                price:'20元'
            },{
                name:'A001(景甜)',
                time:'2018-11-15',
                price:'20元'
            },{
                name:'A001(景甜)',
                time:'2018-11-15',
                price:'20元'
            },{
                name:'A001(景甜)',
                time:'2018-11-15',
                price:'20元'
            }],
            dateSel:''
        }
    }

    componentDidMount () {
        this.setState({dateSel:new Date().toLocaleDateString()})
    }
    changeDate(e){
        this.setState({dateSel:e.detail.value})
    }
    render () {
      const { history, dateSel } = this.state;

      return (
        <View className="page page-history">
            <Picker mode='date' onChange={this.changeDate}>
                <View className='picker'>
                    <View>{dateSel}<AtIcon value='chevron-down' size='20' color='#666'></AtIcon></View>
                    <View>本月总支出：500.00元</View>
                </View>
            </Picker>
            <View className='cart-list'>
                <View className="main">
                    {
                        history.map((item, index) => (
                            <View key={index} className="srow">
                                <AtListItem
                                    arrow='right'
                                    note={item.time}
                                    title={item.name}
                                    extraText={item.price}/>
                            </View>
                        ))
                    }
                </View>
            </View>
        </View>
      )
    }
}
