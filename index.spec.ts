// Utils
import { symmetricDifference } from 'ramda'
import { objectDeepKeys, getMissingCount } from './helpers/utils'

// Data
import { supportedLocales } from './index'

// Define a regex pattern to match variables in curly braces
const variablePattern = /{([^{}]*)}/g

// Define a recursive function to check for variables in a translation object
const checkForVariables = (english, translation) => {
	// Iterate through keys and values of English object
	for (const [key, value] of Object.entries(english)) {
		// Skip keys with null values in translation
		if (translation[key] === null) continue

		// Check if value is an object (indicating another nested layer)
		if (typeof value === `object`) {
			// If value is an object, recursively call the function on the nested objects
			checkForVariables(value, translation[key])
		} else if (typeof value === `string`) {
			// If value is not an object, check if it contains any variables
			const englishVariables = value.match(variablePattern)
			if (englishVariables === null) continue

			// Iterate through the variables in the English text
			for (const variable of englishVariables) {
				// Assert that each variable is present in the translation
				expect(translation[key]).toContain(variable)
			}
		}
	}
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const enMessage = require(`./messages/en.json`)
const enMessageKeys = objectDeepKeys(enMessage)

const enCount = getMissingCount(enMessage)
describe(`correctEntriesCount`, () => {
	it(`should have the proper total entries count in English`, () => {
		expect(enMessage._meta.total).toBe(enCount.total)
	})
	it(`should have no missing entries in English`, () => {
		expect(0).toBe(enCount.missing)
	})
})

for (const folder of [...supportedLocales, `_empty`]) {
	if (folder === `en`) continue
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const messages = require(`./messages/${folder}.json`)

	describe(`translatedMessages`, () => {
		it(`should have all English translations keys in "${folder}"`, () => {
			const messageKeys = objectDeepKeys(messages)
			expect(symmetricDifference(enMessageKeys, messageKeys)).toHaveLength(0)
		})
	})

	describe(`correctEntriesCount`, () => {
		const count = getMissingCount(messages)
		it(`should match the English total entries count for "${folder}"`, () => {
			expect(enCount.total).toBe(count.total)
		})
		it(`should have the proper total entries count for "${folder}"`, () => {
			expect(messages._meta.total).toBe(count.total)
		})
		it(`should have the proper missing entries count for "${folder}"`, () => {
			expect(messages._meta.missing).toBe(count.missing)
		})
	})

	describe(`containCorrectVariables`, () => {
		it(`should contain all variables from English text for "${folder}"`, () => {
			checkForVariables(enMessage, messages)
		})
	})
}
