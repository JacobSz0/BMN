import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function BMNDetail() {

  const [BMNData, setBMNData] = useState([]);
  const { id } = useParams();






  async function getData() {
    const response = await fetch(`${process.env.REACT_APP_THERAPYHUB_API_HOST}bmn/${id}`)
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
      <div className="App"><img src={BMNData.image_1} alt="IMG"></img></div>
      <div>
        <h4 className="text">{BMNData.title}</h4>
        <p className="text">{BMNData.date_watched}</p>
        <p className="text">{BMNData.lengthy_description}</p>
      </div>
    </div>
  )
}

export default BMNDetail;