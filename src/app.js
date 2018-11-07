import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index/index'

import './app.scss'

if (process.env.TARO_ENV === 'weapp') {
    require('taro-ui/dist/weapp/css/index.css')
} else if (process.env.TARO_ENV === 'h5') {
    require('taro-ui/dist/h5/css/index.css')
}

class App extends Component {
    config = {
        pages: [
            'pages/index/index',
            'pages/cartList/index',
            'pages/cart/index',
            'pages/createCart/index',
            'pages/cartDetail/index',
            'pages/addUser/index',
            'pages/register/index',
            'pages/record/index',
            'pages/basic/index',
            'pages/history/index',
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        }
    }

    componentDidMount () {
        wx.cloud.init()
    }

    componentDidShow () {}

    componentDidHide () {}

    componentCatchError () {}

    render () {
        return <Index />
    }
}

Taro.render(<App />, document.getElementById('app'))
