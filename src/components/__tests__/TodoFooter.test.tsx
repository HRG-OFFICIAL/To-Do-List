import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TodoFooter } from '../TodoFooter'

describe('TodoFooter', () => {
  it('renders the footer with correct text', () => {
    render(<TodoFooter />)
    
    expect(screen.getByText(/Built with ❤️ using Next.js, TypeScript, and Tailwind CSS/)).toBeInTheDocument()
  })

  it('has proper footer styling', () => {
    render(<TodoFooter />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-white', 'dark:bg-[hsl(var(--card))]', 'border-t')
  })
})
