/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { formatISO, parseISO, formatISO9075 } from 'date-fns'
import { Timer } from '../types/timer'
import { v4 as uuidv4 } from 'uuid'
import { Show } from 'solid-js'

export type TimerFormProps = {
  timer: Partial<Timer>
  submitLabel: string
  onSubmit: (timer: Timer) => void
  onDelete: () => void
}

export default function TimerForm(props: TimerFormProps) {
  // eslint-disable-next-line prefer-const
  let formRef: HTMLFormElement | undefined = undefined

  return (
    <form
      onSubmit={function (e) {
        e.preventDefault()
        props.onSubmit({
          id: formRef.elements['id'].value as string,
          name: formRef.elements['title'].value as string,
          target: parseISO(
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            formRef.elements['date'].value +
              'T' +
              (formRef.elements['time'].value ?? '00:00')
          )
        })
      }}
      ref={formRef}
      class="flex flex-col h-full space-y-5"
    >
      <div class="form-control mt-0">
        <label class="label" for="title">
          How long until/since ...
        </label>
        <input
          class="input input-bordered"
          type="text"
          id="title"
          value={props.timer?.name}
          required
        />
      </div>
      <div class="form-control">
        <label class="label" for="date">
          Date
        </label>
        <input
          class="input input-bordered"
          type="date"
          id="date"
          value={
            props.timer
              ? formatISO(props.timer.target, { representation: 'date' })
              : undefined
          }
          required
        />
      </div>
      <div class="form-control">
        <label class="label" for="time">
          Time
        </label>
        <input
          class="input input-bordered"
          type="time"
          id="time"
          step={1}
          value={
            props.timer
              ? formatISO9075(props.timer.target, { representation: 'time' })
              : undefined
          }
        />
      </div>
      <input type="hidden" name="id" value={props.timer?.id ?? uuidv4()} />
      <div class="flex-grow md:flex-grow-0"></div>
      <div class="divider"></div>
      <div class="flex space-x-2">
        <a class="btn btn-secondary flex-1" href="/">
          Cancel
        </a>
        <Show when={props?.timer}>
          <button
            type="button"
            class="btn btn-error flex-1"
            onClick={() => props.onDelete()}
          >
            Delete
          </button>
        </Show>
      </div>
      <button class="btn btn-primary" type="submit">
        {props.submitLabel}
      </button>
    </form>
  )
}
