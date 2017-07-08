export const createCancelablePromise = promise => {
  let hasCanceled = false

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => (hasCanceled ? reject({ isCanceled: true }) : resolve(val)),
    )

    promise.catch(
      error => (hasCanceled ? reject({ isCanceled: true }) : reject(error)),
    )
  })

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true
    },
  }
}

export const delayPromise = delay =>
  new Promise(resolve => { setTimeout(resolve, delay) })
