"use client";
import { useState, useEffect, useContext } from "react";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
  Spinner,
} from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signUpWithSupabaseAction } from "../../lib/actions/sign-up-action";
import { signinWithSupabaseAction } from "../../lib/actions/sign-in-action";
import { errorToastOptions, infoToastOptions } from "@/lib/customToastOptions";
import { SessionContext } from "@/context/Providers";

export default function LoginTabs() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const session = useContext(SessionContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>("login");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (session) setLoading(true);
  }, []);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await toast
      .promise(
        signinWithSupabaseAction({ email, password }),
        {
          pending: "Signing In...",
          error:
            "Sign In Rejected 🤯 Please verify your email/password that you have provided is valid",
          success: "Welcome back! ✨",
        },
        errorToastOptions
      )
      .finally(() => {
        router.refresh();
        setLoading(false);
      });
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await toast
      .promise(
        signUpWithSupabaseAction({ email, password }, name),
        {
          pending: "Pending Sign Up ⌛",
          error: "Rejected 🤯",
          success:
            "Sign Up request received, please confirm your account via your inbox ✨",
        },
        infoToastOptions
      )
      .finally(() => {
        router.refresh();
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col w-full">
        <Card className="max-w-full">
          <CardBody>
            <Spinner className=" py-5 align-middle text-center" />
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full">
        <CardHeader>header</CardHeader>
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Input
                  isRequired
                  label="Password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
                <Input
                  isRequired
                  label="Name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Input
                  isRequired
                  label="Password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
