import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../../src/components/Button'

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByText('Click me'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick} disabled>Disabled</Button>)

    fireEvent.click(screen.getByText('Disabled'))

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies primary variant classes by default', () => {
    render(<Button>Primary</Button>)

    expect(screen.getByRole('button')).toHaveClass('bg-accent')
  })

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>)

    expect(screen.getByRole('button')).toHaveClass('bg-white/10')
  })

  it('applies ghost variant classes', () => {
    render(<Button variant="ghost">Ghost</Button>)

    expect(screen.getByRole('button')).toHaveClass('bg-transparent')
    expect(screen.getByRole('button')).toHaveClass('text-muted')
  })

  it('applies outline variant classes', () => {
    render(<Button variant="outline">Outline</Button>)

    expect(screen.getByRole('button')).toHaveClass('border')
    expect(screen.getByRole('button')).toHaveClass('border-border')
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>)

    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('has type button by default', () => {
    render(<Button>Button</Button>)

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('allows changing type to submit', () => {
    render(<Button type="submit">Submit</Button>)

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })
})
