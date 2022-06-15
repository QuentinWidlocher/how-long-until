import { parseISO } from 'date-fns'

export type Timer = {
  id: string
  target: Date
  name: string
}

export type StoredTimer = {
  id: string
  target: string
  name: string
}

export function parseStoredTimer(stored: StoredTimer): Timer {
  return {
    id: stored.id,
    target: parseISO(stored.target),
    name: stored.name
  }
}
