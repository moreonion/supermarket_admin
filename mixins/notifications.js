export const NotificationMixin = {
  notifications: {
    notifySuccess: {
      title: 'Sucess',
      message: 'Message',
      type: 'success'
    },
    notifyError: {
      title: 'Error',
      message: 'Message',
      type: 'error'
    }
  },
  methods: {
    showFetchSuccess () {
      this.notifySuccess()
    },
    // expects an axios error object
    showFetchError (err) {
      this.notifyError({
        title: 'Error',
        message: err.message
      })
    },
    showCreateSuccess () {
      this.notifySuccess()
    },
    // expects an axios error object
    showCreateError (err) {
      this.notifyError({
        title: 'Error',
        message: err.message
      })
    }
  }
}
