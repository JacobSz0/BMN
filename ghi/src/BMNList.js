import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./BMNList.css"

function BMNList() {

  const [BMNData, setBMNData] = useState([]);
  const navigate = useNavigate();





  async function getData() {
    const response = await fetch(`${process.env.REACT_APP_THERAPYHUB_API_HOST}bmn`)
      if (response.ok) {
        var data = await response.json();
        console.log(data)
        setBMNData(data)
      }
  }

  function Deet(id){
    navigate(`/bmn_deets/${id}`)
  }

  useEffect (() => {
    getData()
  },[])



  return (
    <div>
      {BMNData.map((i) => {
        return(
          <div onClick={() => Deet(i.id)} className="card" key={i.id}>
            <img className="list-img" src={i.image_1} alt="IMG"></img>
            <div className="container">
            <h4><b>{i.title}</b></h4>
            <p>{i.date_watched}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BMNList;