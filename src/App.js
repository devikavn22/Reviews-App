import React, { useState, useEffect, useRef, useCallback } from "react";
import people from "./data/data";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import "./index.css";

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPerson, setCurrentPerson] = useState(people[currentIndex]);

  const navigationRef = useRef(null);

  const handleIndexChange = useCallback((newIndex) => {
    setCurrentIndex((prevIndex) => {
      const index = (newIndex + people.length) % people.length;
      setCurrentPerson(people[index]);
      return index;
    });
  }, []);

  useEffect(() => {
    const handleNavigationKeyPress = (event) => {
      if (event.key === "ArrowLeft") {
        handleIndexChange(currentIndex - 1);
      } else if (event.key === "ArrowRight") {
        handleIndexChange(currentIndex + 1);
      }
    };

    const currentRef = navigationRef.current;
    currentRef.addEventListener("keydown", handleNavigationKeyPress);

    return () => {
      currentRef.removeEventListener("keydown", handleNavigationKeyPress);
    };
  }, [currentIndex, handleIndexChange]);

  const handleNextPerson = () => handleIndexChange(currentIndex + 1);
  const handlePrevPerson = () => handleIndexChange(currentIndex - 1);
  const handleRandomPerson = () => {
    let randomNumber = Math.floor(Math.random() * people.length);
    if (randomNumber === currentIndex) {
      randomNumber = (randomNumber + 1) % people.length;
    }
    handleIndexChange(randomNumber);
  };

  return (
    <main className="h-screen flex justify-center items-center">
      <article
        className="review px-8 py-10 rounded-lg shadow-md bg-white"
        ref={navigationRef}
        tabIndex={0}
        onKeyDown={(event) => event.key === "Tab" && event.preventDefault()}
      >
        <div className="img-container mx-auto mb-6 relative">
          <img
            src={currentPerson.image}
            alt={currentPerson.name}
            className="w-40 h-40 rounded-full object-cover person-img"
          />
          <span className="absolute top-0 left-0 w-10 h-10 rounded-full flex justify-center items-center bg-primary-500 text-white">
            <FaQuoteRight />
          </span>
        </div>
        <h4 className="text-2xl font-medium mb-2 author">
          {currentPerson.name}
        </h4>
        <p className="text-gray-500 mb-4 job">{currentPerson.job}</p>
        <p className="text-base leading-relaxed info">{currentPerson.text}</p>
        <div className="btn-container flex justify-center mt-4">
          <button
            className="prev-btn mr-4 text-primary-700 hover:text-primary-500 focus:outline-none"
            onClick={handlePrevPerson}
          >
            <FaChevronLeft />
          </button>
          <button
            className="next-btn text-primary-700 hover:text-primary-500 focus:outline-none"
            onClick={handleNextPerson}
          >
            <FaChevronRight />
          </button>
        </div>
        <button
          className="btn btn-hipster mx-auto mt-8 text-primary-600 bg-primary-300 hover:bg-primary-700"
          onClick={handleRandomPerson}
        >
          Surprise Me
        </button>
      </article>
    </main>
  );
};

export default App;
