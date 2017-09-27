import React from 'react'
import {
  connect,
} from 'react-redux';
import {
  loginGoogleUser,
  logout,
} from '../actions/auth';

class CurrentUser extends React.Component {
  renderLoginMode = () => {
    return (
      <div className="nav-right nav-menu">
        <figure
          className="image is-48x48"
        >
          <img
            src={this.props.currentUser.profileImageUrl}
            style={{
              marginTop: '3px',
              borderRadius: '100%',
            }}
          />
        </figure>
        <a className="nav-item">
          {this.props.currentUser.name}님 안녕하세요
        </a>
        <a
          className="nav-item"
          onClick={this.props.onLogout}
        >
          로그아웃하기
        </a>
      </div>
    )
  }

  renderSignoutMode = () => {
    return (
      <div className="nav-right nav-menu">
        <a
          className="nav-item"
          onClick={this.props.loginGoogleUser}
        >
          구글로 로그인하기
        </a>
      </div>
    )
  }

  render() {
    if (this.props.currentUser.name) {
      return this.renderLoginMode();
    }
    return this.renderSignoutMode();
  }
}

export default connect((state) => ({
  currentUser: {
    name: state.auth.name,
    email: state.auth.email,
    profileImageUrl: state.auth.profileImageUrl,
  }
}), (dispatch) => ({
  loginGoogleUser: () => dispatch(loginGoogleUser()),
  onLogout: () => dispatch(logout())
}))(CurrentUser);
