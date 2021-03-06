import { computed } from 'mobx'

import { Card } from './Card'
import { CardModel } from './CardModel'
import { Cell } from './Cell'
import { EmptyCell } from './EmptyCell'
import { GridState } from './GridState'
import { Point } from './Point'
import { Rectangle } from './Rectangle'

export abstract class GridCell {
  constructor(
    public cell: Cell,
    protected gridState: GridState
  ) { }

  @computed
  public get boundary(): Rectangle {
    const boundary = CardModel.getBoundary(this.position)
    return boundary
  }

  @computed
  public get left(): Card | EmptyCell | undefined {
    if (this.cell.cellToTheLeft === undefined) {
      return undefined
    }

    const left = this.gridState.getGridCellFromCell(this.cell.cellToTheLeft)
    return left
  }

  @computed
  public get position(): Point {
    return this.cell.position
  }
}