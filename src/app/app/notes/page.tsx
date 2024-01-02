"use client";
import { useEffect, useState } from "react";
import CreateNoteButton from "./CreateNoteButton";
import NotesDisplay from "./NotesDisplay";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Spinner } from "@nextui-org/react";

export default function Notes() {
  const supabase = createClientComponentClient();
  const [authUserID, setAuthUserID] = useState<string>("");
  const [completedFetch, setCompletedFetch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await supabase.auth.getUser().then((response) => {
        setAuthUserID(response.data.user?.id as string);
      });
    };
    fetchData();
  }, [authUserID]);

  return (
    <>
      <div className="flex items-center">
        <h2>Notes</h2>
        <div className="ml-auto mr-0">
          <CreateNoteButton
            setCompletedFetch={setCompletedFetch}
            authUserID={authUserID}
          />
        </div>
      </div>
      <hr className="mt-2 mb-6" />
      <section className="mt-8 mb-16 min-w-full">
        {authUserID == "" ? (
          <div className="flex flex-col w-full">
            <Spinner
              className="mt-32 text-center align-middle scale-150"
              size="lg"
            />
          </div>
        ) : (
          <NotesDisplay
            completedFetch={completedFetch}
            setCompletedFetch={setCompletedFetch}
            authUserID={authUserID}
          />
        )}
      </section>
    </>
  );
}
