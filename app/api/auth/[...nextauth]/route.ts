import { handlers } from '@/auth';
// Destructure the handlers object from the auth module and export it as handlers.
// This is because we are using the handlers object in the route.ts file.
// What's inside the handler object? It contains the http handlers for the different authentication events.
// Catch all route for all the authentication events.
export const { GET, POST } = handlers;
