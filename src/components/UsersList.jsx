import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import '../styles/UsersList.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://localhost:7254/user/users");
        
        const currentUserName = localStorage.getItem('userName');
        const filteredUsers = response.data.filter(user => user.userName !== currentUserName);
        setUsers(filteredUsers);

      } catch (err) {
        setError("Ошибка при загрузке списка пользователей.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userName) => {
    if (!window.confirm("Вы уверены, что хотите удалить этого пользователя?")) {
      return;
    }

    try {
      await axios.delete(`https://localhost:7254/delete/${userName}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.userName !== userName));
    } catch (err) {
      setError("Ошибка при удалении пользователя.");
      console.error(err);
    }
  };

  const handleEdit = (userName) => {
    localStorage.setItem("updateUserName", userName);
    navigate("/edituser"); 
  };

  const handleCreate = () => {
    navigate("/users/create");
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Пользователи</h2>
      <Button className="btn-primary mb-3" onClick={handleCreate}>
        Добавить
      </Button>

      <table>
        <thead>
          <tr>
            <th>Имя пользователя</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.userRole}</td>
              <td>
                <Button
                  className="btn"
                  onClick={() => handleEdit(user.userName)}
                >
                  Изменить
                </Button>
                <Button
                  className="btn"
                  onClick={() => handleDelete(user.userName)}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;