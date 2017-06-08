import {
	RECORD_USERINFO,
	OUT_LOGIN
} from './mutation-types.js';

export default {
	[OUT_LOGIN]({state, commit}){
	    commit(OUT_LOGIN)
	},
	[RECORD_USERINFO]({ state, commit},userInfo){
		commit(RECORD_USERINFO,userInfo);
	}
}