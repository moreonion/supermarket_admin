// for routes which should (only) be accessible when *NOT* logged in
// e.g. for the sign-in route
export default function ({ store, redirect }) {
  if (store.getters.isAuthenticated) {
    return redirect('/home')
  }
}
