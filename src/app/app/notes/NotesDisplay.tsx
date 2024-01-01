"use client";
import { retrieveUserNotes } from "@/lib/client_actions/notes-actions";
import { Note } from "@/lib/interfaces/Note";
import { useEffect, useState } from "react";
import SingleNoteDisplay from "./SingleNoteDisplay";
import { Spinner } from "@nextui-org/react";

interface Props {
  authUserID: string;
}

export default function NotesDisplay({ authUserID }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchNotes = async () => {
      const data = await retrieveUserNotes(authUserID);
      setNotes(data as Note[]);
    };
    fetchNotes();
    setIsLoading(false);
  }, [notes]);

  if (isLoading) {
    return (
      <Spinner className="mt-32 text-center align-middle scale-150" size="lg" />
    );
  }

  if (!notes) {
    <span className="text-center"> Looks empty here... 🍃</span>;
  }

  return (
    <>
      {notes.map((obj: Note, index) => {
        return (
          <SingleNoteDisplay
            authUserID={authUserID}
            notes={notes}
            setNotes={setNotes}
            key={`${obj.id}-${index}`}
            note={obj}
          />
        );
      })}
      <></>
    </>
  );
}
