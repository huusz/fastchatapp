import React from 'react'


export default class CurrentUser extends React.Component {
  renderLoginMode = () => {
    return (
      <div className="nav-right nav-menu">
        <figure
          className="image is-48x48"
        >
          <img
            src={this.props.currentUser.photoUrl}
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
          onClick={this.props.logoutHandler}
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
          onClick={this.props.loginHandler}
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
