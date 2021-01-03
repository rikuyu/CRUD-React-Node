import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function Form() {
  const [vegeName, setVegeName] = useState("");
  const [vegeId, setVegeId] = useState("");
  const [vegeColor, setVegeColor] = useState("");

  const [vegeList, setVegeList] = useState([]);

  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/get").then((response) => {
      console.log(response.data);
      setVegeList(response.data);
    });
  }, []);

  const handleRegist = () => {
    setVegeList([
      ...vegeList,
      { id: vegeId, name: vegeName, color: vegeColor },
    ]);

    Axios.post("http://localhost:3001/insert", {
      id: vegeId,
      name: vegeName,
      color: vegeColor,
    });
  };

  const handleDelete = (vegeId) => {
    Axios.delete(`http://localhost:3001/delete/${vegeId}`);
  };

  const handleUpdate = (vegeId) => {
    Axios.put("http://localhost:3001/update", {
      id: vegeId,
      name: newName,
      color: newColor,
    });
    setNewName("");
    setNewColor("");
  };

  return (
    <div className="container">
      <form onSubmit={handleRegist}>
        <div className="form-group">
          <label for="id">ID</label>
          <input
            type="text"
            name="id"
            id="id"
            className="form form-control"
            onChange={(e) => {
              setVegeId(e.target.value);
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            className="form form-control"
            name="name"
            id="name"
            onChange={(e) => {
              setVegeName(e.target.value);
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <label for="color">Color</label>
          <input
            type="text"
            name="color"
            id="color"
            className="form form-control"
            onChange={(e) => {
              setVegeColor(e.target.value);
            }}
          />
        </div>
        <button type="submit">登録</button>
      </form>

      <br />
      <br />

      <br />
      {vegeList.map((value, key) => {
        return (
          <div className="vege-item" key={key}>
            <span>{value.id} </span>
            <span>{value.name} </span>
            <span>{value.color}</span>
            <br />

            <form
              onSubmit={() => {
                handleUpdate(value.id);
              }}
            >
              <span>名前</span>
              <input
                type="text"
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
              />
              <br />
              <span>色</span>
              <input
                type="text"
                onChange={(e) => {
                  setNewColor(e.target.value);
                }}
              />
              <br />
              <button type="submit">更新</button>
            </form>

            <form
              onSubmit={() => {
                handleDelete(value.id);
              }}
            >
              <button type="submit">削除</button>
            </form>
            <br />
          </div>
        );
      })}
    </div>
  );
}
