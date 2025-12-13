/// <reference types="vitest/globals" />
import { render } from '@testing-library/svelte';
import Preview from './Preview.svelte';

describe('Preview', () => {
	it('renders without crashing', () => {
		// Basic test to ensure the component can be imported
		expect(Preview).toBeTruthy();
	});
});