export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/issues/new",
    "/issues/list",
    "/issues/edit/:id+",
    "/issues/:id+",
    "/sauna",
    "/sauna/:id+",
    "/sauna/list",
    "/users/register",
  ],
};
