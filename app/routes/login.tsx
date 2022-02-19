import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

export let loader: LoaderFunction = async () => {
  return { title: "login!" }
};

export default function Login() {
  const data = useLoaderData()
  return (
    <div>{data.title}</div>
  )
}
