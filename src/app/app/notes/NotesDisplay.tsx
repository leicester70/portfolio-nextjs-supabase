"use client";
import { retrieveUserNotes } from "@/lib/client_actions/notes-actions";
import { Note } from "@/lib/interfaces/Note";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SingleNoteDisplay from "./SingleNoteDisplay";
import { toast } from "react-toastify";

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
    };
    if (!completedFetch) {
      fetchNotes();
      setCompletedFetch(true);
    }
  });

  if (notes.length == 0) {
    <span className="mt-20 text-center bg-white"> Looks empty here... 🍃</span>;
  }

  return (
    <>
      {notes.map((obj: Note, index) => {
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
