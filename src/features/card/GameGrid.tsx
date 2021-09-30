/** @jsxImportSource @emotion/react */
import {GameCard} from "./GameCard";
import React, {useState} from "react";
import words from "./../../app/wordsData.json";
import {css} from "@emotion/react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton
} from "@material-ui/core";
import {Autorenew, DeleteForever} from "@material-ui/icons";

export function CardsGrid() {

    const uniqueWords = Array.from(new Set(words));
    const getRandomArrayList = () => [...uniqueWords.sort(function (a, b) {
        return 0.5 - Math.random()
    })].slice(0, 25)
    const [wordsList, setWordsList] = useState(currentState() || getRandomArrayList())
    saveState(wordsList);
    const [showResetDialog, setShowResetDialog] = useState(false)

    const toggleShowResetDialog = () => setShowResetDialog(!showResetDialog)

    const resetGame = () => {
        toggleShowResetDialog();
        setWordsList(getRandomArrayList())
    }

    const getTableRow = (i: number) =>
        <tr>
            {Array.from(Array(5), (e, j) => {
                const word = wordsList[i * 5 + j];
                return <td><GameCard key={word} word={word}/></td>
            })}
        </tr>


    return (
        <div css={css`
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        `}>
            <table>
                {Array.from(Array(5), (e, i) => getTableRow(i))}
            </table>
            <IconButton onClick={toggleShowResetDialog}>
                <Autorenew css={css`position:absolute;width:10vh;cursor: pointer;top:1vh;color:white;`}/>
            </IconButton>
            {showResetDialog &&
            <ResetDialog open={showResetDialog} handleClose={toggleShowResetDialog} handleAgree={resetGame}/>}
        </div>
    );
}

function currentState(){
    try {
        const serializedState = localStorage.getItem('words');
        if (serializedState === null) {
          return undefined;
        }
        return JSON.parse(serializedState);
      } catch (err) {
        return undefined;
      }
}

function saveState(wordsList: Array<String>){
    try {
        const serializedState = JSON.stringify(wordsList);
        localStorage.setItem('words', serializedState);
      } catch {
        // ignore write errors
      }
}

const ResetDialog = ({open, handleClose, handleAgree}: { open: boolean, handleClose: any, handleAgree: any }) =>
    <Dialog
        open={open}
        onClose={handleClose}
    >
        <DialogTitle>{"התחל משחק חדש"}</DialogTitle>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                ביטול
            </Button>
            <Button onClick={handleAgree} color="primary" autoFocus>
                אישור
            </Button>
        </DialogActions>
    </Dialog>