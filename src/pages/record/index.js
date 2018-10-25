import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtSegmentedControl, AtInput, Picker } from 'taro-ui'

import './index.scss'

export default class PanelBasic extends Component {
    config = {
        navigationBarTitleText: '送水记录'
    }

    constructor () {
        super(...arguments)
        this.state = {
        }
    }

    componentDidMount () {
      
    }
    render () {
        const { data, personInfo, number } = this.state;

        return (
            <View className="page page-record">
              
            </View>
        )
    }
}
