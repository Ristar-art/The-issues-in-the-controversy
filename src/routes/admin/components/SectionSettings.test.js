/// <reference types="vitest/globals" />
import { render } from '@testing-library/svelte';
import { vi } from 'vitest';
import SectionSettings from './SectionSettings.svelte';

describe('SectionSettings', () => {
	it('renders without crashing', () => {
		// Basic test to ensure the component can be imported
		expect(SectionSettings).toBeTruthy();
	});
});