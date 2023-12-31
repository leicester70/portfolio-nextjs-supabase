"use client";
import LoginTabs from "../components/LoginTab";

export default function LandingPage() {
  return (
    <>
      <div className="mt-6 grid grid-cols-12 gap-1">
        <div className="col-start-2 col-span-10 lg:col-start-5 lg:col-span-4">
          <div className="mt-5">
            <LoginTabs />
          </div>
        </div>
      </div>
    </>
  );
}
