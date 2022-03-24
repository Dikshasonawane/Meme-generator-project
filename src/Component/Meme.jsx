import React, { useState, useEffect } from "react";

const Meme = () => {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  });
  const [allMemes, setAllMemes] = React.useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeme((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const submitHandler = (e) => {
    console.log(meme);
    e.preventDefault();
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url
    }));
  };
  return (
    <div className="main">
      <div className="wrapper">
        <form className="form" onSubmit={submitHandler}>
          <input
            type="text"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          />
          <input
            type="text"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
          <br />
          <button type="submit">Get New Meme Image</button>
        </form>
        <div className="meme">
          <img src={meme.randomImage} className="meme--image" alt="" />
          <h2 className="top-text">{meme.topText}</h2>
          <h2 className="bottom-text">{meme.bottomText}</h2>
        </div>
      </div>
    </div>
  );
};
export default Meme;
