import { useEffect } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

function Home() {
  let users = []

  async function getUsers() {
    await api.get('/users')
      .then(response => {
        users.push(...response.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }

  useEffect(() => {
    getUsers();
  
  }, [])
  

  return (
    <div className="container">
      <form>
        <h1>User Register</h1>
        <input placeholder="Name" name="name" type="text" />
        <input placeholder="Age" name="age" type="number" />
        <input placeholder="Email" name="email" type="email" />
        <button className="btn" type="button">
          Submit
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Name: <span>{user.name}</span></p>
            <p>Age: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button>
            <img src={Trash} alt="Delete" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
