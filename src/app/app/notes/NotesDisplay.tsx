"use client";
import { retrieveUserNotes } from "@/lib/client_actions/notes-actions";
import { Note } from "@/lib/interfaces/Note";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SingleNoteDisplay from "./SingleNoteDisplay";
import { toast } from "react-toastify";
import { Spinner } from "@nextui-org/spinner";

interface Props {
  authUserID: string;
  completedFetch: boolean;
  setCompletedFetch: Dispatch<SetStateAction<boolean>>;
}

export default function NotesDisplay({
  authUserID,
  completedFetch,
  setCompletedFetch,
}: Props) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await retrieveUserNotes(authUserID);
      setNotes(data as Note[]);
      setCompletedFetch(true);
    };
    if (!completedFetch) {
      fetchNotes();
    }
  });

  if (notes.length > 0) {
    return (
      <>
        {notes
          .filter((note) => {
            return note.is_draft == false;
          })
          .map((obj: Note, index) => {
            return (
              <SingleNoteDisplay
                authUserID={authUserID}
                notes={notes}
                setNotes={setNotes}
                setCompletedFetch={setCompletedFetch}
                key={`${obj.id}-${index}`}
                note={obj}
              />
            );
          })}
        <></>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col w-full">
        {completedFetch ? (
          <></>
        ) : (
          <Spinner
            className="mt-32 text-center align-middle scale-150"
            size="lg"
          />
        )}
      </div>
      <span className="mt-20 m-auto block text-center bg-white">
        {completedFetch ? "Seems rather empty in here... 🍃" : "Hold on💦 ..."}
      </span>
    </>
  );
}
