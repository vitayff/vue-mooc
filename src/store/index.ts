import {createStore} from "vuex";
import {getItem, setItem} from '../utils/storage';

const USER_KEY = 'TOUTIAO_USER'

const U_NAME = 'USER_NICK_NAME'
const CID = 'COURSE_ID'
const FLAG = 'USER_ROLE'
const ACT = 'ACTIVITY_ID'
export default createStore({
    state: {
        // user: JSON.parse(<string>window.localStorage.getItem('TOUTIAO_USER')),
        user: getItem(USER_KEY), // 当前登录用户的登录状态（token等数据）
        uName: getItem(U_NAME),
        cID: getItem(CID),
        flag: getItem(FLAG),
        activity: getItem(ACT)
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
        },
        setCid(state, data) {
            state.cID = data
            setItem(CID, state.cID)
        },
        setFlag(state, data) {
            state.flag = data
            setItem(FLAG, state.flag)
        },
        setActivity(state, data) {
            state.activity = data
            setItem(ACT, state.activity)
        }

    },
    actions: {},
    modules: {},
});
