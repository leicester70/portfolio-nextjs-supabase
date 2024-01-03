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
  ButtonGroup,
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
      style={{ height: 275 }}
      className="p-4 pb-10 mt-4 "
      onMouseDown={onOpen}
    >
      <CardHeader className="block">
        <h3 className="min-w-max block">{note.title}</h3>
        <DisplayDate isostring={note.last_updated as string} />
        <hr className="opacity-10" />
      </CardHeader>
      <CardBody className="text-ellipsis text-wrap overflow-hidden">
        {note.content}
      </CardBody>
      <Modal
        size="lg"
        placement="center"
        scrollBehavior="outside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="block">
                <h3 style={{ textWrap: "wrap", textOverflow: "ellipsis" }}>
                  {note.title}
                </h3>
                <DisplayDate isostring={note.last_updated as string} />
                <hr className="opacity-10" />
              </ModalHeader>
              <ModalBody className="flex flex-col gap-1">
                <p
                  style={{
                    minHeight: 275,
                    textOverflow: "ellipsis",
                    textWrap: "wrap",
                  }}
                >
                  {note.content}
                </p>
              </ModalBody>
              <ModalFooter>
                <ButtonGroup>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() => {
                      handleDeleteNote(note.id as number);
                    }}
                  >
                    Delete
                  </Button>
                  <Button size="sm" onPress={onClose}>
                    Close
                  </Button>
                </ButtonGroup>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
}
