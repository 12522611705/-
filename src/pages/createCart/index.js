import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'

import './index.scss'

export default class PanelBasic extends Component {
    config = {
        navigationBarTitleText: '创建水卡'
    }

    constructor () {
        super(...arguments)
        this.state = {
            form:{
                username:'',
                address:'',
                type:'',
                mobile:'',
                price:'',
                owePail:''
            }
        }
    }

    componentDidMount () {
      
    }
    handleChange(){

    }
    render () {
        const { form } = this.state;
        return (
            <View className="page page-createCart">
                <View className="main">
                    <AtInput
                        name='username'
                        title='用户名'
                        type='text'
                        placeholder='请输入用户名'
                        value={form.username}
                        onChange={this.handleChange.bind(this)}/>
                    <AtInput
                        name='address'
                        title='用户地址'
                        type='text'
                        placeholder='请输入用户地址'
                        value={form.address}
                        onChange={this.handleChange.bind(this)}/>
                    <AtInput
                        name='type'
                        title='水种'
                        type='text'
                        placeholder='请输入水的名称'
                        value={form.type}
                        onChange={this.handleChange.bind(this)}/>
                    <AtInput
                        name='mobile'
                        title='手机号码'
                        type='text'
                        placeholder='请输入手机号码'
                        value={form.mobile}
                        onChange={this.handleChange.bind(this)}/>
                    <AtInput
                        name='price'
                        title='水单价'
                        type='text'
                        placeholder='请输入水单价'
                        value={form.price}
                        onChange={this.handleChange.bind(this)}/>
                    <AtInput
                        name='owePail'
                        title='压桶'
                        type='text'
                        placeholder='请输入压桶数量'
                        value={form.owePail}
                        onChange={this.handleChange.bind(this)}/>
                </View>
                <View className="row">
                    <AtButton type='primary'>保存</AtButton>
                </View>
            </View>
        )
    }
}
