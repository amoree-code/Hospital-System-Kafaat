import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ className, onSubmit, register, errors }) {
  return (
    <div
      className={cn(
        "flex justify-center items-center min-h-screen px-4",
        className
      )}
    >
      <Card className="w-full max-w-sm sm:max-w-md md:w-[450px] shadow-xl rounded-2xl p-4 sm:p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl font-bold">
            تسجيل الدخول
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              {/* البريد الإلكتروني */}
              <div className="grid gap-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", {
                    required: "البريد الإلكتروني مطلوب",
                  })}
                />
                {errors?.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* كلمة المرور */}
              <div className="grid gap-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="أدخل كلمة المرور"
                  {...register("password", {
                    required: "كلمة المرور مطلوبة",
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* زر */}
              <Button type="submit" className="w-full">
                دخول
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
