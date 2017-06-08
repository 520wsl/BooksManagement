import {
	RECORD_USERINFO,
	OUT_LOGIN
} from './mutation-types.js';

export default {
	// 退出登录
	[OUT_LOGIN](state){
		state.userInfo = {name:""};
		state.login = false;
	},
	[RECORD_USERINFO](state,info){
		state.userInfo = info;
		state.login = true;
	}
}