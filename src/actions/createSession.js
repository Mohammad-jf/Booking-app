"use server";

async function createSession(previousState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      error: "please fill all fields",
    };
  }

  return {
    success: true,
  };
}
export default createSession;
