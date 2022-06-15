import {
  formatDistanceToNow,
  formatDuration,
  intervalToDuration,
  intlFormat
} from 'date-fns'
import { createSignal, onCleanup } from 'solid-js'
import { Timer } from '../types/timer'

export type TimerProps = {
  timer: Timer
}

function calculateTimings(target: Date) {
  return {
    distanceToNow: formatDistanceToNow(target, {
      addSuffix: true,
      includeSeconds: true
    }),
    intlFormat: intlFormat(target, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }),
    distanceToNowStrict: formatDuration(
      intervalToDuration({
        start: target,
        end: new Date()
      })
    ),
    keyword: target.getTime() < Date.now() ? 'since' : 'until'
  }
}

export default function TimerComponent(props: TimerProps) {
  const [timings, setTimings] = createSignal(calculateTimings(props.timer.target))

  const interval = setInterval(() => {
    setTimings(calculateTimings(props.timer.target))
  }, 1000)

  onCleanup(() => clearInterval(interval))

  return (
    <article class="card bg-base-300">
      <div class="card-body">
        <h2 class="card-title">
          ... {timings().keyword} {props.timer.name} ?
        </h2>
        <div class="flex items-center">
          <div class="flex flex-col flex-1">
            <label class="swap place-content-start">
              <input type="checkbox" />
              <div class="swap-off flex flex-col justify-center">
                <span class="text-xl">{timings().distanceToNow}</span>
              </div>
              <div class="swap-on flex flex-col">
                <span>{timings().intlFormat}</span>
                <span class="text-sm">{timings().distanceToNowStrict}</span>
              </div>
            </label>
          </div>
          <a href={`/timer/${props.timer.id}`} class="btn btn-sm btn-ghost">
            Edit
          </a>
        </div>
      </div>
    </article>
  )
}
