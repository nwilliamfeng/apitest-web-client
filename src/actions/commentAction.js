import {commentConstants,Pages} from '../constants';
import {commentApi} from '../api'

export const commentActions={
    loadReplyList,

    directToPage,

    loadCommentList,

    loadPostList,

}


function loadPostList(code,sort=-1,page=1,pageSize=20){
    return async dispatch=>{
       
        const articleNewListData =await commentApi.getArticleNewList(code,sort,page,pageSize);
        dispatch({type:commentConstants.LOAD_ARTICLE_NEW_LIST,articleNewListData,pageIdx:page});
    }
}

function loadReplyList(postId,replyId,searchType,sortType=-1,page=1,pageSize=20){
    return async dispatch=>{
        dispatch({type:commentConstants.DIRECT_PAGE,page:Pages.REPLY});
        const replyData =await commentApi.getReplys(postId,searchType,replyId,sortType,page,pageSize);
        
        dispatch({type:commentConstants.LOAD_REPLYS,replyData,postId,searchType,replyId,page,pageSize,sortType});
    }
}

function loadCommentList(postId,searchType, sortType=-1,page=1,pageSize=20){
    return async dispatch=>{
        const commentData =await commentApi.getComments(postId,searchType,sortType,page,pageSize);
        
        dispatch({type:commentConstants.LOAD_COMMENTS,commentData,sortType,searchType,page,pageSize,postId});
    }
}

function directToPage(page){
    return {type:commentConstants.DIRECT_PAGE,page};
}


 