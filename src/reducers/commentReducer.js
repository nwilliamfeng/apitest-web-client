import { commentConstants , Pages } from '../constants';

const defaultState = {
    commentData: { rc:1, count:0, me:'' },
    replyData: null,
    page: Pages.HOME,
    
    commentPage:1,
     
    replySortType:-1,
    replyPage:1,
    replyPageSize:5,

    postId:null,
    searchType:null,
    replyId:null,
    articleNewListData:{rc:1,count:0,me:''},
    articleNewListPageIdx:0,
}

export const commentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case commentConstants.LOAD_REPLYS:
            return {
                ...state,
                replyData: action.replyData,
                replySortType:action.sortType,            
                replyPage:action.page,
                replyPageSize:action.pageSize,
                postId:action.postId,
                searchType:action.searchType,
                replyId:action.replyId,
            }
        case commentConstants.LOAD_COMMENTS:
            return {
                ...state,
                 
                commentData: action.commentData,
                commentPage:action.page,
                searchType:action.searchType,
                postId:action.postId,
            }

        case commentConstants.DIRECT_PAGE:
            return {
                ...state,
                page: action.page,
            }
        
        case commentConstants.LOAD_ARTICLE_NEW_LIST:
        return{
            ...state,
            articleNewListData:action.articleNewListData,
            articleNewListPageIdx:action.pageIdx,
        }

        default:
            return state;
    }
}