import { v4 as uuidv4 } from 'uuid';
import mime from 'mime';
export async function uploadToS3(file: File) {
  const type = file.type;
  const ext = mime.getExtension(type);
  const filename = `${uuidv4()}.${ext}`;

  try {
    const res = await fetch(`/api/presigned?file=${filename}&type=${type}`);
    const { signedUrl } = await res.json();
    const upload = await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': type },
    });

    if (upload.ok) {
      return { success: true, filename };
    }
  } catch (e) {
    return { success: false };
  }
  return { success: false };
}
