"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // === BAGIAN BARU: VALIDATION STATES ===
  const [validationErrors, setValidationErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered");

  useEffect(() => {
    if (isRegistered) {
      setSuccess("Pendaftaran berhasil! Silakan login.");
    }
  }, [isRegistered]);

  // === BAGIAN BARU: VALIDATION FUNCTIONS ===
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email wajib diisi";
    if (!emailRegex.test(email)) return "Format email tidak valid";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password wajib diisi";
    if (password.length < 6) return "Password minimal 6 karakter";
    return "";
  };

  const sanitizeInput = (input) => {
    return input.trim().replace(/[<>]/g, "");
  };

  const validateForm = () => {
    const errors = {};
    errors.email = validateEmail(formData.email);
    errors.password = validatePassword(formData.password);
    
    setValidationErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    setFormData({
      ...formData,
      [name]: sanitizedValue,
    });

    // === BAGIAN BARU: REAL-TIME VALIDATION ===
    if (touched[name]) {
      const errors = { ...validationErrors };
      if (name === "email") {
        errors.email = validateEmail(sanitizedValue);
      } else if (name === "password") {
        errors.password = validatePassword(sanitizedValue);
      }
      setValidationErrors(errors);
    }
  };

  // === BAGIAN BARU: HANDLE BLUR ===
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    
    const errors = { ...validationErrors };
    if (name === "email") {
      errors.email = validateEmail(formData.email);
    } else if (name === "password") {
      errors.password = validatePassword(formData.password);
    }
    setValidationErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    // === BAGIAN BARU: VALIDATE BEFORE SUBMIT ===
    if (!validateForm()) {
      setTouched({ email: true, password: true });
      return;
    }

    try {
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        // === BAGIAN BARU: BETTER ERROR HANDLING ===
        if (result.error.includes("locked")) {
          setError(result.error);
        } else if (result.error.includes("Too many")) {
          setError(result.error);
        } else {
          setError("Email atau password salah");
        }
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setError("Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {success && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="text-sm text-green-700">{success}</div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Alamat Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`relative block w-full appearance-none rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none focus:ring-2 ${
                  validationErrors.email && touched.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
                placeholder="Alamat Email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {/* === BAGIAN BARU: ERROR MESSAGE === */}
              {validationErrors.email && touched.email && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`relative block w-full appearance-none rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none focus:ring-2 ${
                  validationErrors.password && touched.password
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {/* === BAGIAN BARU: ERROR MESSAGE === */}
              {validationErrors.password && touched.password && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Login"}
            </button>
          </div>

          <div className="text-center text-sm">
            Belum punya akun?{" "}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Daftar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
