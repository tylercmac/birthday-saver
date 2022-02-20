import { Outlet, LiveReload, Link, Links, Meta, Scripts } from "remix";
import globalStylesUrl from "~/styles/global.css";

export const links = () => [{ rel: "stylesheet", href: globalStylesUrl }];

export const meta = () => {
  const description = "A cool app for remembering bdays";
  const keywords = "birthday, remember, friends";

  return {
    description,
    keywords,
  };
};

export default function App() {
  return (
    <Document title={'Birthday Saver'}>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

const Document = ({ children, title } : { children: any, title: any }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <Scripts />
        <title>{title ? title : "Birthday Saver"}</title>
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
        <Scripts />
      </body>
    </html>
  );
};

const Layout = ({ children } : { children: any }) => {
  return (
    <>
      <nav className="navBar">
        <Link to="/login" className="btn btn-reverse">
          Logout
        </Link>
        </nav>
      <h1>Birthday Saver</h1>

      <div className="container">{children}</div>
    </>
  );
};

export const ErrorBoundary = ({ error } : {error:any}) => {
  console.log(error);
  return (
    <Document title="">
      <Layout>
        <h1 className="error-header">Error!</h1>
        <p>{error.message}</p>
      </Layout>
    </Document>
  );
};
