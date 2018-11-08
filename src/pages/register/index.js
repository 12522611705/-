import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'

import './index.scss'

export default class PanelBasic extends Component {
    config = {
        navigationBarTitleText: '注册'
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
    /*页面跳转*/
    goPage(e){
        const { page } = e.currentTarget.dataset
        Taro.navigateTo({
            url: `/pages/${page}/index`
        })
    }
    render () {
        const { form } = this.state;
        return (
            <View className="page page-register">
                <View className="main">
                    <AtInput
                        name='username'
                        title='用户名'
                        type='text'
                        placeholder='请输入用户名'
                        value={form.username}
                        onChange={this.handleChange}/>
                    <AtInput
                        name='password'
                        title='密码'
                        type='password'
                        placeholder='密码不能少于10位数'
                        value={form.password}
                        onChange={this.handleChange}/>
                    <AtInput
                        clear
                        type='text'
                        maxlength='11'
                        className="text"
                        placeholder='请输入手机号码'
                        value={form.mobile}
                        onChange={this.handleChange}>
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
                        onChange={this.handleChange}/>
                </View>
                <View onClick={this.goPage} data-page="userList">
                    <AtButton type='primary'>注册店主</AtButton>
                </View>
            </View>
        )
    }
}
