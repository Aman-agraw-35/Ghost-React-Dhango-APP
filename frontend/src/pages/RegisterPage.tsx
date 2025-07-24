import { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import throttle from "lodash.throttle";
import { Link, useNavigate } from "react-router-dom"; // updated here

const Register = () => {
  const navigate = useNavigate(); // added

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validate = () => {
    const { username, email, password } = formData;
    const newErrors = { username: "", email: "", password: "" };
    let isValid = true;

    if (!username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (username.length < 3 || username.length > 15) {
      newErrors.username = "Username must be 3-15 characters";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      newErrors.password =
        "Password must be 8+ chars, incl. number & uppercase";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const throttledRegister = useCallback(
    throttle(async (data) => {
      try {
        await axios.post("http://localhost:8000/api/register/", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast.success("Registered successfully!");
        navigate("/login"); // ⬅ redirected to login
        setFormData({ username: "", email: "", password: "" });
      } catch (error: any) {
        console.error(
          "Registration Error:",
          error.response?.data || error.message
        );
        const errMsg = error.response?.data?.detail || "Registration failed!";
        toast.error(errMsg);
        if (error.response?.data?.username) {
          setErrors((prev) => ({
            ...prev,
            username: error.response.data.username[0],
          }));
        }
      }
    }, 2000),
    [navigate]
  );

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    throttledRegister(formData);
  };

  return (
    <form
      onSubmit={handleRegister}
      className="bg-white bg-opacity-80 p-6 rounded shadow-md w-full max-w-md space-y-4"
    >
      <h2 className="text-2xl font-bold">Register</h2>

      <div>
        <input
          className="w-full p-2 border rounded"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username}</p>
        )}
      </div>

      <div>
        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <input
          className="w-full p-2 border rounded"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
      >
        Register
      </button>

      <p className="text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </form>
  );
};

export default Register;
