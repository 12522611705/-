import Taro from '@tarojs/taro'
import { View, Image, navigator } from '@tarojs/components'
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
      list: [
        {
          id: 'shopkeeper',
          title: '我是店主',
          icon: iconBasic
        },
        {
          id: 'user',
          title: '我是用户',
          icon: iconView
        }
      ]
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
  render () {
    const { list } = this.state

    return (
      <View className='page page-index'>
        <View className='logo'>
          <open-data type="userAvatarUrl"></open-data>
        </View>
        <View className='page-title'><open-data type="userNickName"></open-data></View>
        <View className='module-list'>
          {list.map((item, index) => (
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
          ))}
        </View>
        <official-account></official-account>
      </View>
    )
  }
}
