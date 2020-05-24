import { formatTime } from './utils'
import { useTransactionObservation_UNSTABLE } from 'recoil'

const generateColors = (isDark = true) => {
  const colors = {
    error: 'color: ',
    info: 'color: ',
    previous: 'color: ',
    base: 'color: ',
  }
  if (isDark) {
    colors.error += '#ef6e70'
    colors.info += '#9bceff'
    colors.previous += '#d4d4d4'
    colors.base += '#fff'
  } else {
    colors.error += '#c41518'
    colors.info += '#2d02cc'
    colors.previous += '#444'
    colors.base += '#000'
  }
  return colors
}

const setColors = () => {
  const isDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches

  return generateColors(isDark)
}

const logAction = (action) => {
  const colors = setColors()

  console.groupCollapsed(
    '%c%s  %s  %s',
    colors.base,
    formatTime(new Date()),
    'Atom name',
    action.name,
  )
  if (action.persistence) {
    console.log('%cValue of atom cannot be read', colors.error)
    console.log(
      '%cPlease add: %c`persistence_UNSTABLE: { type: "log" }` %cto see the values for atom object: ',
      colors.base,
      colors.info,
      colors.base,
      action.name,
    )
  } else {
    console.log('%cAtom value %o', colors.base, action.atomValue)
    console.log(
      '%cPrevious atom value %o',
      colors.previous,
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
