import { render, screen } from '@testing-library/react';
import Header from '@/components/header';

describe('Test Header', () => {
    it('Render Header', () => {
        render(<Header toogleTheme={() => ''} />);

        expect(screen.getByTestId('header')).toBeInTheDocument();
    });
});
