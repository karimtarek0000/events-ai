# EventRAI

EventRAI is an event discovery and management web application built with FullStack modern React, Next.js, Clerk authentication, and Convex backend services.

![alt text](<markdown-images/Screenshot 2026-06-16 at 7.48.59 PM.png>)

## Stack

- Next.js 16.2.7 (App Router)
- React 19.2.4
- TypeScript
- Clerk for authentication and pricing
- Convex for backend queries, mutations, and data storage
- Tailwind CSS v4 + shadcn/ui component library
- Radix UI, Lucide Icons, React Hook Form, Zod

## Folder Structure

- `app/`
  - `layout.tsx` - global layout with Clerk and Convex providers
  - `page.tsx` - homepage that renders the main hero view
  - `(auth)/` - authenticated and public auth pages
    - `sign-in/[[...sign-in]]/page.tsx` - Clerk sign-in page
    - `sign-up/[[...sign-up]]/page.tsx` - Clerk sign-up page
    - `pricing/page.tsx` - Clerk pricing table page
    - `my-events/page.tsx` - authenticated user event management page
  - `(events)/` - event discovery and event details flows
    - `events/page.tsx` - explore events page with featured, nearby, and popular sections
    - `events/[id]/page.tsx` - event details and registration page
    - `create-event/page.tsx` - event creation page behind plan limits
    - `search-events/page.tsx` - event search result page
  - `api/` - webhook and server route handlers

- `components/`
  - `layout/` - navigation, header, user menu, auth loading state
  - `event/` - event cards, event details, create event form, register form, my-events list
  - `features/` - featured carousel, nearby events, popular events, featured events sections
  - `modal/` - confirm modal
  - `search/` - search result list UI
  - `skeleton/` - loading state skeleton components
  - UI primitives under `components/ui/` and theme provider in `components/theme/`

- `convex/`
  - `schema.ts` - Convex data model for `users`, `events`, and `registrations`
  - `events.ts` - backend queries and mutations for event operations
  - `users.tsx` - user record creation and lookup logic
  - `register.ts` - registration flow
  - `_generated/` - Convex generated API and data model bindings

- `hooks/`
  - `search.ts` - search input state and navigation handler
  - `deleteEvents.ts` - delete event mutation helper
  - `userStore.ts` - local user state helpers

- `config/`
  - `index.ts` - plan constants and limits

- `lib/`
  - `data.ts` - event category and metadata helpers
  - `utils.ts` - client utilities

- `types/` - shared event type definitions
- `utils/` - server-side auth and Clerk helpers
- `validations/` - Zod schemas for event creation and registration

## Features

- Browse and discover events across featured, nearby, and popular categories
- Search events by city or state
- Authenticate using Clerk sign-in and sign-up pages
- Explore event details and register for events
- Create events with plan-based limits and validation
- View and manage organizer events in `My Events`
- Pricing page integrated with Clerk pricing plans
- Convex-backed data storage and business logic for event creation, search, and user plan enforcement
- Responsive navigation, search input, and toast notifications

## Pages

- `/` - Home page
- `/events` - Explore events and discovery sections
- `/events/[id]` - Event detail page with registration
- `/search-events?search=...` - Search results page
- `/create-event` - Create new event page (authenticated)
- `/my-events` - Organizer event management page
- `/sign-in` - Sign in
- `/sign-up` - Sign up
- `/pricing` - Pricing and plan selection
