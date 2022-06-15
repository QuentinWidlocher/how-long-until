import { RouteDataFunc, useNavigate, useRouteData, Navigator } from 'solid-app-router'
import TimerForm from '../components/TimerForm'
import { parseStoredTimer, StoredTimer, Timer } from '../types/timer'

export type EditTimerProps = {
  new?: boolean
}

export const loader: RouteDataFunc = ({ params, navigate }) => {
  const storedTimer = localStorage.getItem(`timer-${params.id}`)

  if (storedTimer) {
    return parseStoredTimer(JSON.parse(storedTimer) as StoredTimer)
  } else {
    navigate('/')
  }
}

function saveTimer(timer: Timer, navigate: Navigator) {
  localStorage.setItem(`timer-${timer.id}`, JSON.stringify(timer))
  navigate('/')
}

export default function EditTimer(props: EditTimerProps) {
  const timer = useRouteData<Timer | undefined>()
  console.log(timer)
  const navigate = useNavigate()

  return (
    <section class="h-full">
      <TimerForm
        timer={timer}
        submitLabel={props.new ? 'Create' : 'Save'}
        onSubmit={timer => saveTimer(timer, navigate)}
        onDelete={() => {
          if (timer?.id) {
            localStorage.removeItem(`timer-${timer.id}`)
          }
          navigate('/')
        }}
      />
    </section>
  )
}
