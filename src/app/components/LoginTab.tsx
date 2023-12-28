"use client";
import { useState, useEffect } from "react";
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
import { signOutSupabase } from "@/lib/actions/sign-out-action";
import { infoToastOptions } from "@/lib/customToastOptions";

export default function LoginTabs() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<any>(null);
  const [selected, setSelected] = useState<any>("login");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await supabase.auth.getSession();
      setSession(response.data.session);
    };
    fetchData();
    setLoading(false);
  }, []);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await toast.promise(signinWithSupabaseAction({ email, password }), {
      pending: "Signing In...",
      error: "Sign In Rejected 🤯",
      success: "Welcome back! ✨",
    });
    router.refresh();
    setLoading(false);
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await toast.promise(
      signUpWithSupabaseAction({ email, password }, name),
      {
        pending: "Pending Sign Up ⌛",
        error: "Rejected 🤯",
        success:
          "Sign Up request received, please confirm your account via your inbox ✨",
      },
      infoToastOptions
    );
    router.refresh();
    setLoading(false);
  };

  const handleSignOut = async () => {
    setLoading(true);
    await toast.promise(signOutSupabase(), {
      pending: "Loading",
      error: "Failed to Sign Out...?",
      success: "Signed Out Successfully",
    });
    router.refresh();
    setLoading(false);
  };

  if (loading || (loading && !session)) {
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

  if (session) {
    return (
      <div className="flex flex-col w-full">
        <Card className="max-w-full">
          <CardBody>
            <p className="pb-1 text-center text-pretty">
              You are already signed in.
            </p>
            <Button onClick={handleSignOut}>Click to Sign Out</Button>
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
