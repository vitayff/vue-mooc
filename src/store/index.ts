import {createStore} from "vuex";
import {getItem, setItem} from '../utils/storage'

const USER_KEY = 'TOUTIAO_USER'

const U_NAME = 'USER_NICK_NAME'
export default createStore({
    state: {
        // user: JSON.parse(<string>window.localStorage.getItem('TOUTIAO_USER')),
        user: getItem(USER_KEY), // 当前登录用户的登录状态（token等数据）
        uName: getItem(U_NAME),
    },
    mutations: {
        setUser(state, data) {
            state.user = data
            setItem(USER_KEY, state.user)
            // window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(state.user))
        },
        setNickname(state, data) {
            state.uName = data
            setItem(U_NAME, state.uName)
        }

    },
    actions: {},
    modules: {},
});
