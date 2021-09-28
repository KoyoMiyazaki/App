import React from "react";

export class ChordRegister extends React.Component {
    constructor(props) {
        super(props);
        this.noteList = [ // C(ド)～B(シ)の音名
            "C", "C#", "D", "D#", "E", "F",
            "F#", "G", "G#", "A", "A#", "B"
        ];
        this.chordList = [
            "M(長三和音)", "m(短三和音)", "aug(増三和音)", "dim(減三和音)",
            "7(属七の和音)", "m7(短七の和音)", "M7(長七の和音)", "dim7(減七の和音)",
            "m7^♭5(減五短七の和音)", "mM7(短三長七の和音)", "augM7(増七の和音)"
        ];
    }
    render() {
        return (
            <div className="chord-register">
                <div className="chord-register-select-area">
                    <div className="chord-register-select-area-items">
                        <p>音名</p>
                        <select className="" defaultValue="C" onChange={this.props.setNotename}>
                            {this.noteList.map(note => <option value={note}>{note}</option>)}
                        </select>
                    </div>
                    <div className="chord-register-select-area-items">
                        <p>コード名</p>
                        <select className="" defaultValue="M" onChange={this.props.setChordname}>
                            {this.chordList.map(chord => <option value={chord}>{chord}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}