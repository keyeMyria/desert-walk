import { computed } from 'mobx'
import { observable } from 'mobx'

import { Size } from './Size'

export class Settings {
  private constructor() { }

  @observable public availableWidth = 0
  public readonly maxCardValue = 13
  public readonly rows = 4
  public readonly numberOfShuffles = 100

  public readonly colors = {
    card: {
      background: '#bbb',
      border: '#000',
      clubs: '#000',
      diamonds: '#f00',
      hearts: '#f00',
      shadowColor: '#000',
      spades: '#000'
    },
    gridBackgroundColor: '#464',
    mainBackgroundColor: '#333'
  }

  public readonly columns = this.maxCardValue + 1
  public readonly numberOfCards = this.maxCardValue * this.rows
  public readonly cardShadowOpacity = 0.6

  private static _instance: Settings
  private readonly cardSizeRatio = 3 / 2
  private readonly cardWidthToGutterRatio = 7 / 1

  /** It's necessary to use the singleton pattern, because @computed doesn't work on static fields. See https://github.com/mobxjs/mobx/issues/351#issuecomment-228304310. */
  public static get instance(): Settings {
    if (this._instance === undefined) {
      this._instance = new Settings()
    }

    return this._instance
  }

  @computed
  public get borderRadius(): number {
    return Math.round(this.cardSize.width / 8)
  }

  @computed
  public get borderWidth(): number {
    return Math.round(this.cardSize.width / 20)
  }

  @computed
  public get cardPadding(): number {
    return Math.floor(Settings.instance.cardSize.width / 20)
  }

  @computed
  public get cardShadowOffset() {
    const offset = {
      height: Math.floor(Settings.instance.cardSize.width / 20),
      width: Math.floor(Settings.instance.cardSize.width / 50)
    }
    return offset
  }

  @computed
  public get cardShadowRadius() {
    return Math.floor(Settings.instance.cardSize.width / 10)
  }

  @computed
  public get cardSize(): Size {
    const cardWidth = Math.floor(
      (
        this.availableWidth * this.cardWidthToGutterRatio
      ) / (
        this.columns * (this.cardWidthToGutterRatio + 1) + 1
      )
    )

    const cardHeight = Math.floor(this.cardSizeRatio * cardWidth)

    // TODO: Should verify that there is enough available height.

    return {
      height: cardHeight,
      width: cardWidth
    }
  }

  @computed
  public get cardSuitFontSize(): number {
    return Math.floor(Settings.instance.cardSize.width)
  }

  @computed
  public get cardSuitLeft(): number {
    return Math.floor(Settings.instance.cardSize.width / 40)
  }

  @computed
  public get cardSuitTop(): number {
    return Math.floor(Settings.instance.cardSize.width / 2)
  }

  @computed
  public get cardValueFontSize(): number {
    return Math.floor(Settings.instance.cardSize.width / 2)
  }

  @computed
  public get cardValueLeft(): number {
    return -Math.floor(Settings.instance.cardSize.width / 40 * 16)
  }

  @computed
  public get cardValueLetterSpacing(): number {
    return -Math.floor(Settings.instance.cardSize.width / 15)
  }

  @computed
  public get cardValueTop(): number {
    return -Math.floor(Settings.instance.cardSize.width / 40 * 3)
  }

  @computed
  public get cardValueWidth(): number {
    return Math.floor(1.22 * Settings.instance.cardSize.width)
  }

  @computed
  public get gridSize(): Size {
    const width = this.cardSize.width * this.columns + this.gutterWidth * (this.columns - 1)
    const height = this.cardSize.height * this.rows + this.gutterWidth * (this.rows - 1)

    return {
      height: height,
      width: width
    }
  }

  @computed
  public get gutterWidth(): number {
    const gutterWidth = Math.floor(
      (
        this.availableWidth - this.columns * this.cardSize.width
      ) / this.columns
    )

    return gutterWidth
  }
}