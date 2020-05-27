import React from 'react';
import PropTypes from 'prop-types';

import './SingleBoard.scss';
import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
import Pin from '../Pin/Pin';
import PinForm from '../PinForm/PinForm';

class SingleBoard extends React.Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    board: {},
    pins: [],
    formOpen: false,
  }

  getInfo = () => {
    const { boardId } = this.props;
    boardsData.getSingleBoard(boardId)
      .then((request) => {
        const board = request.data;
        this.setState({ board });
        pinsData.getPinsByBoardId(boardId)
          .then((pins) => this.setState({ pins }));
      })
      .catch((err) => console.error('unable to get single board:', err));
  }

  componentDidMount() {
    const { boardId } = this.props;
    boardsData.getSingleBoard(boardId)
      .then((request) => {
        const board = request.data;
        this.setState({ board });
        pinsData.getPinsByBoardId(boardId)
          .then((pins) => this.setState({ pins }));
      })
      .catch((err) => console.error('unable to get single board:', err));
  }

  removePin = (pinId) => {
    pinsData.deletePin(pinId)
      .then(() => this.getInfo())
      .catch((err) => console.error('could not delete pin: ', err));
  }

  saveNewPin = (newPin) => {
    pinsData.savePin(newPin)
      .then(() => {
        this.getInfo();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('unable to save new pin: ', err));
  }

  render() {
    const { setSingleBoard, boardId } = this.props;
    const { board, pins, formOpen } = this.state;

    const makePins = pins.map((p) => <Pin key={p.id} pin={p} removePin={this.removePin}/>);

    return (
      <div className="SingleBoard">
        <button className="btn btn-danger" onClick={() => { setSingleBoard(''); }}>X</button>
        <h2>{board.name} Board</h2>
        <h3>{board.description}</h3>
        <button className="btn btn-warning" onClick={() => this.setState({ formOpen: true })}>+ Pin</button>
        { formOpen ? <PinForm boardId={boardId} saveNewPin={this.saveNewPin} /> : ''}
        <div className="d-flex flex-wrap">
          {makePins}
        </div>
      </div>
    );
  }
}

export default SingleBoard;
