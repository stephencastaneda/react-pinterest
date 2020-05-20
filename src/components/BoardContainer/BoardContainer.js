import React from 'react';
import boardsData from '../../helpers/data/boardsData';
import authData from '../../helpers/data/authData';
// import PropTypes from 'prop-types';

import Board from '../Board/Board';

import './BoardContainer.scss';

class BoardContainer extends React.Component {
  state = {
    boards: [],
  }

  componentDidMount() {
    boardsData.getBoardsByUid(authData.getUid())
      .then((boards) => this.setState({ boards }))
      .catch((err) => console.error('unable to get all boards: ', err));
  }

  render() {
    const { boards } = this.state;
    const { setSingleBoard } = this.props;

    const makeBoards = boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard}/>);

    return (
      <div className="BoardContainer">
      <h2>BOARDS</h2>
      <div className="d-flex flex-wrap">
        {makeBoards}
      </div>
      </div>
    );
  }
}

export default BoardContainer;
