import { useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import throttle from "lodash.throttle";
import { Link, useNavigate } from "react-router-dom";
import type { FormEvent } from "react";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface ErrorResponse {
  detail?: string;
  username?: string[];
  email?: string[];
  password?: string[];
}

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
  });

  const validate = (): boolean => {
    const { username, email, password } = formData;
    const newErrors: RegisterData = { username: "", email: "", password: "" };
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
      newErrors.password = "Password must be 8+ chars, incl. number & uppercase";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const throttledRegister = useCallback(
    throttle(async (data: RegisterData) => {
      try {
        await axios.post("http://localhost:8000/api/register/", data, {
          headers: { "Content-Type": "application/json" },
        });
        toast.success("Registered successfully!");
        setFormData({ username: "", email: "", password: "" });
        navigate("/login");
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        if (axios.isAxiosError(error)) {
          const resData = error.response?.data;
          toast.error(resData?.detail || "Registration failed!");

          setErrors((prev) => ({
            ...prev,
            username: resData?.username?.[0] || "",
            email: resData?.email?.[0] || "",
            password: resData?.password?.[0] || "",
          }));
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    }, 2000),
    [navigate]
  );

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    throttledRegister(formData);
  };

  return (
    <div className="h-[77vh] flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg w-[20vw] max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Register</h2>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter password"
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
          className="w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 items-center justify-center transition-colors duration-200 font-medium"
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
    </div>
  );
};

export default Register;
