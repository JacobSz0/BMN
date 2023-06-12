import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BMNList.css"

function BMNList() {

  const [BMNData, setBMNData] = useState([]);
  const [displayData, setDisplayData] = useState([])
  const [option, setOption] = useState("All")
  const navigate = useNavigate();


  async function getData() {
    const response = await fetch(`${process.env.REACT_APP_THERAPYHUB_API_HOST}bmn`)
      if (response.ok) {
        var data = await response.json();
        console.log(data)
        setBMNData(data)
        setDisplayData(data)
      }
  }

  const handlePerChange = (event) => {
    const store = event.target.value;
    setOption(store);
    var copyBMN=[...BMNData]
    var newData=[]
    if (store==="All"){
      setDisplayData(BMNData)
    }
    if (store==="Watched"){
      for (var i of copyBMN){
        if (i.date_watched!==""){
          newData.push(i)
        }
      }
      console.log(newData)
      setDisplayData(newData)
    }
    if (store==="Unwatched"){
      for (var i of copyBMN){
        if (i.date_watched===""){
          newData.push(i)
        }
      }
      console.log(newData)
      setDisplayData(newData)
    }
  };


  function Deet(id){
    navigate(`/bmn_deets/${id}`)
  }

  useEffect (() => {
    getData()
  },[])



  return (
    <div>
      <div className="background-grey">
        <p>Search Parameters</p>
        <select value={option} onChange={handlePerChange}>
          <option value={"All"}>All</option>
          <option value={"Watched"}>Watched</option>
          <option value={"Unwatched"}>Unwatched</option>
        </select>
      </div>
      {displayData.map((i) => {
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
