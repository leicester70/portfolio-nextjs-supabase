"use client";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Textarea,
  Button,
} from "@nextui-org/react";
import { CreateNote, Note } from "@/lib/interfaces/Note";
import { createNewNote } from "@/lib/client_actions/notes-actions";
import { toast } from "react-toastify";
import { topCentredColoredToastOptions } from "@/lib/customToastOptions";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  authUserID: string;
  setCompletedFetch: Dispatch<SetStateAction<boolean>>;
  notes?: Note;
}

export default function CreateNoteButton({
  authUserID,
  setCompletedFetch,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteContent, setNoteContent] = useState<string>("");

  const handleCancel = () => {
    setNoteTitle("");
    setNoteContent("");
    onClose();
  };

  const handleCreateNote = async () => {
    let newNote: CreateNote = {
      title: noteTitle,
      content: noteContent,
      is_draft: false,
      is_publicly_visble: false,
    };
    // await createNewNote(newNote, authUserID),
    await toast.promise(
      createNewNote(authUserID, newNote),
      {
        pending: "✈ Saving...",
        error: "Failed to create note 🤯 (Sorry...)",
        success: "New Note Created ✨",
      },
      topCentredColoredToastOptions
    );
    onClose();
    setCompletedFetch(false);
  };

  return (
    <>
      <Button
        isDisabled={!authUserID}
        isLoading={!authUserID}
        className="my-2"
        color="primary"
        onPress={onOpen}
        endContent
      >
        New Note 📝
      </Button>

      <Modal
        size="lg"
        placement="center"
        scrollBehavior="outside"
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        hideCloseButton
      >
        <ModalContent>
          {(handleCloseWithDraftSave) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Input
                  autoFocus
                  label="note title"
                  placeholder="give your new note a title"
                  variant="bordered"
                  value={noteTitle}
                  onChange={(e) => {
                    setNoteTitle(e.target.value);
                  }}
                />
              </ModalHeader>
              <ModalBody style={{ minHeight: 500 }}>
                <textarea
                  className="bg-transparent p-4"
                  style={{ height: 500 }}
                  placeholder="enter contents of your new note"
                  required
                  value={noteContent}
                  onChange={(e) => {
                    setNoteContent(e.target.value);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button size="sm" color="success" onPress={handleCreateNote}>
                  Create
                </Button>
                <Button size="sm" color="danger" onPress={handleCancel}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
