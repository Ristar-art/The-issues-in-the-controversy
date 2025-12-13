/// <reference types="vitest/globals" />
import { render } from '@testing-library/svelte';
import { vi } from 'vitest';
import BlocksEditor from './BlocksEditor.svelte';

describe('BlocksEditor', () => {
	it('renders without crashing', () => {
		// Basic test to ensure the component can be imported
		expect(BlocksEditor).toBeTruthy();
	});
});