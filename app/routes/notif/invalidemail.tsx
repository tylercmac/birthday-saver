import { Document, Layout } from '../../root'

export default function InvalidEmail() {
  return (
    <Document title="ERROR">
      <Layout>
        <h1 className="error-header">Error!</h1>
        <p>Invalid Email</p>
        <a href="/" className="btn btn-reverse">
            Go back
        </a>
      </Layout>
    </Document>
  );
}
