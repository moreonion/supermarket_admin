// for routes which should only be accessible when logged in
// e.g. for the the home route
export default function ({ store, redirect }) {
  if (!store.getters.isAuthenticated) {
    return redirect('/auth/sign-in')
  }
}
