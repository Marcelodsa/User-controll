import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef(null);
  const inputAge = useRef(null);
  const inputEmail = useRef(null);

  async function getUsers() {
    await api.get('/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }

  async function createUser() {
    await api.post('/users', {
      name: inputName.current.value,
      age: parseInt(inputAge.current.value),
      email: inputEmail.current.value
    })
    .then(() => {
      getUsers();
      inputName.current.value = '';
      inputAge.current.value = '';
      inputEmail.current.value = '';
    })
    .catch(error => {
      console.error("Error creating user:", error);
    });
  }

  async function deleteUser(id) {
    await api.delete(`/users/${id}`)
      .then(() => {
        getUsers();
      })
      .catch(error => {
        console.error("Error deleting user:", error);
      });
  }

  useEffect(() => {
    getUsers();
  
  }, [])
  

  return (
    <div className="container">
      <form>
        <h1>User Register</h1>
        <input placeholder="Name" name="name" type="text" ref={inputName}/>
        <input placeholder="Age" name="age" type="number" ref={inputAge}/>
        <input placeholder="Email" name="email" type="email" ref={inputEmail}/>
        <button className="btn" type="button" onClick={createUser}>
          Create
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Name: <span>{user.name}</span></p>
            <p>Age: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUser(user.id)}>
            <img src={Trash} alt="Delete" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
