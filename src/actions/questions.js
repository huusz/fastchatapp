// Question 읽어오는 Action은 로그인과 밀접한 관계가 있기 때문에
// auth actionCreator의 로그인 부분에서 발생 시키로 결정
// 정답이 있는 게 아니고 취향 차이 정도로 생각하시면 될듯
// 다른 방법으로 하셔도 리스펙트

import {
  database,
} from '../firebase';

export const postQuestionToDB = (payload) => {
  return (dispatch) => {
    database.ref("/questions").push(payload)
    dispatch({
      type: 'POST_QUESTION_TO_DATABASE',
      payload: payload
    })
  }
}
