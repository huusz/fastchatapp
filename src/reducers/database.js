const DEFAULT_STATE = {
  questions: [],
}


// 지금은 질문 데이터만 있지만 유저라던지 별도의 DB 모델이 추가
// 되면 요기 리두서에서 관리하기 위해 DatabaseREducer라고 네이밍
const databaseReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === 'FETCHED_QUESTIONS_LIST') {
    return {
      ...state,
      questions: [ ...action.payload ],
    }
  }
  return {
    ...state,
  }
}


export default databaseReducer;
