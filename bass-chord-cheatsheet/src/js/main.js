import React from "react";
import ReactDOM from "react-dom";

import { ChordRegister } from "./chord_register";
import { FretboardDisplay } from "./fretboard_display";

class BassChordCheatsheetApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notename: "C",
            chordname: "M",
        }
        this.setNotename = this.setNotename.bind(this);
        this.setChordname = this.setChordname.bind(this);
    }

    setNotename(e) {
        this.setState({notename: e.target.value});
    }

    // コード名の値は、"M(長三和音)"のように括弧の後に説明が記載されているが、
    // コード名のみを設定している。
    setChordname(e) {
        this.setState({chordname: e.target.value.slice(0, e.target.value.indexOf("("))});
    }

    render() {
        return (
            <div className="container">
                <h1>Bass Chord Cheatsheet</h1>
                <ChordRegister
                    setNotename={this.setNotename}
                    setChordname={this.setChordname}
                />
                <FretboardDisplay
                    notename={this.state.notename}
                    chordname={this.state.chordname}
                />
            </div>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<BassChordCheatsheetApp />, app);