import React from 'react';

import './BoardForm.scss';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';

class BoardForm extends React.Component {
  static propTypes = {
    saveNewBoard: PropTypes.func.isRequired,
  }

  state = {
    boardName: '',
    boardDescription: '',
  }

  saveBoard = (e) => {
    e.preventDefault();
    const { boardDescription, boardName } = this.state;
    const newBoard = {
      description: boardDescription,
      name: boardName,
      uid: authData.getUid(),
    };
    this.props.saveNewBoard(newBoard);
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ boardName: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ boardDescription: e.target.value });
  }

  render() {
    const { boardName, boardDescription } = this.state;
    return (
              <div className="BoardForm">
                <form className="col-6 offset-3">
          <div className="form-group">
            <label htmlFor="board-name">Name</label>
            <input type="text"
            className="form-control"
            id="board-name"
            placeholder="Sam"
            value={boardName}
            onChange={this.nameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="board-description">Description</label>
            <input type="text"
            className="form-control"
            id="board-description"
            placeholder="really nice description"
            value={boardDescription}
            onChange={this.descriptionChange}
             />
          </div>
          <button className="btn btn-dark" onClick={this.saveBoard}>Save Board</button>
        </form>
              </div>
    );
  }
}

export default BoardForm;
