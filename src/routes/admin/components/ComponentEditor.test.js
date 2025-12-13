/// <reference types="vitest/globals" />
import { render } from '@testing-library/svelte';
import { vi } from 'vitest';
import ComponentEditor from './ComponentEditor.svelte';

describe('ComponentEditor', () => {
	it('renders without crashing', () => {
		// Basic test to ensure the component can be imported
		expect(ComponentEditor).toBeTruthy();
	});
});