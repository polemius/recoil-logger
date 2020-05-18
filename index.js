import { formatTime } from './utils'
import { useTransactionObservation_UNSTABLE } from 'recoil'

const logAction = (action) => {
  console.groupCollapsed(
    '%c%s  %s  %s',
    'color: #000',
    formatTime(new Date()),
    'Atom name',
    action.name,
  )
  if (action.persistence) {
    console.log('%cValue of atom cannot be read', 'color: #f00')
    console.log(
      '%cPlease add: %c`persistence_UNSTABLE: { type: "log" }` %cto atom object to see the values',
      'color: #333',
      'color: #000',
      action.name,
      'color: #333',
    )
  } else {
    console.log('%cAtom value %o', 'color: #444', action.atomValue)
    console.log(
      '%cPrevious atom value %o',
      'color: #444',
      action.previousAtomValue,
    )
  }
  console.groupEnd()
}

export function RecoilLogger() {
  useTransactionObservation_UNSTABLE((e) => {
    e.modifiedAtoms.forEach((name) => {
      logAction({
        name,
        atomValue: e.atomValues.get(name),
        previousAtomValue: e.previousAtomValues.get(name),
        persistence: e.atomInfo.get(name).persistence_UNSTABLE.type === 'none',
      })
    })
  })
  return null
}

export default RecoilLogger
