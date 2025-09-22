import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAxios } from "@/hooks/useAxios";
import { LoginForm } from "@/components/login-form";

export default function Login() {
  const axios = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
      phoneCountryCode: "+964",
      phone: "7700000000",
    };

    try {
      const result = await axios.post("/api/auth/login", payload);
      console.log(result.data);
      if (result?.data) {
        localStorage.setItem("token", result.data.data.token);
        navigate("/flooers");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("فشل تسجيل الدخول، تأكد من البيانات المدخلة");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-slate-200 to-blue-300">
      <LoginForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />
    </div>
  );
}
