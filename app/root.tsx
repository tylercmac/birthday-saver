import {
  Outlet,
  LiveReload,
  Link,
  Links,
  Meta,
  Scripts,
  useLoaderData,
  redirect,
  useLocation
} from "remix";
import globalStylesUrl from "~/styles/global.css";
import { getUser } from "./utils/session.server";

export const links = () => [{ rel: "stylesheet", href: globalStylesUrl }];

export const meta = () => {
  const description = "A cool app for remembering bdays";
  const keywords = "birthday, remember, friends";

  return {
    description,
    keywords,
  };
};

export const loader = async ({ request } : { request: Request }) => {
  const user = await getUser(request);
  
  if (!user) redirect('/auth/butts')

  const data = {
    user,
  };

  return data;
};

export const unstable_shouldReload = () => false

export default function App() {
  return (
    <Document title={"Birthday Saver"}>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

export const Document = ({ children, title }: { children: any; title: any }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <Scripts />
        <title>{title ? title : "Birthday Saver"}</title>
        <script src="https://kit.fontawesome.com/80f2238071.js" crossOrigin="anonymous"></script>
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
        <Scripts />
      </body>
    </html>
  );
};

export const Layout = ({ children }: { children: any }) => {
  const { user } = useLoaderData();
  const location = useLocation();
  const isLogin = location.pathname === '/auth/login'

  return (
    <>
      <nav className="navBar">
        {user ? (
          <form action="/auth/logout" method="POST">
            <button className="btn btn-reverse" type="submit">
              Logout {user.username}
            </button>
          </form>
        ) : (
          <a href="/auth/login" className={isLogin ? "hidden" : "btn btn-reverse"}>
            Login
          </a>
        )}
      </nav>
      <h1 className="main-title">{user ? `${user.username}'s` : ''} Birthday Saver</h1>
      <div className="container">{children}</div>
    </>
  );
};

export const ErrorBoundary = ({ error }: { error: any }) => {
  console.log(error);
  return (
    <Document title="ERROR">
      {/* <Layout> */}
        <h1 className="error-header">Error!</h1>
        <p>{error.message}</p>
      {/* </Layout> */}
    </Document>
  );
};
