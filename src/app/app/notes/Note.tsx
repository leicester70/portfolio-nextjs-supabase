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
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";

export default function Note(note: Note) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <Card className="max-h-96 overflow-ellipsis" onPress={onOpen}>
      <CardHeader>{note.title}</CardHeader>
      <CardBody>{note.content}</CardBody>
      <Modal
        backdrop="opaque"
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
              <ModalHeader className="flex flex-col gap-1">
                {note.title}
              </ModalHeader>
              <ModalBody>
                <Textarea
                  isReadOnly={isEditing ? false : true}
                  variant="flat"
                  defaultValue={note.content}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="warning"
                  onPress={() => {
                    setIsEditing(true);
                  }}
                >
                  edit
                </Button>
                <Button color="secondary" variant="light" onPress={onClose}>
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
