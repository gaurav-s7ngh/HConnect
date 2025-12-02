import { Redirect } from 'expo-router';

export default function Index() {
  // Redirects the user to the Login screen immediately
  return <Redirect href="/auth/login" />;
}