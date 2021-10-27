import React, { useState, useEffect } from "react";
import './App.css';
import Axios from "axios";
import Typewriter from "typewriter-effect";


function App() {
  const [laptopName, setLaptopName] = useState("");
  const [laptopPrice, setLaptopPrice] = useState(0);
  const [laptopFeedback, setLaptopFeedback] = useState("");


  const [newLaptopName, setNewLaptopName] = useState("");
  const [newLaptopPrice, setNewLaptopPrice] = useState(0);
  const [newLaptopFeedback, setNewLaptopFeedback] = useState("")

  const [laptopList, setLaptopList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setLaptopList(response.data);
    })
  }, []);


  const addData = () => {
    Axios.post("http://localhost:3001/insert", { laptopName: laptopName, laptopPrice: laptopPrice, laptopFeedback: laptopFeedback });

  };

  const updateName = (id) => {
    Axios.put("http://localhost:3001/updatename", {
      id: id, newLaptopName: newLaptopName
    });
  };

  const updatePrice = (id) => {
    Axios.put("http://localhost:3001/updateprice", {
      id: id, newLaptopPrice: newLaptopPrice
    });
  };

  const updateFeedback = (id) => {
    Axios.put("http://localhost:3001/updatefeedback", {
      id: id, newLaptopFeedback: newLaptopFeedback
    });
  };



  const deleteLaptop = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (
    <div className="App">


      <h1 className="spin">🎇 😎 🎇</h1>
      <label className="label" > 
      <Typewriter
        onInit={(typewriter) => {
          typewriter.typeString("Laptop-Name").start();
        }}
      />
       </label>
      <input type="text" onChange={(event) => { setLaptopName(event.target.value) }} />

      <label  className="label"> 
      <Typewriter
        onInit={(typewriter) => {
          typewriter.typeString("Laptop-Price").start();
        }}
      />
       </label>
      <input type="number" onChange={(event) => { setLaptopPrice(event.target.value) }} />

      <label  className="label">
      <Typewriter
        onInit={(typewriter) => {
          typewriter.typeString("Laptop-Feedback").start();
        }}
      />
      </label>
      <input type="text" onChange={(event) => { setLaptopFeedback(event.target.value) }} />

      <button onClick={addData} > Add Data </button>

      <h2> All Laptops Lists</h2>
      {laptopList.map((value, key) => {
        return <div key={key} className="body" >
          <h1 className="name"> {value.laptopName} </h1>
          <h1 className="price"> {value.laptopPrice} </h1>
          <h1 className="feedback"> {value.laptopFeedback} </h1>
          <div className="container">

            <input type="text" placeholder="laptop-name" onChange={(event) => { setNewLaptopName(event.target.value) }} />
            <input type="number" placeholder="laptop-price" onChange={(event) => { setNewLaptopPrice(event.target.value) }} />
            <input type="text" placeholder="laptop-feedback"  onChange={(event) => { setNewLaptopFeedback(event.target.value) }}/>
            
            <button className="update" onClick={() => updateName(value._id)} > Update Name</button>
            <button className="update" onClick={() => updatePrice(value._id)} > Update Price</button>
                <button className="update" onClick={() => updateFeedback(value._id)} > Update Feedback</button>
                {/* <button className="delete"> Delete</button> */}
            {/* <button className="delete"> Delete</button> */}
            <button className="delete" onClick={() => deleteLaptop(value._id)}> Delete</button>
          </div>
        </div>

      })}




    </div>
  );
}

export default App;
