/** @jsxImportSource @emotion/react */
import {GameCard} from "./GameCard";
import React, {useState} from "react";
import words from "./../../app/wordsData.json";
import {css} from "@emotion/react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

export function CardsGrid() {
    const getRandomArrayList = () => [...words.sort(function (a, b) {
        return 0.5 - Math.random()
    })].slice(0, 25)
    const [wordsList, setWordsList] = useState(getRandomArrayList())
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
            <Button variant="contained" color="primary" onClick={toggleShowResetDialog}>
                משחק חדש
            </Button>
            {showResetDialog &&
            <ResetDialog open={showResetDialog} handleClose={toggleShowResetDialog} handleAgree={resetGame}/>}
        </div>
    );
}

const ResetDialog = ({open, handleClose, handleAgree}: { open: boolean, handleClose: any, handleAgree: any }) =>
    <Dialog
        open={open}
        onClose={handleClose}
    >
        <DialogTitle>{"האם ברצונך להתחיל משחק חדש?"}</DialogTitle>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                ביטול
            </Button>
            <Button onClick={handleAgree} color="primary" autoFocus>
                אישור
            </Button>
        </DialogActions>
    </Dialog>