import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'

import './index.scss'

export default class PanelBasic extends Component {
    config = {
        navigationBarTitleText: '添加用户'
    }

    constructor () {
        super(...arguments)
        this.state = {
            form:{

            }
        }
    }

    componentDidMount () {
      
    }
    render () {
        const { form } = this.state;

        return (
            <View className="page page-addUser">
                <View className="main">
                    <AtInput
                        name='username'
                        title='用户名'
                        type='text'
                        placeholder='请输入用户名'
                        value={form.username}
                        onChange={this.handleChange}/>
                    <AtInput
                        name='usermobile'
                        title='联系方式'
                        type='text'
                        placeholder='请输入用户联系方式'
                        value={form.usermobile}
                        onChange={this.handleChange}/>
                    <AtInput
                        name='useraddress'
                        title='用户地址'
                        type='text'
                        placeholder='请输入用户地址'
                        value={form.usermobile}
                        onChange={this.handleChange}/>
                    <AtInput
                        name='shopkeeper'
                        title='店名'
                        type='text'
                        placeholder='请输入水店名称'
                        value={form.usermobile}
                        onChange={this.handleChange}/>
                    <AtInput
                        name='createname'
                        title='业务员'
                        type='text'
                        placeholder='请输入水卡创建者姓名'
                        value={form.usermobile}
                        onChange={this.handleChange}/>
                    <AtInput
                        name='shopmobile'
                        title='联系方式'
                        type='text'
                        placeholder='请输入店主联系方式'
                        value={form.usermobile}
                        onChange={this.handleChange}/>
                    <AtTextarea
                        value={form.remark}
                        onChange={this.handleChange}
                        maxlength='200'
                        placeholder='请填写备注信息'/>
                    
                </View>
                <View>
                    <AtButton type='primary'>添加用户</AtButton>
                </View>
            </View>
        )
    }
}
