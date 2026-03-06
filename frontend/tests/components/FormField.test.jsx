import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FormField, { TextInput, TextArea } from '../../src/components/FormField'

describe('FormField', () => {
  it('renders label when provided', () => {
    render(
      <FormField label="Business Name">
        <input />
      </FormField>
    )

    expect(screen.getByText('Business Name')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <FormField label="Test">
        <input data-testid="test-input" />
      </FormField>
    )

    expect(screen.getByTestId('test-input')).toBeInTheDocument()
  })

  it('shows optional marker when optional prop is true', () => {
    render(
      <FormField label="Phone" optional>
        <input />
      </FormField>
    )

    expect(screen.getByText('(optional)')).toBeInTheDocument()
  })

  it('renders hint when provided', () => {
    render(
      <FormField label="Email" hint="We'll never share your email">
        <input />
      </FormField>
    )

    expect(screen.getByText("We'll never share your email")).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <FormField label="Test" className="custom-class">
        <input />
      </FormField>
    )

    expect(screen.getByText('Test').closest('div')).toHaveClass('custom-class')
  })

  it('renders without label when not provided', () => {
    render(
      <FormField hint="Just a hint">
        <input data-testid="input" />
      </FormField>
    )

    expect(screen.queryByRole('label')).not.toBeInTheDocument()
    expect(screen.getByTestId('input')).toBeInTheDocument()
  })
})

describe('TextInput', () => {
  it('renders with placeholder', () => {
    render(<TextInput placeholder="Enter name" value="" onChange={() => {}} />)

    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument()
  })

  it('displays value', () => {
    render(<TextInput value="Test value" onChange={() => {}} />)

    expect(screen.getByRole('textbox')).toHaveValue('Test value')
  })

  it('calls onChange with new value', () => {
    const handleChange = vi.fn()
    render(<TextInput value="" onChange={handleChange} />)

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } })

    expect(handleChange).toHaveBeenCalledWith('new value')
  })

  it('uses text type by default', () => {
    render(<TextInput value="" onChange={() => {}} />)

    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
  })

  it('accepts email type', () => {
    render(<TextInput type="email" value="" onChange={() => {}} />)

    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
  })

  it('applies custom className', () => {
    render(<TextInput value="" onChange={() => {}} className="custom-input" />)

    expect(screen.getByRole('textbox')).toHaveClass('custom-input')
  })
})

describe('TextArea', () => {
  it('renders with placeholder', () => {
    render(<TextArea placeholder="Enter description" value="" onChange={() => {}} />)

    expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument()
  })

  it('displays value', () => {
    render(<TextArea value="Test content" onChange={() => {}} />)

    expect(screen.getByRole('textbox')).toHaveValue('Test content')
  })

  it('calls onChange with new value', () => {
    const handleChange = vi.fn()
    render(<TextArea value="" onChange={handleChange} />)

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new content' } })

    expect(handleChange).toHaveBeenCalledWith('new content')
  })

  it('uses default rows of 4', () => {
    render(<TextArea value="" onChange={() => {}} />)

    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '4')
  })

  it('accepts custom rows', () => {
    render(<TextArea rows={8} value="" onChange={() => {}} />)

    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '8')
  })

  it('applies custom className', () => {
    render(<TextArea value="" onChange={() => {}} className="custom-textarea" />)

    expect(screen.getByRole('textbox')).toHaveClass('custom-textarea')
  })
})
