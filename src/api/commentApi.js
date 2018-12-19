import { ApiHelper } from './apiHelper'
import {cookieUtil} from '../utils'

const URL='reply/api/Reply'

class CommentApi {

    getCToken(){
        return cookieUtil.getCookieValue('ct');
    }

    getUToken(){
        return cookieUtil.getCookieValue('ut');
    }

    async getArticleNewList(code,sortType=-1,page=1,pageSize=20) {
    
        // const url =`${URL}/ArticleNewList?deviceid=a21323asdf21a32f&version=300&product=guba&plat=web&code=${code}&p=${page}&ps=${pageSize}&sort=${sortType}`
        const ct=this.getCToken();
        const ut =this.getUToken();
        const url=`${URL}/ArticleNewList?deviceid=a21323asdf21a32f&version=300&product=guba&plat=web&code=${code}&p=${page}&ps=${pageSize}`;
        
      //  const url =`${URL}/ArticleNewList?deviceid=a21323asdf21a32f&version=300&product=guba&plat=web&code=${code}&p=${page}&ps=${pageSize}&ctoken=${ct}&utoken=${ut}`;
        return await ApiHelper.get(this.checkToken(url));
    }

    checkToken(url){
        const ct=this.getCToken();
        const ut =this.getUToken();
        if(ct==null){
            return url;
        }
        return url+`&ctoken=${ct}&utoken=${ut}`;
    }

    async getComments(postId,sortType=-1,page=1,pageSize=20) {
       
        const ct=this.getCToken();
        const ut =this.getUToken();
       // const url =`reply/api/Reply/ArticleNewReplyList?deviceid=a21323asdf21a32f&version=300&product=guba&plat=web&postid=${postId}&p=${page}&ps=${pageSize}&sortType=${sortType}&ctoken=${ct}&utoken=${ut}`
       const url =`reply/api/Reply/ArticleNewReplyList?deviceid=a21323asdf21a32f&version=300&product=guba&plat=web&postid=${postId}&p=${page}&ps=${pageSize}&sortType=${sortType}`
       return await ApiHelper.get(this.checkToken(url));
    }

    async getReplys(postid,replyid,sortType=-1,page=1,pageSize=20) {
        const ct=this.getCToken();
        const ut =this.getUToken();
       // const url =`reply/api/Reply/ArticleReplyDetail?deviceid=a21323asdf21a32f&version=300&product=guba&plat=web&postid=${postid}&replyid=${replyid}&p=${page}&ps=${pageSize}&sortType=${sortType}&ctoken=${ct}&utoken=${ut}`;
       const url =`reply/api/Reply/ArticleReplyDetail?deviceid=a21323asdf21a32f&version=300&product=guba&plat=web&postid=${postid}&replyid=${replyid}&p=${page}&ps=${pageSize}&sortType=${sortType}`; 
       return await ApiHelper.get(this.checkToken(url));
    }

}

export const commentApi = new CommentApi();