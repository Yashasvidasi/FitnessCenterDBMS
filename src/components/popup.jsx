import React, { Component, useState } from "react";

const PopUp = () => {
  const [modal, setModal] = useState(false);
  const togglemodal = () => {
    setModal(!modal);
  };
  return (
    <>
      <button onClick={togglemodal} className="btn-modal">
        {" "}
        open{" "}
      </button>
      <div className="modal">
        <div className="overlay"> </div>
        <div className="modal-content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ad
            ea sint ab nesciunt cumque culpa adipisci corporis voluptate
            praesentium reiciendis illo quia architecto alias? Recusandae ullam
            iste magni praesentium!
          </p>
        </div>
      </div>
    </>
  );
};
