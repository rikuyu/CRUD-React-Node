import React from "react";
import { useState } from "react";
import Axios from "axios";

export default function Form() {
  const [vegeName, setVegeName] = useState("");
  const [vegeId, setVegeId] = useState("");
  const [vegeColor, setVegeColor] = useState("");

  const submitPost = () => {
    Axios.post("http://localhost:3001/api/insert", {
      id: vegeId,
      name: vegeName,
      color: vegeColor,
    }).then(() => {
      alert("succes insert");
    });
  };

  return (
    <div>
      <p>ID</p>
      <input
        type="text"
        name="id"
        className="form"
        onChange={(e) => {
          setVegeId(e.target.value);
        }}
        required
      />
      <p>名前</p>
      <input
        type="text"
        className="form"
        name="name"
        onChange={(e) => {
          setVegeName(e.target.value);
        }}
        required
      />
      <p>色</p>
      <input
        type="text"
        name="color"
        className="form"
        onChange={(e) => {
          setVegeColor(e.target.value);
        }}
        required
      />
      <br />
      <br />
      <button onClick={submitPost}>送信</button>
    </div>
  );
}
