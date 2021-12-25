import { render, screen } from '@testing-library/react';
import { Loader } from '.';

it('should render the loader', () => {
	render(<Loader />);

	const loader = screen.getByRole('alert', {
		name: /Loading/i,
	});

	expect(loader).toBeInTheDocument();
});
