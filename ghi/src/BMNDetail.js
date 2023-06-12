import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToken } from "./Authentication";

import "./BMNDetail.css"

function BMNDetail() {

  const [BMNData, setBMNData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false)
  const { token } = useToken();
  const { id } = useParams();

  const navigate = useNavigate();


  async function getData() {
    const response = await fetch(`${process.env.REACT_APP_THERAPYHUB_API_HOST}bmn/${id}`)
      if (response.ok) {
        var data = await response.json();
        console.log(data)
        setBMNData(data)
      }
  }

  async function deleteEntry(){
    const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}bmn/${id}`;
    const fetchConfig = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response2 = await fetch(url, fetchConfig);
      if (response2.ok) {
        var confirmData = await response2.json();
        if (confirmData===true){
          console.log("Deleted")
          navigate(`../bmn_list`);
        }
  }
}

function updateEntry(){
  navigate(`../update/${id}`)
}

  useEffect (() => {
    if (token){
      setLoggedIn(true)
    }
    getData()
  },[])



  return (
    <div>
      <div className="App"><img className="bmnimage" src={BMNData.image_1} alt="IMG"></img></div>
      <div>
        <h4 className="text">{BMNData.title}</h4>
        <p className="text">{BMNData.date_watched}</p>
        <p className="text">{BMNData.lengthy_description}</p>
      </div>
      {loggedIn ? (
        <>
          <button className="glass glass-orange" onClick={updateEntry}>Edit Entry</button>
          <button className="glass glass-red" onClick={deleteEntry}>Delete Entry</button>
        </>
      ) : null}
    </div>
  )
}

export default BMNDetail;
