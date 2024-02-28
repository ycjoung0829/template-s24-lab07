import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newRecentMistakesFirstSorter (): CardOrganizer {
  /**
   * Computes the most recent mistake's time stamp for a card and helps in
   * determining the sequence of cards in the next iteration, based on the
   * rules that those answered incorrectly in the last round appear first.
   *
   * @param cardStatus The {@link CardStatus} object with failing
   * @return The most recent incorrect response time stamp
   */
  function listOfFailures (cards: CardStatus[]): CardStatus[] {
    let wrongCardsList: CardStatus[] = []
    const correctCardsList: CardStatus[] = []

    for (const c of cards) {
      const results = c.getResults()
      var lastResult: boolean | undefined = false
      if (results.length === 0) {
        wrongCardsList.push(c)
      } else {
        lastResult = results.pop()
        if (lastResult === false) {
          wrongCardsList.push(c)
        } else {
          correctCardsList.push(c)
        }
      }
    }
    wrongCardsList = wrongCardsList.concat(correctCardsList)
    return wrongCardsList
  }
  return {
    /**
     * Orders the cards by the time of most recent incorrect answers provided for them.
     *
     * @param cards The {@link CardStatus} objects to order.
     * @return The ordered cards.
     */
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      return listOfFailures(cards)
    }
  }
};

export { newRecentMistakesFirstSorter }
