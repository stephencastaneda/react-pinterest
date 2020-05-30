import React from 'react';
import PropTypes from 'prop-types';
import boardsData from '../../helpers/data/boardsData';
import authData from '../../helpers/data/authData';
import BoardForm from '../BoardForm/BoardForm';

// import PropTypes from 'prop-types';
import smash from '../../helpers/data/smash';

import Board from '../Board/Board';

import './BoardContainer.scss';

class BoardContainer extends React.Component {
  state = {
    boards: [],
    formOpen: false,
    editBoard: {},
  }

  getAllBoards = () => {
    boardsData.getBoardsByUid(authData.getUid())
      .then((boards) => this.setState({ boards }))
      .catch((err) => console.error('unable to get all boards: ', err));
  }

  componentDidMount() {
    this.getAllBoards();
  }

  removeBoard = (boardId) => {
    smash.completelyRemoveBoard(boardId)
      .then(() => this.getAllBoards())
      .catch((err) => console.error('unable to delete full board: ', err));
  }

  saveNewBoard = (newBoard) => {
    boardsData.saveBoard(newBoard)
      .then(() => {
        this.getAllBoards();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('unable to save board: ', err));
  }

  putBoard = (boardId, updatedBoard) => {
    boardsData.updateBoard(boardId, updatedBoard)
      .then(() => {
        this.getAllBoards();
        this.setState({ formOpen: false, editBoard: {} });
      })
      .catch((err) => console.error('unable to update board:', err));
  }

  editABoard = (board) => {
    this.setState({ formOpen: true, editBoard: board });
  }


  render() {
    const { boards, formOpen, editBoard } = this.state;
    const { setSingleBoard } = this.props;

    const makeBoards = boards.map((board) => <Board key={board.id} editABoard={this.editABoard} board={board} setSingleBoard={setSingleBoard} removeBoard={this.removeBoard}/>);

    return (
      <div className="BoardContainer">
      <h2>BOARDS</h2>
      <button className="btn btn-warning" onClick={() => this.setState({ formOpen: true })}>+</button>
      { formOpen ? <BoardForm saveNewBoard={this.saveNewBoard} board={editBoard} putBoard={this.putBoard}/> : ''}
      <div className="d-flex flex-wrap">
        {makeBoards}
      </div>
      </div>
    );
  }
}

export default BoardContainer;
