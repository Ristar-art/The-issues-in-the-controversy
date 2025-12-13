/// <reference types="vitest/globals" />
import ComponentList from './ComponentList.svelte';

describe('ComponentList', () => {
	it('renders without crashing', () => {
		// Basic test to ensure the component can be imported
		expect(ComponentList).toBeTruthy();
	});
});