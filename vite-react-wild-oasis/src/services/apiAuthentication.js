import supabase from "./supabase";
// Login
export async function login(email, password) {
  const { data: user, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    throw new Error(error.message, error);
  }
  return user;
}
