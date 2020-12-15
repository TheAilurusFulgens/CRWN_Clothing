import React, { useState } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import "./sign-in.styles.scss";

function SignIn() {
  const [input, setInput] = useState({ email: "", password: "" });

  async function handleSubmit(event) {
    event.preventDefault();

    const { email, password } = input;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setInput({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(event) {
    const { value, name } = event.target;

    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const { email, password } = input;

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          handleChange={handleChange}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />
        <div className="button">
          <CustomButton type="submit"> Sign In </CustomButton>
          <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
            {" "}
            Sign in with Google{" "}
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
