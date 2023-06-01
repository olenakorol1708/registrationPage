import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const [formData, setFormData] = useState({
   
    username: "",
    email: "",
    password: "",
    gender:"",
    age: "",
  });
  const [errors, setErrors] = useState({});


  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(formData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Form submission logic here
      console.log("Form submitted:", formData);
      registrFetch();
    }
  };

  const validateForm = () => {
    const errors = {};
    const { username, email, password, gender, age } = formData;

    // Name validation
    
    if (!username.trim()) {
      errors.username = "Username is required";
    }

    // Email validation
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password =
        'must be 8 characters long, with 1 uppercase & 1 lowercase letter, 1 number and 1 symbol"';
    }
    //Age validation
    if (!age) {
      errors.age = "Age is required";
    }
    if (!gender) {
      errors.gender = "Gender is required";
    }
    
   
    return errors;
  };

  async function registrFetch() {
    console.log("login");
    try {
      let response = await fetch(
        "https://todo-redev.herokuapp.com/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      console.log(result);
      if (result) {
        navigate("/login");
      } else {
        navigate("/registration");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="page">
      <div className="img-container">
        {" "}
        <h1 className="title"> REGISTRATION PAGE</h1>
      </div>
      <div className="presentation">
        <form className="form" onSubmit={handleSubmit}>
          
          <label htmlFor="username">
            <input
              className="input-login"
              value={formData.username}
              placeholder="Enter your  user name..."
              onChange={handleChange}
              name="username"
            />
            {errors.username && <p>{errors.username}</p>}
          </label>
          <label htmlFor="email">
            <input
              className="input-login"
              type="email"
              placeholder="Enter your e-mail"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </label>
          <label htmlFor="password">
            <input
              className="input-login"
              value={formData.password}
              placeholder="Enter your  user password.."
              onChange={handleChange}
              name="password"
            />
            {errors.password && <p className="prompt">{errors.password}</p>}
          </label>
          <label htmlFor="gender">
            <input
              className="input-login"
              value={formData.gender}
              placeholder="Enter your  gender"
              onChange={handleChange}
              name="gender"
            />
          </label>
          
          
          <label htmlFor="age">
            <input
              className="input-login"
              value={formData.age}
              placeholder="Enter your  user age.."
              onChange={handleChange}
              name="age"
            />
          </label>

          
          <button className="button-login" type="submit">
            Registration
          </button>
          {" "}
         
        </form>

        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
  );
};
