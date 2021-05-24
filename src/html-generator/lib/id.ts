import { nanoid } from 'nanoid';
export const generateUniqueId = (length = 4) => nanoid(length);
