import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CreateNote, Note } from "../interfaces/Note";
const supabase = createClientComponentClient();

export async function retrieveUserNotes(
  authUserID: string
): Promise<Note[] | null> {
  try {
    const { data: notes, error } = await supabase
      .from("notes")
      .select("*")
      .eq("creator", authUserID);
    if (error) throw error;
    return Promise.resolve(notes);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function createNewNote(authUserID: string, note: CreateNote) {
  let finalPayload = Object.assign(note, { creator: authUserID });
  try {
    const { data, error } = await supabase
      .from("notes")
      .insert([finalPayload])
      .select();
    if (error) throw error;
    Promise.resolve(data);
    return data;
  } catch (error) {
    return Promise.reject(`${error}`);
  }
}

export async function deleteNote(authUserID: string, noteID: number) {
  try {
    const { error } = await supabase.from("notes").delete().eq("id", noteID);
    if (error) throw error;
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(`${error}`);
  }
}

export async function updateNote(authUserID: string) {}
