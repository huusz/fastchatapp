import React, { Component } from 'react';
import Card from './components/Card';
import SiteHeader from './components/SiteHeader';
import UserProfile from './components/UserProfile';
import PostQuestion from './components/PostQuestion';
import VoteScore from './components/VoteScore';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';

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
        {this.state.isPostMode ? (
          <PostQuestion />
        ) : null}
        <div className="container">
          <div className="columns">
            <div className="column">
              <Card />
            </div>
            <div className="column is-one-third">
              <UserProfile />
              <VoteScore />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <Card />
            </div>
            <div className="column is-one-third">
              <UserProfile />
              <VoteScore />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
