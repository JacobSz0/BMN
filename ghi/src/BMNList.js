import { useState, useEffect } from "react";
import "./BMNList.css"

function BMNList() {

  const [BMNData, setBMNData] = useState([]);






  async function getData() {
    const response = await fetch(`${process.env.REACT_APP_THERAPYHUB_API_HOST}bmn`)
      if (response.ok) {
        var data = await response.json();
        console.log(data)
        setBMNData(data)
      }
  }

  useEffect (() => {
    getData()
  },[])



  return (
    <div>
      {BMNData.map((i) => {
        return(
          <div className="card" key={i.id}>
            <img src={i.image_1} alt="IMG"></img>
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