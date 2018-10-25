import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'

import './index.scss'

export default class PanelBasic extends Component {
    config = {
        navigationBarTitleText: '注册店主'
    }

    constructor () {
        super(...arguments)
        this.state = {
            form:{
                username:'',
                password:'',
                mobile:'',
                code:''
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
            <View className="page page-register">
                <View className="register">
                    <View className="title">注册</View>
                    <View className="main">
                      <AtInput
                        name='username'
                        title='用户名'
                        type='text'
                        placeholder='请输入用户名'
                        value={form.username}
                        onChange={this.handleChange.bind(this)}/>
                      <AtInput
                        name='password'
                        title='密码'
                        type='password'
                        placeholder='密码不能少于10位数'
                        value={form.password}
                        onChange={this.handleChange.bind(this)}/>
                        <AtInput
                          clear
                          type='text'
                          maxlength='4'
                          className="text"
                          placeholder='请输入手机号码'
                          value={form.mobile}
                          onChange={this.handleChange.bind(this)}>
                          <Text>发送验证码</Text>
                        </AtInput>
                        <AtInput
                          clear
                          title='手机验证码'
                          type='text'
                          maxlength='4'
                          className="text"
                          placeholder='请输入手机验证码'
                          value={form.code}
                          onChange={this.handleChange.bind(this)}/>
                        <View style={{visibility:"hidden"}}>1</View>
                        <AtButton type='primary'>注册店主</AtButton>
                    </View>
                </View>
            </View>
        )
    }
}
