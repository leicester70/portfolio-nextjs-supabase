"use client";

import CreateNoteButton from "./CreateNoteButton";

export default function Notes() {
  return (
    <>
      <div className="flex items-center">
        <h2>Notes</h2>
        <div className="ml-auto mr-0">
          <CreateNoteButton />
        </div>
      </div>
      <hr />
    </>
  );
}
