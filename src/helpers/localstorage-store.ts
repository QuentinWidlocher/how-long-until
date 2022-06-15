import { createEffect } from 'solid-js'
import { createStore, SetStoreFunction, Store } from 'solid-js/store'

export function createLocalStore<T>(
  name: string,
  init: T
): [Store<T>, SetStoreFunction<T>] {
  const localState = localStorage.getItem(name)
  const [state, setState] = createStore<T>(
    init,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    localState ? JSON.parse(localState) : init
  )
  createEffect(() => localStorage.setItem(name, JSON.stringify(state)))
  return [state, setState]
}
