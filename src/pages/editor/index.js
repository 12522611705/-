import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtInput, AtTextarea } from 'taro-ui'

import './index.scss'

// react component state update
import addons from 'react-addons-update'
import update from 'react-update'

export default class PanelBasic extends Component {
    config = {
        navigationBarTitleText: '修改用户名'
    }

    constructor () {
        super(...arguments)
        this.state = {
            type:'text',
            value:''
        }
    }

    componentDidMount () {
      
    }
    changeValue(value){
        console.log(value)
    }
    render () {
      const { type, value } = this.state;

      return (
        <View className="page">
            {
                type == 'text' ?
                <AtInput
                  name="text"
                  placeholderStyle="color:#000"
                  type='text'
                  value={value}
                  onChange={this.changeValue}/>:
                <AtTextarea
                    value={value}
                    onChange={this.changeValue}
                    maxlength='200'
                    placeholder='请输入'/>
            }
        </View>
      )
    }
}
