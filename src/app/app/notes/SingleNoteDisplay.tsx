"use client";
import DisplayDate from "@/components/DisplayDate";
import { deleteNote } from "@/lib/client_actions/notes-actions";
import { bottomCenteredColoredToastOptions } from "@/lib/customToastOptions";
import { Note } from "@/lib/interfaces/Note";
import {
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  authUserID: string;
  note: Note;
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
  setCompletedFetch: Dispatch<SetStateAction<boolean>>;
}

export default function SingleNoteDisplay({
  authUserID,
  note,
  notes,
  setNotes,
  setCompletedFetch,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedID, setSelectedID] = useState<number | undefined>(undefined);

  const handleDeleteNote = async (noteID: number) => {
    await toast
      .promise(
        deleteNote(authUserID, noteID),
        {
          pending: "🚮 deleting...",
          error: "Error Deleting🤯",
          success: "Goodbye note✨",
        },
        bottomCenteredColoredToastOptions
      )
      .then(() => {
        setCompletedFetch(false);
        var tempNotes = notes;
        let index = tempNotes.findIndex((obj) => obj.id === noteID);
        if (index > -1) tempNotes = tempNotes.splice(index, 1);
        setNotes(tempNotes);
      })
      .catch();
  };

  return (
    <Card
      id={`${note.id}`}
      style={{ height: 200 }}
      className="p-4 pb-10 mt-4 "
      onMouseDown={onOpen}
    >
      <CardHeader className="block">
        <h3 className="min-w-max">{note.title}</h3>
        <DisplayDate isostring={note.last_updated as string} />
        <hr className="opacity-10" />
      </CardHeader>
      <CardBody className="text-ellipsis text-wrap overflow-hidden">
        {note.content}
      </CardBody>
      <Modal
        size="md"
        placement="center"
        scrollBehavior="outside"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="block">
                {note.title}{" "}
                <DisplayDate isostring={note.last_updated as string} />
                <hr className="opacity-10" />
              </ModalHeader>
              <ModalBody
                style={{ minHeight: 300 }}
                className="flex flex-col gap-1"
              >
                <textarea
                  readOnly={true}
                  value={note.content}
                  className="bg-transparent p-4"
                  style={{ height: 500 }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => {
                    handleDeleteNote(note.id as number);
                  }}
                >
                  Delete
                </Button>
                <Button
                  size="sm"
                  color="warning"
                  onPress={() => {
                    setIsEditing(true);
                  }}
                >
                  edit
                </Button>
                <Button size="sm" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
}
