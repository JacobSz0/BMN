import React, { useEffect, useState } from "react";
import { useToken } from "./Authentication";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBMN() {
  const [title, setTitle] = useState("");
  const [lengthy_description, setLengthyDescription] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [date_watched, setDateWatched] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)
  const { id } = useParams();
  const { token } = useToken();

  const navigate = useNavigate();


  useEffect(() => {
    async function getData() {
      if (token) {
        setLoggedIn(true)
        const response = await fetch(`${process.env.REACT_APP_THERAPYHUB_API_HOST}bmn/${id}`)
        if (response.ok){
          var data = await response.json();
          setTitle(data.title)
          setLengthyDescription(data.lengthy_description)
          setImage1(data.image_1)
          setImage2(data.image_2)
          setDateWatched(data.date_watched)
        }
      }
    }
    getData();
  }, [token]);

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleLengthyDescriptionChange = (event) => {
    const value = event.target.value;
    setLengthyDescription(value);
  };

  const handleImage1Change = (event) => {
    const value = event.target.value;
    setImage1(value);
  };

  const handleImage2Change = (event) => {
    const value = event.target.value;
    setImage2(value);
  };

  const handleDateWatchedChange = (event) => {
    const value = event.target.value;
    setDateWatched(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.title = title;
    data.lengthy_description = lengthy_description;
    data.image_1 = image1;
    data.image_2 = image2;
    data.date_watched = date_watched;

    const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}bmn/${id}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      var renturnedData = await response.json();

      setTitle("");
      setLengthyDescription("");
      setImage1("");
      setImage2("");
      setDateWatched("");

      navigate(`../bmn_deets/${renturnedData.id}`);
    }
  };


  return (
    <>
      {loggedIn ? (
        <div className="container">
          <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1 className="text">Edit Profile</h1>
                    <form onSubmit={handleSubmit} id="create-new-employee-form">
                    <div className="form-floating mb-3">
                        <input
                        onChange={handleTitleChange}
                        placeholder="Title"
                        required type="text"
                        name="title"
                        id="title"
                        className="form-control"
                        value={title}
                        />
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                        onChange={handleLengthyDescriptionChange}
                        placeholder="lengthy_description"
                        required type="text"
                        name="lengthy_description"
                        id="lengthy_description"
                        className="form-control"
                        value={lengthy_description}
                        />
                        <label htmlFor="city">lengthy description</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                        onChange={handleImage1Change}
                        placeholder="image1"
                        required type="text"
                        name="image1"
                        id="image1"
                        className="form-control"
                        value={image1}
                        />
                        <label htmlFor="image1">Image 1 URL</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                        onChange={handleImage2Change}
                        placeholder="image2"
                        name="image2"
                        id="image2"
                        className="form-control"
                        value={image2}
                        />
                        <label htmlFor="image2">Image 2 URL</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                        onChange={handleDateWatchedChange}
                        placeholder="date_watched"
                        name="date_watched"
                        id="date_watched"
                        className="form-control"
                        value={date_watched}
                        />
                        <label htmlFor="date_watched">Date Watched</label>
                    </div>
                    <button className="btn btn-outline-info my-2 my-sm-0">
                      Submit
                    </button>
                    </form>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }

  export default UpdateBMN;
