import { RouteDataFunc, useRouteData } from 'solid-app-router'
import TimerComponent from '../components/Timer'
import { parseStoredTimer, StoredTimer, Timer } from '../types/timer'

export const loader: RouteDataFunc = () => {
  const list: Timer[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.startsWith('timer-')) {
      list.push(parseStoredTimer(JSON.parse(localStorage.getItem(key)) as StoredTimer))
    }
  }

  return list
}

export default function Home() {
  const timers = useRouteData<Timer[]>()

  return (
    <section class="h-full">
      <h1 class="text-2xl text-center font-bold">How long...</h1>
      <h2 class="opacity-50 text-center mb-5">
        <span class="hidden md:inline">Click</span>
        <span class="inline md:hidden">Touch</span> the duration to see more details
      </h2>
      <ul class="space-y-5">
        {timers.map(timer => (
          <li>
            <TimerComponent timer={timer} />
          </li>
        ))}
      </ul>

      <a class="btn btn-primary mt-5 btn-block" href="/timer/new">
        Add another date
      </a>
    </section>
  )
}
