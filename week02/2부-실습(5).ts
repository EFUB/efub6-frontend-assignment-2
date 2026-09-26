export {};

type NotificationHandler =
  | { type: "email"; handler: () => { success: true; to: string } }
  | { type: "sms"; handler: () => { sent: true; number: string } }
  | { type: "push"; handler: () => { delivered: boolean } }
  | { type: "slack"; handler: () => { ok: boolean; channel: string } };

type EmailHandler = Extract<NotificationHandler, { type: "email" }>;

type NonPushHandlers = Exclude<NotificationHandler, { type: "push" }>;
