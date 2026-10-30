import { z } from 'zod';
import { KnownEvent, KnownEventSchema } from '../schemas/events';
import { EventType } from '@app/types/events';

export const UnknownEventSchema = z.object({
  event: z.string(),
  data: z.unknown(),
});

export type UnknownEvent = z.infer<typeof UnknownEventSchema>;
export type ParsedEvent =
  | {
      status: 'valid';
      event: KnownEvent;
    }
  | {
      status: 'unknown';
      event: UnknownEvent;
    }
  | {
      status: 'invalid';
      event: string;
      data: unknown;
      errors: z.ZodIssue[];
    };

export class EventParser {
  static parse(event: string, data: unknown): ParsedEvent {
    const result = KnownEventSchema.safeParse({
      event,
      data,
    });

    if (result.success) {
      return {
        status: 'valid',
        event: result.data,
      };
    }

    const isKnown = Object.values(EventType).includes(event as EventType);

    if (!isKnown) {
      return {
        status: 'unknown',
        event: {
          event,
          data,
        },
      };
    }

    return {
      status: 'invalid',
      event,
      data,
      errors: result.error.issues,
    };
  }

  static fromMessage(message: MessageEvent): ParsedEvent {
    let data: unknown;

    try {
      data = JSON.parse(message.data);
    } catch {
      data = message.data;
    }

    return this.parse(message.type, data);
  }
}
