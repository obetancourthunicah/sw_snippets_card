let emptySnippets = {
  page: 0,
  pages: 0,
  itemsPages: 10,
  error: "",
  snippets: [],
  filter: {},
  fetching: false,
  hasMore: true,
  setCurrentId: null,
  redirect:false,
  currentSnippet: null,
  scrollto:0,
}

export const SNIPPET_FETCHING = "SNIPPET_FETCHING";
export const SNIPPET_LOAD = "SNIPPET_LOAD";
export const SNIPPET_RESET = "SNIPPET_FETCHING";
export const SNIPPET_ERROR = "SNIPPET_ERROR";
export const SNIPPET_SETCURRENT = "SNIPPET_SETCURRENT";
export const SNIPPET_CURRENT_LOAD = "SNIPPET_CURRENT_LOAD";


const snippetReducer = (state = emptySnippets, action = {}) => {
  switch(action.type){
    case SNIPPET_FETCHING:
      return {
        ...state,
        fetching:true
      }
    case SNIPPET_LOAD:
      const {rownum, rows, page, size} = action.payload;
      const pages = Math.ceil(rownum / size);
      console.log({rownum, rows, size, pages, page});
      const hasMore = page <= pages;
      const newRows = [...state.snippets, ...rows];
      return {
        ...state,
        fetching:false,
        page: page,
        pages: pages,
        itemsPages: size,
        error: "",
        snippets: newRows,
        hasMore: hasMore,
      }
    case SNIPPET_RESET:
      return emptySnippets;
    case SNIPPET_ERROR:
      const {error} = action.payload;
      return {
        ...state,
        error : error
      }
    case SNIPPET_SETCURRENT:
      return {
        ...state,
        setCurrentId: action.payload._id,
        scrollto:action.payload.scrollToY,
        redirect: true,
      }
    case SNIPPET_CURRENT_LOAD:
      return {
        ...state,
        currentSnippet: action.payload,
        redirect: false,
      }
    default:
      return state;
  }
}

export default snippetReducer;
