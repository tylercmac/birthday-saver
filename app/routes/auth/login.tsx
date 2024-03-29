import { useActionData, json, redirect } from "remix";
import { useEffect } from "react";
import {
  login,
  createUserSession,
  register,
  isUnique,
} from "../../utils/session.server";
import type { ActionFunction } from "remix";

const validateUsername = async (loginType: string, name: string) => {
  if (typeof name !== "string" || name.length < 4) {
    return "Username should be at least 3 characters long";
  } else if (loginType === "register") {
    const isUniqueUser = await isUnique(name);
    if (!isUniqueUser) return "Username already registered";
  } else if (!name) return "A username is required";
};

const validatePassword = (password: string) => {
  if (typeof password !== "string" || password.length > 255) {
    return "password should be fewer than 255 characters";
  } else if (!password) return "A password is required";
};

const badRequest = (data: Object) => {
  return json(data, { status: 400 });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const loginType = form.get("loginType");
  const username = form.get("username");
  const password = form.get("password");

  const fields = {
    username: username || String,
    password: password || String,
  };

  const fieldErrors = {
    username: await validateUsername(loginType, username),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    console.log(fieldErrors);
    return badRequest({ fieldErrors, fields });
  }

  switch (loginType) {
    case "login": {
      const user = await login({ username, password });

      if (!user) {
        return badRequest({
          fieldErrors: { password: "Invalid Credentials" },
          fields,
        });
      }

      return createUserSession(user.id, "/");
    }

    case "register": {
      const newUser = await register({ username, password });

      if (!newUser) {
        return badRequest({
          fields,
          formError: "Something went wrong",
        });
      }

      return createUserSession(newUser.id, "/");
    }

    default: {
      return badRequest({
        fields,
        formError: "Login type is not valid",
      });
    }
  }
};

const showPass = () => {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
};

export default function Login() {
  useEffect(() => {
    if (sessionStorage.getItem("bday_session")) redirect("/");
  }, []);

  const actionData = useActionData();

  return (
    <div className="auth-container">
      <div className="page-content">
        <form method="POST">
          <fieldset>
            <legend>Login or Register</legend>
            <label>
              <input
                type="radio"
                name="loginType"
                value="login"
                defaultChecked={
                  !actionData?.fields?.loginType ||
                  actionData?.fields?.loginType === "login"
                }
              />{" "}
              Login
            </label>
            <label>
              <input type="radio" name="loginType" value="register" /> Register
            </label>
          </fieldset>

          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              defaultValue={actionData?.fields?.username}
            />
            <div className="error">
              {actionData?.fieldErrors?.username &&
                actionData?.fieldErrors?.username}
            </div>
          </div>
          <div className="form-control">
            <div className="passbox">
              <label htmlFor="password">Password</label>
              <div className="show">
                <span className="show-pass">
                  <em>Show Password</em>
                </span>
                <input
                  className="passcheck"
                  type="checkbox"
                  onClick={() => showPass()}
                />
              </div>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              defaultValue={actionData?.fields?.password}
            />
            <div className="error">
              {actionData?.fieldErrors?.password &&
                actionData?.fieldErrors?.password}
            </div>
          </div>

          <button className="btn btn-block" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
