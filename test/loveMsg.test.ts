import { describe, expect, it } from 'vitest'
import { goodMorning } from '../src/libs/LoveMsg/goodMorning'

describe('test goodMorning', () => {
  it('work', () => {
    const sum = (a: number, b: number) => a + b
    expect(sum(1, 1)).toEqual(2)
    goodMorning()
  })
})
