import { z } from 'zod';
import { KnownEvent, KnownEventSchema } from '../schemas/events';

export const UnknownEventSchema = z.object({
  event: z.string(),
  data: z.unknown(),
});

export type UnknownEvent = z.infer<typeof UnknownEventSchema>;

export type ParsedEvent = KnownEvent | UnknownEvent;

export class EventParser {
  static parse(event: string, data: unknown): ParsedEvent {
    const result = KnownEventSchema.safeParse({
      event,
      data,
    });

    if (result.success) {
      return result.data;
    }

    return {
      event,
      data,
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
