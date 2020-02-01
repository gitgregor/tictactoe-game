import React from 'react';
import reactDOM from 'react-dom';
import './index.css';
import splashing from '../../images/splashing_640.jpg'
import seascape from '../../images/seascape.jpg'


// ======== TIC-TAC-TOE GAME ============

let x = 0;
function Reset(props) {
    return (<button className="buttonReset" onClick={props.onClickReset}>RESET</button>)
}

function Square(props) {
    return (
        <button className='square' style={{ backgroundImage: `url(${splashing})`, backgroundSize: "cover", overflow: "hidden" }}

            onClick={props.ONCLICKGW}
        >{props.value}</button>
    );
}


export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            flag: false,
        };
    }

    handleClickReset() {
        this.setState({
            squares: Array(9).fill(null),
        })
    }

    handlerClickGW(i) {
        const squares = this.state.squares.slice();
        if (winner(squares) || squares[i]) {
            return;
        }

        const player = this.state.xIsNext
        if (player) {
            squares[i] = '💰'
        } else {
            squares[i] = '🎄'
        }

        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
            flag: true,
        })
    }

    renderSquare(i) {
        return (
            <>
                <Square ONCLICKGW={(() => this.handlerClickGW(i))} value={this.state.squares[i]} />
            </>
        );
    }

    render() {
        const story = `Your moves Story: ${this.state.squares}`
        const theWinnerIs = winner(this.state.squares);
        let status;

        if (theWinnerIs) {
            status = `END OF THE GAME !!!
            The Winner is: ${theWinnerIs} `;
            x = 1;
        } else {
            status = `Next Player is: ${this.state.xIsNext ? '💰' : '🎄'}`
            if (x === 0 && fullUpBoard(this.state.squares)) {
                status = `END - No Winner`
            }
        }

        return (
            <div className="wrapper" style={{ backgroundImage: `url(${seascape})`, backgroundSize: "cover", overflow: "hidden" }}>
                <div className="status"  >{status}</div>
                <br></br>
                <div className="Board">
                    <div className="board-row">
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                    <div><Reset onClickReset={() => this.handleClickReset()} /></div>
                    <div className="story">{story}</div>
                </div>
            </div>
        );
    }

}

reactDOM.render(<Board />, document.getElementById('root'));

function starter() {
    const WhoWasLast = 'START GRY'
    return WhoWasLast
}
function ender() {
    const end = 'KONIEC GRY ! NIE wyłoniono zwycięzcy'
    return end
}

function winner(squersSet) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squersSet[a] && squersSet[a] === squersSet[b] && squersSet[a] === squersSet[c]) {
            return squersSet[a];
        }
    }
    return null
}

function fullUpBoard(squersSet) {

    let n = 0
    if (
        squersSet[n] !== null &&
        squersSet[n + 1] !== null &&
        squersSet[n + 2] !== null &&
        squersSet[n + 3] !== null &&
        squersSet[n + 4] !== null &&
        squersSet[n + 5] !== null &&
        squersSet[n + 6] !== null &&
        squersSet[n + 6] !== null &&
        squersSet[n + 8] !== null
    ) {
        return true;
    } else {
        return false
    }
}


