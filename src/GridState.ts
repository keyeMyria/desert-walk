import { computed } from 'mobx'
import { observable } from 'mobx'

import { Card } from './Card'
import { CardCellPair } from './CardCellPair'
import { CardModel } from './CardModel'
import { Cell } from './Cell'
import { Deck } from './Deck'
import { EmptyCell } from './EmptyCell'
import { Grid } from './Grid'
import { Turn } from './Turn'

export class GridState {
  public constructor(
    cardCellPairs: Array<CardCellPair>
  ) {
    if (cardCellPairs.length !== Deck.instance.cards.length) {
      throw new Error(`Must supply ${Deck.instance.cards.length} card and cell pairs to the GridState constructor.`)
    }

    cardCellPairs.forEach(pair => {
      this.occupiedCells.push(new Card(pair.cell, this, pair.card))
    })
  }

  @observable
  public readonly occupiedCells: Array<Card> = []

  @computed
  public get correctlyPositionedCards(): Array<Card> {
    const correctlyPositionedCards = this.occupiedCells
      .filter(pair => pair.correctlyPlaced)
    return correctlyPositionedCards
  }

  @computed
  public get draggableCards(): Array<CardModel> {
    const draggableNonAces = this.emptyCells
      .map(emptyCell => emptyCell.cell.cellToTheLeft)
      .map(cellToTheLeft => this.getOccupiedCellFromCell(cellToTheLeft))
      .map(occupiedCell => occupiedCell === undefined ? undefined : occupiedCell.card)
      .map(card => card === undefined ? undefined : card.next)
      .filter((nextCard: CardModel | undefined): nextCard is CardModel => nextCard !== undefined)

    const draggableAces = this.occupiedCells
      .filter(occupiedCell => Deck.instance.theFourAces.includes(occupiedCell.card))
      .filter(cellWithAce => !cellWithAce.correctlyPlaced)
      .map(cellWithAce => cellWithAce.card)

    const draggableCards = draggableNonAces.concat(draggableAces)
    return draggableCards
  }

  @computed
  public get emptyCells(): Array<EmptyCell> {
    const emptyCells = Grid.instance.cells
      .filter(cell => this.getOccupiedCellFromCell(cell) === undefined)
      .map(cell => new EmptyCell(cell, this))

    return emptyCells
  }

  @computed
  public get incorrectlyPositionedCards(): Array<Card> {
    const incorrectlyPositionedCards = this.occupiedCells
      .filter(pair => !pair.correctlyPlaced)
    return incorrectlyPositionedCards
  }

  public applyTurn(turn: Turn): GridState {
    const newGridState = turn.performTurn(this)
    return newGridState
  }

  public getGridCellFromCell(cell: Cell): EmptyCell | Card {
    const occupiedCell = this.getOccupiedCellFromCell(cell)
    if (occupiedCell !== undefined) {
      return occupiedCell
    }

    const emptyCell = this.emptyCells.find(ec => ec.cell === cell)
    if (emptyCell === undefined) {
      throw new Error('Neither an occupied nor an empty cell found.')
    }

    return emptyCell
  }

  public getOccupiedCellFromCard(card: CardModel): Card {
    const match = this.occupiedCells.find(pair => pair.card === card)

    if (match === undefined) {
      throw new Error(`Could not find pair with card ${card.key}.`)
    }

    return match
  }

  public getOccupiedCellFromCell(cell: Cell | undefined): Card | undefined {
    if (cell === undefined) {
      return undefined
    }

    const match = this.occupiedCells.find(pair => pair.cell === cell)
    return match
  }
}