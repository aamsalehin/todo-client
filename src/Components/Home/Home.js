import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { set, useForm } from "react-hook-form";
import "./Home.css";

function Home() {
  const [todos, setTodos] = useState([]);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const url = `https://afternoon-ridge-39909.herokuapp.com/todo`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(!loading);
      });
  };

  useEffect(() => {
    fetch(
      `https://afternoon-ridge-39909.herokuapp.com/todo?email=${user.email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, [loading]);
  const handleDeleteItem = (id) => {
    const proceed = window.confirm("do you want to delete?");
    if (proceed) {
      const url = `https://afternoon-ridge-39909.herokuapp.com/todo/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          const remaining = todos.filter((todo) => todo._id !== id);
          setTodos(remaining);
        });
    }
  };
  const handleComplete = (id) => {
    const status = 1;
    const url = `https://afternoon-ridge-39909.herokuapp.com/todo/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(!loading);
      });
  };

  return (
    <div>
      <h4 className="h3 fw-bold my-5 text-primary">todo</h4>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 my-5">
            <h3 className="h5 text-uppercase text-primary mb-5">add tasks</h3>
            <form
              className="d-flex flex-column form w-75 m-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                placeholder="email"
                className="mb-3 form-control"
                type="email"
                value={user.email}
                readOnly
                {...register("email", { required: true })}
              />
              <input
                placeholder="name"
                className="mb-3 form-control"
                type="text"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-danger">This field is required</span>
              )}

              <textarea
                placeholder="description"
                className="mb-3 form-control"
                type="text"
                {...register("desc", { required: true })}
              />
              {errors.desc && (
                <span className="text-danger">This field is required</span>
              )}

              <input
                value="add task"
                className="mb-3 btn btn-primary"
                type="submit"
              />
            </form>
          </div>
          <div className="col-lg-8 my-5">
            <h3 className="h5 text-uppercase text-primary mb-5">Your tasks</h3>
            <ul className="task-ul">
              {todos.map((todo) => (
                <li
                  key={todo._id}
                  className={`task-li h3 lead ${
                    todo.status ? "linethrough-t " : ""
                  }`}
                >
                  <strong className="fw-bold h5">Task :</strong> {todo.name}
                  <strong className="fw-bold h5">Desc :</strong> {todo.desc}
                  <span>
                    <button
                      onClick={() => handleComplete(todo._id)}
                      className="btn btn-success"
                    >
                      complete
                    </button>
                    <button
                      onClick={() => handleDeleteItem(todo._id)}
                      className="btn btn-danger ms-2"
                    >
                      delete
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
