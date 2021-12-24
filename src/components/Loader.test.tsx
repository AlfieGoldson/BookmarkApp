import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

const setup = () => {
	const utils = render(<Loader />);

	const loader = screen.getByRole('alert', {
		name: /Loading/i,
	});

	return {
		...utils,
		loader,
	};
};

it('should render the loader', () => {
	const { loader } = setup();

	expect(loader).toBeInTheDocument();
});
