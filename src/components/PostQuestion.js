import React from 'react'
import {
  storage,
  database,
} from '../firebase';
import {
  connect,
} from 'react-redux';
import {
  postQuestionToDB,
} from '../actions/questions';


class PostQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstOption: '',
      secondOption: '',
      firstOptionImage: '',
      secondOptionImage: '',
      uploadProgress: 0,
    }

    this.storageRef = storage.ref('vote-images');
  }

  handleFirstOptionValueChange = (e) => {
    this.setState({
      firstOption: e.target.value,
    })
  }

  handleSecondOptionValueChange = (e) => {
    this.setState({
      secondOption: e.target.value,
    })
  }

  handleFirstOptionImageUpload = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];

    const uploadTask = this.storageRef.child(file.name).put(file);

    uploadTask.on('state_changed', (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(uploadProgress);
      this.setState({ uploadProgress });
    });

    uploadTask.then((snapshot) => {
      this.setState({
        firstOptionImage: snapshot.downloadURL,
      })
      this.setState({ uploadProgress: null });
    });
  }

  handleSecondOptionImageUpload = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];

    const uploadTask = this.storageRef.child(file.name).put(file);

    uploadTask.on('state_changed', (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(uploadProgress);
      this.setState({ uploadProgress });
    });

    uploadTask.then((snapshot) => {
      this.setState({
        secondOptionImage: snapshot.downloadURL,
      })
      this.setState({ uploadProgress: null });
    });
  }

  closeAndResetValue = () => {
    this.setState({
      firstOption: '',
      secondOption: '',
      firstOptionImage: '',
      secondOptionImage: '',
    })
    this.props.onClose();
  }

  createPayloadAndPostToDB = () => {
    if (!this.state.secondOption || !this.state.firstOption) {
      return;
    }

    this.props.postQuestionToDB({
      firstOption: this.state.firstOption,
      secondOption: this.state.secondOption,
      firstOptionImage: this.state.firstOptionImage,
      secondOptionImage: this.state.secondOptionImage,
      posted_by: {
        name: this.props.currentUser.name,
        email: this.props.currentUser.email,
        photoUrl: this.props.currentUser.profileImageUrl,
      }
    })
    this.closeAndResetValue();
  }

  render() {
    return (
      <div>
        <article className="tile is-child notification is-info">
          <div className="container">
            <p className="title">
              질문 올리기
            </p>
            <div className="field is-horizontal">
              <div className="field-label is-large">
                <p className="title">보기 1</p>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-large"
                      type="text"
                      placeholder="간단한 문구 작성"
                      onChange={(e) => this.handleFirstOptionValueChange(e)}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="file is-danger">
                    <label className="file-label">
                      <input
                        className="file-input"
                        type="file"
                        name="resume"
                        onChange={this.handleFirstOptionImageUpload}
                      />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fa fa-upload"></i>
                        </span>
                        <span className="file-label">
                          첨부 파일은 필수
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-large">
                <p className="title">보기 2</p>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-large"
                      type="text"
                      placeholder="간단한 문구 작성"
                      onChange={(e) => this.handleSecondOptionValueChange(e)}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="file is-info">
                    <label className="file-label">
                      <input
                        className="file-input" type="file" name="resume"
                        onChange={this.handleSecondOptionImageUpload}
                      />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fa fa-upload"></i>
                        </span>
                        <span className="file-label">
                          첨부 파일은 필수
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <a
                className="button is-danger is-large"
                style={{ marginRight: '5px' }}
                onClick={this.closeAndResetValue}
              >
                취소
              </a>
              <a
                className="button is-info is-large"
                disabled={!this.state.firstOption || !this.state.secondOption}
                onClick={this.createPayloadAndPostToDB}
              >
                질문
              </a>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default connect((state) => ({
  currentUser: {
    name: state.auth.name,
    email: state.auth.email,
    profileImageUrl: state.auth.profileImageUrl,
  }
}), (dispatch) => ({
  postQuestionToDB: (payload) => dispatch(postQuestionToDB(payload))
}))(PostQuestion);
