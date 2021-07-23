let emptySnippets = {
  page: 0,
  pages: 0,
  itemsPages: 10,
  error: "",
  snippets: [],
  filter: {},
  fetching: false,
  hasMore: false
}

export const SNIPPET_FETCHING = "SNIPPET_FETCHING";
export const SNIPPET_LOAD = "SNIPPET_LOAD";
export const SNIPPET_RESET = "SNIPPET_FETCHING";
export const SNIPPET_ERROR = "SNIPPET_ERROR";


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
      const hasMore = page !== pages;
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
    default:
      return state;
  }
}

export default snippetReducer;
