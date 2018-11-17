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
            'pages/userList/index',
            'pages/cart/index',
            'pages/createCart/index',
            'pages/cartDetail/index',
            'pages/userDetail/index',
            'pages/addUser/index',
            'pages/register/index',
            'pages/record/index',
            'pages/basic/index',
            'pages/history/index',
            'pages/editor/index',
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: '天天有水',
            navigationBarTextStyle: 'black'
        }
    }
    // 页面被载入    
    componentWillMount(){}
    // 页面渲染完成
    componentDidMount () {
        wx.cloud.init()
    }
    // 页面即将更新   
    componentWillUpdate(){}
    // 页面更新完成
    componentDidUpdate(){}
    // 页面展示出来
    componentDidShow(){}
    // 页面被隐藏
    componentDidHide(){}
    // 
    componentCatchError(){}
    // 页面上拉触底事件的处理函数
    onReachBottom(){}
    // 页面滚动触发事件的处理函数
    onPageScroll(){}
    render(){
        return <Index />
    }
}

Taro.render(<App />, document.getElementById('app'))
