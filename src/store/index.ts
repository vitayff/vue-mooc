import {createStore} from "vuex";
import {getItem, setItem} from '../utils/storage'

const USER_KEY = 'TOUTIAO_USER'
export default createStore({
    state: {
        // user: JSON.parse(<string>window.localStorage.getItem('TOUTIAO_USER')),
        user: getItem(USER_KEY), // 当前登录用户的登录状态（token等数据）
        hName: "",
        uName: "未登录",
    },
    mutations: {
        setUser(state, data) {
            console.log(state,data,"store")
            state.user = data
            setItem(USER_KEY, state.user)
            // window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(state.user))
        }

    },
    actions: {},
    modules: {},
});
