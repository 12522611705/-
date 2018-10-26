import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtSegmentedControl, AtInput, Picker } from 'taro-ui'

import './index.scss'

export default class PanelBasic extends Component {
    config = {
        navigationBarTitleText: '天天有水'
    }

    constructor () {
        super(...arguments)
        this.state = {
            current:0,
            personInfo:[{
                name:'编号',
                value:'001'
            },{
                name:'客户',
                value:'老万'
            },{
                name:'地址',
                value:'xx市xx区xxxx'
            },{
                name:'水种',
                value:'景甜'
            },{
                name:'销售方式',
                value:'10-1'
            },{
                name:'联系电话',
                value:'18500000000'
            },{
                name:'电话',
                value:'400-3613201'
            },{
                name:'监督热线',
                value:'20元'
            },{
                name:'压桶',
                value:'10个'
            }],
            data:{
                time:''
            },
            number:[
                1,2,3,4,5,6,7,8,9,10,
                11,12,13,14,15,16,17,18,19,20,
                21,22,23,24,25,26,27,28,29,30,
                31,32,33,34,35,36,37,38,39,40,
                41,42,43,44,45,46,47,48,49,50,
                51,52,53,54,55,56,57,58,59,60,
                61,62,63,64,65,66,67,68,69,70,
                71,72,73,74,75,76,77,78,79,80,
                81,82,83,84,85,86,87,88,89,90,
                91,92,93,94,95,96,97,98,99,100,
                200,300,400,500,600,700,800,900
            ]
        }
    }

    componentDidMount () {
      
    }
    tabToggle(value){
        this.setState({current:value})
    }
    changeData(){

    }
    changePicker(key,ev){
      this.setState({
          data:{
              [key]:ev.target.value
          }
      })
    }
    render () {
      const { data, personInfo, number } = this.state;

      return (
        <View className="page page-cart">
            <AtSegmentedControl
              values={['基本信息', '我的水卡']}
              fontSize='40'
              onClick={this.tabToggle}
              current={this.state.current}/>
              {this.state.current === 0 ? <View className='tab-content'>
                {
                    personInfo.map((el,index)=>(
                        <AtInput
                          editable={false}
                          title={el.name}
                          placeholderStyle="color:#000"
                          type='text'
                          key={index}
                          value={el.value}
                          onChange={this.changeData.bind(this)}/>
                    ))
                }
              </View> : null}
              {this.state.current === 1 ? <View className='tab-content'>
                <Picker className="cart-row" mode='date' onChange={this.changePicker.bind(this,'time')}>
                  <View className='picker'>
                    日期：{data.time}
                  </View>
                </Picker>
                <Picker className="cart-row" mode='selector' range={number} onChange={this.changePicker.bind(this,'time')}>
                  <View className='picker'>
                    供水：{data.time}
                  </View>
                </Picker>
                <Picker className="cart-row" mode='selector' range={number} onChange={this.changePicker.bind(this,'time')}>
                  <View className='picker'>
                    回桶：{data.time}
                  </View>
                </Picker>
                <Picker className="cart-row" mode='selector' range={number} onChange={this.changePicker.bind(this,'time')}>
                  <View className='picker'>
                    存桶：{data.time}
                  </View>
                </Picker>
                <Picker className="cart-row" mode='selector' range={number} onChange={this.changePicker.bind(this,'time')}>
                  <View className='picker'>
                    送水：{data.time}
                  </View>
                </Picker>
                <Picker className="cart-row" mode='selector' range={number} onChange={this.changePicker.bind(this,'time')}>
                  <View className='picker'>
                    收货：{data.time}
                  </View>
                </Picker>
                <Picker className="cart-row" mode='selector' range={number} onChange={this.changePicker.bind(this,'time')}>
                  <View className='picker'>
                    结算：{data.time}
                  </View>
                </Picker>
                <Picker className="cart-row" mode='selector' range={number} onChange={this.changePicker.bind(this,'time')}>
                  <View className='picker'>
                    验收：{data.time}
                  </View>
                </Picker>
            </View> : null}
        </View>
      )
    }
}
