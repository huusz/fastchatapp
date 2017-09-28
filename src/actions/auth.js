import map from 'lodash/map';
import {
  auth,
  database,
  googleProvider,
} from '../firebase';

export const loginGoogleUser = () => {
  return (dispatch) => {
    // 로그인 요청중 Action
    dispatch({
      type: 'LOGIN_USER_REQUEST',
    })

    auth.signInWithPopup(googleProvider)
      .then((user) => {
        dispatch({
          type: 'LOGIN_USER_SUCCESS',
          payload: {
            name: user.additionalUserInfo.profile.name,
            profileImageUrl: user.additionalUserInfo.profile.picture,
            email: user.additionalUserInfo.profile.email,
          }
        })
        
        // 로그인이 되면 Question DB에서 값을 받아오는 액션 발생
        database.ref('/questions').on('value', (snapshot) => {
          dispatch({
            type: 'FETCHED_QUESTIONS_LIST',
            payload: map(snapshot.val(), (question, id) => ({ id, ...question }))
          })
        })

      })
      .catch((error) => {
        dispatch({
          type: 'LOGIN_USER_FAILED',
        })
      })
  }
}

export const logout = () => {
  return (dispatch) => {
    auth.signOut()
      .then(() => {
        dispatch({
          type: 'LOGOUT',
        })
      })
      .catch(() => {
        // auth.signOut 이 reject되는 경우가 있는지는 모르겠지만 일단 추가함
        console.log('LOGIN FAILED')
      })
  }
}
