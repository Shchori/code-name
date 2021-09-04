/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React, {useState} from 'react';
import WordCardBackground from './../../images/word-card-background.png'
import BlueGroup1 from './../../images/blue-group1.png'
import BlueGroup2 from './../../images/blue-group2.png'
import RedGroup1 from './../../images/red-group1.png'
import RedGroup2 from './../../images/red-group2.png'
import CivilianGroup1 from './../../images/civilian-type1.png'
import CivilianGroup2 from './../../images/civilian-type2.png'
import BlackGroup from './../../images/black-group.png'
import styled from "@emotion/styled";
import {Button, Dialog, IconButton} from "@material-ui/core";
import {Clear, DeleteForever} from '@material-ui/icons';


interface GameCardProps {
    word: string
}

function getRandomElement<Type>(arr: Type[]): Type {
    return arr[Math.floor(Math.random() * arr.length)];
}

const avatar = css`width:21vh;height:14vh;border-radius: 3vh;`;
const civilianGroupImages = [CivilianGroup1, CivilianGroup2];
const redGroupImages = [RedGroup1, RedGroup2];
const blueGroupImages = [BlueGroup1, BlueGroup2];

enum CardType {
    Blue,
    Red,
    Black,
    Civilian,
    None
}

export const GameCard = ({word}: GameCardProps) => {
    const [showCardSelectionModal, setCardShowSelectionModal] = useState(false);
    const [cardType, setCardType] = useState(CardType.None);

    const toggleShowModal = () => {
        setCardShowSelectionModal(!showCardSelectionModal)
    }

    return <div css={css`
        cursor: pointer;
        position:relative;
        width: 12vw;
        height: 15vh;
        `} onClick={toggleShowModal}>
        {showCardSelectionModal &&
        <CardSelectionModal word={word} show={showCardSelectionModal} onClose={toggleShowModal} setCardType={setCardType}/>}
        <WordCard word={word}/>
        {cardType != CardType.None && <>
            {getCoverCard(cardType)}
            <p css={css`
                color: white;
                position: absolute;
                bottom: -1vh;
                right: 1vw;
                font-size: 2.5vh;
                font-weight: bold;
                text-shadow: 0 0 black;
            `}>{word}</p>
        </>
        }
    </div>
}

const CardSelectionModal = ({word, show, onClose, setCardType}: { word:string, show: boolean, onClose: any, setCardType: any }) => {
    return <Dialog
        open={show}
        onClose={onClose}
    >
        <p css={css`
        margin:1vw;
        user-select: none;
        text-align: center;
        font-size: 4vh;
        font-weight: 600;
        `}>{word}</p>
        <DeleteForever onClick={setCardType(CardType.None)} css={css`position:absolute;width:7vh;cursor: pointer;`}/>
        <div css={css`
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            width: 29vw;
        }`}>
            <Button onClick={() => setCardType(CardType.Blue)}>
                <img src={getRandomElement(blueGroupImages)} css={avatar}/>
            </Button>
            <Button onClick={() => setCardType(CardType.Red)}>
                <img src={getRandomElement(redGroupImages)} css={avatar}/>
            </Button>
            <Button onClick={() => setCardType(CardType.Civilian)}>
                <img src={getRandomElement(civilianGroupImages)} css={avatar}/>
            </Button>
            <Button onClick={() => setCardType(CardType.Black)}>
                <img src={BlackGroup} css={avatar}/>
            </Button>
        </div>
    </Dialog>
}


const WordCard = ({word}: GameCardProps) =>
    <WordCardContainer>
        <WordText>{word}</WordText>
    </WordCardContainer>

const WordCardContainer = styled.div`
    position: absolute;
    background-image: url(${WordCardBackground});
    background-position: center; 
    background-repeat: no-repeat; 
    background-size: contain;
    width: 12vw;
    height: 15vh;
`

const getCoverCard = (type: CardType) => {
    const angle = Math.random() * 30 - 15;
    const getImageFromType = () => {
        switch (type) {
            case CardType.Blue:
                return getRandomElement(blueGroupImages)
            case CardType.Red:
                return getRandomElement(redGroupImages)
            case CardType.Civilian:
                return getRandomElement(civilianGroupImages)
            case CardType.Black:
                return BlackGroup
        }
    }
    return <div css={css`
        position: absolute;
        transform: rotate(${angle}deg);
        background-image: url(${getImageFromType()});
        background-position: center; 
        background-repeat: no-repeat; 
        background-size: contain;
        width: 12vw;
        height: 15vh;
    `}/>
}


const WordText = styled.p`
    font-size:2.5vh;
    font-weight: bold;
    position: relative;
    top: 36%;
    user-select: none;
`;