import create from "zustand"
import { devtools } from "zustand/middleware"
import { getDate } from './functions'

export interface Routine {
  [data: string]: SubRoutine[]
}

export interface SubRoutine {
  title?: string,
  content?: string[],
  isDone?: boolean
}

type Store = {
  routines: Routine,
  date: string,
  addDate: (date: string) => void
  removeDate: (date: string) => void
  getDates: () => string[]
  addToRoutine: (date: string, title: string, content: string[]) => void
}

const useStore = create<Store>(devtools(set => ({
  routines: {
    "28-6-2021": [
      {title: "Routine 1", content: ["Point 1", "Point 2"], isDone: false},
      {title: "Routine 2", content: ["Point 1", "Point 2", "Point 3"], isDone: false},
      {title: "Routine 3", content: ["Point 1", "Point 2", "Point 3"], isDone: false},
      {title: "Routine 4", content: ["Point 1", "Point 2", "Point 3"], isDone: false}
    ],
    "29-6-2021": [
      {title: "Routine 1", content: ["Point 1", "Point 2"], isDone: false},
      {title: "Routine 2", content: ["Point 1", "Point 2", "Point 3"], isDone: false}
    ],
    "30-6-2021": [
      {title: "Potatoes are Great", content: [
        `Aren't they? I definitely should do something about it you know. Like preach about it or something like that.
        Then everyone will become potato servants and the world will become a better place to live in, wouldn't that be great?`, 
        `The more I think about, the more it makes sense, I should go ahead with this amazing plan of mine and make everyone turn
        into potato servants, lol. Okay, in all seriousness, that should happen. When should it happen? Tomorrow? Day After Tomorrow?
        Or the day after that? NO!! It should happen NOW!`,
        `Okay, this is going to be another rant related to how Potatoes in general are great. The main aim of the potatoes is to assert
        world domination and drive away all the tomatoes plaguing the Potato Kingdom. Oops, I just revealed my master plan just now 
        didn't I?`,
        `My initial plan was to infiltrate the League of Lords and some other thing but it didn't really work out that well. Cause I realized
        there are tons and tons of more people waiting to assert dominance over the world just like me. Hence I need to find a good way to
        make myself known among everyone.`
      ], isDone: false},
      {title: "Routine 2", content: ["Point 1", "Point 2", "Point 3"], isDone: false}
    ]
  },
  date: getDate(),
  addDate(date: string) {
    set(state => ({
      ...state,
      routines: {...state.routines, [date]: []}
    }))
  },
  removeDate(_date: string) {
    delete this.routines._date
  },
  getDates() {
    return Object.keys(this.routines)
  },
  addToRoutine(_date: string, title: string, content: string[]) {
    set(state => ({
      ...state,
      routines: {...state.routines, [_date]: [...state.routines[_date], { title, content, isDone: false }]}
    }))
  },
})))

export default useStore