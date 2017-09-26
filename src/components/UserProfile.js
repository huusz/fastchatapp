import React from 'react'


export default class UserProfile extends React.Component {
  render() {
    return (
      <div className="tile">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img src={this.props.userImage} alt="Placeholder image" />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">{this.props.name}</p>
            </div>
          </div>

          <div className="content">
            {this.props.email}
          </div>
        </div>
      </div>
    );
  }
}
