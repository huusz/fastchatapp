import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';
import map from 'lodash/map';
import {
  connect,
} from 'react-redux';
import Card from './components/Card';
import SiteHeader from './components/SiteHeader';
import UserProfile from './components/UserProfile';
import PostQuestion from './components/PostQuestion';
import VoteScore from './components/VoteScore';
import {
  database,
} from './firebase';


class App extends Component {
  state = {
    isPostMode: false,
  }

  togglePostingMode = () => this.setState({ isPostMode: !this.state.isPostMode })

  render() {
    return (
      <div>
        <SiteHeader
          togglePostingMode={this.togglePostingMode}
        />
        {this.props.isLoggedIn && this.state.isPostMode ? (
          <PostQuestion
            onClose={this.togglePostingMode}
          />
        ) : (
          this.state.isPostMode ? <div>로그인 하고 사용하세요</div> : null
        )}
        <div className="container">
          {this.props.questions.map((question) => {
            return (
              <div
                className="columns"
                key={question.id}
              >
                <div className="column">
                  <Card
                    firstOption={question.firstOption}
                    secondOption={question.secondOption}
                    firstOptionImage={question.firstOptionImage}
                    secondOptionImage={question.secondOptionImage}
                  />
                </div>
                <div className="column is-one-third">
                  <UserProfile
                    userImage={question.posted_by.photoUrl}
                    name={question.posted_by.name}
                    email={question.posted_by.email}
                  />
                  <VoteScore
                    questionId={question.id}
                    firstOptionVoteList={question.firstOptionVoteList || {}}
                    secondOptionVoteList={question.secondOptionVoteList || {}}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  questions: state.database.questions,
  isLoggedIn: !!state.auth.name, // 우리 앱의 구조상 auth.name이 있으면 로그인 된 것으로 간주가능
}), null)(App)
