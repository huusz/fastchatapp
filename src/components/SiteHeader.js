import React from 'react'
import CurrentUser from './CurrentUser'


export default class SiteHeader extends React.Component {
  render() {
    return (
      <div>
        <section className="hero is-small is-danger is-bold">
          <div className="container">
            <div className="hero-head">
              <header className="nav">
                <div className="container">
                  <div className="nav-left">
                    <CurrentUser />
                  </div>
                </div>
              </header>
            </div>
          </div>
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                결정 내리시기 힘들죠?
              </h1>
              <h2 className="subtitle">
                결정 Expert에게 의뢰하세요
              </h2>
            </div>
          </div>
          <div className="hero-foot">
            <nav className="tabs is-boxed is-fullwidth">
              <div className="container">
                <ul>
                  <li className={""/*is-active*/}>
                    <a onClick={this.props.togglePostingMode}>
                      <span className="icon">
                        <i className="fa fa-question-circle"></i>
                      </span>
                      <span>나도 질문 올리기</span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </section>
      </div>
    );
  }
}
