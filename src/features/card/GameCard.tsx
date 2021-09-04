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
import {Dialog, IconButton} from "@material-ui/core";
import {Clear} from '@material-ui/icons';


interface GameCardProps {
    word: string
}

function getRandomElement<Type>(arr: Type[]): Type {
    return arr[Math.floor(Math.random() * arr.length)];
}

const avatar = css`width:16rem;height:12rem;border-radius: 5rem;`;
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

    const onClearClick = (e: any) => {
        e.stopPropagation();
        setCardType(CardType.None);
    }

    return <div css={css`
        cursor: pointer;
        position:relative;
        width: 16rem;
        height: 10rem;`} onClick={toggleShowModal}>
        {showCardSelectionModal &&
        <CardSelectionModal show={showCardSelectionModal} onClose={toggleShowModal} setCardType={setCardType}/>}
        <WordCard word={word}/>
        {cardType != CardType.None && getCoverCard(cardType)}
        {cardType != CardType.None &&
        <Clear onClick={onClearClick} css={css`position:absolute;left: 14.5rem;cursor: pointer;`}/>
        }
    </div>
}

const CardSelectionModal = ({show, onClose, setCardType}: { show: boolean, onClose: any, setCardType: any }) => {
    return <Dialog
        open={show}
        onClose={onClose}
    >
        <p css={css`   
        margin: 1rem;
        user-select: none;
        text-align: center;
        font-size: 2rem;
        font-weight: 600;
        `}>בחר סוכן</p>
        <div css={css`
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            width: 35rem;
        }`}>
            <IconButton onClick={() => setCardType(CardType.Blue)}>
                <img src={getRandomElement(blueGroupImages)} css={avatar}/>
            </IconButton>
            <IconButton onClick={() => setCardType(CardType.Red)}>
                <img src={getRandomElement(redGroupImages)} css={avatar}/>
            </IconButton>
            <IconButton onClick={() => setCardType(CardType.Civilian)}>
                <img src={getRandomElement(civilianGroupImages)} css={avatar}/>
            </IconButton>
            <IconButton onClick={() => setCardType(CardType.Black)}>
                <img src={BlackGroup} css={avatar}/>
            </IconButton>
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
    width: 15rem;
    height: 10rem;
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
        width: 13rem;
        height: 9rem;
    `}/>
}


const WordText = styled.p`
    position: relative;
    top: 4.8rem;
    user-select: none;
    font-weight: bold;
`;