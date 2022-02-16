import { omit } from '../'

describe('utils functions: ', () => {
	describe('omit function: ', () => {
		const objToRemoveFieldsFrom = {
			id: 1,
			name: 'John',
			surname: 'Doe'
		}
    
		it('should return expect value', () => {
			const result = omit(objToRemoveFieldsFrom, ['name'])

			expect(JSON.stringify(result)).toBe(JSON.stringify({id: 1, surname: 'Doe'}))
		})
		it('should return expect value even with not-existent fields', () => {
			const result = omit(objToRemoveFieldsFrom, ['name', 'field', 'wrong'])

			expect(JSON.stringify(result)).toBe(JSON.stringify({id: 1, surname: 'Doe'}))
		})
	})
})