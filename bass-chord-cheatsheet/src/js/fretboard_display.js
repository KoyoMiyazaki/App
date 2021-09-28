import React from "react";

export class FretboardDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.svgOptions = { // svg要素全体の設定
            width: "1800px",
            height: "240px",
        };
        this.fretboardOptions = {
            x: "10",         // 指板の描画位置のX軸の値
            y: "10",          // 指板の描画位置のY軸の値
            width: "1200px", // 指板の横幅
            height: "180px", // 指板の高さ
        }
        this.fretRectOptions = {
            width: "80px",   // 指板の横幅
            height: "60px",  // 指板の高さ
        }
        this.noteList = [ // C(ド)～B(シ)の音名
            "C", "C#", "D", "D#", "E", "F",
            "F#", "G", "G#", "A", "A#", "B"
        ];
        this.fretNum = 21; // フレット数
        this.stringNum = 4; // 弦の数
        this.chordNotes = {};
        this.chordFretLists = {};
        this.getIntervalNote = this.getIntervalNote.bind(this);
        this.setChordNotes = this.setChordNotes.bind(this);
        this.getFretPositions = this.getFretPositions.bind(this);
        this.setChordFretLists = this.setChordFretLists.bind(this);
    }

    // notenameからinterval分離れた音名を返却する
    getIntervalNote(notename, interval) {
        return this.noteList[(this.noteList.findIndex(elem => elem === notename) + interval) % 12];
    }

    // コードを構成する音を設定する
    setChordNotes() {
        let chordsObj = {};
        chordsObj.root = this.props.notename; // 根音
        switch (this.props.chordname) {
            case 'M': // 長三和音
                chordsObj.majorThird = this.getIntervalNote(this.props.notename, 4); // 長三度
                chordsObj.perfectFifth = this.getIntervalNote(this.props.notename, 7); // 完全五度
                break;
            case 'm': // 短三和音
                chordsObj.minorThird = this.getIntervalNote(this.props.notename, 3); // 短三度
                chordsObj.perfectFifth = this.getIntervalNote(this.props.notename, 7); // 完全五度
                break;
            case 'aug': // 増三和音
                chordsObj.majorThird = this.getIntervalNote(this.props.notename, 4); // 長三度
                chordsObj.augmentedFifth = this.getIntervalNote(this.props.notename, 8); // 増五度
                break;
            case 'dim': // 減三和音
                chordsObj.minorThird = this.getIntervalNote(this.props.notename, 3); // 短三度
                chordsObj.diminishedFifth = this.getIntervalNote(this.props.notename, 6); // 減五度
                break;
            case '7': // 属七の和音
                chordsObj.majorThird = this.getIntervalNote(this.props.notename, 4); // 長三度
                chordsObj.perfectFifth = this.getIntervalNote(this.props.notename, 7); // 完全五度
                chordsObj.minorSeventh = this.getIntervalNote(this.props.notename, 10); // 短七度
                break;
            case 'm7': // 短七の和音
                chordsObj.majorThird = this.getIntervalNote(this.props.notename, 3); // 短三度
                chordsObj.perfectFifth = this.getIntervalNote(this.props.notename, 7); // 完全五度
                chordsObj.minorSeventh = this.getIntervalNote(this.props.notename, 10); // 短七度
                break;
            case 'M7': // 長七の和音
                chordsObj.majorThird = this.getIntervalNote(this.props.notename, 4); // 長三度
                chordsObj.perfectFifth = this.getIntervalNote(this.props.notename, 7); // 完全五度
                chordsObj.majorSeventh = this.getIntervalNote(this.props.notename, 11); // 長七度
                break;
            case 'dim7': // 減七の和音
                chordsObj.majorThird = this.getIntervalNote(this.props.notename, 3); // 短三度
                chordsObj.diminishedFifth = this.getIntervalNote(this.props.notename, 6); // 減五度
                chordsObj.diminishedSeventh = this.getIntervalNote(this.props.notename, 9); // 減七度
                break;
            case 'm7^♭5': // 減五短七の和音
                chordsObj.majorThird = this.getIntervalNote(this.props.notename, 3); // 短三度
                chordsObj.diminishedFifth = this.getIntervalNote(this.props.notename, 6); // 減五度
                chordsObj.minorSeventh = this.getIntervalNote(this.props.notename, 10); // 短七度
                break;
            case 'mM7': // 短三長七の和音
                chordsObj.majorThird = this.getIntervalNote(this.props.notename, 3); // 短三度
                chordsObj.perfectFifth = this.getIntervalNote(this.props.notename, 7); // 完全五度
                chordsObj.majorSeventh = this.getIntervalNote(this.props.notename, 11); // 長七度
                break;
            case 'augM7': // 増七の和音
                chordsObj.majorThird = this.getIntervalNote(this.props.notename, 4); // 長三度
                chordsObj.augmentedFifth = this.getIntervalNote(this.props.notename, 8); // 増五度
                chordsObj.majorSeventh = this.getIntervalNote(this.props.notename, 11); // 長七度
                break;
        }
        this.chordNotes = chordsObj;
    }

    // コードを構成する音が、対象の弦のフレット位置を返却する
    getFretPositions(note, stringNo) {
        const startIndexes = {
            1: "G",
            2: "D",
            3: "A",
            4: "E",
        }
        let result = [];
        let startNote = startIndexes[stringNo];
        let startIndex = this.noteList.findIndex(elem => elem === startNote);
        for (let i = 0; i < this.fretNum + 1; i++) {
            if (this.noteList[(startIndex + i) % 12] === note) {
                result.push(i);
            }
        }
        return result;
    }

    // コードを構成する音が、どの弦のどのフレットに存在するかを設定する
    setChordFretLists() {
        let chordFretLists = {};
        let noteList = Object.keys(this.chordNotes);
        for (let i = 0; i < noteList.length; i++) {
            chordFretLists[noteList[i]] = {
                1: this.getFretPositions(this.chordNotes[noteList[i]], 1),
                2: this.getFretPositions(this.chordNotes[noteList[i]], 2),
                3: this.getFretPositions(this.chordNotes[noteList[i]], 3),
                4: this.getFretPositions(this.chordNotes[noteList[i]], 4),
            }
        }
        this.chordFretLists = chordFretLists;
    }

    render() {
        return (
            <div>
                <div className="fretboard-display">
                    <svg width={this.svgOptions.width} height={this.svgOptions.height}>
                        {/* ベースの指板の外線 */}
                        <rect
                            x={this.fretboardOptions.x} y={this.fretboardOptions.y}
                            width={this.fretboardOptions.width} height={this.fretboardOptions.height}
                            fill="none" stroke="black" strokeWidth="1"
                        />

                        {/* フレットライン */}
                        {
                            [...Array(this.fretNum).keys()].map(fretNo =>
                                [...Array(this.stringNum-1).keys()].map(stringNo => 
                                    <rect
                                        x={String(parseInt(this.fretboardOptions.x, 10) +
                                            parseInt(this.fretRectOptions.width, 10) * fretNo)}
                                        y={String(parseInt(this.fretboardOptions.y, 10) +
                                            parseInt(this.fretRectOptions.height, 10) * stringNo)}
                                        width={this.fretRectOptions.width} height={this.fretRectOptions.height}
                                        fill="none" stroke="black" strokeWidth="1"
                                    />
                                )
                            )
                        }

                        {/* フレットナンバー */}
                        {
                            [...Array(this.fretNum+1).keys()].map(fretNo =>
                                <text
                                    x={String(parseInt(this.fretboardOptions.x, 10) +
                                        parseInt(this.fretRectOptions.width, 10) * fretNo)}
                                    y={String(parseInt(this.fretRectOptions.height, 10) * this.stringNum)}
                                    textAnchor="middle"
                                >
                                    {fretNo}
                                </text>
                            )
                        }

                        {/* <!-- コードポジション --> */}
                        {this.setChordNotes()}
                        {this.setChordFretLists()}
                        {
                            Object.entries(this.chordFretLists).map(elem =>
                                [...Array(this.stringNum).keys()].map(stringNo =>
                                    elem[1][stringNo+1].map(fretNo =>
                                        <circle
                                            cx={String(parseInt(this.fretboardOptions.x, 10) +
                                                parseInt(this.fretRectOptions.width, 10) * fretNo)}
                                            cy={String(parseInt(this.fretboardOptions.y, 10) +
                                                parseInt(this.fretRectOptions.height, 10) * stringNo)}
                                            r="10"
                                            fill={elem[0] === "root" ? "red" : 
                                                elem[0].indexOf("Third") != -1 ? "blue" :
                                                elem[0].indexOf("Fifth") != -1 ? "green" :
                                                elem[0].indexOf("Seventh") != -1 ? "yellow" : "black"} />
                                    )
                                )
                            )
                        }

                    </svg>
                </div>
            </div>
        );
    }
}