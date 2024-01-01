"use client";
import { useState } from "react";
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
import { CreateNote } from "@/lib/interfaces/Note";
import { createNewNote } from "@/lib/client_actions/notes-actions";
import { toast } from "react-toastify";
import { topCentredColoredToastOptions } from "@/lib/customToastOptions";
import { useRouter } from "next/navigation";

interface Props {
  authUserID: string;
}

export default function CreateNoteButton({ authUserID }: Props) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteContent, setNoteContent] = useState<string>("");

  const handleCloseWithoutDraftSave = () => {
    setNoteTitle("");
    setNoteContent("");
    onClose();
  };
  const handleCloseWithDraftSave = async () => {
    // save draft await code here
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
    router.refresh();
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
        size="md"
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
                <Button
                  size="sm"
                  color="primary"
                  onPress={handleCloseWithDraftSave}
                >
                  Save Draft
                </Button>
                <Button size="sm" color="success" onPress={handleCreateNote}>
                  Create
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  onPress={handleCloseWithoutDraftSave}
                >
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
