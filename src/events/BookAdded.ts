import type { Event } from '@event-driven-io/emmett'

export type BookAdded = Event<'BookAdded', {
          name: string,
  email: string,
        }>;