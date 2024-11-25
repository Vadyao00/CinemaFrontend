import React, { useState, useEffect } from "react";
import { editUser } from '../services/loginPost';

const EditUser = () => {
  const [formData, setFormData] = useState({
    OldUserName: localStorage.getItem("updateUserName"),
    UserName: "",
    Email: "",
    FirstName: "",
    SecondName: "",
    UserRole: "User",
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setIsAdmin(storedRole === "Administrator");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const validationErrors = {};
    let isValid = true;

    if (!formData.Email) {
      validationErrors.email = "Email обязателен.";
      isValid = false;
    }
    if (!formData.UserName) {
      validationErrors.userName = "Логин обязателен.";
      isValid = false;
    }
    if (!formData.FirstName) {
      validationErrors.firstName = "Имя обязательно.";
      isValid = false;
    }
    if (!formData.SecondName) {
      validationErrors.secondName = "Фамилия обязательна.";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const updateUserProfile = async () => {
    try {
      setIsSaving(true);
  
      const response = await editUser(formData);
  
      if (response.status === 200) {
        alert("Пользователь успешно обновлен!");
        window.location.href = "/";
      } else {
        const errorData = response.data;
        setErrors(errorData.errors || { general: "Ошибка обновления данных." });
      }
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
  
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || { general: "Ошибка на сервере." });
      } else {
        setErrors({ general: "Не удалось обновить данные. Попробуйте позже." });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (validateForm()) {
      updateUserProfile();
    }
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Профиль</h4>
        <form id="profile-form" onSubmit={handleSubmit}>
          {errors.general && <div className="text-danger">{errors.general}</div>}

          <div className="form-group">
            <label htmlFor="UserName">Логин</label>
            <input
              id="UserName"
              name="UserName"
              type="text"
              className="form-control"
              value={formData.UserName}
              onChange={handleChange}
            />
            {errors.userName && (
              <span className="text-danger">{errors.userName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="Email">Email</label>
            <input
              id="Email"
              name="Email"
              type="email"
              className="form-control"
              value={formData.Email}
              onChange={handleChange}
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="FirstName">Имя</label>
            <input
              id="FirstName"
              name="FirstName"
              type="text"
              className="form-control"
              value={formData.FirstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <span className="text-danger">{errors.firstName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="SecondName">Фамилия</label>
            <input
              id="SecondName"
              name="SecondName"
              type="text"
              className="form-control"
              value={formData.SecondName}
              onChange={handleChange}
            />
            {errors.secondName && (
              <span className="text-danger">{errors.secondName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="UserRole">Роль</label>
            <select
              id="UserRole"
              name="UserRole"
              className="form-control"
              value={formData.UserRole}
              onChange={handleChange}
              disabled={!isAdmin}
            >
              <option value="User">User</option>
              <option value="Administrator">Administrator</option>
            </select>
          </div>

          <button type="submit" className="btn btn-default" disabled={isSaving}>
            {isSaving ? "Сохранение..." : "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;