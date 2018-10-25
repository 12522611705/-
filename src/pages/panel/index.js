import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtSearchBar, AtButton } from 'taro-ui'

import './index.scss'

export default class PanelBasic extends Component {
  config = {
    navigationBarTitleText: '天天有水'
  }

  constructor () {
    super(...arguments)
    this.state = {
      currentId:'',
      cartList:[{
        name:'001'
      },{
        name:'002'
      },{
        name:'003'
      },{
        name:'004'
      },{
        name:'005'
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
  createCart = e =>{
    Taro.navigateTo({
      url: '/pages/createCart/index'
    })
  }
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
          {cartList.map((item, index) => (
            <Text key={index} data-id={item.id} onClick={this.gotoComponent} className="items">
              {item.name}
            </Text>
          ))}
          <Text onClick={this.createCart} className="items">
            创建水卡
          </Text>
          <Text style={{clear:'both'}}></Text>
        </View>
      </View>
    )
  }
}
