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

export default function CreateNoteButton() {
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

  return (
    <>
      <Button className="my-2" color="primary" onPress={onOpen} endContent>
        New Note 📝
      </Button>

      <Modal
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
              <ModalBody>
                <Textarea
                  variant="bordered"
                  height={500}
                  maxRows={500}
                  className="min-w-max"
                  isRequired
                  label="contents"
                  labelPlacement="inside"
                  placeholder="enter contents of your new note"
                  value={noteContent}
                  onChange={(e) => {
                    setNoteContent(e.target.value);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleCloseWithDraftSave}>
                  Save Draft
                </Button>
                <Button color="danger" onPress={handleCloseWithoutDraftSave}>
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
