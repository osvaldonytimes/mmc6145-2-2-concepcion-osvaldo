import React, { useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [bestTime, setBestTime] = useState(null);
  const [previousTime, setPreviousTime] = useState(null);

  const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer();

  const cardTexts = [
    "Bunny 🐰",
    "Frog 🐸",
    "Panda 🐼",
    "Doggy 🐶",
    "Kitty 😺",
    "Duck 🦆",
  ];

  const onGameStartHandler = () => {
    timerStart();
  };
  const onGameEndHandler = () => {
    timerStop();
    setPreviousTime(time);
    setBestTime(bestTime === null || bestTime > time ? time : bestTime);
    timerReset();
  };

  return (
    <>
      <Header
        time={time}
        bestTime={bestTime}
        previousTime={previousTime}
        openModal={() => setShowModal(true)}
      />
      <CardGame
        onGameStart={onGameStartHandler}
        onGameEnd={onGameEndHandler}
        cardTexts={cardTexts}
      />
      <Modal isShown={showModal} close={() => setShowModal(false)} />
    </>
  );
}
