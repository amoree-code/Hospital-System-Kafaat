import { AppWindowIcon, CodeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext, useState } from "react";
import { Context } from "@/hooks/Context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setUserToken } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-slate-200 to-blue-300">
      <Tabs defaultValue="account" className="w-full max-w-lg">
        <TabsContent value="account">
          <Card className="shadow-lg w-full min-w-[400px] max-w-[600px] p-6">
            <CardHeader className="text-center">
              <CardTitle>تسجيل الدخول</CardTitle>
              <CardDescription>
                يرجى إدخال بيانات الدخول الخاصة بك ثم الضغط على زر تسجيل الدخول.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-name">
                    اسم المستخدم أو البريد الإلكتروني
                  </Label>
                  <Input
                    id="tabs-demo-name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-username">كلمة المرور</Label>
                  <Input
                    id="tabs-demo-username"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
            </form>
            <CardFooter>
              <Button className="w-full">تسجيل الدخول</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
